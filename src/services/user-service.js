import {handleResponse} from "./handleResponse";

const apiEndpoint = "https://localhost:44325/api/";

export const userService = {
    login
}

async function login(dispatch, username, password){
    const requestOptions = {
        method: "POST",
        headers: {"Content-Type" : "application/json"},
        body: JSON.stringify({username,password})
    };

  return await fetch(`${apiEndpoint}users/authenticate`, requestOptions)
    .then(handleResponse)
    .then(user => {
        localStorage.setItem("user", JSON.stringify(user));
        dispatch({
          type: "AUTHENTICATION_SUCCESS",
        });
        return user;
    })
    .catch(errorMessage => {
        dispatch({
          errorMessage: errorMessage,
          type: "AUTHENTICATION_FAILED",
        });
        return errorMessage;
      });

    }


  async function register (dispatch, userName, password) {
        const requestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userName, password }),
        };
    
       return await fetch(`${state.apiEndpoint}users/register`, requestOptions)
          .then(handleResponse)
          .then(user => {
            localStorage.setItem("user", JSON.stringify(user));
            dispatch({
              type: "REGISTRATION_SUCCESSFUL",
            });
            return user;
          })
          .catch(errorMessage => {
            dispatch({
              errorMessage: errorMessage,
              type: "AUTHENTICATION_FAILED",
            });
            return errorMessage;
          });
      };