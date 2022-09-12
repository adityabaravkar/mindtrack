import React, { Component } from "react";
import "./App.css";
import Main from "./components/Main";
import { BrowserRouter } from "react-router-dom";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import backendURL from "./config";

const client = new ApolloClient({
  uri: `${backendURL}/graphql`,
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <BrowserRouter>
          <div>
            <Main />
          </div>
        </BrowserRouter>
      </ApolloProvider>
    );
  }
}
export default App;
