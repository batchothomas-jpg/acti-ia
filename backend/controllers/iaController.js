import fetch from "node-fetch";
import { updateMemory, getAvoidedMechanics } from "../services/iaMemoryService.js";

export async function getActivities(req, res) {
  const filter = {};

  if (req.user.role !== "admin") {
    filter.center = req.user.center;
  }

  const activities = await Activity.find(filter).sort({ createdAt: -1 });

  res.json(activities);
}

function detectMechanic(activity) {
  const text = `${activity.title} ${activity.description}`.toLowerCase();

  if (text.includes("course") || text.includes("relais")) return "course";
  if (text.includes("coop")) return "coopération";
  if (text.includes("adresse") || text.includes("lancer")) return "adresse";
  if (text.includes("rôle")) return "rôles";
  if (text.includes("stratég")) return "stratégie";

  return "autre";
}

export async function generateActivities(req, res) {
  try {
    const body = req.body || {};

    const {
      group,
      children,
      duration,
      family,
      theme,
      materials,
      userPrompt
    } = body;



    if (!group || !children || !duration || !family) {
      return res.status(400).json({ error: "Paramètres manquants" });
    }

    const materialText = materials?.length
      ? materials.map(m => `- ${m.name} (quantité: ${m.quantity})`).join("\n")
      : "- Aucun matériel spécifique";

const avoided = await getAvoidedMechanics({
  family,
  ageGroup: group
});

const memorySection = avoided.length
  ? `
--------------------------------
EXPÉRIENCE PRÉCÉDENTE (ACM)
--------------------------------
Les mécaniques suivantes ont été trop souvent utilisées
ou mal évaluées récemment :

${avoided.map(m => `- ${m}`).join("\n")}

⚠️ Priorité :
Proposer des activités avec des mécaniques différentes.
`
  : "";



const userPromptSection = userPrompt
  ? `
--------------------------------
INDICATIONS UTILISATEUR (OPTIONNELLES)
--------------------------------
⚠️ Ces indications sont à RESPECTER UNIQUEMENT
SI ELLES NE CONTREDISENT PAS LES RÈGLES CI-DESSUS.

${userPrompt}
`
  : "";
    // ⚠️ PROMPT STRICT — NON MODIFIÉ
    const prompt = `
Tu es un animateur socioculturel professionnel en ACM.

MISSION :
Créer des FICHES D’ACTIVITÉS RÉALISTES, PÉDAGOGIQUES et PLAISANTES
EN RESPECTANT STRICTEMENT la famille d’activité imposée.

⚠️ RÈGLE ABSOLUE :
SI une activité ne correspond PAS à la famille demandée,
ELLE NE DOIT PAS ÊTRE PROPOSÉE.

--------------------------------
RÈGLES PAR FAMILLE D’ACTIVITÉ
--------------------------------

🟠 MANUELLE :
- Création, fabrication, dessin, bricolage, expression artistique, etc
- Utilisation logique du matériel
- Aucun effort physique intense

🟢 SPORTIF :
- Mouvement, course, lancer, sauter
- Dépense physique réelle
- Sécurité prioritaire

🔵 JEUX DE SOCIÉTÉ :
- Tours de rôle
- Coopération ou opposition
- Règles claires

--------------------------------
EXIGENCES DE DIVERSITÉ ET DE CRÉATIVITÉ
--------------------------------

⚠️ OBLIGATION DE VARIÉTÉ :
- Ne PAS proposer systématiquement des courses ou relais pour les activités sportives
- Ne PAS répéter le même type de mécanique de jeu

POUR LES ACTIVITÉS SPORTIVES, privilégier une diversité parmi :
- Jeux de poursuite avec règles évolutives
- Jeux d’adresse (lancer, précision, coordination)
- Jeux coopératifs physiques
- Jeux d’opposition douce
- Jeux à objectifs progressifs
- Jeux avec rôles (attaquant, défenseur, arbitre enfant)

POUR LES ACTIVITÉS MANUELLES, privilégier :
- Création avec intention (objet, décor, message)
- Choix possibles laissés aux enfants
- Résultat valorisable (exposition, jeu réutilisable)
- Expression personnelle ou collective

POUR LES JEUX DE SOCIÉTÉ :
- Jeux coopératifs OU compétitifs équilibrés
- Règles simples adaptées à l’âge
- Possibilité d’adaptation ou de variantes

--------------------------------
INTERDICTIONS FORMELLES
--------------------------------
- Aucun détournement absurde du matériel
- Aucune activité dangereuse
- Ne pas forcer 3 activités si non pertinent
- Ne pas proposer une simple course ou relais
  SAUF si elle est intégrée dans une mécanique de jeu plus large
  - Ne pas proposer un simple match de football
  SAUF si elle est intégrée dans une mécanique de jeu plus large



--------------------------------
ADAPTATION ÂGE
--------------------------------
- Maternelle (3–5 ans)
- Primaire (6–11 ans)

--------------------------------
CONTEXTE
--------------------------------
- Groupe : ${group}
- Nombre d’enfants : ${children}
- Durée : ${duration} minutes
- Famille d’activité : ${family}
- Thème (optionnel) : ${theme || "Libre"}

--------------------------------
MATÉRIEL DISPONIBLE
--------------------------------
${materialText}
${userPromptSection}
--------------------------------
EXIGENCE DE QUALITÉ
--------------------------------
Chaque activité proposée doit être :
- Différente dans sa mécanique principale
- Justifiable pédagogiquement
- Réellement intéressante à animer sur le terrain

--------------------------------
HISTORIQUE DES ACTIVITÉS DÉJÀ PROPOSÉES
--------------------------------
Les mécaniques suivantes ont été fréquemment utilisées récemment :

- Course / relais (très fréquent)
- Parcours chronométré
- Poursuite simple

⚠️ PRIORITÉ :
Éviter ces mécaniques si d’autres options pertinentes existent.
${memorySection}


--------------------------------
FORMAT STRICT — JSON UNIQUEMENT
--------------------------------

{
  "activities": [
    {
      "title": "",
      "family": "",
      "description": "",
      "objectives": [],
      "materials": "",
      "steps": [
        { "title": "", "content": "" }
      ],
      "variants": [],
      "vigilance": ""
    }
  ]
}
  
`;


    // ⏳ délai volontaire (UX front)
    await new Promise(resolve => setTimeout(resolve, 6000));

    const response = await fetch(process.env.GROQ_API_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.8
      })
    });

    const data = await response.json();

    console.log("RÉPONSE GROQ BRUTE :", JSON.stringify(data, null, 2));

    if (
      !data?.choices?.[0]?.message?.content
    ) {
      return res.status(500).json({
        error: "Réponse IA invalide",
        raw: data
      });
    }

    // 🧹 EXTRACTION JSON ROBUSTE
    const rawContent = data.choices[0].message.content;
    const jsonMatch = rawContent.match(/\{[\s\S]*\}/);

    if (!jsonMatch) {
      return res.status(500).json({
        error: "JSON introuvable dans la réponse IA",
        raw: rawContent
      });
    }

    let parsed;
    try {
      parsed = JSON.parse(jsonMatch[0]);
    } catch (e) {
      return res.status(500).json({
        error: "JSON invalide",
        raw: jsonMatch[0]
      });
    }

    if (!Array.isArray(parsed.activities)) {
      return res.status(500).json({
        error: "Structure activities invalide",
        parsed
      });
    }

    // 🧠 NORMALISATION POUR LE FRONT & LA BDD
   const activities = parsed.activities.map(a => {
  const mechanic = detectMechanic(a);

  return {
    title: a.title,
    family,
    group,
    children,
    duration,
    theme: theme || null,
    mechanic, // ✅ AJOUT ICI
    description: a.description,
    objectives: a.objectives,
    materials: Array.isArray(a.materials)
  ? a.materials
  : a.materials
  ? [a.materials]
  : [],

    steps: a.steps,
    variants: a.variants,
    vigilance: a.vigilance
  };
});



    res.json({ activities });

  } catch (err) {
    console.error("Erreur IA :", err);
    res.status(500).json({ error: "Erreur lors de la génération IA" });
  }
}

import Activity from "../models/Activity.js";

export async function saveActivity(req, res) {
  try {
    const activity = req.body;

    const saved = await Activity.create({
      ...activity,

      // 🔒 CENTRE AUTOMATIQUE
      center: req.user.center,

      createdBy: req.user.id
    });

    res.json(saved);
  } catch (err) {
    console.error("Erreur save IA :", err);
    res.status(500).json({ error: "Erreur sauvegarde activité IA" });
  }
}
