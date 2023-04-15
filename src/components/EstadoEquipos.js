import dayjs from 'dayjs'
import React, { useEffect, useState } from 'react'
import { createEstadoEquipo, getEstadoEquipos, editarEstadoEquipo } from '../services/EstadosService'
import ModalEstado from './ui/ModalEstado'
import ModalEstadoEdit from './ui/ModalEstadoEdit'

export default function EstadoEquipos() {
const title= 'Estado de equipo'
const [estadoEquipos, setEstadoEquipos] = useState([])
const [query, setQuery] = useState(true)
const [loading, setLoading] = useState(true)
const [error, setError]= useState(false)
const [estadoEquipo, setEstadoEquipo] = useState({
  nombre: ''
})
const [loadingSave, setLoadingSave] = useState(false)

const [id, setId] = useState('')

const listEstadoEquipos = async () => {
  try{
    setError(false)
    setLoading(true)
    const { data } = await getEstadoEquipos(query)
    console.log(data)
    setEstadoEquipos(data)
    
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
  listEstadoEquipos()
}, [query])

const changeSwitch = () => {
  setQuery(!query)
}

const handleChange = (e) => {
  setEstadoEquipo({
    ...estadoEquipo,
    [e.target.name]: e.target.value
  })
}

const saveEstadoEquipo = async () => {
  try{
    setError(false)
    setLoadingSave(true)
    const response = await createEstadoEquipo(estadoEquipo)
    console.log(response)
    setEstadoEquipo({nombre: ''})
    listEstadoEquipos()
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
  setEstadoEquipo({nombre: ''})
  if(id)setId('')
}

const selectEstadoEquipo = (evt) => {
  evt.preventDefault()
  setId(evt.target.id)
  const tEq = estadoEquipos.filter(estadoEquipo => estadoEquipo._id === evt.target.id)
  setEstadoEquipo({...tEq[0]})
}

const editEstadoEquipo = async () => {
  try{
    setError(false)
    setLoadingSave(true)
    const response = await editarEstadoEquipo(id, estadoEquipo)
    console.log(response)
    setEstadoEquipo({nombre: ''})
    listEstadoEquipos()
    setTimeout(() => {
      setLoadingSave(false)
    }, 500)
  }catch(e){
    console.log(e)
    setError(true)
    setLoadingSave(false)
  }
}

  return (
    <>
        <ModalEstadoEdit 
          title={title}
          closeModal={closeModal}
          handleChange={handleChange}
          estadoEquipo={estadoEquipo}
          loadingSave={loadingSave}
          editEstadoEquipo={editEstadoEquipo}
        />
        <ModalEstado 
          title={title}
          closeModal={closeModal}
          handleChange={handleChange}
          estadoEquipo={estadoEquipo}
          loadingSave={loadingSave}
          saveEstadoEquipo={saveEstadoEquipo}
        />
        <div className="form-check form-switch">
          <input 
            className="form-check-input" 
            type="checkbox" 
            role="switch" 
            id="flexSwitchCheckChecked"
            checked={query}
            onChange={changeSwitch}
          />
          <label 
            className="form-check-label" 
            htmlFor="flexSwitchCheckChecked"
          >
            Activos
          </label>
        </div>
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
                  <th scope="col">Nombre</th>
                  <th scope="col">Estado</th>
                  <th scope="col">Fecha creac.</th>
                  <th scope="col">Fecha act.</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {
                  estadoEquipos.map((estadoEquipo, index) => {
                    return (
                      <tr key={estadoEquipo._id}>
                        <th scope="row">{index + 1}</th>
                        <td>{estadoEquipo.nombre}</td>
                        <td>{estadoEquipo.estado ? 'Activo' : 'Inactivo'}</td>
                        <td>{dayjs(estadoEquipo.fechaCreacion).format('YYYY-MM-DD')}</td>
                        <td>{dayjs(estadoEquipo.fechaActualizacion).format('YYYY-MM-DD')}</td>
                        <td>
                          <button 
                            onClick={selectEstadoEquipo}
                            type="button" 
                            className="btn btn-success"
                            data-bs-toggle="modal" 
                            data-bs-target="#exampleModalEdit" 
                            id={estadoEquipo._id}
                          >
                            Editar
                          </button>
                        </td>
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