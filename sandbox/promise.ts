import { resolve } from "bluebird";

// 初めからresolveしているPromiseの実行順
async function func1() {
    let promise1 = Promise.resolve('promise1');
    promise1.then(function (value) {
        console.log(value);
    });

    console.log('bottom');
}

// 途中でsetTimeoutでresolveするPromiseをawaitする
async function func2() {
    let promise1 = Promise.resolve('promise1');
    promise1.then(function (value) {
        console.log(value);
    });
    let promise2 = new Promise(resolve => setTimeout(() => resolve('promise2')));
    promise2.then(function (value) {
        console.log(value);
    });
    await promise2;

    console.log('bottom');
}

// timeoutが先
async function func3() {
    let promise1 = new Promise(resolve => setTimeout(() => resolve('promise1')));
    promise1.then(function (value) {
        console.log(value);
    });

    let promise2 = Promise.resolve('promise2');
    promise2.then(function (value) {
        console.log(value);
    });
    await promise2;

    console.log('bottom');
}

// func2のpromise2のthenをawaitの後に書く
async function func4() {
    let promise1 = Promise.resolve('promise1');
    promise1.then(function (value) {
        console.log(value);
    });
    let promise2 = new Promise(resolve => setTimeout(() => resolve('promise2')));
    await promise2;
    promise2.then(function (value) {
        console.log(value);
    });

    console.log('bottom');
}

async function func5() {
    let promise1 = Promise.resolve('promise1');
    promise1.then((value) => {
        console.log(value);
    }).then(() => {
        console.log("then1")
    });

    let promise2 = Promise.resolve('promise2');
    await promise2.then((value) => {
        console.log(value);
    }).then(() => {
        console.log("then2")
    });

    console.log('bottom');
}
function func6() {
    const promise = new Promise((resolve, reject) => resolve('解決した'))
    const unResolvedPromise = new Promise((resolve, reject) => reject('エラー発生'))

    promise
        .then((value) => console.log(value)) // 解決した

    unResolvedPromise
        .then((value) => console.log(value))
        .catch((errorMessage) => new Error(errorMessage)) // error: エラー発生
        .then((value) => console.log(value)) // エラー発生
}

async function func7() {
    const doSomething = () => Promise.resolve(100)
    const failureCallback = (e: any) => console.log(e)

    await doSomething()
        .then(v => v + 1)
        .then(v => console.log(v)) // 101
        .catch(failureCallback);
}

function func8() {
    // ※ 即時関数で囲っています
    const doSomething = () => Promise.resolve(100);
    const failureCallback = (e: any) => console.log(e);

    (async () => {
        try {
            let result = await doSomething();
            result = result + 1;
            console.log(result); // 101
        } catch (e) {
            failureCallback(e);
        }
    })();
}

function func9() {
    setTimeout(() => console.log(1));// async timer 4
    setImmediate(() => console.log(2));// async immediate 5
    process.nextTick(() => console.log(3));// async tick 2
    Promise.resolve().then(() => console.log(4));// async ? 3
    (() => console.log(5))();// sync 1
}

async function func10() {
    process.nextTick(() => console.log(1));
    Promise.resolve().then(() => console.log(2));
    process.nextTick(() => console.log(3));
    Promise.resolve().then(() => console.log(4));
    process.nextTick(() => console.log(5));
}

async function func11() {
    console.log("func11 start");

    // timeout
    setTimeout(() => {
        console.log("func11 setTimeout");
    }, 0);

    // immediate
    setImmediate(() => {
        console.log("func11 setImmediate");
    });

    // promise
    const promise = new Promise((resolve1) => {
        resolve1("-- resolve --");
    });
    promise.then(() => {
        console.log("func11 then1");
    }).then(() => {
        console.log("func11 then2");
    });

    // nextTick
    process.nextTick(() => {
        console.log("func11 nextTick");
    });
    console.log("func11 end");
}

async function func12() {
    console.log("func12 start");

    // timeout
    setTimeout(() => {
        console.log("func12 setTimeout");
    }, 0);

    // immediate
    setImmediate(() => {
        console.log("func12 setImmediate");
    });

    // promise
    const promise = new Promise((resolve1) => {
        resolve1("-- resolve --");
    });
    promise.then(() => {
        console.log("func12 then1");
    }).then(() => {
        console.log("func12 then2");
    });

    // nextTick
    process.nextTick(() => {
        console.log("func12 nextTick");
    });
    console.log("func12 end");
}

async function func13() {
    console.log("func13 start");

    const promise1 = new Promise<string>((resolve, reject) => {
        console.log("func13 Promise1");
        resolve();
    });
    await promise1.then(() => {
        console.log("func13 then1-1");
    }).then(() => {
        console.log("func13 then1-2");
    }).then(() => {
        console.log("func13 then1-3");
    });

    const promise2 = new Promise<string>((resolve, reject) => {
        console.log("func13 Promise2");
        resolve();
    });
    await promise2.then(() => {
        console.log("func13 then2-1");
    }).then(() => {
        console.log("func13 then2-2");
    }).then(() => {
        console.log("func13 then2-3");
    });

    console.log("func13 end");
}

async function func14() {
    console.log("func14 start");

    const promise1 = new Promise<string>((resolve, reject) => {
        console.log("func14 Promise1");
        resolve();
    });
    await promise1.then(() => {
        console.log("func14 then1-1");
    }).then(() => {
        console.log("func14 then1-2");
    }).then(() => {
        console.log("func14 then1-3");
    });

    const promise2 = new Promise<string>((resolve, reject) => {
        console.log("func14 Promise2");
        resolve();
    });
    await promise2.then(() => {
        console.log("func14 then2-1");
    }).then(() => {
        console.log("func14 then2-2");
    }).then(() => {
        console.log("func14 then2-3");
    });

    console.log("func14 end");
}

(async function main() {
    // console.log('======= func1 =======');
    // await func1();
    // // bottom -> promise1

    // console.log('======= func2 =======');
    // await func2();
    // // promise1 -> promise2 -> bottom

    // console.log('======= func3 =======');
    // await func3();
    // // promise2 -> bottom -> promise1

    // console.log('======= func4 =======');
    // await func4();
    // promise1 -> bottom -> promise2

    console.log('======= func13 =======');
    await func13();

    console.log('======= func14 =======');
    await func14();

    console.log('======= end =======');
})();