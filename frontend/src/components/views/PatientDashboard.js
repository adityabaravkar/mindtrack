import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { jwtApiCall } from "../../config";
import { Link } from "react-router-dom";
import Plot from "react-plotly.js";

function PatientDashboard() {
  const [myArray, updateMyArray] = useState([]);
  const [dateArray, updateDateArray] = useState([]);
  const [scoreArray, updateScoreArray] = useState([]);
  const [graphView, setGraphview] = useState();

  useEffect(() => {
    document.title = "Result";
    jwtApiCall.get(`/getResults`).then((res) => {
      const result = res.data;
      const dat = result.map((a) => a.dt);
      const score = result.map((a) => a.score);
      setGraphview(false);
      updateDateArray(dat);
      updateScoreArray(score);
      updateMyArray(result);
    });
  }, []);

  const columns = [
    {
      name: "Test Date",
      cell: (row) => row.dt,
    },
    {
      name: "Susceptibility Score",
      cell: (row) => row.score,
    },
  ];

  const changeGraph = (e) => {
    e.preventDefault();
    setGraphview(true);
  };

  const changeTable = (e) => {
    e.preventDefault();
    setGraphview(false);
  };

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
  } else if (graphView === true) {
    return (
      <div>
        <div className="row">
          <h1 className="col-md-9">Test Records</h1>
          <button
            className="btn btn-success col-md-2 float-right"
            onClick={changeTable}
          >
            Table View
          </button>
        </div>
        <Plot
          className="mt-5"
          data={[
            {
              x: dateArray,
              y: scoreArray,
              mode: "lines+markers",
              type: "scatter",
            },
          ]}
          layout={{
            title: "Susceptibility scores to time of test",
            autosize: false,
            width: 1500,
            height: 600,
          }}
        />
      </div>
    );
  } else if (graphView === false) {
    return (
      <div>
        <div className="row">
          <h1 className="col-md-9">Test Records</h1>
          <button
            className="btn btn-success col-md-2 float-right"
            onClick={changeGraph}
          >
            Graph View
          </button>
        </div>

        <DataTable
          columns={columns}
          pagination
          data={myArray}
          highlightOnHover
          className="mt-5"
        />
      </div>
    );
  }
}

export default PatientDashboard;
