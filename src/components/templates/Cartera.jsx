import React, { useState } from "react";
import { OutTable, ExcelRenderer } from "react-excel-renderer";
import moment from "moment";
import "./Cartera.scss";
import Charts from "../organisms/Charts";
import UploadFile from "../molecules/UploadFile";

const Cartera = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [rows, setRows] = useState();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [cols, setCols] = useState();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [pieData, setPieData] = useState();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [barData, setBarData] = useState();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [phones, setPhones] = useState();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [clients, setClients] = useState();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [emails, setEmails] = useState();

  React.useEffect(() => {
    window.localStorage.setItem("rows", JSON.stringify(rows));
    window.localStorage.setItem("cols", JSON.stringify(cols));
  }, [rows, cols]);

  const generateColor = () => {
    return (
      "#" +
      Math.random()
        .toString(16)
        .substr(-6)
    );
  };

  const handleInputChange = e => {
    const fileObj = e.target.files[0];

    ExcelRenderer(fileObj, (err, resp) => {
      if (err) {
        console.log(err);
      } else {
        setRows(resp.rows);
        setCols(resp.cols);

        const dates = resp.rows.map(item => {
          const end = moment(item[9], "DD-MM-YYYY");
          const start = moment(item[10], "DD-MM-YYYY");

          const diff = moment.duration(start.diff(end)).asDays();

          if (diff * -1 >= 90) {
            return (90 + diff) * -1;
          } else {
            return 0;
          }
        });

        const clients = resp.rows.map(item => item[3]);
        const money = resp.rows.map(item => item[8]);
        const phones = resp.rows.map(item => item[6]);
        const emails = resp.rows.map(item => item[7]);

        const colors = [];

        for (let i = 0; i < clients.length; i += 1) {
          colors.push(generateColor());
        }

        clients.splice(0, 1);
        phones.splice(0, 1);
        money.splice(0, 1);
        dates.splice(0, 1);
        emails.splice(0, 1);

        const barData = {
          labels: clients,
          datasets: [
            {
              label: "Días de mora",
              backgroundColor: "rgba(255,99,132,0.2)",
              borderColor: "rgba(255,99,132,1)",
              borderWidth: 1,
              hoverBackgroundColor: "rgba(255,99,132,0.4)",
              hoverBorderColor: "rgba(255,99,132,1)",
              data: dates
            }
          ]
        };

        const pieData = {
          labels: clients,
          datasets: [
            {
              data: money,
              backgroundColor: colors
            }
          ]
        };

        setPieData(pieData);
        setBarData(barData);
        setPhones(phones);
        setClients(clients);
        setEmails(emails);
      }
    });
  };

  return (
    <div>
      <UploadFile handleInputChange={handleInputChange}></UploadFile>
      {rows && cols && (
        <OutTable
          data={rows}
          columns={cols}
          tableClassName="table"
          tableHeaderRowClass="heading"
        />
      )}
      {pieData && barData && (
        <Charts
          phones={phones}
          clients={clients}
          pieData={pieData}
          barData={barData}
          emails={emails}
        ></Charts>
      )}
    </div>
  );
};

export default Cartera;
