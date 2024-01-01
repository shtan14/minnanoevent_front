import Vue from "vue";
import Vuetify from "vuetify";
import { mount } from "@vue/test-utils"; // mount を使用
import AppLogo from "@/components/App/AppLogo.vue";

Vue.use(Vuetify);

describe("AppLogo.vue", () => {
  let vuetify;

  beforeEach(() => {
    vuetify = new Vuetify();
  });

  it("正しくレンダリングされること", () => {
    const wrapper = mount(AppLogo, {
      vuetify,
    });

    expect(wrapper.find(".my-app-log").exists()).toBe(true);
  });
});
