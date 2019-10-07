import React, { useEffect, useState } from "react";
import "./Cobro.scss";
import Button from "../atoms/Button";
import firebase from "firebase/app";
import "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TimeAgo from "react-timeago";
import Header from "../organisms/Header";
import Page from "../pages/Page";

const Cobro = ({ location: { query } }) => {
  const [cobros, setCobros] = useState([]);
  const [cobrosProfile, setCobrosProfile] = useState([]);

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
          putCobrosProfile(arr);
        });
      });
  }, []);

  const putCobrosProfile = arr => {
    const arrs = arr.filter(cobro => cobro.name === query.name);

    setCobrosProfile(arrs);
  };

  const handleSubmit = e => {
    e.preventDefault();

    const form = e.target;

    const data = {
      date: Date.now(),
      name: form.name.value,
      email: form.email.value,
      phone: form.phone.value,
      lawyer: form.lawyer.value
    };

    database
      .collection("cobros")
      .add(data)
      .then(docRef => {
        toast("Cobro guardado correctamente!", {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 2000
        });
      })
      .catch(() => {
        toast.error("Error guardando cobro!", {
          position: toast.POSITION.BOTTOM_RIGHT
        });
      });
    form.reset();
  };

  return (
    <React.Fragment>
      <Header />
      <Page>
        <form onSubmit={handleSubmit}>
          <h1>Proceso de cobro juridico</h1>
          <input
            type="text"
            name="name"
            id="name"
            defaultValue={query.name}
            disabled={true}
          />
          <input
            type="email"
            name="email"
            id="email"
            defaultValue={query.email}
            disabled={true}
          />
          <input
            type="phone"
            name="phone"
            id="phone"
            defaultValue={query.phone}
            disabled={true}
          />
          <input
            type="text"
            name="lawyer"
            id="lawyer"
            placeholder="Abogado"
            required
          />

          <Button type="submit" theme="login__button">
            Confirmar
          </Button>
        </form>

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
              {cobrosProfile &&
                cobrosProfile.map(cobro => {
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
        <ToastContainer />
      </Page>
    </React.Fragment>
  );
};

export default Cobro;
