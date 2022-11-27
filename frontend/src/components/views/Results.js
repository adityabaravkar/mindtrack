import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import axios from "axios";
import { toast } from "react-toastify";

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
          data-msg={row.firstName + " " + row.lastName}
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
    toast.success("Connected to Dr. " + e.target.dataset.msg, {
      position: toast.POSITION.TOP_CENTER,
    });
  };

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

export default Results;
