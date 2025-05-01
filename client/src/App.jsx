import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import JobListings from './pages/JobListings'

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<JobListings />} />
          {/* Add more routes here if needed */}
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}