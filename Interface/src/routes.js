import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Teste from './pages/Teste'

export default function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/teste' element={<Teste />}/>
      </Routes>
    </Router>
  )
}