import React from "react";
import { Link } from "react-router-dom";
import "./Modal.scss";

const Modal = ({ handleCloseModal, model }) => {
  return (
    <div className="modal">
      <div className="modal-container">
        <button onClick={handleCloseModal} className="modal-close">
          X
        </button>
        <h2>Acciones recomendadas</h2>
        <p>Nombre del cliente: {model.name}</p>

        <div className="option">
          <b>Llamar al: </b> <span>{model.phone}</span>
        </div>

        <div className="option">
          <b>Enviar correo a:</b> <span>{model.email}</span>
        </div>

        <Link
          to={{
            pathname: `/cobro`,
            query: model
          }}
        >
          Cobro juridico
        </Link>
      </div>
    </div>
  );
};

export default Modal;
