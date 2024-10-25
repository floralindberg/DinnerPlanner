import {testVue, testRoutes} from "./rootUtils";

describe("TW3.3.1 Vue navigation [test](/vue.html)", function tw3_3_1_vue() {
    this.timeout(200000);

    it("VueRoot router", async function tw3_3_1_vue_1(){
        if(!await testVue(testRoutes)) this.skip();;
    });
});
