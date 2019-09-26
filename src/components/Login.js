import React, { useReducer } from "react";
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import ErrorPage from "./Error";
import Success from "./Success";
import Header from "./Header";
import handleResponse from "../helpers/auth-response";

const state = {
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

const Login = props => {
  const reducer = (filter, action) => {
    switch (action.type) {
      case "AUTHENTICATION_SUCCESS": {
        return {
          ...filter,
          isAuthenticated: true,
          success: {
            successMessage: "Authentication successful!",
          },
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
      case "HANDLE_CHANGE": {
        return {
          ...filter,
          [action.targetId]: action.targetNewValue,
        };
      }
      default:
        return filter;
    }
  };

  const [form, dispatch] = useReducer(reducer, state);

  const authenticate = async () => {
    const userName = form.userName;
    const password = form.password;
    var result = false;
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userName, password }),
    };

    await fetch(`${state.apiEndpoint}users/authenticate`, requestOptions)
      .then(handleResponse)
      .then(user => {
        localStorage.setItem("user", JSON.stringify(user));
        dispatch({
          type: "AUTHENTICATION_SUCCESS",
        });
        result = true;
        return user;
      })
      .catch(errorMessage => {
        dispatch({
          errorMessage: errorMessage,
          type: "AUTHENTICATION_FAILED",
        });
        result = false;
      });

    return result;
  };

  const handleChange = e => {
    dispatch({
      ...form,
      type: "HANDLE_CHANGE",
      targetId: e.target.id,
      targetNewValue: e.target.value,
    });
  };

  const callLoginFunction = async e => {
    e.preventDefault();
    await authenticate(form.userName, form.password).then(result => {
      if (result) {
        dispatch({
          ...form,
          loginCompleted: true,
        });
        return <Redirect to="/Dashboard" />;
      }
    });
  };

  return (
    <div className="Login">
      <Header headerText={state.headerText} />
      {!form.isAuthenticated ? (
        <div className="row">
          <div className="col-md-4" />
          <div className="col-md-4">
            <form onSubmit={callLoginFunction}>
              <FormGroup controlId="userName">
                <FormLabel className="form-label">Username:</FormLabel>
                <FormControl
                  autoFocus
                  type="text"
                  value={form.userName}
                  onChange={handleChange}
                />
              </FormGroup>
              <FormGroup controlId="password">
                <FormLabel className="form-label">Password:</FormLabel>
                <FormControl
                  type="password"
                  value={form.password}
                  onChange={handleChange}
                />
              </FormGroup>
              <Button block type="submit">
                Login
              </Button>
            </form>
          </div>
          <div className="col-md-4" />
        </div>
      ) : (
        ""
      )}
      <div className="row">
        <div className="col-md-4" />
        <div className="col-md-4">
          {form.error.errorMessage !== "" ? (
            <ErrorPage error={form.error} />
          ) : (
            ""
          )}
          {form.success.successMessage !== "" ? (
            <div>
              <Success success={form.success} />
              <Redirect to="/Dashboard" />
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="col-md-4" />
      </div>
    </div>
  );
};

export default Login;
