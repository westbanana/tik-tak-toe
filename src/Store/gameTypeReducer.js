const defaultState = {
  gameType: 0,
};

export const gameTypeReducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'SET_GAME_TYPE':
      return { ...state, gameType: action.payload };
    case 'VS_BOT':
      return { ...state, gameType: 2 };
    default:
      return state;
  }
};
