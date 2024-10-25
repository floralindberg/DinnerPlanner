import {testVue, testSuspense} from "./rootUtils";
import {tw3_1_1_3} from "./tw3.1.1.firebase.test";


describe("TW3.1.2 Vue root initial suspense [test](/vue.html)", function tw3_1_2_vue() {
    this.timeout(200000);

    it("VueRoot displays app if the model is ready", async function tw3_1_2_vue_1(){
        try {
            await tw3_1_1_3()
        } catch (error) {
            this.skip();
        }
        await testVue(testSuspense, true)
    });
});
