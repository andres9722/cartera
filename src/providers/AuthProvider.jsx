import React, { Component, createContext } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import { login, signOut } from "../config";

export const AuthContext = createContext({});

export class AuthProvider extends Component {
  state = {
    auth: false,
    user: null,
    error: null,
    loading: false
  };

  componentDidMount() {
    this.setState({ loading: true });

    this.removeListener = firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({
          auth: true,
          loading: false,
          user: user
        });
      } else {
        this.setState({ loading: false });
      }
    });
  }

  componentWillUnmount() {
    this.removeListener();
  }

  onLogin = data => {
    // this.setState({ loading: true });

    login(data)
      .then(() => {
        this.setState({ loading: false, auth: true });
      })
      .catch(error => {
        this.setState({ loading: false, error: error });
      });
  };

  onSignOut = () => {
    signOut()
      .then(() => {
        this.setState({ auth: false, user: null });
      })
      .catch(error => {
        this.setState({ error });
      });
  };

  render() {
    return (
      <AuthContext.Provider
        value={{
          ...this.state,
          onLogin: this.onLogin,
          onSignOut: this.onSignOut
        }}
      >
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}

export const AuthConsumer = AuthContext.Consumer;
