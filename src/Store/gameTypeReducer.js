const defaultState = {
  gameType: 0,
};

export const gameTypeReducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'SET_GAME_TYPE':
      return { ...state, gameType: action.payload };
    default:
      return state;
  }
};
