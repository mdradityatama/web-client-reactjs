const initialState = {
  popup: false,
  isLogin: false,
  isLoading: false,
  isAdmin: false,
  user: {},
  chart: {}
};

const reducer = (state = initialState, action) => {
  if (action.type === "CHANGE_ISLOGIN") {
    return {
      ...state,
      isLogin: action.value,
    };
  }
  if (action.type === "CHANGE_USER") {
    return {
      ...state,
      user: action.value,
    };
  }
  if (action.type === "CHANGE_ADMIN") {
    return {
      ...state,
      isAdmin: action.value,
    };
  }
  if (action.type === "CHANGE_LOADING") {
    return {
      ...state,
      isLoading: action.value,
    };
  }
  if (action.type === "TEST") {
    return {
      ...state,
      chart: action.value
    }
  }

  return state;
}

export default reducer;