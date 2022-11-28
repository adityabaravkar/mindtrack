import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import axios from "axios";
import { Authentication } from "../../services/authentication";
import { Link } from "react-router-dom";
import { config } from "../../config";

function PatientDashboard() {
  const [myArray, updateMyArray] = useState([]);

  useEffect(() => {
    document.title = "Result";
    const userId = Authentication.userId;
    axios.get(`${config.backendURL}/getResults/${userId}`).then((res) => {
      const result = res.data;
      // console.log(result);
      // const dat = result.filter((d) => d.dt);
      // console.log("dt ", dat);
      updateMyArray(result);
    });
  }, []);

  const columns = [
    {
      name: "Test Date",
      sortable: true,
      cell: (row) => <div>{row.dt}</div>,
    },
    {
      name: "Test Score",
      cell: (row) => <div>{row.score}</div>,
    },
  ];

  if (myArray.length === 0) {
    return (
      <div>
        <DataTable className="mt-3" pagination highlightOnHover />
        <div class="col-md-12 text-center">
          <Link to="/patient/questionnaire/" className="btn btn-success mt-3">
            Take Quiz
          </Link>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <h1 className="mt-0 mb-3 ">Test Records</h1>
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

export default PatientDashboard;
