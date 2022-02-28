import { CognitoUserPool } from "amazon-cognito-identity-js";
import config from "globalConfig.json";

const poolData = {
  UserPoolId: config.cognitoPoolID,
  ClientId: config.cognitoClientID,
};

export default new CognitoUserPool(poolData);
