import {
  FETCH_CAMPAIGNS,
  LOGIN,
  SIGNUP,
  FETCH_CAMPAIGN,
  VOTE,
  CREATE_CAMPAIGN,
  INCREASE_VOTE_COUNT
} from "../actions";

export function fetchCampaigns() {
  return {
    type: FETCH_CAMPAIGNS,
    payload: {
      request: {
        url: "/campaigns"
      }
    }
  };
}

export function login(email, password) {
  return {
    type: LOGIN,
    payload: {
      request: {
        url: "/sessions",
        method: "POST",
        data: {
          email,
          password
        }
      }
    }
  };
}

export function signup(name, email, password, passwordConfirmation, role) {
  return {
    type: SIGNUP,
    payload: {
      request: {
        url: "/users",
        method: "POST",
        data: {
          name,
          email,
          password,
          password_confirmation: passwordConfirmation,
          role
        }
      },
      email,
      password
    }
  };
}

export function fetchCampaign(id, userId) {
  return {
    type: FETCH_CAMPAIGN,
    payload: {
      request: {
        url: userId ? `/campaigns/${id}?userId=${userId}` : `/campaigns/${id}`
      }
    }
  };
}

export function vote() {
  return {
    type: VOTE
  };
}

export function createCampaign({ name, dueDate, dueTime, options }) {
  return {
    type: CREATE_CAMPAIGN,
    payload: {
      request: {
        url: "/campaigns",
        method: "POST",
        data: {
          name,
          due_date: dueDate,
          due_time: dueTime,
          options
        }
      }
    }
  };
}

export function increaseVoteCount(optionId) {
  return {
    type: INCREASE_VOTE_COUNT,
    payload: {
      optionId
    }
  };
}
