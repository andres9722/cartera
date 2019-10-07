import React, { useEffect, useState } from "react";
import "./Cobros.scss";
import firebase from "firebase/app";
import "firebase/firestore";
import "react-toastify/dist/ReactToastify.css";
import TimeAgo from "react-timeago";
import Header from "../organisms/Header";
import Page from "../pages/Page";

const Cobros = ({ location: { query } }) => {
  const [cobros, setCobros] = useState([]);

  const database = firebase.firestore();
  const settings = { timestampsInSnapshots: true };
  database.settings(settings);

  useEffect(() => {
    database
      .collection("cobros")
      .orderBy("date", "desc")
      .onSnapshot(querySnapshot => {
        let arr = [];
        querySnapshot.forEach(doc => {
          arr.push({ ...doc.data(), id: doc.id });
          setCobros(arr);
        });
      });
  }, []);

  return (
    <React.Fragment>
      <Header />
      <Page>
        <div className="cobro">
          <h3>Listado de cobros</h3>
          <table className="table">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Email</th>
                <th>Teléfono</th>
                <th>Abogado</th>
                <th>Fecha</th>
              </tr>
            </thead>
            <tbody>
              {cobros &&
                cobros.map(cobro => {
                  return (
                    <tr>
                      <td>{cobro.name}</td>
                      <td>{cobro.email}</td>
                      <td>{cobro.phone}</td>
                      <td>{cobro.lawyer}</td>
                      <td>
                        <TimeAgo date={cobro.date} />
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </Page>
    </React.Fragment>
  );
};

export default Cobros;
