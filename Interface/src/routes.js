import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Admin from './pages/Admin'
import Teste from './pages/Teste'

export default function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Admin />}/>
        <Route path='/teste' element={<Teste />}/>
      </Routes>
    </Router>
  )
}