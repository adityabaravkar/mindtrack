import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import axios from "axios";

function PatientDashboard() {
  const [myArray, updateMyArray] = useState([]);

  useEffect(() => {
    document.title = "Result";
    axios.get(`http://localhost:9000/getDoctors`).then((res) => {
      const result = res.data;
      updateMyArray(result);
    });
  }, []);

  const columns = [
    {
      name: "Test Date",
      sortable: true,
      cell: (row) => <div>{row.testDate}</div>,
    },
    {
      name: "Test Score",
      cell: (row) => <div>{row.score}</div>,
    },
    {
      name: "Prescription",
      cell: (row) => <div>{row.prescription}</div>,
      sortable: true,
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

export default PatientDashboard;
