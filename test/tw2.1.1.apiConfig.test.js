import { expect } from "chai";
import getModule from "./filesToTest.js";
const X= TEST_PREFIX;
const apiConfig= await getModule(`/src/${X}apiConfig.js`);


describe("TW2.1.1 API config", function tw2_1_1() {
  before(function tw2_1_1_before() {
    if (!apiConfig) this.skip();
  });

  it("apiConfig exports PROXY_URL and PROXY_KEY", function tw2_1_1_1() {
    expect(apiConfig.PROXY_URL, "PROXY_URL not found in src/apiConfig.js").to.not
      .be.undefined;
    expect(apiConfig.PROXY_KEY, "PROXY_KEY not found in src/apiConfig.js").to.not.be
      .undefined;
    expect(apiConfig.PROXY_URL, "PROXY_URL is not a string").to.be.a("string");
    expect(apiConfig.PROXY_KEY, "PROXY_KEY is not a string").to.be.a("string");
  });

  let urlRegex = /^https\:\/\/brfenergi\.se\/iprog\/group\/[0-9]/;
  it("Check PROXY_URL is correct", function tw2_1_1_2() {
    expect(
      apiConfig.PROXY_URL,
      "PROXY_URL does not follow the format indicated"
    ).to.match(urlRegex);
  });

  it("Check length of PROXY_KEY", function tw2_1_1_3() {
    expect(
      apiConfig.PROXY_KEY,
      "PROXY_KEY does not have a length of 50. Verify the PROXY_KEY is correct"
    ).to.have.lengthOf(50); // PROXY_KEY has len 50
  });
});
