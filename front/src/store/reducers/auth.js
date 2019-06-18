import { LOGIN_SUCCESS } from "../actions";

const INITIAL_STATE = {
  tokenData: null,
  user: {
    name: null,
    role: null,
    id: null
  }
};

export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case LOGIN_SUCCESS: {
      const {
        type,
        token,
        user: { name, role, _id }
      } = action.payload.data;
      if (type && token) {
        return {
          ...state,
          tokenData: {
            type,
            token
          },
          user: {
            name,
            role,
            id: _id
          }
        };
      }
      return state;
    }

    default:
      return state;
  }
}
