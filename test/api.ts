import Api from '../sandbox/Api';

const assert = require("assert");

describe("Apiのテスト", () => {
    it("addのテスト", () => {
        const api = new Api();
        assert(5 === api.add(2, 3));
    })
    it("addの失敗テスト", () => {
        const api = new Api();
        assert(10 === api.add(2, 3));
    })
})