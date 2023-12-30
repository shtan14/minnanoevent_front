import Vue from "vue";
import Vuetify from "vuetify";
import { shallowMount, RouterLinkStub } from "@vue/test-utils";
import LoggedInAppBarAccountMenu from "@/components/LoggedIn/LoggedInAppBarAccountMenu.vue";

Vue.use(Vuetify);

describe("LoggedInAppBarAccountMenu.vue", () => {
  let vuetify;
  let mocks;
  let wrapper;

  beforeEach(() => {
    vuetify = new Vuetify();
    mocks = {
      $auth: {
        user: {
          id: 1,
          name: "テストユーザー",
          user_profile: {
            avatar: "test-avatar.jpg",
          },
        },
      },
      $my: {
        pageTitle: jest.fn((name) => name),
      },
    };

    wrapper = shallowMount(LoggedInAppBarAccountMenu, {
      vuetify,
      mocks,
      stubs: {
        NuxtLink: RouterLinkStub,
      },
    });
  });

  it("正しくレンダリングされること", () => {
    // ユーザー情報の確認
    expect(wrapper.text()).toContain("テストユーザー");
  });
});
