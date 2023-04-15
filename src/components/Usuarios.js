import dayjs from 'dayjs'
import React, { useEffect, useState } from 'react'
import { createUsuario, getUsuarios, editarUsuario } from '../services/UsuariosService.jsx'
import ModalUsuario from './ui/ModalUsuario'
import ModalUsuarioEdit from './ui/ModalUsuarioEdit'

export default function TipoEquipos() {
const title= 'Usuarios'
const [Usuarios, setUsuarios] = useState([])
const [query, setQuery] = useState(true)
const [loading, setLoading] = useState(true)
const [error, setError]= useState(false)
const [Usuario, setUsuario] = useState({
  nombre: ''
})
const [loadingSave, setLoadingSave] = useState(false)

const [id, setId] = useState('')

const listUsuarios = async () => {
  try{
    setError(false)
    setLoading(true)
    const { data } = await getUsuarios(query)
    console.log(data)
    setUsuarios(data)
    
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
  listUsuarios()
}, [query])

const changeSwitch = () => {
  setQuery(!query)
}

const handleChange = (e) => {
  setUsuario({
    ...Usuario,
    [e.target.name]: e.target.value
  })
}

const saveUsuario = async () => {
  try{
    setError(false)
    setLoadingSave(true)
    const response = await createUsuario(Usuario)
    console.log(response)
    setUsuario({nombre: ''})
    listUsuarios()
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
  setUsuario({nombre: ''})
  if(id)setId('')
}

const selectUsuario = (evt) => {
  evt.preventDefault()
  setId(evt.target.id)
  const tEq = Usuarios.filter(Usuario => Usuario._id === evt.target.id)
  setUsuario({...tEq[0]})
}

const editUsuario = async () => {
  try{
    setError(false)
    setLoadingSave(true)
    const response = await editarUsuario(id, Usuario)
    console.log(response)
    setUsuario({nombre: ''})
    listUsuarios()
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
        <ModalUsuarioEdit 
          title={title}
          closeModal={closeModal}
          handleChange={handleChange}
          Usuario={Usuario}
          loadingSave={loadingSave}
          editUsuario={editUsuario}
        />
        <ModalUsuario 
          title={title}
          closeModal={closeModal}
          handleChange={handleChange}
          Usuario={Usuario}
          loadingSave={loadingSave}
          saveUsuario={saveUsuario}
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
                  <th scope="col">Email</th>
                  <th scope="col">Estado</th>
                  <th scope="col">Fecha creac.</th>
                  <th scope="col">Fecha act.</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {
                  Usuarios.map((Usuario, index) => {
                    return (
                      <tr key={Usuario._id}>
                        <th scope="row">{index + 1}</th>
                        <td>{Usuario.nombre}</td>
                        <td>{Usuario.email}</td>
                        <td>{Usuario.estado ? 'Activo' : 'Inactivo'}</td>
                        <td>{dayjs(Usuario.fechaCreacion).format('YYYY-MM-DD')}</td>
                        <td>{dayjs(Usuario.fechaActualizacion).format('YYYY-MM-DD')}</td>
                        <td>
                          <button 
                            onClick={selectUsuario}
                            type="button" 
                            className="btn btn-success"
                            data-bs-toggle="modal" 
                            data-bs-target="#exampleModalEdit" 
                            id={Usuario._id}
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