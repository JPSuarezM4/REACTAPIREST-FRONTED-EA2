import { axiosConfig } from "../configuration/axiosConfig";

// obtener los tipos de equipos
const getMarcas = (estado) => {
    return axiosConfig.get('marcas?estado='+estado, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
}


// crear tipo equipo
const createMarca = (data = {}) => {
    return axiosConfig.post('marcas', data, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

const editarMarca = (tipoId, data) => {
  return axiosConfig.put(`marcas/${tipoId}`, data, {
   headers: {
      'Content-type': 'application/json'
   }
  });
}

// opcional
const borrarMarca = (tipoId) => {
  return axiosConfig.delete(`marcas/${tipoId}`, {}, {
   headers: {
      'Content-type': 'application/json'
   }
  });
}


export {
    getMarcas,
    createMarca,
    editarMarca,
    borrarMarca
}