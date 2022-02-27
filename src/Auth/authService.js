import { CognitoUser, AuthenticationDetails } from "amazon-cognito-identity-js";
import Pool from "./UserPool";

export const getSession = () => {
  return Pool.getCurrentUser();
};

export const authenticate = async (email, password) => {
  return await new Promise((resolve, reject) => {
    const user = new CognitoUser({ Username: email, Pool });

    const authDetails = new AuthenticationDetails({
      Username: email,
      Password: password,
    });

    user.authenticateUser(authDetails, {
      onSuccess: (data) => {
        console.log("onSuccess: ", data);
        resolve(data);
      },
      onFailure: (err) => {
        console.error("onFailure: ", err);
        reject(err);
      },
      newPasswordRequired: (data) => {
        console.log("newPasswordRequired: ", data);
        reject(data);
      },
    });
  });
};

export const logout = () => {
  const user = Pool.getCurrentUser();
  if (user) {
    user.signOut();
  }
};
