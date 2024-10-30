'use strict';
/**
 * @license Angular v<unknown>
 * (c) 2010-2024 Google LLC. https://angular.io/
 * License: MIT
 */
function patchMocha(Zone) {
    Zone.__load_patch('mocha', (global, Zone) => {
        const Mocha = global.Mocha;
        if (typeof Mocha === 'undefined') {
            // return if Mocha is not available, because now zone-testing
            // will load mocha patch with jasmine/jest patch
            return;
        }
        if (typeof Zone === 'undefined') {
            throw new Error('Missing Zone.js');
        }
        const ProxyZoneSpec = Zone['ProxyZoneSpec'];
        const SyncTestZoneSpec = Zone['SyncTestZoneSpec'];
        if (!ProxyZoneSpec) {
            throw new Error('Missing ProxyZoneSpec');
        }
        if (Mocha['__zone_patch__']) {
            throw new Error('"Mocha" has already been patched with "Zone".');
        }
        Mocha['__zone_patch__'] = true;
        const rootZone = Zone.current;
        const syncZone = rootZone.fork(new SyncTestZoneSpec('Mocha.describe'));
        let testZone = null;
        const suiteZone = rootZone.fork(new ProxyZoneSpec());
        const mochaOriginal = {
            after: global.after,
            afterEach: global.afterEach,
            before: global.before,
            beforeEach: global.beforeEach,
            describe: global.describe,
            it: global.it,
        };
        function modifyArguments(args, syncTest, asyncTest) {
            for (let i = 0; i < args.length; i++) {
                let arg = args[i];
                if (typeof arg === 'function') {
                    // The `done` callback is only passed through if the function expects at
                    // least one argument.
                    // Note we have to make a function with correct number of arguments,
                    // otherwise mocha will
                    // think that all functions are sync or async.
                    args[i] = arg.length === 0 ? syncTest(arg) : asyncTest(arg);
                    // Mocha uses toString to view the test body in the result list, make sure we return the
                    // correct function body
                    args[i].toString = function () {
                        return arg.toString();
                    };
                }
            }
            return args;
        }
        function wrapDescribeInZone(args) {
            const syncTest = function (fn) {
                return function () {
                    return syncZone.run(fn, this, arguments);
                };
            };
            return modifyArguments(args, syncTest);
        }
        function wrapTestInZone(args) {
            const asyncTest = function (fn) {
                return function (done) {
                    return testZone.run(fn, this, [done]);
                };
            };
            const syncTest = function (fn) {
                return function () {
                    return testZone.run(fn, this);
                };
            };
            return modifyArguments(args, syncTest, asyncTest);
        }
        function wrapSuiteInZone(args) {
            const asyncTest = function (fn) {
                return function (done) {
                    return suiteZone.run(fn, this, [done]);
                };
            };
            const syncTest = function (fn) {
                return function () {
                    return suiteZone.run(fn, this);
                };
            };
            return modifyArguments(args, syncTest, asyncTest);
        }
        global.describe = global.suite = function () {
            return mochaOriginal.describe.apply(this, wrapDescribeInZone(arguments));
        };
        global.xdescribe =
            global.suite.skip =
                global.describe.skip =
                    function () {
                        return mochaOriginal.describe.skip.apply(this, wrapDescribeInZone(arguments));
                    };
        global.describe.only = global.suite.only = function () {
            return mochaOriginal.describe.only.apply(this, wrapDescribeInZone(arguments));
        };
        global.it =
            global.specify =
                global.test =
                    function () {
                        return mochaOriginal.it.apply(this, wrapTestInZone(arguments));
                    };
        global.xit =
            global.xspecify =
                global.it.skip =
                    function () {
                        return mochaOriginal.it.skip.apply(this, wrapTestInZone(arguments));
                    };
        global.it.only = global.test.only = function () {
            return mochaOriginal.it.only.apply(this, wrapTestInZone(arguments));
        };
        global.after = global.suiteTeardown = function () {
            return mochaOriginal.after.apply(this, wrapSuiteInZone(arguments));
        };
        global.afterEach = global.teardown = function () {
            return mochaOriginal.afterEach.apply(this, wrapTestInZone(arguments));
        };
        global.before = global.suiteSetup = function () {
            return mochaOriginal.before.apply(this, wrapSuiteInZone(arguments));
        };
        global.beforeEach = global.setup = function () {
            return mochaOriginal.beforeEach.apply(this, wrapTestInZone(arguments));
        };
        ((originalRunTest, originalRun) => {
            Mocha.Runner.prototype.runTest = function (fn) {
                Zone.current.scheduleMicroTask('mocha.forceTask', () => {
                    originalRunTest.call(this, fn);
                });
            };
            Mocha.Runner.prototype.run = function (fn) {
                this.on('test', (e) => {
                    testZone = rootZone.fork(new ProxyZoneSpec());
                });
                this.on('fail', (test, err) => {
                    const proxyZoneSpec = testZone && testZone.get('ProxyZoneSpec');
                    if (proxyZoneSpec && err) {
                        try {
                            // try catch here in case err.message is not writable
                            err.message += proxyZoneSpec.getAndClearPendingTasksInfo();
                        }
                        catch (error) { }
                    }
                });
                return originalRun.call(this, fn);
            };
        })(Mocha.Runner.prototype.runTest, Mocha.Runner.prototype.run);
    });
}

patchMocha(Zone);
