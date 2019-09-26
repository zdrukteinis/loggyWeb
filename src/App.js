import "./App.css";
import Login from "./components/Login";
import React, { useReducer } from "react";
import Error from "./components/Error";
import Success from "./components/Success";
import { BrowserRouter } from "react-router-dom";
import { Switch, Route } from "react-router-dom";
import NavBar from "./components/Navbar";

const initialState = {
  apiEndpoint: "https://localhost:44325/api/",
  isAuthenticated: false,
  headerText: (
    <div>
      <code>Authenticate </code>to start
    </div>
  ),
  error: {
    errorMessage: "",
    errorType: null,
  },
  success: {
    successMessage: "",
    successType: null,
  },
};

const reducer = (filter, action) => {
  switch (action.type) {
    case "AUTHENTICATION_SUCCESS": {
      return {
        ...filter,
      };
    }
    case "AUTHENTICATION_FAILED": {
      return {
        ...filter,
        error: {
          errorMessage: action.errorMessage,
          errorType: action.type,
        },
      };
    }
    case "RESET_ERROR": {
      return {
        ...filter,
        error: {},
      };
    }
    default:
      return filter;
  }
};

const App = () => {
  const [state] = useReducer(reducer, initialState);

  return (
    <BrowserRouter>
      <div className="App">
        <NavBar />
        <Switch>
         
          <Route render={props => <Login />} />
        </Switch>
        {state.error.errorType !== null ? <Error error={state.error} /> : ""}
        {state.success.successType !== null ? (
          <Success success={state.success} />
        ) : (
          ""
        )}
      </div>
      <div />
    </BrowserRouter>
  );
};

export default App;
