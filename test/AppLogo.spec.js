import Vue from "vue";
import Vuetify from "vuetify";
import { shallowMount } from "@vue/test-utils";
import AppLogo from "@/components/App/AppLogo.vue";

Vue.use(Vuetify);

describe("AppLogo.vue", () => {
  let vuetify;

  beforeEach(() => {
    vuetify = new Vuetify();
  });

  it("正しくレンダリングされること", () => {
    const wrapper = shallowMount(AppLogo, {
      vuetify,
    });

    expect(wrapper.find(".my-app-log").exists()).toBe(true);
    expect(wrapper.find(".white--text").exists()).toBe(true);
    expect(wrapper.find(".text-subtitle-1").exists()).toBe(true);
    expect(wrapper.find(".custom-font").exists()).toBe(true);
    expect(wrapper.find(".custom-font").text()).toBe("み");
  });
});
