import axios from "axios";
import axiosMiddleware from "redux-axios-middleware";

import { API_URL } from "../../config/constants";

const client = axios.create({
  baseURL: API_URL,
  responseType: "json"
});

const clientConfig = {
  interceptors: {
    request: [
      function({ getState }, req) {
        const { tokenData } = getState().auth;
        if (tokenData !== null) {
          const { type, token } = tokenData;
          req.headers["Authorization"] = `${type} ${token}`;
        }
        return req;
      }
    ]
  }
};

export default axiosMiddleware(client, clientConfig);
