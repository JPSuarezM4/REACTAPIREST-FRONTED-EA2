import React from 'react'
import { Route, Routes } from 'react-router-dom'
import TipoEquipos from '../components/TipoEquipos'
import EstadoEquipos from '../components/EstadoEquipos'
import Footer from '../components/ui/Footer'
import NavBar from '../components/ui/NavBar'
import Marcas from '../components/Marcas'
import Inventario from '../components/Inventario'
import NotFound from '../components/ui/NotFound'
import Usuarios from '../components/Usuarios'

export default function AppRouters() {
 
  return (
    <div>
        <NavBar />
        <div className='container'>
            <Routes>
                <Route path='/' element={<TipoEquipos />} />
                <Route path='/estadoequipos' element={<EstadoEquipos />} />
                <Route path='/usuarios' element={<Usuarios />} />
                <Route path='/marcas' element={<Marcas />} />
                <Route path='/inventario' element={<Inventario />} />
                <Route path='*' element={<NotFound />} />
            </Routes>
        </div>
        <Footer />
    </div>
  )
}