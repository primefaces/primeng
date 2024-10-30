'use strict';
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
/**
 * @license Angular v<unknown>
 * (c) 2010-2024 Google LLC. https://angular.io/
 * License: MIT
 */
(function (factory) {
    typeof define === 'function' && define.amd ? define(factory) :
        factory();
})((function () {
    'use strict';
    /**
     * @fileoverview
     * @suppress {globalThis}
     */
    function patchLongStackTrace(Zone) {
        var NEWLINE = '\n';
        var IGNORE_FRAMES = {};
        var creationTrace = '__creationTrace__';
        var ERROR_TAG = 'STACKTRACE TRACKING';
        var SEP_TAG = '__SEP_TAG__';
        var sepTemplate = SEP_TAG + '@[native]';
        var LongStackTrace = /** @class */ (function () {
            function LongStackTrace() {
                this.error = getStacktrace();
                this.timestamp = new Date();
            }
            return LongStackTrace;
        }());
        function getStacktraceWithUncaughtError() {
            return new Error(ERROR_TAG);
        }
        function getStacktraceWithCaughtError() {
            try {
                throw getStacktraceWithUncaughtError();
            }
            catch (err) {
                return err;
            }
        }
        // Some implementations of exception handling don't create a stack trace if the exception
        // isn't thrown, however it's faster not to actually throw the exception.
        var error = getStacktraceWithUncaughtError();
        var caughtError = getStacktraceWithCaughtError();
        var getStacktrace = error.stack
            ? getStacktraceWithUncaughtError
            : caughtError.stack
                ? getStacktraceWithCaughtError
                : getStacktraceWithUncaughtError;
        function getFrames(error) {
            return error.stack ? error.stack.split(NEWLINE) : [];
        }
        function addErrorStack(lines, error) {
            var trace = getFrames(error);
            for (var i = 0; i < trace.length; i++) {
                var frame = trace[i];
                // Filter out the Frames which are part of stack capturing.
                if (!IGNORE_FRAMES.hasOwnProperty(frame)) {
                    lines.push(trace[i]);
                }
            }
        }
        function renderLongStackTrace(frames, stack) {
            var longTrace = [stack ? stack.trim() : ''];
            if (frames) {
                var timestamp = new Date().getTime();
                for (var i = 0; i < frames.length; i++) {
                    var traceFrames = frames[i];
                    var lastTime = traceFrames.timestamp;
                    var separator = "____________________Elapsed ".concat(timestamp - lastTime.getTime(), " ms; At: ").concat(lastTime);
                    separator = separator.replace(/[^\w\d]/g, '_');
                    longTrace.push(sepTemplate.replace(SEP_TAG, separator));
                    addErrorStack(longTrace, traceFrames.error);
                    timestamp = lastTime.getTime();
                }
            }
            return longTrace.join(NEWLINE);
        }
        // if Error.stackTraceLimit is 0, means stack trace
        // is disabled, so we don't need to generate long stack trace
        // this will improve performance in some test(some test will
        // set stackTraceLimit to 0, https://github.com/angular/zone.js/issues/698
        function stackTracesEnabled() {
            // Cast through any since this property only exists on Error in the nodejs
            // typings.
            return Error.stackTraceLimit > 0;
        }
        Zone['longStackTraceZoneSpec'] = {
            name: 'long-stack-trace',
            longStackTraceLimit: 10, // Max number of task to keep the stack trace for.
            // add a getLongStackTrace method in spec to
            // handle handled reject promise error.
            getLongStackTrace: function (error) {
                if (!error) {
                    return undefined;
                }
                var trace = error[Zone.__symbol__('currentTaskTrace')];
                if (!trace) {
                    return error.stack;
                }
                return renderLongStackTrace(trace, error.stack);
            },
            onScheduleTask: function (parentZoneDelegate, currentZone, targetZone, task) {
                if (stackTracesEnabled()) {
                    var currentTask = Zone.currentTask;
                    var trace = (currentTask && currentTask.data && currentTask.data[creationTrace]) || [];
                    trace = [new LongStackTrace()].concat(trace);
                    if (trace.length > this.longStackTraceLimit) {
                        trace.length = this.longStackTraceLimit;
                    }
                    if (!task.data)
                        task.data = {};
                    if (task.type === 'eventTask') {
                        // Fix issue https://github.com/angular/zone.js/issues/1195,
                        // For event task of browser, by default, all task will share a
                        // singleton instance of data object, we should create a new one here
                        // The cast to `any` is required to workaround a closure bug which wrongly applies
                        // URL sanitization rules to .data access.
                        task.data = __assign({}, task.data);
                    }
                    task.data[creationTrace] = trace;
                }
                return parentZoneDelegate.scheduleTask(targetZone, task);
            },
            onHandleError: function (parentZoneDelegate, currentZone, targetZone, error) {
                if (stackTracesEnabled()) {
                    var parentTask = Zone.currentTask || error.task;
                    if (error instanceof Error && parentTask) {
                        var longStack = renderLongStackTrace(parentTask.data && parentTask.data[creationTrace], error.stack);
                        try {
                            error.stack = error.longStack = longStack;
                        }
                        catch (err) { }
                    }
                }
                return parentZoneDelegate.handleError(targetZone, error);
            },
        };
        function captureStackTraces(stackTraces, count) {
            if (count > 0) {
                stackTraces.push(getFrames(new LongStackTrace().error));
                captureStackTraces(stackTraces, count - 1);
            }
        }
        function computeIgnoreFrames() {
            if (!stackTracesEnabled()) {
                return;
            }
            var frames = [];
            captureStackTraces(frames, 2);
            var frames1 = frames[0];
            var frames2 = frames[1];
            for (var i = 0; i < frames1.length; i++) {
                var frame1 = frames1[i];
                if (frame1.indexOf(ERROR_TAG) == -1) {
                    var match = frame1.match(/^\s*at\s+/);
                    if (match) {
                        sepTemplate = match[0] + SEP_TAG + ' (http://localhost)';
                        break;
                    }
                }
            }
            for (var i = 0; i < frames1.length; i++) {
                var frame1 = frames1[i];
                var frame2 = frames2[i];
                if (frame1 === frame2) {
                    IGNORE_FRAMES[frame1] = true;
                }
                else {
                    break;
                }
            }
        }
        computeIgnoreFrames();
    }
    patchLongStackTrace(Zone);
}));
