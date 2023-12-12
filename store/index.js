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
  events: [],
  comments: [],
  isLoadingComments: false,
});

export const getters = {};

export const mutations = {
  setLoadingComments(state, isLoading) {
    state.isLoadingComments = isLoading;
  },
  updateEvent(state, event) {
    const index = state.events.findIndex((e) => e.id === event.id);
    if (index !== -1) {
      // イベント情報とユーザー情報を含むオブジェクトで更新
      state.events.splice(index, 1, event);
    } else {
      state.events.push(event);
    }
  },
  updateFavourite(state, { id, isFavourite, favouriteId }) {
    const event = state.events.find((e) => e.id === id);
    if (event) {
      event.isFavourite = isFavourite;
      event.favouriteId = favouriteId;
    }
  },
  setEvents(state, events) {
    state.events = events;
  },
  resetFavourites(state) {
    state.events = state.events.map((event) => ({
      ...event,
      isFavourite: false,
    }));
  },
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
  setComments(state, comments) {
    state.comments = comments;
  },
  deleteComment(state, commentId) {
    // state.comments内から指定されたcommentIdに一致するコメントを検索
    const index = state.comments.findIndex(
      (comment) => comment.id === commentId
    );
    // コメントが見つかればそのインデックスを返し、見つからなければ-1を返す
    if (index !== -1) {
      // インデックスが-1でない場合はコメントが見つかった
      // その場合spliceメソッドを使用してstate.commentsからコメントを削除
      state.comments.splice(index, 1);
    }
  },
  deleteEvent(state, eventId) {
    state.events = state.events.filter((event) => event.id !== eventId);
  },
};

