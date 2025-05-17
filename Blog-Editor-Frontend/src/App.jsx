import { Route, Routes } from 'react-router-dom'
import './App.css'
import BlogList from './Components/BlogList'
import BlogEditor from './Components/BlogEditor'
import LandingPage from './Components/LandingPage'

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/blogs" element={<BlogList />} />
        <Route path="/new" element={<BlogEditor />} />
        <Route path="/edit/:id" element={<BlogEditor />} />
      </Routes>
    </>
  )
}

export default App
