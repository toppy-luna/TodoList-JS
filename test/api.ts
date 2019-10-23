import Api from '../sandbox/Api';

const assert = require("assert");

describe("Apiのテスト", () => {
    it("addのテスト", () => {
        const api = new Api();
        assert(5 === api.add(2, 3));
    })
})
