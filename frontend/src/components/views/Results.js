import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import axios from "axios";

function Results() {
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
      name: "Name",
      sortable: true,
      cell: (row) => (
        <div>
          {row.firstName} {row.lastName}
        </div>
      ),
    },
    {
      name: "Address",
      cell: (row) => (
        <div>
          {row.address}, {row.city}, {row.country}, {row.postalCode}
        </div>
      ),
    },
    {
      name: "Phone",
      cell: (row) => <div>{row.phone}</div>,
      sortable: true,
    },
    {
      name: "Connect",
      cell: (row) => (
        <button
          onClick={onRowClicked}
          value={row._id}
          className="btn btn-primary m-2"
        >
          Connect
        </button>
      ),
    },
  ];

  const onRowClicked = (e) => {
    e.preventDefault();
    console.log("row", e.target.value);
  };

  return (
    <DataTable
      //   onRowClicked={onRowClicked}
      columns={columns}
      data={myArray}
      highlightOnHover
    />
  );
}

export default Results;
