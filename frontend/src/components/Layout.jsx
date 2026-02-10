export default function Layout({ children }) {
  return (
    <div className="flex h-screen">
      <aside className="w-64 bg-white border-r p-4 space-y-3">
        <h1 className="text-xl font-semibold mb-4">Acti-IA</h1>

        <nav className="space-y-2">
          <a href="/" className="block hover:bg-gray-100 rounded px-2 py-1">Centres</a>
          <a href="/materiel" className="block hover:bg-gray-100 rounded px-2 py-1">Matériel</a>
          <a href="/ia" className="block hover:bg-gray-100 rounded px-2 py-1">Créer avec IA</a>
          <a href="/planning-acm" className="block hover:bg-gray-100 rounded px-2 py-1">Planning ACM</a>
          <a href="/planning-vacances" className="block hover:bg-gray-100 rounded px-2 py-1">Planning Vacances</a>
          <a href="/pdf" className="block hover:bg-gray-100 rounded px-2 py-1">Exporter PDF</a>
        </nav>
      </aside>

      <main className="flex-1 p-6 overflow-y-auto">
        {children}
      </main>
    </div>
  )
}
