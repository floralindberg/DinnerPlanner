import { expect } from "chai";
import {testVue, testReact, testWeek1Presenters} from "./rootUtils";
import getModule from "./filesToTest.js";
const X= TEST_PREFIX;
const ReactSidebar= await getModule(`/src/reactjs/${X}sidebarPresenter.jsx`);
const VueSidebar= await getModule(`/src/vuejs/${X}sidebarPresenter.jsx`);

describe("TW1.5 Root component [app Vue](/vue.html)[app React](/react.html)", function tw1_5_2() {
    this.timeout(200000);

    it("ReactRoot renders Sidebar and Summary (remove TODO to enable)", async function tw1_1_5_2_react_1(){
        if(!ReactSidebar)
            this.skip();
        if(!await testReact(testWeek1Presenters, true))
            this.skip();
    });
    it("VueRoot renders Sidebar and Summary (remove TODO to enable)", async function tw1_1_5_2_vue_1(){
        if(!VueSidebar)
            this.skip();
        if(!await testVue(testWeek1Presenters, true))
            this.skip();
    });
});



