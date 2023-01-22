import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { jwtApiCall } from "../../config";

function Dashboard() {
  const [myArray, updateMyArray] = useState([]);

  useEffect(() => {
    document.title = "Dashboard";
    jwtApiCall.get(`/myPatients`).then((res) => {
      const result = res.data;
      updateMyArray(result);
    });
  }, []);

  const columns = [
    {
      name: "Patient Name",
      cell: (row) => <div>{row.pname}</div>,
    },
    {
      name: "Susceptibility Score",
      cell: (row) => <div>{row.score}</div>,
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
