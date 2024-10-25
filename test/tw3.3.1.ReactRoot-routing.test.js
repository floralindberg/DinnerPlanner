import {testReact, testRoutes} from "./rootUtils";

describe("TW3.3.1 React navigation [test](/react.html)", function tw3_3_1() {
    this.timeout(200000);

    it("ReactRoot router", async function tw3_3_1_1(){
        if(!await testReact(testRoutes))
            this.skip();
    });
});
