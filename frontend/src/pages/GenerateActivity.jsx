import { useState } from "react"
import { Box, Heading, Input, Textarea, Button, VStack, Text } from "@chakra-ui/react"

export default function GenerateActivity() {
  const [materials, setMaterials] = useState("")
  const [age, setAge] = useState("")
  const [duration, setDuration] = useState("")
  const [context, setContext] = useState("")
  const [result, setResult] = useState(null)

  async function handleGenerate() {
    const res = await fetch("http://localhost:4000/api/ai/generate", {
      method: "POST",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify({
        materials: materials.split(",").map(x => x.trim()),
        age, duration, context
      })
    })
    setResult(await res.json())
  }

  return (
    <Box p={10}>
      <Heading mb={6}>Création IA</Heading>

      <VStack align="stretch">
        <Input placeholder="Matériel (ballons, plots...)" onChange={e => setMaterials(e.target.value)} />
        <Input placeholder="Âge (ex: 6-8)" onChange={e => setAge(e.target.value)} />
        <Input placeholder="Durée (min)" onChange={e => setDuration(e.target.value)} />
        <Textarea placeholder="Contexte (pluie, excité...)" onChange={e => setContext(e.target.value)} />

        <Button colorScheme="blue" onClick={handleGenerate}>Générer</Button>
      </VStack>

      {result && (
        <Box mt={6} p={6} bg="green.100" borderRadius="lg">
          <Text fontWeight="bold">{result.name}</Text>
          <Text mt={2}>{result.description}</Text>
        </Box>
      )}
    </Box>
  )
}
