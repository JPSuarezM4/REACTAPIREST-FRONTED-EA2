import React from 'react'







export default function ModalInventario({
    title,
    closeModal,
    handleChange,
    Inventario,
    loadingSave,
    saveInventario
}) {


  return (
    <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h1 className="modal-title fs-5" id="exampleModalLabel">Nuevo {title}</h1>
          <button 
            type="button" 
            className="btn-close" 
            data-bs-dismiss="modal" 
            aria-label="Close"
            onClick={closeModal}
          >
          </button>
        </div>
        <div className="modal-body">
          <form>
            <div className="mb-3">
              <label htmlFor="recipient-name" 
              className="col-form-label">
                Serial:
              </label>
              <input 
                type="text" 
                className="form-control" 
                id="recipient-name"
                name="serial"
                onChange={handleChange}
                value={Inventario.serial}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="recipient-name" 
              className="col-form-label">
                Modelo:
              </label>
              <input 
                type="text" 
                className="form-control" 
                id="recipient-name"
                name="modelo"
                onChange={handleChange}
                value={Inventario.modelo}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="recipient-name" 
              className="col-form-label">
                Descripcion:
              </label>
              <input 
                type="text" 
                className="form-control" 
                id="recipient-name"
                name="descripcion"
                onChange={handleChange}
                value={Inventario.descripcion}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="recipient-name" 
              className="col-form-label">
                Foto:
              </label>
              <input 
                type="text" 
                className="form-control" 
                id="recipient-name"
                name="foto"
                onChange={handleChange}
                value={Inventario.foto}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="recipient-name" 
              className="col-form-label">
                Color:
              </label>
              <input 
                type="text" 
                className="form-control" 
                id="recipient-name"
                name="color"
                onChange={handleChange}
                value={Inventario.color}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="recipient-name" 
              className="col-form-label">
                Fecha Comp.:
              </label>
              <input 
                type="text" 
                className="form-control" 
                id="recipient-name"
                name="fechaCompra"
                onChange={handleChange}
                value={Inventario.fechaCompra}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="recipient-name" 
              className="col-form-label">
                Precio:
              </label>
              <input 
                type="text" 
                className="form-control" 
                id="recipient-name"
                name="precio"
                onChange={handleChange}
                value={Inventario.precio}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="recipient-name" 
              className="col-form-label">
                usuario:
              </label>
              <input 
                type="text" 
                className="form-control" 
                id="recipient-name"
                name="usuario"
                onChange={handleChange}
                value={Inventario.usuario}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="recipient-name" 
              className="col-form-label">
                Marca:
              </label>
              <input 
                type="text" 
                className="form-control" 
                id="recipient-name"
                name="marca"
                onChange={handleChange}
                value={Inventario.marca}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="recipient-name" 
              className="col-form-label">
                Est. Eq.:
              </label>
              <input 
                type="text" 
                className="form-control" 
                id="recipient-name"
                name="estadoEquipo"
                onChange={handleChange}
                value={Inventario.estadoEquipo}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="recipient-name" 
              className="col-form-label">
                Tipo Eq.:
              </label>
              <input 
                type="text" 
                className="form-control" 
                id="recipient-name"
                name="tipoEquipo"
                onChange={handleChange}
                value={Inventario.tipoEquipo}
              />
            </div>
          </form>
        </div>
        <div className="modal-footer">
          <button 
            type="button" 
            className="btn btn-secondary" 
            data-bs-dismiss="modal"
            onClick={closeModal}
          >
            Cerrar
          </button>
          {
            loadingSave 
            ? 
            (
            <button 
              className="btn btn-primary" 
              type="button" disabled
            >
              <span 
                className="spinner-grow spinner-grow-sm" 
                role="status" 
                aria-hidden="true"
              >
              </span>
                Guardando...
            </button>
            ) : 
            (
            <button 
              type="button" 
              className="btn btn-primary"
              onClick={saveInventario}
              disabled={Inventario.serial.length === 0}
            >
            Enviar
            </button>
            )
          }
        </div>
      </div>
    </div>
  </div>
  )
}
