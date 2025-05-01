export default function Layout({ children }) {
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm">
          <div className="container mx-auto px-4 py-4">
            <h1 className="text-2xl font-bold text-blue-600">Mployee.me</h1>
          </div>
        </header>
        
        <main className="container mx-auto px-4 py-8">{children}</main>
        
        <footer className="bg-gray-100 py-6">
          <div className="container mx-auto px-4 text-center text-gray-600">
            <p>© {new Date().getFullYear()} Padhakku Peek a Book Private Limited</p>
          </div>
        </footer>
      </div>
    )
  }