import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { Authentication } from "../../services/authentication";
import axios from "axios";
import { config } from "../../config";

function Dashboard() {
  const [myArray, updateMyArray] = useState([]);

  useEffect(() => {
    document.title = "Dashboard";
    const id = Authentication.userId;
    axios
      .get(`${config.backendURL}/myPatients`, {
        params: {
          id: id,
        },
      })
      .then((res) => {
        const result = res.data;
        console.log(result);
        updateMyArray(result);
      });
  }, []);

  const columns = [
    {
      name: "Patient Name",
      sortable: true,
      cell: (row) => <div>{row.Pname}</div>,
    },
    {
      name: "Score",
      sortable: true,
      cell: (row) => <div>{row.Score}</div>,
    },
  ];

  if (myArray.length === 0) {
    return (
      <div>
        <DataTable className="mt-3" pagination highlightOnHover />
      </div>
    );
  } else {
    return (
      <div>
        <h1 className="mt-0 mb-3 ">Patient Detials</h1>
        <DataTable
          columns={columns}
          pagination
          data={myArray}
          highlightOnHover
        />
      </div>
    );
  }
}

export default Dashboard;
