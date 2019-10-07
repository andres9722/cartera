import React, { useState } from "react";
import { Pie, HorizontalBar } from "react-chartjs-2";
import "./Charts.scss";
import Modal from "./Modal";

const Charts = React.memo(({ pieData, barData, phones, clients, emails }) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [show, setShow] = useState(false);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [model, setModel] = useState({});

  const handleElementClick = e => {
    if (!e[0]) {
      return null;
    }

    const model = e[0]._model;
    const name = model.label;

    if (!model) {
      return null;
    }

    const position = clients.findIndex(item => item === name);

    const info = {
      phone: phones[position],
      name,
      email: emails[position]
    };

    setShow(!show);
    setModel(info);
  };

  const handleCloseModal = e => {
    setShow(false);
  };

  return (
    <div className="pie">
      {pieData && (
        <div className="pie-chart">
          <h3 className="pie-title">
            Información relacionada a valor de deuda
          </h3>
          <Pie height={100} data={pieData} />
        </div>
      )}
      {barData && (
        <div className="pie-chart">
          <h3 className="pie-title">
            Información relacionada con los días de mora
          </h3>
          <HorizontalBar
            onElementsClick={handleElementClick}
            height={100}
            data={barData}
          />
        </div>
      )}
      {show && (
        <Modal model={model} handleCloseModal={handleCloseModal}></Modal>
      )}
    </div>
  );
});

export default Charts;