export const actions = {
  // イベントのコメントを取得するアクション
  async fetchEventComments({ commit }, eventId) {
    commit("setLoadingComments", true);
    try {
      const response = await this.$axios.get(
        `/api/v1/events/${eventId}/comments`
      );
      commit("setComments", response.data);
    } catch (error) {
      console.error("コメントの取得に失敗しました", error);
    }
    commit("setLoadingComments", false);
  },
  // コメントを投稿するアクション
  async postComment({ dispatch }, { eventId, commentText }) {
    try {
      await this.$axios.post(`/api/v1/events/${eventId}/comments`, {
        comment: {
          comment: commentText,
        },
      });
      // コメントの再取得をトリガー
      dispatch("fetchEventComments", eventId);
      this.dispatch("getToast", {
        msg: "コメントを投稿しました。",
        color: "success",
      });
    } catch (error) {
      console.error("コメントの投稿に失敗しました", error);
      this.dispatch("getToast", {
        msg: "コメントの投稿に失敗しました。",
        color: "error",
      });
    }
  },
  // コメントを削除するアクション
  async deleteComment({ commit, state }, commentId) {
    try {
      // コメントを削除
      await this.$axios.delete(`/api/v1/comments/${commentId}`);

      // 成功した場合、ストアからコメントを削除
      const updatedComments = state.comments.filter(
        (comment) => comment.id !== commentId
      );
      commit("setComments", updatedComments);

      // 成功メッセージを表示
      this.dispatch("getToast", {
        msg: "コメントが削除されました。",
        color: "success",
      });
    } catch (error) {
      console.error("コメントの削除に失敗しました", error);
      this.dispatch("getToast", {
        msg: "コメントの削除に失敗しました。",
        color: "error",
      });
    }
  },
  fetchEventsByCategory({ commit }, categoryId) {
    this.$axios.get(`/api/v1/categories/${categoryId}`).then((response) => {
      const events = response.data;
      // 開催日時に基づいてイベントを並べ替え
      events.sort(
        (a, b) =>
          new Date(a.event_start_datetime) - new Date(b.event_start_datetime)
      );

      // ログインしている場合、お気に入り情報を取得して統合
      if (this.$auth.loggedIn()) {
        this.$axios.get("/api/v1/favourites").then((favResponse) => {
          const favourites = favResponse.data;
          const updatedEvents = events.map((event) => {
            const favourite = favourites.find((f) => f.event_id === event.id);
            return {
              ...event,
              isFavourite: !!favourite,
              favouriteId: favourite ? favourite.id : null,
            };
          });
          commit("setEvents", updatedEvents);
        });
      } else {
        // ログインしていない場合、そのままイベントを設定
        commit("setEvents", events);
      }
    });
  },
  // 特定のユーザーによってホストされたイベントを取得するアクション
  fetchEventsHostedByUser({ commit }, userId) {
    this.$axios.get(`/api/v1/events/?user_id=${userId}`).then((response) => {
      const events = response.data;
      // ログインしている場合、お気に入り情報を取得して統合
      if (this.$auth.loggedIn()) {
        this.$axios.get("/api/v1/favourites").then((favResponse) => {
          const favourites = favResponse.data;
          const updatedEvents = events.map((event) => {
            const favourite = favourites.find((f) => f.event_id === event.id);
            return {
              ...event,
              isFavourite: !!favourite,
              favouriteId: favourite ? favourite.id : null,
            };
          });
          commit("setEvents", updatedEvents);
        });
      } else {
        // ログインしていない場合、そのままイベントを設定
        commit("setEvents", events);
      }
    });
  },
  async fetchEventDetails({ commit }, eventId) {
    try {
      const response = await this.$axios.get(`/api/v1/events/${eventId}`);
      let event = response.data;

      // ログインしている場合、お気に入り情報を取得して統合
      if (this.$auth.loggedIn()) {
        const favResponse = await this.$axios.get("/api/v1/favourites");
        const favourites = favResponse.data;
        const favourite = favourites.find((f) => f.event_id === event.id);
        event = {
          ...event,
          isFavourite: !!favourite,
          favouriteId: favourite ? favourite.id : null,
        };
      }

      // イベントホストのユーザー情報を取得
      const userResponse = await this.$axios.get(
        `/api/v1/users/${event.user_id}`
      );
      const user = userResponse.data;

      // イベントとユーザー情報をVuexに保存
      commit("updateEvent", { ...event, user });
    } catch (error) {
      console.error("イベントデータの取得に失敗しました", error);
    }
  },
  // ログインユーザーのお気に入りイベントを取得するアクション
  async fetchFavouriteEvents({ commit }) {
    try {
      // お気に入りイベントのAPIエンドポイントを呼び出す
      const response = await this.$axios.get("/api/v1/favourites");
      const favourites = response.data;

      // お気に入りイベントのIDを取得
      const eventIds = favourites.map((fav) => fav.event_id);

      // お気に入りイベントの詳細情報を取得
      const eventResponses = await Promise.all(
        eventIds.map((eventId) => this.$axios.get(`/api/v1/events/${eventId}`))
      );
      const favouriteEvents = eventResponses.map((res) => res.data);

      // お気に入りイベント情報をVuexストアのstateに保存
      commit(
        "setEvents",
        favouriteEvents.map((event) => ({
          ...event,
          isFavourite: true,
          favouriteId: favourites.find((fav) => fav.event_id === event.id).id,
        }))
      );
    } catch (error) {
      console.error("お気に入りイベントの取得に失敗しました", error);
    }
  },
  async deleteEvent({ commit }, eventId) {
    try {
      await this.$axios.delete(`/api/v1/events/${eventId}`);
      commit("deleteEvent", eventId);
      this.dispatch("getToast", {
        msg: "イベントが削除されました。",
        color: "success",
      });
    } catch (error) {
      console.error("イベントの削除に失敗しました", error);
      this.dispatch("getToast", {
        msg: "イベントの削除に失敗しました。",
        color: "error",
      });
    }
  },
  updateFavourite({ commit }, payload) {
    commit("updateFavourite", payload);
  },
  setEvents({ commit }, events) {
    commit("setEvents", events);
  },
  resetFavourites({ commit }) {
    commit("resetFavourites");
  },
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
    color = color || "transparent";
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
