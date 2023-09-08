import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home/produtos'
import Formulario from './pages/Home/formulario'

export default function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/formulario' element={<Formulario />}/>
      </Routes>
    </Router>
  )
}