import { FETCH_QUESTIONS } from "../actions";

const initialState = [];
const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_QUESTIONS:
      return {
        ...state, 
        questions: action.payload
      };
    default:
      return state;
  }
}

export default rootReducer;