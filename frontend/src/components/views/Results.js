import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import axios from "axios";
import { toast } from "react-toastify";
import { Authentication } from "../../services/authentication";
import { useHistory } from "react-router-dom";

function Results() {
  const [myArray, updateMyArray] = useState([]);
  const [score, updateScore] = useState();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userId, setUserId] = useState();
  const history = useHistory();

  useEffect(() => {
    document.title = "Result";
    const userId = Authentication.userId;
    setUserId(userId);
    axios.get(`http://localhost:9000/getDoctors`).then((res) => {
      const result = res.data;
      updateMyArray(result);
    });
    axios.get(`http://localhost:9000/getResults/${userId}`).then((res) => {
      const result = res.data;
      updateScore(result[0].score);
    });
    axios.get(`http://localhost:9000/detail/${userId}`).then((res) => {
      const result = res.data;
      setFirstName(result.firstName);
      setLastName(result.lastName);
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
    const requestBody = {
      did: e.target.value,
      pid: userId,
      dname: e.target.dataset.msg,
      pname: firstName + " " + lastName,
      score: score,
    };
    axios
      .post("http://localhost:9000/connect", requestBody)
      .then((response) => {
        if (response.status === 200) {
          const result = response.data;
          console.log("success", result);
        }
      });
    toast.success("Connected to Dr. " + e.target.dataset.msg, {
      position: toast.POSITION.TOP_CENTER,
    });
    history.replace("/patient/dashboard");
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
