const homePath = "index";

export const state = () => ({
  styles: {
    homeAppBarHeight: 56,
  },
  loggedIn: {
    homePath: {
      name: homePath,
    },
  },
  user: {
    current: null,
  },
  auth: {
    token: null,
    expires: 0,
    payload: {},
  },
});

export const getters = {};

export const mutations = {
  setCurrentUser(state, payload) {
    state.user.current = payload;
  },
  setAuthToken(state, payload) {
    state.auth.token = payload;
  },
  setAuthExpires(state, payload) {
    state.auth.expires = payload;
  },
  setAuthPayload(state, payload) {
    state.auth.payload = payload;
  },
};

export const actions = {
  getCurrentUser({ commit }, user) {
    commit("setCurrentUser", user);
  },
  getAuthToken({ commit }, token) {
    commit("setAuthToken", token);
  },
  getAuthExpires({ commit }, expires) {
    expires = expires || 0;
    commit("setAuthExpires", expires);
  },
  getAuthPayload({ commit }, jwtPayload) {
    jwtPayload = jwtPayload || {};
    commit("setAuthPayload", jwtPayload);
  },
};
