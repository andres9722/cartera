import React, { useState } from "react";
import StarRatings from "react-star-ratings";
import firebase from "firebase/app";
import "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TimeAgo from "react-timeago";

import Button from "../atoms/Button";
import Page from "./Page";
import "./Comments.scss";

const Comments = () => {
  const [rating, setRating] = useState(0);
  const [comments, setComments] = useState([]);

  const database = firebase.firestore();
  const settings = { timestampsInSnapshots: true };
  database.settings(settings);

  React.useEffect(() => {
    database
      .collection("comments")
      .orderBy("date", "desc")
      .onSnapshot(querySnapshot => {
        let arr = [];
        querySnapshot.forEach(doc => {
          arr.push({ ...doc.data(), id: doc.id });
          setComments(arr);
        });
      });
  }, []);

  const handleSubmit = e => {
    e.preventDefault();
    const form = e.target;

    const data = {
      name: form.name.value,
      email: form.email.value,
      comment: form.comment.value,
      rating,
      date: Date.now()
    };

    database
      .collection("comments")
      .add(data)
      .then(docRef => {
        toast("comentario guardado correctamente!", {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 2000
        });
      })
      .catch(() => {
        toast.error("Error guardando comentario!", {
          position: toast.POSITION.BOTTOM_RIGHT
        });
      });

    form.reset();
    setRating(0);
  };

  const handleChangeRating = newRating => {
    setRating(newRating);
  };

  console.log(comments);

  return (
    <React.Fragment>
      <Page>
        <form onSubmit={handleSubmit}>
          <h1>Agregar comentario</h1>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Nombre"
            required
          />
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Correo"
            required
          />
          <textarea
            type="comment"
            name="comment"
            id="comment"
            placeholder="Comentario"
            required
          />
          <div className="stars">
            <StarRatings
              rating={rating}
              starRatedColor="#ff1f5a"
              starHoverColor="#ff1f5a"
              changeRating={handleChangeRating}
              numberOfStars={5}
              name="rating"
              starDimension="40px"
              starSpacing="5px"
            />
          </div>
          <Button type="submit" theme="login__button">
            Enviar
          </Button>
        </form>
        <ul className="comments">
          {comments &&
            comments.map(comment => (
              <li className="comments-item">
                <TimeAgo date={comment.date} />
                <h3>{comment.name} </h3>
                <h5>{comment.email} </h5>
                <p>Comentario: {comment.comment} </p>
                <StarRatings
                  rating={rating}
                  starRatedColor="#ff1f5a"
                  starHoverColor="#ff1f5a"
                  starEmptyColor="#ff1f5a"
                  numberOfStars={comment.rating}
                  name="rating"
                  starDimension="20px"
                  starSpacing="2px"
                />
              </li>
            ))}
        </ul>
        <ToastContainer />
      </Page>
    </React.Fragment>
  );
};

export default Comments;
