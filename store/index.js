const homePath = "index";

export const state = () => ({
  styles: {
    homeAppBarHeight: 76,
  },
  loggedIn: {
    homePath: {
      name: homePath,
    },
    rememberPath: {
      name: homePath,
      params: {},
    },
    // ログイン後アクセス不可ルート
    redirectPaths: ["signup", "login"],
  },
  user: {
    current: null,
  },
  auth: {
    token: null,
    expires: 0,
    payload: {},
  },
  toast: {
    msg: null,
    color: "error",
    timeout: 4000,
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
  setToast(state, payload) {
    state.toast = payload;
  },
  setRememberPath(state, payload) {
    state.loggedIn.rememberPath = payload;
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
  getToast({ commit }, { msg, color, timeout }) {
    color = color || "error";
    timeout = timeout || 4000;
    commit("setToast", { msg, color, timeout });
  },
  // ログイン前ユーザーがアクセスしたルートを記憶する
  getRememberPath({ state, commit }, { name, params }) {
    if (state.loggedIn.redirectPaths.includes(name)) {
      name = state.loggedIn.homePath.name;
    }
    params = params || {};
    commit("setRememberPath", { name, params });
  },
  updateUser({ commit }, user) {
    commit("setCurrentUser", user);
  },
};
