import { axiosConfig } from "../configuration/axiosConfig";

// obtener los tipos de equipos
const getEstadoEquipos = (estado) => {
    return axiosConfig.get('estadoequipos?estado='+estado, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
}


// crear tipo equipo
const createEstadoEquipo = (data = {}) => {
    return axiosConfig.post('estadoequipos', data, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

const editarEstadoEquipo = (tipoId, data) => {
  return axiosConfig.put(`estadoequipos/${tipoId}`, data, {
   headers: {
      'Content-type': 'application/json'
   }
  });
}

// opcional
const borrarEstadoEquipo = (tipoId) => {
  return axiosConfig.delete(`tipoequipos/${tipoId}`, {}, {
   headers: {
      'Content-type': 'application/json'
   }
  });
}


export {
    getEstadoEquipos,
    createEstadoEquipo,
    editarEstadoEquipo,
    borrarEstadoEquipo
}