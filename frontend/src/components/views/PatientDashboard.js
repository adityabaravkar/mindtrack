import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import axios from "axios";
import { Authentication } from "../../services/authentication";
import { Link } from "react-router-dom";

function PatientDashboard() {
  const [myArray, updateMyArray] = useState([]);

  useEffect(() => {
    document.title = "Result";
    const userId = Authentication.userId;
    axios.get(`http://localhost:9000/getResults/${userId}`).then((res) => {
      const result = res.data;
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
      <DataTable columns={columns} pagination data={myArray} highlightOnHover />
    );
  }
}

export default PatientDashboard;
