import {
  FETCH_CAMPAIGNS_SUCCESS,
  FETCH_CAMPAIGN_SUCCESS,
  VOTE,
  INCREASE_VOTE_COUNT
} from "../actions";

const INITIAL_STATE = {
  campaigns: [],
  campaign: null
};

export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_CAMPAIGNS_SUCCESS:
      return {
        ...state,
        campaigns: action.payload.data
      };
    case FETCH_CAMPAIGN_SUCCESS:
      return {
        ...state,
        campaign: action.payload.data
      };
    case VOTE:
      return {
        ...state,
        campaign: {
          ...state.campaign,
          userHasVoted: true
        }
      };
    case INCREASE_VOTE_COUNT: {
      const { optionId } = action.payload;
      const newOptionsList = [...state.campaign.options];
      const index = newOptionsList.findIndex(option => option._id === optionId);
      newOptionsList[index].votes_count++;
      return {
        ...state,
        campaign: {
          ...state.campaign,
          options: newOptionsList
        }
      };
    }

    default:
      return state;
  }
}
