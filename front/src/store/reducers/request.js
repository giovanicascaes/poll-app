import {
  SIGNUP,
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  CREATE_CAMPAIGN,
  CREATE_CAMPAIGN_SUCCESS,
  CREATE_CAMPAIGN_FAIL
} from "../actions";

const INITIAL_STATE = {
  [SIGNUP]: true,
  [CREATE_CAMPAIGN]: true
};

export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SIGNUP_SUCCESS:
    case CREATE_CAMPAIGN_SUCCESS:
      return {
        ...state,
        [action.meta.previousAction.type]: true
      };
    case SIGNUP_FAIL:
    case CREATE_CAMPAIGN_FAIL:
      return {
        ...state,
        [action.meta.previousAction.type]: false
      };

    default:
      return state;
  }
}

export function isFailure(state, action) {
  return !state[action];
}
