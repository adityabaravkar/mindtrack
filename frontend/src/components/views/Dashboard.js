import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { Authentication } from "../../services/authentication";
import axios from "axios";

function Dashboard() {
  const [myArray, updateMyArray] = useState([]);

  useEffect(() => {
    document.title = "Dashboard";
    const id = Authentication.userId;
    axios
      .get(`http://localhost:9000/myPatients`, {
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
      name: "Prescription",
      sortable: true,
      cell: (row) => <div>{row.Prescription}</div>,
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
      <DataTable columns={columns} pagination data={myArray} highlightOnHover />
    );
  }
}

export default Dashboard;
