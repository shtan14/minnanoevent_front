import Vue from "vue";
import Vuetify from "vuetify";
import { shallowMount, createLocalVue } from "@vue/test-utils";
import BeforeLoginAppBarSignupButton from "@/components/BeforeLogin/BeforeLoginAppBarSignupButton.vue";

const localVue = createLocalVue();
Vue.use(Vuetify);

describe("BeforeLoginAppBarSignupButton.vue", () => {
  let vuetify;

  beforeEach(() => {
    vuetify = new Vuetify();
  });

  it("ボタンが正しくレンダリングされ、適切なテキストとリンクを持っていること", () => {
    const wrapper = shallowMount(BeforeLoginAppBarSignupButton, {
      localVue,
      vuetify,
      mocks: {
        $my: {
          pageTitle: jest.fn().mockReturnValue("会員登録"),
        },
      },
    });

    const button = wrapper.findComponent({ name: "v-btn" });
    expect(button.exists()).toBe(true);
    expect(button.text()).toBe("会員登録");
    expect(button.props("to")).toBe("/signup");
  });
});
