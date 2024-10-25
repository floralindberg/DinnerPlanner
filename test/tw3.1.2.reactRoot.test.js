import {testReact, testSuspense} from "./rootUtils";
import {tw3_1_1_3} from "./tw3.1.1.firebase.test";

describe("TW3.1.2 React root initial suspense [test](/react.html)", function tw3_1_2_react() {
    this.timeout(200000);

    it("ReactRoot displays app if the model is ready", async function tw3_1_2_react_1(){
        try {
            await tw3_1_1_3()
        } catch (error) {
            this.skip();
        }
        await testReact(testSuspense, true)
    });
});

