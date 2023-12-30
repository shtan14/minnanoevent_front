import Vue from "vue";
import Vuetify from "vuetify";
import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import AppToaster from "@/components/App/AppToaster.vue";

const localVue = createLocalVue();
localVue.use(Vuex);
Vue.use(Vuetify);

describe("AppToaster.vue", () => {
  let vuetify;
  let store;
  let actions;
  let state;

  beforeEach(() => {
    vuetify = new Vuetify();
    actions = {
      getToast: jest.fn(),
    };
    state = {
      toast: {
        msg: "Test message",
        color: "success",
        timeout: 2000,
      },
    };
    store = new Vuex.Store({
      state,
      actions,
    });
  });

  it("メッセージを表示し、正しくレンダリングすること", () => {
    const wrapper = shallowMount(AppToaster, {
      localVue,
      vuetify,
      store,
    });

    expect(wrapper.text()).toContain("Test message");
    expect(wrapper.vm.toast.msg).toBe("Test message");
  });
});
