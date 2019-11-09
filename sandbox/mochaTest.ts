const assert = require("assert");

// How to run.
// npx mocha --require espower-typescript/guess sandbox/mochaTest.ts
describe("mochaのテスト", () => {
    before(function (done) {
        console.log("-- mocha.before --");
        done();
    });
    beforeEach(function (done) {
        console.log("-- mocha.beforeEach --");
        done();
    });

    it("-- assert", () => {
        assert("[]", JSON.stringify([]));
    })

    it("-- async func1", () => {
        const func1 = async function () {
            console.log("func1 start");

            const promise1 = new Promise<string>((resolve, reject) => {
                console.log("func1 Promise1");
                resolve();
            });
            await promise1.then(() => {
                console.log("func1 then1-1");
            }).then(() => {
                console.log("func1 then1-2");
            }).then(() => {
                console.log("func1 then1-3");
            });

            const promise2 = new Promise<string>((resolve, reject) => {
                console.log("func1 Promise2");
                resolve();
            });
            await promise2.then(() => {
                console.log("func1 then2-1");
            }).then(() => {
                console.log("func1 then2-2");
            }).then(() => {
                console.log("func1 then2-3");
            });

            console.log("func1 end");
        };

        (async () => {
            await func1();
        })();
    })

    it("-- async func2", () => {

        const func2 = async function () {
            console.log("func2 start");

            const promise1 = new Promise<string>((resolve, reject) => {
                console.log("func2 Promise1");
                resolve();
            });
            await promise1.then(() => {
                console.log("func2 then1-1");
            }).then(() => {
                console.log("func2 then1-2");
            }).then(() => {
                console.log("func2 then1-3");
            });

            const promise2 = new Promise<string>((resolve, reject) => {
                console.log("func2 Promise2");
                resolve();
            });
            await promise2.then(() => {
                console.log("func2 then2-1");
            }).then(() => {
                console.log("func2 then2-2");
            }).then(() => {
                console.log("func2 then2-3");
            });

            console.log("func2 end");
        };

        (async () => {
            await func2();
        })();
    })
})
