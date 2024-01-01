import Vue from "vue";
import Vuetify from "vuetify";
import { shallowMount, RouterLinkStub } from "@vue/test-utils";
import AppFooter from "@/components/App/AppFooter.vue"; // コンポーネントのパスを正しく設定

Vue.use(Vuetify);

describe("AppFooter.vue", () => {
  let vuetify;

  beforeEach(() => {
    vuetify = new Vuetify();
  });

  it("正しいデータとプロパティでレンダリングすること", () => {
    const mockConfig = {
      $config: { appName: "TestApp" },
    };

    const wrapper = shallowMount(AppFooter, {
      mocks: mockConfig,
      vuetify,
      stubs: {
        NuxtLink: RouterLinkStub,
      },
    });

    // データプロパティのテスト
    expect(wrapper.vm.appName).toBe("TestApp");
    expect(wrapper.vm.height).toBe(32);

    // コンピューテッドプロパティのテスト
    const currentYear = new Date().getFullYear();
    const expectedCopyRightYear =
      currentYear > 2023 ? `2023 - ${currentYear}` : "2023";
    expect(wrapper.vm.copyRightYear).toBe(expectedCopyRightYear);

    // DOM要素のテスト
    expect(wrapper.find(".text-caption").exists()).toBe(true);
    // RouterLinkStubを使用して検証
    const routerLinks = wrapper.findAllComponents(RouterLinkStub);
    expect(routerLinks.at(0).props().to).toBe("/terms-of-service");
    expect(routerLinks.at(1).props().to).toBe("/privacy-policy");
  });
});
