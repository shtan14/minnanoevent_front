import Vue from "vue";
import Vuetify from "vuetify";
import { shallowMount, createLocalVue } from "@vue/test-utils";
import BeforeLoginAppBarLoginButton from "@/components/BeforeLogin/BeforeLoginAppBarLoginButton.vue";

const localVue = createLocalVue();
Vue.use(Vuetify);

describe("BeforeLoginAppBarLoginButton.vue", () => {
  let vuetify;

  beforeEach(() => {
    vuetify = new Vuetify();
  });

  it("ボタンが正しくレンダリングされること", () => {
    const wrapper = shallowMount(BeforeLoginAppBarLoginButton, {
      localVue,
      vuetify,
      mocks: {
        $my: {
          pageTitle: jest.fn().mockReturnValue("ログイン"),
        },
      },
    });

    const button = wrapper.findComponent({ name: "v-btn" });
    expect(button.exists()).toBe(true);
    expect(button.props("to")).toBe("/login");
    expect(button.text()).toContain("ログイン");
  });
});
