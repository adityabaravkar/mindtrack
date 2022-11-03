import React from "react";
// react-bootstrap components
import { Container } from "react-bootstrap";
import { useState, useMemo } from "react";
import Papa from "papaparse";
import Pagination from "../Pagination/Pagination";
import "./style.scss";
import { Row, Col } from "react-bootstrap";

let PageSize = 10;

function Dashboard() {
  const [currentPage, setCurrentPage] = useState(1);
  // State to store parsed data
  const [parsedData, setParsedData] = useState([]);

  //State to store table Column name
  const [tableRows, setTableRows] = useState([]);

  //State to store the values
  const [values, setValues] = useState([]);

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return values.slice(firstPageIndex, lastPageIndex);
  }, [currentPage]);

  const changeHandler = (event) => {
    // Passing file data (event.target.files[0]) to parse using Papa.parse
    Papa.parse(event.target.files[0], {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        const rowsArray = [];
        const valuesArray = [];

        // Iterating data to get column name and their values
        results.data.map((d) => {
          rowsArray.push(Object.keys(d));
          valuesArray.push(Object.values(d));
        });

        // Parsed Data Response in array format
        setParsedData(results.data);

        // Filtered Column Names
        setTableRows(rowsArray[0]);

        // Filtered Values
        setValues(valuesArray);
      },
    });
  };

  return (
    <Container fluid>
      <div>
        <Row>
          <div className="col-2 mt-3">Choose a CSV file to display:</div>
          <div className="col-6">
            <input
              type="file"
              name="file"
              onChange={changeHandler}
              accept=".csv"
              style={{ display: "block", margin: "10px auto", height: "auto" }}
            />
          </div>
        </Row>

        <br />
        <br />
        {/* Table */}
        <table>
          <thead>
            <tr>
              {tableRows.map((rows, index) => {
                return (
                  <th className="font-weight-bold" key={index}>
                    {rows}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {currentTableData.map((value, index) => {
              return (
                <tr key={index}>
                  {value.map((val, i) => {
                    return <td key={i}>{val}</td>;
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
        <Pagination
          className="pagination-bar"
          currentPage={currentPage}
          totalCount={values.length}
          pageSize={PageSize}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>
    </Container>
  );
}

export default Dashboard;
