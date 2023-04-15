import dayjs from 'dayjs'
import React, { useEffect, useState } from 'react'
import { createInventario, getInventarios } from '../services/InventariosService.jsx'
import ModalInventario from './ui/ModalInventario'


export default function TipoEquipos() {
const title= 'Inventarios'
const [Inventarios, setInventarios] = useState([])
const [query] = useState(true)
const [loading, setLoading] = useState(true)
const [error, setError]= useState(false)
const [Inventario, setInventario] = useState({
  serial: ''
})


const [loadingSave, setLoadingSave] = useState(false)

const [id, setId] = useState('')

const listInventarios = async () => {
  try{
    setError(false)
    setLoading(true)
    const { data } = await getInventarios(query)
    console.log(data)
    setInventarios(data)
    
    setTimeout(() => {
      setLoading(false)
    }, 500)
    
  }catch(e){
    console.log(e)
    setError(true)
    setLoading(false)
  }
}

useEffect(() => {
  listInventarios()
}, [query])



const handleChange = (e) => {
  setInventario({
    ...Inventario,
    [e.target.name]: e.target.value
  })
}

const saveInventario = async () => {
  try{
    setError(false)
    setLoadingSave(true)
    const response = await createInventario(Inventario)
    console.log(response)
    setInventario({serial: ''})
    listInventarios()
    setTimeout(() => {
      setLoadingSave(false)
    }, 500)
  }catch(e){
    console.log(e)
    setError(true)
    setLoadingSave(false)
  }
}

const closeModal = () => {
  setInventario({serial: ''})
  if(id)setId('')
}



  return (
    <>

        <ModalInventario 
          title={title}
          closeModal={closeModal}
          handleChange={handleChange}
          Inventario={Inventario}
          loadingSave={loadingSave}
          saveInventario={saveInventario}
        />
        <button 
          type="button" 
          className="btn btn-outline-primary"
          data-bs-toggle="modal" 
          data-bs-target="#exampleModal" 
          data-bs-whatever="@mdo"
        >
          Agregar
        </button>
        {
          error && 
          (
            <div className="alert alert-danger" role="alert">
              Ha ocurrido un error
            </div>
          )
        }
        
        <div className='table-responsive'>
          {
            loading 
            ? (
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            )
            :
            (
              <table className="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Serial</th>
                  <th scope="col">Modelo</th>
                  <th scope="col">descripcion</th>
                  <th scope="col">Foto</th>
                  <th scope="col">Color</th>
                  <th scope="col">Fecha compra</th>
                  <th scope="col">Precio</th>
                  <th scope="col">Usuario</th>
                  <th scope="col">Marca</th>
                  <th scope="col">Estado Eq.</th>
                  <th scope="col">Tipo Eq.</th>
                  <th scope="col">Fecha creac.</th>
                  <th scope="col">Fecha act.</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {
                  Inventarios.map((Inventario, index) => {
                    return (
                      <tr key={Inventario._id}>
                        <th scope="row">{index + 1}</th>
                        <td>{Inventario.serial}</td>
                        <td>{Inventario.modelo}</td>
                        <td>{Inventario.descripcion}</td>
                        <td>{Inventario.foto}</td>
                        <td>{Inventario.color}</td>
                        <td>{dayjs(Inventario.fechaCompra).format('YYYY-MM-DD')}</td>
                        <td>{Inventario.precio}</td>
                        <td>{Inventario.usuario}</td>
                        <td>{Inventario.marca}</td>
                        <td>{Inventario.estadoEquipo}</td>
                        <td>{Inventario.tipoEquipo}</td>
                        <td>{dayjs(Inventario.fechaCreacion).format('YYYY-MM-DD')}</td>
                        <td>{dayjs(Inventario.fechaActualizacion).format('YYYY-MM-DD')}</td>
                      </tr>
                    )
                  })
                }
              </tbody>
              </table>
            )
          }
        </div>
    </>
  )
}