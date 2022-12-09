const defaultState = {
  players: [],
};

export const playersReducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'ADD_PLAYER':
      return { ...state, players: action.payload };
    case 'REMOVE_PLAYERS':
      return { ...state, players: [] };
    default:
      return state;
  }
};
