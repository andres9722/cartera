import React, { Fragment, useContext } from "react";
import { AuthContext as Context } from "../../providers/AuthProvider";
import Page from "./Page";
import Header from "../organisms/Header";
import ProfileInfo from "../organisms/ProfileInfo";
import Cartera from "../templates/Cartera";
import "./Dashboard.scss";

const Dashboard = () => {
  const { user } = useContext(Context);

  return (
    <Fragment>
      <Header />
      <Page>
        <div className="dashboard">
          <div className="dashboard-profile">
            <ProfileInfo {...user} />
          </div>
          <Cartera />
        </div>
      </Page>
    </Fragment>
  );
};

export default Dashboard;
