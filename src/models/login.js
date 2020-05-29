

export default {

  namespace: 'login',
  state: {

  },
  effects: {

  },
  reducers: {
    updateLoginInfo(state, action) {
      return {
        ...state,
        loginInfo: {
          ...state.loginInfo,
          ...action.payload,
        }
      }
    }
  }
}
