import Vue from "vue";
import Vuetify from "vuetify";
import { shallowMount } from "@vue/test-utils";
import AppTitle from "@/components/App/AppTitle.vue";

Vue.use(Vuetify);

describe("AppTitle.vue", () => {
  it("正しくレンダリングされること", () => {
    // モックのコンフィグを作成

    const appName = "MyApp";
    const mockConfig = {
      $config: { appName },
    };

    // コンポーネントをシャローマウント
    const wrapper = shallowMount(AppTitle, {
      mocks: mockConfig,
      vuetify: new Vuetify(),
    });

    // appName が正しく表示されているかを確認
    expect(wrapper.text()).toMatch(appName);
  });
});
