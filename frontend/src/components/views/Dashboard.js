import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";

function Dashboard() {
  const initState = [
    { id: 1, name: "bread", quantitiy: 50, location: "cupboard" },
    { id: 2, name: "milk", quantitiy: 20, location: "fridge" },
    { id: 3, name: "water", quantitiy: 10, location: "fridge" },
  ];
  const [state, setState] = React.useState(initState);

  if (initState.length === 0) {
    return (
      <div>
        <DataTable className="mt-3" pagination highlightOnHover />
      </div>
    );
  } else {
    return (
      <table className="table">
        <tr key={"header"}>
          {Object.keys(state[0]).map((key) => (
            <th>{key}</th>
          ))}
        </tr>
        {state.map((item) => (
          <tr key={item.id}>
            {Object.values(item).map((val) => (
              <td>{val}</td>
            ))}
          </tr>
        ))}
      </table>
    );
  }
}

export default Dashboard;
