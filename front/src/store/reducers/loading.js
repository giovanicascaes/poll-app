import {
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  SIGNUP,
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  FETCH_CAMPAIGN,
  FETCH_CAMPAIGN_SUCCESS,
  FETCH_CAMPAIGN_FAIL,
  CREATE_CAMPAIGN,
  CREATE_CAMPAIGN_SUCCESS,
  CREATE_CAMPAIGN_FAIL
} from "../actions";

const INITIAL_STATE = {
  actions: []
};

export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case LOGIN:
    case SIGNUP:
    case FETCH_CAMPAIGN:
    case CREATE_CAMPAIGN:
      return {
        ...state,
        actions: [...state.actions, { type: action.type }]
      };
    case LOGIN_SUCCESS:
    case LOGIN_FAIL:
    case SIGNUP_SUCCESS:
    case SIGNUP_FAIL:
    case FETCH_CAMPAIGN_SUCCESS:
    case FETCH_CAMPAIGN_FAIL:
    case CREATE_CAMPAIGN_SUCCESS:
    case CREATE_CAMPAIGN_FAIL:
      return {
        ...state,
        actions: state.actions.filter(
          a => a.type !== action.meta.previousAction.type
        )
      };

    default:
      return state;
  }
}

export function isLoading({ actions }, action) {
  return actions.some(a => a.type === action);
}
