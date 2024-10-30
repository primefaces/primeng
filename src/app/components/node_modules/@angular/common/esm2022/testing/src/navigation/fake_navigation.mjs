/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Fake implementation of user agent history and navigation behavior. This is a
 * high-fidelity implementation of browser behavior that attempts to emulate
 * things like traversal delay.
 */
export class FakeNavigation {
    /** Equivalent to `navigation.currentEntry`. */
    get currentEntry() {
        return this.entriesArr[this.currentEntryIndex];
    }
    get canGoBack() {
        return this.currentEntryIndex > 0;
    }
    get canGoForward() {
        return this.currentEntryIndex < this.entriesArr.length - 1;
    }
    constructor(window, startURL) {
        this.window = window;
        /**
         * The fake implementation of an entries array. Only same-document entries
         * allowed.
         */
        this.entriesArr = [];
        /**
         * The current active entry index into `entriesArr`.
         */
        this.currentEntryIndex = 0;
        /**
         * The current navigate event.
         */
        this.navigateEvent = undefined;
        /**
         * A Map of pending traversals, so that traversals to the same entry can be
         * re-used.
         */
        this.traversalQueue = new Map();
        /**
         * A Promise that resolves when the previous traversals have finished. Used to
         * simulate the cross-process communication necessary for traversals.
         */
        this.nextTraversal = Promise.resolve();
        /**
         * A prospective current active entry index, which includes unresolved
         * traversals. Used by `go` to determine where navigations are intended to go.
         */
        this.prospectiveEntryIndex = 0;
        /**
         * A test-only option to make traversals synchronous, rather than emulate
         * cross-process communication.
         */
        this.synchronousTraversals = false;
        /** Whether to allow a call to setInitialEntryForTesting. */
        this.canSetInitialEntry = true;
        /** `EventTarget` to dispatch events. */
        this.eventTarget = this.window.document.createElement('div');
        /** The next unique id for created entries. Replace recreates this id. */
        this.nextId = 0;
        /** The next unique key for created entries. Replace inherits this id. */
        this.nextKey = 0;
        /** Whether this fake is disposed. */
        this.disposed = false;
        // First entry.
        this.setInitialEntryForTesting(startURL);
    }
    /**
     * Sets the initial entry.
     */
    setInitialEntryForTesting(url, options = { historyState: null }) {
        if (!this.canSetInitialEntry) {
            throw new Error('setInitialEntryForTesting can only be called before any ' + 'navigation has occurred');
        }
        const currentInitialEntry = this.entriesArr[0];
        this.entriesArr[0] = new FakeNavigationHistoryEntry(new URL(url).toString(), {
            index: 0,
            key: currentInitialEntry?.key ?? String(this.nextKey++),
            id: currentInitialEntry?.id ?? String(this.nextId++),
            sameDocument: true,
            historyState: options?.historyState,
            state: options.state,
        });
    }
    /** Returns whether the initial entry is still eligible to be set. */
    canSetInitialEntryForTesting() {
        return this.canSetInitialEntry;
    }
    /**
     * Sets whether to emulate traversals as synchronous rather than
     * asynchronous.
     */
    setSynchronousTraversalsForTesting(synchronousTraversals) {
        this.synchronousTraversals = synchronousTraversals;
    }
    /** Equivalent to `navigation.entries()`. */
    entries() {
        return this.entriesArr.slice();
    }
    /** Equivalent to `navigation.navigate()`. */
    navigate(url, options) {
        const fromUrl = new URL(this.currentEntry.url);
        const toUrl = new URL(url, this.currentEntry.url);
        let navigationType;
        if (!options?.history || options.history === 'auto') {
            // Auto defaults to push, but if the URLs are the same, is a replace.
            if (fromUrl.toString() === toUrl.toString()) {
                navigationType = 'replace';
            }
            else {
                navigationType = 'push';
            }
        }
        else {
            navigationType = options.history;
        }
        const hashChange = isHashChange(fromUrl, toUrl);
        const destination = new FakeNavigationDestination({
            url: toUrl.toString(),
            state: options?.state,
            sameDocument: hashChange,
            historyState: null,
        });
        const result = new InternalNavigationResult();
        this.userAgentNavigate(destination, result, {
            navigationType,
            cancelable: true,
            canIntercept: true,
            // Always false for navigate().
            userInitiated: false,
            hashChange,
            info: options?.info,
        });
        return {
            committed: result.committed,
            finished: result.finished,
        };
    }
    /** Equivalent to `history.pushState()`. */
    pushState(data, title, url) {
        this.pushOrReplaceState('push', data, title, url);
    }
    /** Equivalent to `history.replaceState()`. */
    replaceState(data, title, url) {
        this.pushOrReplaceState('replace', data, title, url);
    }
    pushOrReplaceState(navigationType, data, _title, url) {
        const fromUrl = new URL(this.currentEntry.url);
        const toUrl = url ? new URL(url, this.currentEntry.url) : fromUrl;
        const hashChange = isHashChange(fromUrl, toUrl);
        const destination = new FakeNavigationDestination({
            url: toUrl.toString(),
            sameDocument: true,
            historyState: data,
        });
        const result = new InternalNavigationResult();
        this.userAgentNavigate(destination, result, {
            navigationType,
            cancelable: true,
            canIntercept: true,
            // Always false for pushState() or replaceState().
            userInitiated: false,
            hashChange,
            skipPopState: true,
        });
    }
    /** Equivalent to `navigation.traverseTo()`. */
    traverseTo(key, options) {
        const fromUrl = new URL(this.currentEntry.url);
        const entry = this.findEntry(key);
        if (!entry) {
            const domException = new DOMException('Invalid key', 'InvalidStateError');
            const committed = Promise.reject(domException);
            const finished = Promise.reject(domException);
            committed.catch(() => { });
            finished.catch(() => { });
            return {
                committed,
                finished,
            };
        }
        if (entry === this.currentEntry) {
            return {
                committed: Promise.resolve(this.currentEntry),
                finished: Promise.resolve(this.currentEntry),
            };
        }
        if (this.traversalQueue.has(entry.key)) {
            const existingResult = this.traversalQueue.get(entry.key);
            return {
                committed: existingResult.committed,
                finished: existingResult.finished,
            };
        }
        const hashChange = isHashChange(fromUrl, new URL(entry.url, this.currentEntry.url));
        const destination = new FakeNavigationDestination({
            url: entry.url,
            state: entry.getState(),
            historyState: entry.getHistoryState(),
            key: entry.key,
            id: entry.id,
            index: entry.index,
            sameDocument: entry.sameDocument,
        });
        this.prospectiveEntryIndex = entry.index;
        const result = new InternalNavigationResult();
        this.traversalQueue.set(entry.key, result);
        this.runTraversal(() => {
            this.traversalQueue.delete(entry.key);
            this.userAgentNavigate(destination, result, {
                navigationType: 'traverse',
                cancelable: true,
                canIntercept: true,
                // Always false for traverseTo().
                userInitiated: false,
                hashChange,
                info: options?.info,
            });
        });
        return {
            committed: result.committed,
            finished: result.finished,
        };
    }
    /** Equivalent to `navigation.back()`. */
    back(options) {
        if (this.currentEntryIndex === 0) {
            const domException = new DOMException('Cannot go back', 'InvalidStateError');
            const committed = Promise.reject(domException);
            const finished = Promise.reject(domException);
            committed.catch(() => { });
            finished.catch(() => { });
            return {
                committed,
                finished,
            };
        }
        const entry = this.entriesArr[this.currentEntryIndex - 1];
        return this.traverseTo(entry.key, options);
    }
    /** Equivalent to `navigation.forward()`. */
    forward(options) {
        if (this.currentEntryIndex === this.entriesArr.length - 1) {
            const domException = new DOMException('Cannot go forward', 'InvalidStateError');
            const committed = Promise.reject(domException);
            const finished = Promise.reject(domException);
            committed.catch(() => { });
            finished.catch(() => { });
            return {
                committed,
                finished,
            };
        }
        const entry = this.entriesArr[this.currentEntryIndex + 1];
        return this.traverseTo(entry.key, options);
    }
    /**
     * Equivalent to `history.go()`.
     * Note that this method does not actually work precisely to how Chrome
     * does, instead choosing a simpler model with less unexpected behavior.
     * Chrome has a few edge case optimizations, for instance with repeated
     * `back(); forward()` chains it collapses certain traversals.
     */
    go(direction) {
        const targetIndex = this.prospectiveEntryIndex + direction;
        if (targetIndex >= this.entriesArr.length || targetIndex < 0) {
            return;
        }
        this.prospectiveEntryIndex = targetIndex;
        this.runTraversal(() => {
            // Check again that destination is in the entries array.
            if (targetIndex >= this.entriesArr.length || targetIndex < 0) {
                return;
            }
            const fromUrl = new URL(this.currentEntry.url);
            const entry = this.entriesArr[targetIndex];
            const hashChange = isHashChange(fromUrl, new URL(entry.url, this.currentEntry.url));
            const destination = new FakeNavigationDestination({
                url: entry.url,
                state: entry.getState(),
                historyState: entry.getHistoryState(),
                key: entry.key,
                id: entry.id,
                index: entry.index,
                sameDocument: entry.sameDocument,
            });
            const result = new InternalNavigationResult();
            this.userAgentNavigate(destination, result, {
                navigationType: 'traverse',
                cancelable: true,
                canIntercept: true,
                // Always false for go().
                userInitiated: false,
                hashChange,
            });
        });
    }
    /** Runs a traversal synchronously or asynchronously */
    runTraversal(traversal) {
        if (this.synchronousTraversals) {
            traversal();
            return;
        }
        // Each traversal occupies a single timeout resolution.
        // This means that Promises added to commit and finish should resolve
        // before the next traversal.
        this.nextTraversal = this.nextTraversal.then(() => {
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve();
                    traversal();
                });
            });
        });
    }
    /** Equivalent to `navigation.addEventListener()`. */
    addEventListener(type, callback, options) {
        this.eventTarget.addEventListener(type, callback, options);
    }
    /** Equivalent to `navigation.removeEventListener()`. */
    removeEventListener(type, callback, options) {
        this.eventTarget.removeEventListener(type, callback, options);
    }
    /** Equivalent to `navigation.dispatchEvent()` */
    dispatchEvent(event) {
        return this.eventTarget.dispatchEvent(event);
    }
    /** Cleans up resources. */
    dispose() {
        // Recreate eventTarget to release current listeners.
        // `document.createElement` because NodeJS `EventTarget` is incompatible with Domino's `Event`.
        this.eventTarget = this.window.document.createElement('div');
        this.disposed = true;
    }
    /** Returns whether this fake is disposed. */
    isDisposed() {
        return this.disposed;
    }
    /** Implementation for all navigations and traversals. */
    userAgentNavigate(destination, result, options) {
        // The first navigation should disallow any future calls to set the initial
        // entry.
        this.canSetInitialEntry = false;
        if (this.navigateEvent) {
            this.navigateEvent.cancel(new DOMException('Navigation was aborted', 'AbortError'));
            this.navigateEvent = undefined;
        }
        const navigateEvent = createFakeNavigateEvent({
            navigationType: options.navigationType,
            cancelable: options.cancelable,
            canIntercept: options.canIntercept,
            userInitiated: options.userInitiated,
            hashChange: options.hashChange,
            signal: result.signal,
            destination,
            info: options.info,
            sameDocument: destination.sameDocument,
            skipPopState: options.skipPopState,
            result,
            userAgentCommit: () => {
                this.userAgentCommit();
            },
        });
        this.navigateEvent = navigateEvent;
        this.eventTarget.dispatchEvent(navigateEvent);
        navigateEvent.dispatchedNavigateEvent();
        if (navigateEvent.commitOption === 'immediate') {
            navigateEvent.commit(/* internal= */ true);
        }
    }
    /** Implementation to commit a navigation. */
    userAgentCommit() {
        if (!this.navigateEvent) {
            return;
        }
        const from = this.currentEntry;
        if (!this.navigateEvent.sameDocument) {
            const error = new Error('Cannot navigate to a non-same-document URL.');
            this.navigateEvent.cancel(error);
            throw error;
        }
        if (this.navigateEvent.navigationType === 'push' ||
            this.navigateEvent.navigationType === 'replace') {
            this.userAgentPushOrReplace(this.navigateEvent.destination, {
                navigationType: this.navigateEvent.navigationType,
            });
        }
        else if (this.navigateEvent.navigationType === 'traverse') {
            this.userAgentTraverse(this.navigateEvent.destination);
        }
        this.navigateEvent.userAgentNavigated(this.currentEntry);
        const currentEntryChangeEvent = createFakeNavigationCurrentEntryChangeEvent({
            from,
            navigationType: this.navigateEvent.navigationType,
        });
        this.eventTarget.dispatchEvent(currentEntryChangeEvent);
        if (!this.navigateEvent.skipPopState) {
            const popStateEvent = createPopStateEvent({
                state: this.navigateEvent.destination.getHistoryState(),
            });
            this.window.dispatchEvent(popStateEvent);
        }
    }
    /** Implementation for a push or replace navigation. */
    userAgentPushOrReplace(destination, { navigationType }) {
        if (navigationType === 'push') {
            this.currentEntryIndex++;
            this.prospectiveEntryIndex = this.currentEntryIndex;
        }
        const index = this.currentEntryIndex;
        const key = navigationType === 'push' ? String(this.nextKey++) : this.currentEntry.key;
        const entry = new FakeNavigationHistoryEntry(destination.url, {
            id: String(this.nextId++),
            key,
            index,
            sameDocument: true,
            state: destination.getState(),
            historyState: destination.getHistoryState(),
        });
        if (navigationType === 'push') {
            this.entriesArr.splice(index, Infinity, entry);
        }
        else {
            this.entriesArr[index] = entry;
        }
    }
    /** Implementation for a traverse navigation. */
    userAgentTraverse(destination) {
        this.currentEntryIndex = destination.index;
    }
    /** Utility method for finding entries with the given `key`. */
    findEntry(key) {
        for (const entry of this.entriesArr) {
            if (entry.key === key)
                return entry;
        }
        return undefined;
    }
    set onnavigate(_handler) {
        throw new Error('unimplemented');
    }
    get onnavigate() {
        throw new Error('unimplemented');
    }
    set oncurrententrychange(_handler) {
        throw new Error('unimplemented');
    }
    get oncurrententrychange() {
        throw new Error('unimplemented');
    }
    set onnavigatesuccess(_handler) {
        throw new Error('unimplemented');
    }
    get onnavigatesuccess() {
        throw new Error('unimplemented');
    }
    set onnavigateerror(_handler) {
        throw new Error('unimplemented');
    }
    get onnavigateerror() {
        throw new Error('unimplemented');
    }
    get transition() {
        throw new Error('unimplemented');
    }
    updateCurrentEntry(_options) {
        throw new Error('unimplemented');
    }
    reload(_options) {
        throw new Error('unimplemented');
    }
}
/**
 * Fake equivalent of `NavigationHistoryEntry`.
 */
export class FakeNavigationHistoryEntry {
    constructor(url, { id, key, index, sameDocument, state, historyState, }) {
        this.url = url;
        // tslint:disable-next-line:no-any
        this.ondispose = null;
        this.id = id;
        this.key = key;
        this.index = index;
        this.sameDocument = sameDocument;
        this.state = state;
        this.historyState = historyState;
    }
    getState() {
        // Budget copy.
        return this.state ? JSON.parse(JSON.stringify(this.state)) : this.state;
    }
    getHistoryState() {
        // Budget copy.
        return this.historyState ? JSON.parse(JSON.stringify(this.historyState)) : this.historyState;
    }
    addEventListener(type, callback, options) {
        throw new Error('unimplemented');
    }
    removeEventListener(type, callback, options) {
        throw new Error('unimplemented');
    }
    dispatchEvent(event) {
        throw new Error('unimplemented');
    }
}
/**
 * Create a fake equivalent of `NavigateEvent`. This is not a class because ES5
 * transpiled JavaScript cannot extend native Event.
 */
function createFakeNavigateEvent({ cancelable, canIntercept, userInitiated, hashChange, navigationType, signal, destination, info, sameDocument, skipPopState, result, userAgentCommit, }) {
    const event = new Event('navigate', { bubbles: false, cancelable });
    event.canIntercept = canIntercept;
    event.userInitiated = userInitiated;
    event.hashChange = hashChange;
    event.navigationType = navigationType;
    event.signal = signal;
    event.destination = destination;
    event.info = info;
    event.downloadRequest = null;
    event.formData = null;
    event.sameDocument = sameDocument;
    event.skipPopState = skipPopState;
    event.commitOption = 'immediate';
    let handlerFinished = undefined;
    let interceptCalled = false;
    let dispatchedNavigateEvent = false;
    let commitCalled = false;
    event.intercept = function (options) {
        interceptCalled = true;
        event.sameDocument = true;
        const handler = options?.handler;
        if (handler) {
            handlerFinished = handler();
        }
        if (options?.commit) {
            event.commitOption = options.commit;
        }
        if (options?.focusReset !== undefined || options?.scroll !== undefined) {
            throw new Error('unimplemented');
        }
    };
    event.scroll = function () {
        throw new Error('unimplemented');
    };
    event.commit = function (internal = false) {
        if (!internal && !interceptCalled) {
            throw new DOMException(`Failed to execute 'commit' on 'NavigateEvent': intercept() must be ` +
                `called before commit().`, 'InvalidStateError');
        }
        if (!dispatchedNavigateEvent) {
            throw new DOMException(`Failed to execute 'commit' on 'NavigateEvent': commit() may not be ` +
                `called during event dispatch.`, 'InvalidStateError');
        }
        if (commitCalled) {
            throw new DOMException(`Failed to execute 'commit' on 'NavigateEvent': commit() already ` + `called.`, 'InvalidStateError');
        }
        commitCalled = true;
        userAgentCommit();
    };
    // Internal only.
    event.cancel = function (reason) {
        result.committedReject(reason);
        result.finishedReject(reason);
    };
    // Internal only.
    event.dispatchedNavigateEvent = function () {
        dispatchedNavigateEvent = true;
        if (event.commitOption === 'after-transition') {
            // If handler finishes before commit, call commit.
            handlerFinished?.then(() => {
                if (!commitCalled) {
                    event.commit(/* internal */ true);
                }
            }, () => { });
        }
        Promise.all([result.committed, handlerFinished]).then(([entry]) => {
            result.finishedResolve(entry);
        }, (reason) => {
            result.finishedReject(reason);
        });
    };
    // Internal only.
    event.userAgentNavigated = function (entry) {
        result.committedResolve(entry);
    };
    return event;
}
/**
 * Create a fake equivalent of `NavigationCurrentEntryChange`. This does not use
 * a class because ES5 transpiled JavaScript cannot extend native Event.
 */
function createFakeNavigationCurrentEntryChangeEvent({ from, navigationType, }) {
    const event = new Event('currententrychange', {
        bubbles: false,
        cancelable: false,
    });
    event.from = from;
    event.navigationType = navigationType;
    return event;
}
/**
 * Create a fake equivalent of `PopStateEvent`. This does not use a class
 * because ES5 transpiled JavaScript cannot extend native Event.
 */
function createPopStateEvent({ state }) {
    const event = new Event('popstate', {
        bubbles: false,
        cancelable: false,
    });
    event.state = state;
    return event;
}
/**
 * Fake equivalent of `NavigationDestination`.
 */
export class FakeNavigationDestination {
    constructor({ url, sameDocument, historyState, state, key = null, id = null, index = -1, }) {
        this.url = url;
        this.sameDocument = sameDocument;
        this.state = state;
        this.historyState = historyState;
        this.key = key;
        this.id = id;
        this.index = index;
    }
    getState() {
        return this.state;
    }
    getHistoryState() {
        return this.historyState;
    }
}
/** Utility function to determine whether two UrlLike have the same hash. */
function isHashChange(from, to) {
    return (to.hash !== from.hash &&
        to.hostname === from.hostname &&
        to.pathname === from.pathname &&
        to.search === from.search);
}
/** Internal utility class for representing the result of a navigation.  */
class InternalNavigationResult {
    get signal() {
        return this.abortController.signal;
    }
    constructor() {
        this.abortController = new AbortController();
        this.committed = new Promise((resolve, reject) => {
            this.committedResolve = resolve;
            this.committedReject = reject;
        });
        this.finished = new Promise(async (resolve, reject) => {
            this.finishedResolve = resolve;
            this.finishedReject = (reason) => {
                reject(reason);
                this.abortController.abort(reason);
            };
        });
        // All rejections are handled.
        this.committed.catch(() => { });
        this.finished.catch(() => { });
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmFrZV9uYXZpZ2F0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvY29tbW9uL3Rlc3Rpbmcvc3JjL25hdmlnYXRpb24vZmFrZV9uYXZpZ2F0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQWtCSDs7OztHQUlHO0FBQ0gsTUFBTSxPQUFPLGNBQWM7SUF3RHpCLCtDQUErQztJQUMvQyxJQUFJLFlBQVk7UUFDZCxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUM7SUFDakQsQ0FBQztJQUVELElBQUksU0FBUztRQUNYLE9BQU8sSUFBSSxDQUFDLGlCQUFpQixHQUFHLENBQUMsQ0FBQztJQUNwQyxDQUFDO0lBRUQsSUFBSSxZQUFZO1FBQ2QsT0FBTyxJQUFJLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO0lBQzdELENBQUM7SUFFRCxZQUNtQixNQUFjLEVBQy9CLFFBQXlCO1FBRFIsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQXJFakM7OztXQUdHO1FBQ2MsZUFBVSxHQUFpQyxFQUFFLENBQUM7UUFFL0Q7O1dBRUc7UUFDSyxzQkFBaUIsR0FBRyxDQUFDLENBQUM7UUFFOUI7O1dBRUc7UUFDSyxrQkFBYSxHQUEwQyxTQUFTLENBQUM7UUFFekU7OztXQUdHO1FBQ2MsbUJBQWMsR0FBRyxJQUFJLEdBQUcsRUFBb0MsQ0FBQztRQUU5RTs7O1dBR0c7UUFDSyxrQkFBYSxHQUFHLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUUxQzs7O1dBR0c7UUFDSywwQkFBcUIsR0FBRyxDQUFDLENBQUM7UUFFbEM7OztXQUdHO1FBQ0ssMEJBQXFCLEdBQUcsS0FBSyxDQUFDO1FBRXRDLDREQUE0RDtRQUNwRCx1QkFBa0IsR0FBRyxJQUFJLENBQUM7UUFFbEMsd0NBQXdDO1FBQ2hDLGdCQUFXLEdBQWdCLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUU3RSx5RUFBeUU7UUFDakUsV0FBTSxHQUFHLENBQUMsQ0FBQztRQUVuQix5RUFBeUU7UUFDakUsWUFBTyxHQUFHLENBQUMsQ0FBQztRQUVwQixxQ0FBcUM7UUFDN0IsYUFBUSxHQUFHLEtBQUssQ0FBQztRQW1CdkIsZUFBZTtRQUNmLElBQUksQ0FBQyx5QkFBeUIsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUMzQyxDQUFDO0lBRUQ7O09BRUc7SUFDSyx5QkFBeUIsQ0FDL0IsR0FBb0IsRUFDcEIsVUFBb0QsRUFBQyxZQUFZLEVBQUUsSUFBSSxFQUFDO1FBRXhFLElBQUksQ0FBQyxJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztZQUM3QixNQUFNLElBQUksS0FBSyxDQUNiLDBEQUEwRCxHQUFHLHlCQUF5QixDQUN2RixDQUFDO1FBQ0osQ0FBQztRQUNELE1BQU0sbUJBQW1CLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMvQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksMEJBQTBCLENBQUMsSUFBSSxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsUUFBUSxFQUFFLEVBQUU7WUFDM0UsS0FBSyxFQUFFLENBQUM7WUFDUixHQUFHLEVBQUUsbUJBQW1CLEVBQUUsR0FBRyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDdkQsRUFBRSxFQUFFLG1CQUFtQixFQUFFLEVBQUUsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQ3BELFlBQVksRUFBRSxJQUFJO1lBQ2xCLFlBQVksRUFBRSxPQUFPLEVBQUUsWUFBWTtZQUNuQyxLQUFLLEVBQUUsT0FBTyxDQUFDLEtBQUs7U0FDckIsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELHFFQUFxRTtJQUNyRSw0QkFBNEI7UUFDMUIsT0FBTyxJQUFJLENBQUMsa0JBQWtCLENBQUM7SUFDakMsQ0FBQztJQUVEOzs7T0FHRztJQUNILGtDQUFrQyxDQUFDLHFCQUE4QjtRQUMvRCxJQUFJLENBQUMscUJBQXFCLEdBQUcscUJBQXFCLENBQUM7SUFDckQsQ0FBQztJQUVELDRDQUE0QztJQUM1QyxPQUFPO1FBQ0wsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQ2pDLENBQUM7SUFFRCw2Q0FBNkM7SUFDN0MsUUFBUSxDQUFDLEdBQVcsRUFBRSxPQUFtQztRQUN2RCxNQUFNLE9BQU8sR0FBRyxJQUFJLEdBQUcsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUksQ0FBQyxDQUFDO1FBQ2hELE1BQU0sS0FBSyxHQUFHLElBQUksR0FBRyxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUksQ0FBQyxDQUFDO1FBRW5ELElBQUksY0FBb0MsQ0FBQztRQUN6QyxJQUFJLENBQUMsT0FBTyxFQUFFLE9BQU8sSUFBSSxPQUFPLENBQUMsT0FBTyxLQUFLLE1BQU0sRUFBRSxDQUFDO1lBQ3BELHFFQUFxRTtZQUNyRSxJQUFJLE9BQU8sQ0FBQyxRQUFRLEVBQUUsS0FBSyxLQUFLLENBQUMsUUFBUSxFQUFFLEVBQUUsQ0FBQztnQkFDNUMsY0FBYyxHQUFHLFNBQVMsQ0FBQztZQUM3QixDQUFDO2lCQUFNLENBQUM7Z0JBQ04sY0FBYyxHQUFHLE1BQU0sQ0FBQztZQUMxQixDQUFDO1FBQ0gsQ0FBQzthQUFNLENBQUM7WUFDTixjQUFjLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQztRQUNuQyxDQUFDO1FBRUQsTUFBTSxVQUFVLEdBQUcsWUFBWSxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsQ0FBQztRQUVoRCxNQUFNLFdBQVcsR0FBRyxJQUFJLHlCQUF5QixDQUFDO1lBQ2hELEdBQUcsRUFBRSxLQUFLLENBQUMsUUFBUSxFQUFFO1lBQ3JCLEtBQUssRUFBRSxPQUFPLEVBQUUsS0FBSztZQUNyQixZQUFZLEVBQUUsVUFBVTtZQUN4QixZQUFZLEVBQUUsSUFBSTtTQUNuQixDQUFDLENBQUM7UUFDSCxNQUFNLE1BQU0sR0FBRyxJQUFJLHdCQUF3QixFQUFFLENBQUM7UUFFOUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFdBQVcsRUFBRSxNQUFNLEVBQUU7WUFDMUMsY0FBYztZQUNkLFVBQVUsRUFBRSxJQUFJO1lBQ2hCLFlBQVksRUFBRSxJQUFJO1lBQ2xCLCtCQUErQjtZQUMvQixhQUFhLEVBQUUsS0FBSztZQUNwQixVQUFVO1lBQ1YsSUFBSSxFQUFFLE9BQU8sRUFBRSxJQUFJO1NBQ3BCLENBQUMsQ0FBQztRQUVILE9BQU87WUFDTCxTQUFTLEVBQUUsTUFBTSxDQUFDLFNBQVM7WUFDM0IsUUFBUSxFQUFFLE1BQU0sQ0FBQyxRQUFRO1NBQzFCLENBQUM7SUFDSixDQUFDO0lBRUQsMkNBQTJDO0lBQzNDLFNBQVMsQ0FBQyxJQUFhLEVBQUUsS0FBYSxFQUFFLEdBQVk7UUFDbEQsSUFBSSxDQUFDLGtCQUFrQixDQUFDLE1BQU0sRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQ3BELENBQUM7SUFFRCw4Q0FBOEM7SUFDOUMsWUFBWSxDQUFDLElBQWEsRUFBRSxLQUFhLEVBQUUsR0FBWTtRQUNyRCxJQUFJLENBQUMsa0JBQWtCLENBQUMsU0FBUyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDdkQsQ0FBQztJQUVPLGtCQUFrQixDQUN4QixjQUFvQyxFQUNwQyxJQUFhLEVBQ2IsTUFBYyxFQUNkLEdBQVk7UUFFWixNQUFNLE9BQU8sR0FBRyxJQUFJLEdBQUcsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUksQ0FBQyxDQUFDO1FBQ2hELE1BQU0sS0FBSyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxHQUFHLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQztRQUVuRSxNQUFNLFVBQVUsR0FBRyxZQUFZLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBRWhELE1BQU0sV0FBVyxHQUFHLElBQUkseUJBQXlCLENBQUM7WUFDaEQsR0FBRyxFQUFFLEtBQUssQ0FBQyxRQUFRLEVBQUU7WUFDckIsWUFBWSxFQUFFLElBQUk7WUFDbEIsWUFBWSxFQUFFLElBQUk7U0FDbkIsQ0FBQyxDQUFDO1FBQ0gsTUFBTSxNQUFNLEdBQUcsSUFBSSx3QkFBd0IsRUFBRSxDQUFDO1FBRTlDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxXQUFXLEVBQUUsTUFBTSxFQUFFO1lBQzFDLGNBQWM7WUFDZCxVQUFVLEVBQUUsSUFBSTtZQUNoQixZQUFZLEVBQUUsSUFBSTtZQUNsQixrREFBa0Q7WUFDbEQsYUFBYSxFQUFFLEtBQUs7WUFDcEIsVUFBVTtZQUNWLFlBQVksRUFBRSxJQUFJO1NBQ25CLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCwrQ0FBK0M7SUFDL0MsVUFBVSxDQUFDLEdBQVcsRUFBRSxPQUEyQjtRQUNqRCxNQUFNLE9BQU8sR0FBRyxJQUFJLEdBQUcsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUksQ0FBQyxDQUFDO1FBQ2hELE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDbEMsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQ1gsTUFBTSxZQUFZLEdBQUcsSUFBSSxZQUFZLENBQUMsYUFBYSxFQUFFLG1CQUFtQixDQUFDLENBQUM7WUFDMUUsTUFBTSxTQUFTLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQztZQUMvQyxNQUFNLFFBQVEsR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDO1lBQzlDLFNBQVMsQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLEdBQUUsQ0FBQyxDQUFDLENBQUM7WUFDMUIsUUFBUSxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsR0FBRSxDQUFDLENBQUMsQ0FBQztZQUN6QixPQUFPO2dCQUNMLFNBQVM7Z0JBQ1QsUUFBUTthQUNULENBQUM7UUFDSixDQUFDO1FBQ0QsSUFBSSxLQUFLLEtBQUssSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1lBQ2hDLE9BQU87Z0JBQ0wsU0FBUyxFQUFFLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQztnQkFDN0MsUUFBUSxFQUFFLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQzthQUM3QyxDQUFDO1FBQ0osQ0FBQztRQUNELElBQUksSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUM7WUFDdkMsTUFBTSxjQUFjLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBRSxDQUFDO1lBQzNELE9BQU87Z0JBQ0wsU0FBUyxFQUFFLGNBQWMsQ0FBQyxTQUFTO2dCQUNuQyxRQUFRLEVBQUUsY0FBYyxDQUFDLFFBQVE7YUFDbEMsQ0FBQztRQUNKLENBQUM7UUFFRCxNQUFNLFVBQVUsR0FBRyxZQUFZLENBQUMsT0FBTyxFQUFFLElBQUksR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFJLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFJLENBQUMsQ0FBQyxDQUFDO1FBQ3RGLE1BQU0sV0FBVyxHQUFHLElBQUkseUJBQXlCLENBQUM7WUFDaEQsR0FBRyxFQUFFLEtBQUssQ0FBQyxHQUFJO1lBQ2YsS0FBSyxFQUFFLEtBQUssQ0FBQyxRQUFRLEVBQUU7WUFDdkIsWUFBWSxFQUFFLEtBQUssQ0FBQyxlQUFlLEVBQUU7WUFDckMsR0FBRyxFQUFFLEtBQUssQ0FBQyxHQUFHO1lBQ2QsRUFBRSxFQUFFLEtBQUssQ0FBQyxFQUFFO1lBQ1osS0FBSyxFQUFFLEtBQUssQ0FBQyxLQUFLO1lBQ2xCLFlBQVksRUFBRSxLQUFLLENBQUMsWUFBWTtTQUNqQyxDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMscUJBQXFCLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQztRQUN6QyxNQUFNLE1BQU0sR0FBRyxJQUFJLHdCQUF3QixFQUFFLENBQUM7UUFDOUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxNQUFNLENBQUMsQ0FBQztRQUMzQyxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsRUFBRTtZQUNyQixJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDdEMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFdBQVcsRUFBRSxNQUFNLEVBQUU7Z0JBQzFDLGNBQWMsRUFBRSxVQUFVO2dCQUMxQixVQUFVLEVBQUUsSUFBSTtnQkFDaEIsWUFBWSxFQUFFLElBQUk7Z0JBQ2xCLGlDQUFpQztnQkFDakMsYUFBYSxFQUFFLEtBQUs7Z0JBQ3BCLFVBQVU7Z0JBQ1YsSUFBSSxFQUFFLE9BQU8sRUFBRSxJQUFJO2FBQ3BCLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO1FBQ0gsT0FBTztZQUNMLFNBQVMsRUFBRSxNQUFNLENBQUMsU0FBUztZQUMzQixRQUFRLEVBQUUsTUFBTSxDQUFDLFFBQVE7U0FDMUIsQ0FBQztJQUNKLENBQUM7SUFFRCx5Q0FBeUM7SUFDekMsSUFBSSxDQUFDLE9BQTJCO1FBQzlCLElBQUksSUFBSSxDQUFDLGlCQUFpQixLQUFLLENBQUMsRUFBRSxDQUFDO1lBQ2pDLE1BQU0sWUFBWSxHQUFHLElBQUksWUFBWSxDQUFDLGdCQUFnQixFQUFFLG1CQUFtQixDQUFDLENBQUM7WUFDN0UsTUFBTSxTQUFTLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQztZQUMvQyxNQUFNLFFBQVEsR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDO1lBQzlDLFNBQVMsQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLEdBQUUsQ0FBQyxDQUFDLENBQUM7WUFDMUIsUUFBUSxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsR0FBRSxDQUFDLENBQUMsQ0FBQztZQUN6QixPQUFPO2dCQUNMLFNBQVM7Z0JBQ1QsUUFBUTthQUNULENBQUM7UUFDSixDQUFDO1FBQ0QsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDMUQsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDN0MsQ0FBQztJQUVELDRDQUE0QztJQUM1QyxPQUFPLENBQUMsT0FBMkI7UUFDakMsSUFBSSxJQUFJLENBQUMsaUJBQWlCLEtBQUssSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFLENBQUM7WUFDMUQsTUFBTSxZQUFZLEdBQUcsSUFBSSxZQUFZLENBQUMsbUJBQW1CLEVBQUUsbUJBQW1CLENBQUMsQ0FBQztZQUNoRixNQUFNLFNBQVMsR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDO1lBQy9DLE1BQU0sUUFBUSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUM7WUFDOUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsR0FBRSxDQUFDLENBQUMsQ0FBQztZQUMxQixRQUFRLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxHQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ3pCLE9BQU87Z0JBQ0wsU0FBUztnQkFDVCxRQUFRO2FBQ1QsQ0FBQztRQUNKLENBQUM7UUFDRCxNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUMxRCxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxPQUFPLENBQUMsQ0FBQztJQUM3QyxDQUFDO0lBRUQ7Ozs7OztPQU1HO0lBQ0gsRUFBRSxDQUFDLFNBQWlCO1FBQ2xCLE1BQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxxQkFBcUIsR0FBRyxTQUFTLENBQUM7UUFDM0QsSUFBSSxXQUFXLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLElBQUksV0FBVyxHQUFHLENBQUMsRUFBRSxDQUFDO1lBQzdELE9BQU87UUFDVCxDQUFDO1FBQ0QsSUFBSSxDQUFDLHFCQUFxQixHQUFHLFdBQVcsQ0FBQztRQUN6QyxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsRUFBRTtZQUNyQix3REFBd0Q7WUFDeEQsSUFBSSxXQUFXLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLElBQUksV0FBVyxHQUFHLENBQUMsRUFBRSxDQUFDO2dCQUM3RCxPQUFPO1lBQ1QsQ0FBQztZQUNELE1BQU0sT0FBTyxHQUFHLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBSSxDQUFDLENBQUM7WUFDaEQsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUMzQyxNQUFNLFVBQVUsR0FBRyxZQUFZLENBQUMsT0FBTyxFQUFFLElBQUksR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFJLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ3RGLE1BQU0sV0FBVyxHQUFHLElBQUkseUJBQXlCLENBQUM7Z0JBQ2hELEdBQUcsRUFBRSxLQUFLLENBQUMsR0FBSTtnQkFDZixLQUFLLEVBQUUsS0FBSyxDQUFDLFFBQVEsRUFBRTtnQkFDdkIsWUFBWSxFQUFFLEtBQUssQ0FBQyxlQUFlLEVBQUU7Z0JBQ3JDLEdBQUcsRUFBRSxLQUFLLENBQUMsR0FBRztnQkFDZCxFQUFFLEVBQUUsS0FBSyxDQUFDLEVBQUU7Z0JBQ1osS0FBSyxFQUFFLEtBQUssQ0FBQyxLQUFLO2dCQUNsQixZQUFZLEVBQUUsS0FBSyxDQUFDLFlBQVk7YUFDakMsQ0FBQyxDQUFDO1lBQ0gsTUFBTSxNQUFNLEdBQUcsSUFBSSx3QkFBd0IsRUFBRSxDQUFDO1lBQzlDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxXQUFXLEVBQUUsTUFBTSxFQUFFO2dCQUMxQyxjQUFjLEVBQUUsVUFBVTtnQkFDMUIsVUFBVSxFQUFFLElBQUk7Z0JBQ2hCLFlBQVksRUFBRSxJQUFJO2dCQUNsQix5QkFBeUI7Z0JBQ3pCLGFBQWEsRUFBRSxLQUFLO2dCQUNwQixVQUFVO2FBQ1gsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsdURBQXVEO0lBQy9DLFlBQVksQ0FBQyxTQUFxQjtRQUN4QyxJQUFJLElBQUksQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO1lBQy9CLFNBQVMsRUFBRSxDQUFDO1lBQ1osT0FBTztRQUNULENBQUM7UUFFRCx1REFBdUQ7UUFDdkQscUVBQXFFO1FBQ3JFLDZCQUE2QjtRQUM3QixJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRTtZQUNoRCxPQUFPLElBQUksT0FBTyxDQUFPLENBQUMsT0FBTyxFQUFFLEVBQUU7Z0JBQ25DLFVBQVUsQ0FBQyxHQUFHLEVBQUU7b0JBQ2QsT0FBTyxFQUFFLENBQUM7b0JBQ1YsU0FBUyxFQUFFLENBQUM7Z0JBQ2QsQ0FBQyxDQUFDLENBQUM7WUFDTCxDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELHFEQUFxRDtJQUNyRCxnQkFBZ0IsQ0FDZCxJQUFZLEVBQ1osUUFBNEMsRUFDNUMsT0FBMkM7UUFFM0MsSUFBSSxDQUFDLFdBQVcsQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLEVBQUUsUUFBUSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQzdELENBQUM7SUFFRCx3REFBd0Q7SUFDeEQsbUJBQW1CLENBQ2pCLElBQVksRUFDWixRQUE0QyxFQUM1QyxPQUF3QztRQUV4QyxJQUFJLENBQUMsV0FBVyxDQUFDLG1CQUFtQixDQUFDLElBQUksRUFBRSxRQUFRLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDaEUsQ0FBQztJQUVELGlEQUFpRDtJQUNqRCxhQUFhLENBQUMsS0FBWTtRQUN4QixPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQy9DLENBQUM7SUFFRCwyQkFBMkI7SUFDM0IsT0FBTztRQUNMLHFEQUFxRDtRQUNyRCwrRkFBK0Y7UUFDL0YsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDN0QsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7SUFDdkIsQ0FBQztJQUVELDZDQUE2QztJQUM3QyxVQUFVO1FBQ1IsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ3ZCLENBQUM7SUFFRCx5REFBeUQ7SUFDakQsaUJBQWlCLENBQ3ZCLFdBQXNDLEVBQ3RDLE1BQWdDLEVBQ2hDLE9BQWdDO1FBRWhDLDJFQUEyRTtRQUMzRSxTQUFTO1FBQ1QsSUFBSSxDQUFDLGtCQUFrQixHQUFHLEtBQUssQ0FBQztRQUNoQyxJQUFJLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztZQUN2QixJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxJQUFJLFlBQVksQ0FBQyx3QkFBd0IsRUFBRSxZQUFZLENBQUMsQ0FBQyxDQUFDO1lBQ3BGLElBQUksQ0FBQyxhQUFhLEdBQUcsU0FBUyxDQUFDO1FBQ2pDLENBQUM7UUFFRCxNQUFNLGFBQWEsR0FBRyx1QkFBdUIsQ0FBQztZQUM1QyxjQUFjLEVBQUUsT0FBTyxDQUFDLGNBQWM7WUFDdEMsVUFBVSxFQUFFLE9BQU8sQ0FBQyxVQUFVO1lBQzlCLFlBQVksRUFBRSxPQUFPLENBQUMsWUFBWTtZQUNsQyxhQUFhLEVBQUUsT0FBTyxDQUFDLGFBQWE7WUFDcEMsVUFBVSxFQUFFLE9BQU8sQ0FBQyxVQUFVO1lBQzlCLE1BQU0sRUFBRSxNQUFNLENBQUMsTUFBTTtZQUNyQixXQUFXO1lBQ1gsSUFBSSxFQUFFLE9BQU8sQ0FBQyxJQUFJO1lBQ2xCLFlBQVksRUFBRSxXQUFXLENBQUMsWUFBWTtZQUN0QyxZQUFZLEVBQUUsT0FBTyxDQUFDLFlBQVk7WUFDbEMsTUFBTTtZQUNOLGVBQWUsRUFBRSxHQUFHLEVBQUU7Z0JBQ3BCLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztZQUN6QixDQUFDO1NBQ0YsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLGFBQWEsR0FBRyxhQUFhLENBQUM7UUFDbkMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDOUMsYUFBYSxDQUFDLHVCQUF1QixFQUFFLENBQUM7UUFDeEMsSUFBSSxhQUFhLENBQUMsWUFBWSxLQUFLLFdBQVcsRUFBRSxDQUFDO1lBQy9DLGFBQWEsQ0FBQyxNQUFNLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzdDLENBQUM7SUFDSCxDQUFDO0lBRUQsNkNBQTZDO0lBQ3JDLGVBQWU7UUFDckIsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztZQUN4QixPQUFPO1FBQ1QsQ0FBQztRQUNELE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUM7UUFDL0IsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsWUFBWSxFQUFFLENBQUM7WUFDckMsTUFBTSxLQUFLLEdBQUcsSUFBSSxLQUFLLENBQUMsNkNBQTZDLENBQUMsQ0FBQztZQUN2RSxJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNqQyxNQUFNLEtBQUssQ0FBQztRQUNkLENBQUM7UUFDRCxJQUNFLElBQUksQ0FBQyxhQUFhLENBQUMsY0FBYyxLQUFLLE1BQU07WUFDNUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxjQUFjLEtBQUssU0FBUyxFQUMvQyxDQUFDO1lBQ0QsSUFBSSxDQUFDLHNCQUFzQixDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsV0FBVyxFQUFFO2dCQUMxRCxjQUFjLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxjQUFjO2FBQ2xELENBQUMsQ0FBQztRQUNMLENBQUM7YUFBTSxJQUFJLElBQUksQ0FBQyxhQUFhLENBQUMsY0FBYyxLQUFLLFVBQVUsRUFBRSxDQUFDO1lBQzVELElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ3pELENBQUM7UUFDRCxJQUFJLENBQUMsYUFBYSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUN6RCxNQUFNLHVCQUF1QixHQUFHLDJDQUEyQyxDQUFDO1lBQzFFLElBQUk7WUFDSixjQUFjLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxjQUFjO1NBQ2xELENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLHVCQUF1QixDQUFDLENBQUM7UUFDeEQsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsWUFBWSxFQUFFLENBQUM7WUFDckMsTUFBTSxhQUFhLEdBQUcsbUJBQW1CLENBQUM7Z0JBQ3hDLEtBQUssRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxlQUFlLEVBQUU7YUFDeEQsQ0FBQyxDQUFDO1lBQ0gsSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDM0MsQ0FBQztJQUNILENBQUM7SUFFRCx1REFBdUQ7SUFDL0Msc0JBQXNCLENBQzVCLFdBQXNDLEVBQ3RDLEVBQUMsY0FBYyxFQUF5QztRQUV4RCxJQUFJLGNBQWMsS0FBSyxNQUFNLEVBQUUsQ0FBQztZQUM5QixJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztZQUN6QixJQUFJLENBQUMscUJBQXFCLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDO1FBQ3RELENBQUM7UUFDRCxNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUM7UUFDckMsTUFBTSxHQUFHLEdBQUcsY0FBYyxLQUFLLE1BQU0sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQztRQUN2RixNQUFNLEtBQUssR0FBRyxJQUFJLDBCQUEwQixDQUFDLFdBQVcsQ0FBQyxHQUFHLEVBQUU7WUFDNUQsRUFBRSxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7WUFDekIsR0FBRztZQUNILEtBQUs7WUFDTCxZQUFZLEVBQUUsSUFBSTtZQUNsQixLQUFLLEVBQUUsV0FBVyxDQUFDLFFBQVEsRUFBRTtZQUM3QixZQUFZLEVBQUUsV0FBVyxDQUFDLGVBQWUsRUFBRTtTQUM1QyxDQUFDLENBQUM7UUFDSCxJQUFJLGNBQWMsS0FBSyxNQUFNLEVBQUUsQ0FBQztZQUM5QixJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsUUFBUSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQ2pELENBQUM7YUFBTSxDQUFDO1lBQ04sSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsR0FBRyxLQUFLLENBQUM7UUFDakMsQ0FBQztJQUNILENBQUM7SUFFRCxnREFBZ0Q7SUFDeEMsaUJBQWlCLENBQUMsV0FBc0M7UUFDOUQsSUFBSSxDQUFDLGlCQUFpQixHQUFHLFdBQVcsQ0FBQyxLQUFLLENBQUM7SUFDN0MsQ0FBQztJQUVELCtEQUErRDtJQUN2RCxTQUFTLENBQUMsR0FBVztRQUMzQixLQUFLLE1BQU0sS0FBSyxJQUFJLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztZQUNwQyxJQUFJLEtBQUssQ0FBQyxHQUFHLEtBQUssR0FBRztnQkFBRSxPQUFPLEtBQUssQ0FBQztRQUN0QyxDQUFDO1FBQ0QsT0FBTyxTQUFTLENBQUM7SUFDbkIsQ0FBQztJQUVELElBQUksVUFBVSxDQUFDLFFBQStEO1FBQzVFLE1BQU0sSUFBSSxLQUFLLENBQUMsZUFBZSxDQUFDLENBQUM7SUFDbkMsQ0FBQztJQUVELElBQUksVUFBVTtRQUNaLE1BQU0sSUFBSSxLQUFLLENBQUMsZUFBZSxDQUFDLENBQUM7SUFDbkMsQ0FBQztJQUVELElBQUksb0JBQW9CLENBQ3RCLFFBQW1GO1FBRW5GLE1BQU0sSUFBSSxLQUFLLENBQUMsZUFBZSxDQUFDLENBQUM7SUFDbkMsQ0FBQztJQUVELElBQUksb0JBQW9CO1FBR3RCLE1BQU0sSUFBSSxLQUFLLENBQUMsZUFBZSxDQUFDLENBQUM7SUFDbkMsQ0FBQztJQUVELElBQUksaUJBQWlCLENBQUMsUUFBdUQ7UUFDM0UsTUFBTSxJQUFJLEtBQUssQ0FBQyxlQUFlLENBQUMsQ0FBQztJQUNuQyxDQUFDO0lBRUQsSUFBSSxpQkFBaUI7UUFDbkIsTUFBTSxJQUFJLEtBQUssQ0FBQyxlQUFlLENBQUMsQ0FBQztJQUNuQyxDQUFDO0lBRUQsSUFBSSxlQUFlLENBQUMsUUFBNEQ7UUFDOUUsTUFBTSxJQUFJLEtBQUssQ0FBQyxlQUFlLENBQUMsQ0FBQztJQUNuQyxDQUFDO0lBRUQsSUFBSSxlQUFlO1FBQ2pCLE1BQU0sSUFBSSxLQUFLLENBQUMsZUFBZSxDQUFDLENBQUM7SUFDbkMsQ0FBQztJQUVELElBQUksVUFBVTtRQUNaLE1BQU0sSUFBSSxLQUFLLENBQUMsZUFBZSxDQUFDLENBQUM7SUFDbkMsQ0FBQztJQUVELGtCQUFrQixDQUFDLFFBQTZDO1FBQzlELE1BQU0sSUFBSSxLQUFLLENBQUMsZUFBZSxDQUFDLENBQUM7SUFDbkMsQ0FBQztJQUVELE1BQU0sQ0FBQyxRQUFrQztRQUN2QyxNQUFNLElBQUksS0FBSyxDQUFDLGVBQWUsQ0FBQyxDQUFDO0lBQ25DLENBQUM7Q0FDRjtBQVdEOztHQUVHO0FBQ0gsTUFBTSxPQUFPLDBCQUEwQjtJQVlyQyxZQUNXLEdBQWtCLEVBQzNCLEVBQ0UsRUFBRSxFQUNGLEdBQUcsRUFDSCxLQUFLLEVBQ0wsWUFBWSxFQUNaLEtBQUssRUFDTCxZQUFZLEdBUWI7UUFmUSxRQUFHLEdBQUgsR0FBRyxDQUFlO1FBSjdCLGtDQUFrQztRQUNsQyxjQUFTLEdBQThELElBQUksQ0FBQztRQW9CMUUsSUFBSSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUM7UUFDYixJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztRQUNmLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ25CLElBQUksQ0FBQyxZQUFZLEdBQUcsWUFBWSxDQUFDO1FBQ2pDLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ25CLElBQUksQ0FBQyxZQUFZLEdBQUcsWUFBWSxDQUFDO0lBQ25DLENBQUM7SUFFRCxRQUFRO1FBQ04sZUFBZTtRQUNmLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO0lBQzFFLENBQUM7SUFFRCxlQUFlO1FBQ2IsZUFBZTtRQUNmLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDO0lBQy9GLENBQUM7SUFFRCxnQkFBZ0IsQ0FDZCxJQUFZLEVBQ1osUUFBNEMsRUFDNUMsT0FBMkM7UUFFM0MsTUFBTSxJQUFJLEtBQUssQ0FBQyxlQUFlLENBQUMsQ0FBQztJQUNuQyxDQUFDO0lBRUQsbUJBQW1CLENBQ2pCLElBQVksRUFDWixRQUE0QyxFQUM1QyxPQUF3QztRQUV4QyxNQUFNLElBQUksS0FBSyxDQUFDLGVBQWUsQ0FBQyxDQUFDO0lBQ25DLENBQUM7SUFFRCxhQUFhLENBQUMsS0FBWTtRQUN4QixNQUFNLElBQUksS0FBSyxDQUFDLGVBQWUsQ0FBQyxDQUFDO0lBQ25DLENBQUM7Q0FDRjtBQWlDRDs7O0dBR0c7QUFDSCxTQUFTLHVCQUF1QixDQUFDLEVBQy9CLFVBQVUsRUFDVixZQUFZLEVBQ1osYUFBYSxFQUNiLFVBQVUsRUFDVixjQUFjLEVBQ2QsTUFBTSxFQUNOLFdBQVcsRUFDWCxJQUFJLEVBQ0osWUFBWSxFQUNaLFlBQVksRUFDWixNQUFNLEVBQ04sZUFBZSxHQWNoQjtJQUNDLE1BQU0sS0FBSyxHQUFHLElBQUksS0FBSyxDQUFDLFVBQVUsRUFBRSxFQUFDLE9BQU8sRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFDLENBRS9ELENBQUM7SUFDRixLQUFLLENBQUMsWUFBWSxHQUFHLFlBQVksQ0FBQztJQUNsQyxLQUFLLENBQUMsYUFBYSxHQUFHLGFBQWEsQ0FBQztJQUNwQyxLQUFLLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQztJQUM5QixLQUFLLENBQUMsY0FBYyxHQUFHLGNBQWMsQ0FBQztJQUN0QyxLQUFLLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztJQUN0QixLQUFLLENBQUMsV0FBVyxHQUFHLFdBQVcsQ0FBQztJQUNoQyxLQUFLLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztJQUNsQixLQUFLLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQztJQUM3QixLQUFLLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztJQUV0QixLQUFLLENBQUMsWUFBWSxHQUFHLFlBQVksQ0FBQztJQUNsQyxLQUFLLENBQUMsWUFBWSxHQUFHLFlBQVksQ0FBQztJQUNsQyxLQUFLLENBQUMsWUFBWSxHQUFHLFdBQVcsQ0FBQztJQUVqQyxJQUFJLGVBQWUsR0FBOEIsU0FBUyxDQUFDO0lBQzNELElBQUksZUFBZSxHQUFHLEtBQUssQ0FBQztJQUM1QixJQUFJLHVCQUF1QixHQUFHLEtBQUssQ0FBQztJQUNwQyxJQUFJLFlBQVksR0FBRyxLQUFLLENBQUM7SUFFekIsS0FBSyxDQUFDLFNBQVMsR0FBRyxVQUVoQixPQUFnRDtRQUVoRCxlQUFlLEdBQUcsSUFBSSxDQUFDO1FBQ3ZCLEtBQUssQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDO1FBQzFCLE1BQU0sT0FBTyxHQUFHLE9BQU8sRUFBRSxPQUFPLENBQUM7UUFDakMsSUFBSSxPQUFPLEVBQUUsQ0FBQztZQUNaLGVBQWUsR0FBRyxPQUFPLEVBQUUsQ0FBQztRQUM5QixDQUFDO1FBQ0QsSUFBSSxPQUFPLEVBQUUsTUFBTSxFQUFFLENBQUM7WUFDcEIsS0FBSyxDQUFDLFlBQVksR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDO1FBQ3RDLENBQUM7UUFDRCxJQUFJLE9BQU8sRUFBRSxVQUFVLEtBQUssU0FBUyxJQUFJLE9BQU8sRUFBRSxNQUFNLEtBQUssU0FBUyxFQUFFLENBQUM7WUFDdkUsTUFBTSxJQUFJLEtBQUssQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUNuQyxDQUFDO0lBQ0gsQ0FBQyxDQUFDO0lBRUYsS0FBSyxDQUFDLE1BQU0sR0FBRztRQUNiLE1BQU0sSUFBSSxLQUFLLENBQUMsZUFBZSxDQUFDLENBQUM7SUFDbkMsQ0FBQyxDQUFDO0lBRUYsS0FBSyxDQUFDLE1BQU0sR0FBRyxVQUEyQyxRQUFRLEdBQUcsS0FBSztRQUN4RSxJQUFJLENBQUMsUUFBUSxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7WUFDbEMsTUFBTSxJQUFJLFlBQVksQ0FDcEIscUVBQXFFO2dCQUNuRSx5QkFBeUIsRUFDM0IsbUJBQW1CLENBQ3BCLENBQUM7UUFDSixDQUFDO1FBQ0QsSUFBSSxDQUFDLHVCQUF1QixFQUFFLENBQUM7WUFDN0IsTUFBTSxJQUFJLFlBQVksQ0FDcEIscUVBQXFFO2dCQUNuRSwrQkFBK0IsRUFDakMsbUJBQW1CLENBQ3BCLENBQUM7UUFDSixDQUFDO1FBQ0QsSUFBSSxZQUFZLEVBQUUsQ0FBQztZQUNqQixNQUFNLElBQUksWUFBWSxDQUNwQixrRUFBa0UsR0FBRyxTQUFTLEVBQzlFLG1CQUFtQixDQUNwQixDQUFDO1FBQ0osQ0FBQztRQUNELFlBQVksR0FBRyxJQUFJLENBQUM7UUFFcEIsZUFBZSxFQUFFLENBQUM7SUFDcEIsQ0FBQyxDQUFDO0lBRUYsaUJBQWlCO0lBQ2pCLEtBQUssQ0FBQyxNQUFNLEdBQUcsVUFBMkMsTUFBYTtRQUNyRSxNQUFNLENBQUMsZUFBZSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQy9CLE1BQU0sQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDaEMsQ0FBQyxDQUFDO0lBRUYsaUJBQWlCO0lBQ2pCLEtBQUssQ0FBQyx1QkFBdUIsR0FBRztRQUM5Qix1QkFBdUIsR0FBRyxJQUFJLENBQUM7UUFDL0IsSUFBSSxLQUFLLENBQUMsWUFBWSxLQUFLLGtCQUFrQixFQUFFLENBQUM7WUFDOUMsa0RBQWtEO1lBQ2xELGVBQWUsRUFBRSxJQUFJLENBQ25CLEdBQUcsRUFBRTtnQkFDSCxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7b0JBQ2xCLEtBQUssQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNwQyxDQUFDO1lBQ0gsQ0FBQyxFQUNELEdBQUcsRUFBRSxHQUFFLENBQUMsQ0FDVCxDQUFDO1FBQ0osQ0FBQztRQUNELE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsU0FBUyxFQUFFLGVBQWUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUNuRCxDQUFDLENBQUMsS0FBSyxDQUFDLEVBQUUsRUFBRTtZQUNWLE1BQU0sQ0FBQyxlQUFlLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDaEMsQ0FBQyxFQUNELENBQUMsTUFBTSxFQUFFLEVBQUU7WUFDVCxNQUFNLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ2hDLENBQUMsQ0FDRixDQUFDO0lBQ0osQ0FBQyxDQUFDO0lBRUYsaUJBQWlCO0lBQ2pCLEtBQUssQ0FBQyxrQkFBa0IsR0FBRyxVQUV6QixLQUFpQztRQUVqQyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDakMsQ0FBQyxDQUFDO0lBRUYsT0FBTyxLQUFrQyxDQUFDO0FBQzVDLENBQUM7QUFPRDs7O0dBR0c7QUFDSCxTQUFTLDJDQUEyQyxDQUFDLEVBQ25ELElBQUksRUFDSixjQUFjLEdBSWY7SUFDQyxNQUFNLEtBQUssR0FBRyxJQUFJLEtBQUssQ0FBQyxvQkFBb0IsRUFBRTtRQUM1QyxPQUFPLEVBQUUsS0FBSztRQUNkLFVBQVUsRUFBRSxLQUFLO0tBQ2xCLENBRUEsQ0FBQztJQUNGLEtBQUssQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO0lBQ2xCLEtBQUssQ0FBQyxjQUFjLEdBQUcsY0FBYyxDQUFDO0lBQ3RDLE9BQU8sS0FBOEMsQ0FBQztBQUN4RCxDQUFDO0FBRUQ7OztHQUdHO0FBQ0gsU0FBUyxtQkFBbUIsQ0FBQyxFQUFDLEtBQUssRUFBbUI7SUFDcEQsTUFBTSxLQUFLLEdBQUcsSUFBSSxLQUFLLENBQUMsVUFBVSxFQUFFO1FBQ2xDLE9BQU8sRUFBRSxLQUFLO1FBQ2QsVUFBVSxFQUFFLEtBQUs7S0FDbEIsQ0FBNkQsQ0FBQztJQUMvRCxLQUFLLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztJQUNwQixPQUFPLEtBQXNCLENBQUM7QUFDaEMsQ0FBQztBQUVEOztHQUVHO0FBQ0gsTUFBTSxPQUFPLHlCQUF5QjtJQVVwQyxZQUFZLEVBQ1YsR0FBRyxFQUNILFlBQVksRUFDWixZQUFZLEVBQ1osS0FBSyxFQUNMLEdBQUcsR0FBRyxJQUFJLEVBQ1YsRUFBRSxHQUFHLElBQUksRUFDVCxLQUFLLEdBQUcsQ0FBQyxDQUFDLEdBU1g7UUFDQyxJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztRQUNmLElBQUksQ0FBQyxZQUFZLEdBQUcsWUFBWSxDQUFDO1FBQ2pDLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ25CLElBQUksQ0FBQyxZQUFZLEdBQUcsWUFBWSxDQUFDO1FBQ2pDLElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO1FBQ2YsSUFBSSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUM7UUFDYixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztJQUNyQixDQUFDO0lBRUQsUUFBUTtRQUNOLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQztJQUNwQixDQUFDO0lBRUQsZUFBZTtRQUNiLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQztJQUMzQixDQUFDO0NBQ0Y7QUFFRCw0RUFBNEU7QUFDNUUsU0FBUyxZQUFZLENBQUMsSUFBUyxFQUFFLEVBQU87SUFDdEMsT0FBTyxDQUNMLEVBQUUsQ0FBQyxJQUFJLEtBQUssSUFBSSxDQUFDLElBQUk7UUFDckIsRUFBRSxDQUFDLFFBQVEsS0FBSyxJQUFJLENBQUMsUUFBUTtRQUM3QixFQUFFLENBQUMsUUFBUSxLQUFLLElBQUksQ0FBQyxRQUFRO1FBQzdCLEVBQUUsQ0FBQyxNQUFNLEtBQUssSUFBSSxDQUFDLE1BQU0sQ0FDMUIsQ0FBQztBQUNKLENBQUM7QUFFRCwyRUFBMkU7QUFDM0UsTUFBTSx3QkFBd0I7SUFPNUIsSUFBSSxNQUFNO1FBQ1IsT0FBTyxJQUFJLENBQUMsZUFBZSxDQUFDLE1BQU0sQ0FBQztJQUNyQyxDQUFDO0lBR0Q7UUFGaUIsb0JBQWUsR0FBRyxJQUFJLGVBQWUsRUFBRSxDQUFDO1FBR3ZELElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxPQUFPLENBQTZCLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1lBQzNFLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxPQUFPLENBQUM7WUFDaEMsSUFBSSxDQUFDLGVBQWUsR0FBRyxNQUFNLENBQUM7UUFDaEMsQ0FBQyxDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksT0FBTyxDQUE2QixLQUFLLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1lBQ2hGLElBQUksQ0FBQyxlQUFlLEdBQUcsT0FBTyxDQUFDO1lBQy9CLElBQUksQ0FBQyxjQUFjLEdBQUcsQ0FBQyxNQUFhLEVBQUUsRUFBRTtnQkFDdEMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUNmLElBQUksQ0FBQyxlQUFlLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ3JDLENBQUMsQ0FBQztRQUNKLENBQUMsQ0FBQyxDQUFDO1FBQ0gsOEJBQThCO1FBQzlCLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxHQUFFLENBQUMsQ0FBQyxDQUFDO1FBQy9CLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxHQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ2hDLENBQUM7Q0FDRiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge1xuICBOYXZpZ2F0ZUV2ZW50LFxuICBOYXZpZ2F0aW9uLFxuICBOYXZpZ2F0aW9uQ3VycmVudEVudHJ5Q2hhbmdlRXZlbnQsXG4gIE5hdmlnYXRpb25EZXN0aW5hdGlvbixcbiAgTmF2aWdhdGlvbkhpc3RvcnlFbnRyeSxcbiAgTmF2aWdhdGlvbkludGVyY2VwdE9wdGlvbnMsXG4gIE5hdmlnYXRpb25OYXZpZ2F0ZU9wdGlvbnMsXG4gIE5hdmlnYXRpb25PcHRpb25zLFxuICBOYXZpZ2F0aW9uUmVsb2FkT3B0aW9ucyxcbiAgTmF2aWdhdGlvblJlc3VsdCxcbiAgTmF2aWdhdGlvblRyYW5zaXRpb24sXG4gIE5hdmlnYXRpb25UeXBlU3RyaW5nLFxuICBOYXZpZ2F0aW9uVXBkYXRlQ3VycmVudEVudHJ5T3B0aW9ucyxcbn0gZnJvbSAnLi9uYXZpZ2F0aW9uX3R5cGVzJztcblxuLyoqXG4gKiBGYWtlIGltcGxlbWVudGF0aW9uIG9mIHVzZXIgYWdlbnQgaGlzdG9yeSBhbmQgbmF2aWdhdGlvbiBiZWhhdmlvci4gVGhpcyBpcyBhXG4gKiBoaWdoLWZpZGVsaXR5IGltcGxlbWVudGF0aW9uIG9mIGJyb3dzZXIgYmVoYXZpb3IgdGhhdCBhdHRlbXB0cyB0byBlbXVsYXRlXG4gKiB0aGluZ3MgbGlrZSB0cmF2ZXJzYWwgZGVsYXkuXG4gKi9cbmV4cG9ydCBjbGFzcyBGYWtlTmF2aWdhdGlvbiBpbXBsZW1lbnRzIE5hdmlnYXRpb24ge1xuICAvKipcbiAgICogVGhlIGZha2UgaW1wbGVtZW50YXRpb24gb2YgYW4gZW50cmllcyBhcnJheS4gT25seSBzYW1lLWRvY3VtZW50IGVudHJpZXNcbiAgICogYWxsb3dlZC5cbiAgICovXG4gIHByaXZhdGUgcmVhZG9ubHkgZW50cmllc0FycjogRmFrZU5hdmlnYXRpb25IaXN0b3J5RW50cnlbXSA9IFtdO1xuXG4gIC8qKlxuICAgKiBUaGUgY3VycmVudCBhY3RpdmUgZW50cnkgaW5kZXggaW50byBgZW50cmllc0FycmAuXG4gICAqL1xuICBwcml2YXRlIGN1cnJlbnRFbnRyeUluZGV4ID0gMDtcblxuICAvKipcbiAgICogVGhlIGN1cnJlbnQgbmF2aWdhdGUgZXZlbnQuXG4gICAqL1xuICBwcml2YXRlIG5hdmlnYXRlRXZlbnQ6IEludGVybmFsRmFrZU5hdmlnYXRlRXZlbnQgfCB1bmRlZmluZWQgPSB1bmRlZmluZWQ7XG5cbiAgLyoqXG4gICAqIEEgTWFwIG9mIHBlbmRpbmcgdHJhdmVyc2Fscywgc28gdGhhdCB0cmF2ZXJzYWxzIHRvIHRoZSBzYW1lIGVudHJ5IGNhbiBiZVxuICAgKiByZS11c2VkLlxuICAgKi9cbiAgcHJpdmF0ZSByZWFkb25seSB0cmF2ZXJzYWxRdWV1ZSA9IG5ldyBNYXA8c3RyaW5nLCBJbnRlcm5hbE5hdmlnYXRpb25SZXN1bHQ+KCk7XG5cbiAgLyoqXG4gICAqIEEgUHJvbWlzZSB0aGF0IHJlc29sdmVzIHdoZW4gdGhlIHByZXZpb3VzIHRyYXZlcnNhbHMgaGF2ZSBmaW5pc2hlZC4gVXNlZCB0b1xuICAgKiBzaW11bGF0ZSB0aGUgY3Jvc3MtcHJvY2VzcyBjb21tdW5pY2F0aW9uIG5lY2Vzc2FyeSBmb3IgdHJhdmVyc2Fscy5cbiAgICovXG4gIHByaXZhdGUgbmV4dFRyYXZlcnNhbCA9IFByb21pc2UucmVzb2x2ZSgpO1xuXG4gIC8qKlxuICAgKiBBIHByb3NwZWN0aXZlIGN1cnJlbnQgYWN0aXZlIGVudHJ5IGluZGV4LCB3aGljaCBpbmNsdWRlcyB1bnJlc29sdmVkXG4gICAqIHRyYXZlcnNhbHMuIFVzZWQgYnkgYGdvYCB0byBkZXRlcm1pbmUgd2hlcmUgbmF2aWdhdGlvbnMgYXJlIGludGVuZGVkIHRvIGdvLlxuICAgKi9cbiAgcHJpdmF0ZSBwcm9zcGVjdGl2ZUVudHJ5SW5kZXggPSAwO1xuXG4gIC8qKlxuICAgKiBBIHRlc3Qtb25seSBvcHRpb24gdG8gbWFrZSB0cmF2ZXJzYWxzIHN5bmNocm9ub3VzLCByYXRoZXIgdGhhbiBlbXVsYXRlXG4gICAqIGNyb3NzLXByb2Nlc3MgY29tbXVuaWNhdGlvbi5cbiAgICovXG4gIHByaXZhdGUgc3luY2hyb25vdXNUcmF2ZXJzYWxzID0gZmFsc2U7XG5cbiAgLyoqIFdoZXRoZXIgdG8gYWxsb3cgYSBjYWxsIHRvIHNldEluaXRpYWxFbnRyeUZvclRlc3RpbmcuICovXG4gIHByaXZhdGUgY2FuU2V0SW5pdGlhbEVudHJ5ID0gdHJ1ZTtcblxuICAvKiogYEV2ZW50VGFyZ2V0YCB0byBkaXNwYXRjaCBldmVudHMuICovXG4gIHByaXZhdGUgZXZlbnRUYXJnZXQ6IEV2ZW50VGFyZ2V0ID0gdGhpcy53aW5kb3cuZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cbiAgLyoqIFRoZSBuZXh0IHVuaXF1ZSBpZCBmb3IgY3JlYXRlZCBlbnRyaWVzLiBSZXBsYWNlIHJlY3JlYXRlcyB0aGlzIGlkLiAqL1xuICBwcml2YXRlIG5leHRJZCA9IDA7XG5cbiAgLyoqIFRoZSBuZXh0IHVuaXF1ZSBrZXkgZm9yIGNyZWF0ZWQgZW50cmllcy4gUmVwbGFjZSBpbmhlcml0cyB0aGlzIGlkLiAqL1xuICBwcml2YXRlIG5leHRLZXkgPSAwO1xuXG4gIC8qKiBXaGV0aGVyIHRoaXMgZmFrZSBpcyBkaXNwb3NlZC4gKi9cbiAgcHJpdmF0ZSBkaXNwb3NlZCA9IGZhbHNlO1xuXG4gIC8qKiBFcXVpdmFsZW50IHRvIGBuYXZpZ2F0aW9uLmN1cnJlbnRFbnRyeWAuICovXG4gIGdldCBjdXJyZW50RW50cnkoKTogRmFrZU5hdmlnYXRpb25IaXN0b3J5RW50cnkge1xuICAgIHJldHVybiB0aGlzLmVudHJpZXNBcnJbdGhpcy5jdXJyZW50RW50cnlJbmRleF07XG4gIH1cblxuICBnZXQgY2FuR29CYWNrKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmN1cnJlbnRFbnRyeUluZGV4ID4gMDtcbiAgfVxuXG4gIGdldCBjYW5Hb0ZvcndhcmQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuY3VycmVudEVudHJ5SW5kZXggPCB0aGlzLmVudHJpZXNBcnIubGVuZ3RoIC0gMTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgcmVhZG9ubHkgd2luZG93OiBXaW5kb3csXG4gICAgc3RhcnRVUkw6IGBodHRwJHtzdHJpbmd9YCxcbiAgKSB7XG4gICAgLy8gRmlyc3QgZW50cnkuXG4gICAgdGhpcy5zZXRJbml0aWFsRW50cnlGb3JUZXN0aW5nKHN0YXJ0VVJMKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIHRoZSBpbml0aWFsIGVudHJ5LlxuICAgKi9cbiAgcHJpdmF0ZSBzZXRJbml0aWFsRW50cnlGb3JUZXN0aW5nKFxuICAgIHVybDogYGh0dHAke3N0cmluZ31gLFxuICAgIG9wdGlvbnM6IHtoaXN0b3J5U3RhdGU6IHVua25vd247IHN0YXRlPzogdW5rbm93bn0gPSB7aGlzdG9yeVN0YXRlOiBudWxsfSxcbiAgKSB7XG4gICAgaWYgKCF0aGlzLmNhblNldEluaXRpYWxFbnRyeSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAnc2V0SW5pdGlhbEVudHJ5Rm9yVGVzdGluZyBjYW4gb25seSBiZSBjYWxsZWQgYmVmb3JlIGFueSAnICsgJ25hdmlnYXRpb24gaGFzIG9jY3VycmVkJyxcbiAgICAgICk7XG4gICAgfVxuICAgIGNvbnN0IGN1cnJlbnRJbml0aWFsRW50cnkgPSB0aGlzLmVudHJpZXNBcnJbMF07XG4gICAgdGhpcy5lbnRyaWVzQXJyWzBdID0gbmV3IEZha2VOYXZpZ2F0aW9uSGlzdG9yeUVudHJ5KG5ldyBVUkwodXJsKS50b1N0cmluZygpLCB7XG4gICAgICBpbmRleDogMCxcbiAgICAgIGtleTogY3VycmVudEluaXRpYWxFbnRyeT8ua2V5ID8/IFN0cmluZyh0aGlzLm5leHRLZXkrKyksXG4gICAgICBpZDogY3VycmVudEluaXRpYWxFbnRyeT8uaWQgPz8gU3RyaW5nKHRoaXMubmV4dElkKyspLFxuICAgICAgc2FtZURvY3VtZW50OiB0cnVlLFxuICAgICAgaGlzdG9yeVN0YXRlOiBvcHRpb25zPy5oaXN0b3J5U3RhdGUsXG4gICAgICBzdGF0ZTogb3B0aW9ucy5zdGF0ZSxcbiAgICB9KTtcbiAgfVxuXG4gIC8qKiBSZXR1cm5zIHdoZXRoZXIgdGhlIGluaXRpYWwgZW50cnkgaXMgc3RpbGwgZWxpZ2libGUgdG8gYmUgc2V0LiAqL1xuICBjYW5TZXRJbml0aWFsRW50cnlGb3JUZXN0aW5nKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmNhblNldEluaXRpYWxFbnRyeTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIHdoZXRoZXIgdG8gZW11bGF0ZSB0cmF2ZXJzYWxzIGFzIHN5bmNocm9ub3VzIHJhdGhlciB0aGFuXG4gICAqIGFzeW5jaHJvbm91cy5cbiAgICovXG4gIHNldFN5bmNocm9ub3VzVHJhdmVyc2Fsc0ZvclRlc3Rpbmcoc3luY2hyb25vdXNUcmF2ZXJzYWxzOiBib29sZWFuKSB7XG4gICAgdGhpcy5zeW5jaHJvbm91c1RyYXZlcnNhbHMgPSBzeW5jaHJvbm91c1RyYXZlcnNhbHM7XG4gIH1cblxuICAvKiogRXF1aXZhbGVudCB0byBgbmF2aWdhdGlvbi5lbnRyaWVzKClgLiAqL1xuICBlbnRyaWVzKCk6IEZha2VOYXZpZ2F0aW9uSGlzdG9yeUVudHJ5W10ge1xuICAgIHJldHVybiB0aGlzLmVudHJpZXNBcnIuc2xpY2UoKTtcbiAgfVxuXG4gIC8qKiBFcXVpdmFsZW50IHRvIGBuYXZpZ2F0aW9uLm5hdmlnYXRlKClgLiAqL1xuICBuYXZpZ2F0ZSh1cmw6IHN0cmluZywgb3B0aW9ucz86IE5hdmlnYXRpb25OYXZpZ2F0ZU9wdGlvbnMpOiBGYWtlTmF2aWdhdGlvblJlc3VsdCB7XG4gICAgY29uc3QgZnJvbVVybCA9IG5ldyBVUkwodGhpcy5jdXJyZW50RW50cnkudXJsISk7XG4gICAgY29uc3QgdG9VcmwgPSBuZXcgVVJMKHVybCwgdGhpcy5jdXJyZW50RW50cnkudXJsISk7XG5cbiAgICBsZXQgbmF2aWdhdGlvblR5cGU6IE5hdmlnYXRpb25UeXBlU3RyaW5nO1xuICAgIGlmICghb3B0aW9ucz8uaGlzdG9yeSB8fCBvcHRpb25zLmhpc3RvcnkgPT09ICdhdXRvJykge1xuICAgICAgLy8gQXV0byBkZWZhdWx0cyB0byBwdXNoLCBidXQgaWYgdGhlIFVSTHMgYXJlIHRoZSBzYW1lLCBpcyBhIHJlcGxhY2UuXG4gICAgICBpZiAoZnJvbVVybC50b1N0cmluZygpID09PSB0b1VybC50b1N0cmluZygpKSB7XG4gICAgICAgIG5hdmlnYXRpb25UeXBlID0gJ3JlcGxhY2UnO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbmF2aWdhdGlvblR5cGUgPSAncHVzaCc7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIG5hdmlnYXRpb25UeXBlID0gb3B0aW9ucy5oaXN0b3J5O1xuICAgIH1cblxuICAgIGNvbnN0IGhhc2hDaGFuZ2UgPSBpc0hhc2hDaGFuZ2UoZnJvbVVybCwgdG9VcmwpO1xuXG4gICAgY29uc3QgZGVzdGluYXRpb24gPSBuZXcgRmFrZU5hdmlnYXRpb25EZXN0aW5hdGlvbih7XG4gICAgICB1cmw6IHRvVXJsLnRvU3RyaW5nKCksXG4gICAgICBzdGF0ZTogb3B0aW9ucz8uc3RhdGUsXG4gICAgICBzYW1lRG9jdW1lbnQ6IGhhc2hDaGFuZ2UsXG4gICAgICBoaXN0b3J5U3RhdGU6IG51bGwsXG4gICAgfSk7XG4gICAgY29uc3QgcmVzdWx0ID0gbmV3IEludGVybmFsTmF2aWdhdGlvblJlc3VsdCgpO1xuXG4gICAgdGhpcy51c2VyQWdlbnROYXZpZ2F0ZShkZXN0aW5hdGlvbiwgcmVzdWx0LCB7XG4gICAgICBuYXZpZ2F0aW9uVHlwZSxcbiAgICAgIGNhbmNlbGFibGU6IHRydWUsXG4gICAgICBjYW5JbnRlcmNlcHQ6IHRydWUsXG4gICAgICAvLyBBbHdheXMgZmFsc2UgZm9yIG5hdmlnYXRlKCkuXG4gICAgICB1c2VySW5pdGlhdGVkOiBmYWxzZSxcbiAgICAgIGhhc2hDaGFuZ2UsXG4gICAgICBpbmZvOiBvcHRpb25zPy5pbmZvLFxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIGNvbW1pdHRlZDogcmVzdWx0LmNvbW1pdHRlZCxcbiAgICAgIGZpbmlzaGVkOiByZXN1bHQuZmluaXNoZWQsXG4gICAgfTtcbiAgfVxuXG4gIC8qKiBFcXVpdmFsZW50IHRvIGBoaXN0b3J5LnB1c2hTdGF0ZSgpYC4gKi9cbiAgcHVzaFN0YXRlKGRhdGE6IHVua25vd24sIHRpdGxlOiBzdHJpbmcsIHVybD86IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMucHVzaE9yUmVwbGFjZVN0YXRlKCdwdXNoJywgZGF0YSwgdGl0bGUsIHVybCk7XG4gIH1cblxuICAvKiogRXF1aXZhbGVudCB0byBgaGlzdG9yeS5yZXBsYWNlU3RhdGUoKWAuICovXG4gIHJlcGxhY2VTdGF0ZShkYXRhOiB1bmtub3duLCB0aXRsZTogc3RyaW5nLCB1cmw/OiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLnB1c2hPclJlcGxhY2VTdGF0ZSgncmVwbGFjZScsIGRhdGEsIHRpdGxlLCB1cmwpO1xuICB9XG5cbiAgcHJpdmF0ZSBwdXNoT3JSZXBsYWNlU3RhdGUoXG4gICAgbmF2aWdhdGlvblR5cGU6IE5hdmlnYXRpb25UeXBlU3RyaW5nLFxuICAgIGRhdGE6IHVua25vd24sXG4gICAgX3RpdGxlOiBzdHJpbmcsXG4gICAgdXJsPzogc3RyaW5nLFxuICApOiB2b2lkIHtcbiAgICBjb25zdCBmcm9tVXJsID0gbmV3IFVSTCh0aGlzLmN1cnJlbnRFbnRyeS51cmwhKTtcbiAgICBjb25zdCB0b1VybCA9IHVybCA/IG5ldyBVUkwodXJsLCB0aGlzLmN1cnJlbnRFbnRyeS51cmwhKSA6IGZyb21Vcmw7XG5cbiAgICBjb25zdCBoYXNoQ2hhbmdlID0gaXNIYXNoQ2hhbmdlKGZyb21VcmwsIHRvVXJsKTtcblxuICAgIGNvbnN0IGRlc3RpbmF0aW9uID0gbmV3IEZha2VOYXZpZ2F0aW9uRGVzdGluYXRpb24oe1xuICAgICAgdXJsOiB0b1VybC50b1N0cmluZygpLFxuICAgICAgc2FtZURvY3VtZW50OiB0cnVlLFxuICAgICAgaGlzdG9yeVN0YXRlOiBkYXRhLFxuICAgIH0pO1xuICAgIGNvbnN0IHJlc3VsdCA9IG5ldyBJbnRlcm5hbE5hdmlnYXRpb25SZXN1bHQoKTtcblxuICAgIHRoaXMudXNlckFnZW50TmF2aWdhdGUoZGVzdGluYXRpb24sIHJlc3VsdCwge1xuICAgICAgbmF2aWdhdGlvblR5cGUsXG4gICAgICBjYW5jZWxhYmxlOiB0cnVlLFxuICAgICAgY2FuSW50ZXJjZXB0OiB0cnVlLFxuICAgICAgLy8gQWx3YXlzIGZhbHNlIGZvciBwdXNoU3RhdGUoKSBvciByZXBsYWNlU3RhdGUoKS5cbiAgICAgIHVzZXJJbml0aWF0ZWQ6IGZhbHNlLFxuICAgICAgaGFzaENoYW5nZSxcbiAgICAgIHNraXBQb3BTdGF0ZTogdHJ1ZSxcbiAgICB9KTtcbiAgfVxuXG4gIC8qKiBFcXVpdmFsZW50IHRvIGBuYXZpZ2F0aW9uLnRyYXZlcnNlVG8oKWAuICovXG4gIHRyYXZlcnNlVG8oa2V5OiBzdHJpbmcsIG9wdGlvbnM/OiBOYXZpZ2F0aW9uT3B0aW9ucyk6IEZha2VOYXZpZ2F0aW9uUmVzdWx0IHtcbiAgICBjb25zdCBmcm9tVXJsID0gbmV3IFVSTCh0aGlzLmN1cnJlbnRFbnRyeS51cmwhKTtcbiAgICBjb25zdCBlbnRyeSA9IHRoaXMuZmluZEVudHJ5KGtleSk7XG4gICAgaWYgKCFlbnRyeSkge1xuICAgICAgY29uc3QgZG9tRXhjZXB0aW9uID0gbmV3IERPTUV4Y2VwdGlvbignSW52YWxpZCBrZXknLCAnSW52YWxpZFN0YXRlRXJyb3InKTtcbiAgICAgIGNvbnN0IGNvbW1pdHRlZCA9IFByb21pc2UucmVqZWN0KGRvbUV4Y2VwdGlvbik7XG4gICAgICBjb25zdCBmaW5pc2hlZCA9IFByb21pc2UucmVqZWN0KGRvbUV4Y2VwdGlvbik7XG4gICAgICBjb21taXR0ZWQuY2F0Y2goKCkgPT4ge30pO1xuICAgICAgZmluaXNoZWQuY2F0Y2goKCkgPT4ge30pO1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgY29tbWl0dGVkLFxuICAgICAgICBmaW5pc2hlZCxcbiAgICAgIH07XG4gICAgfVxuICAgIGlmIChlbnRyeSA9PT0gdGhpcy5jdXJyZW50RW50cnkpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGNvbW1pdHRlZDogUHJvbWlzZS5yZXNvbHZlKHRoaXMuY3VycmVudEVudHJ5KSxcbiAgICAgICAgZmluaXNoZWQ6IFByb21pc2UucmVzb2x2ZSh0aGlzLmN1cnJlbnRFbnRyeSksXG4gICAgICB9O1xuICAgIH1cbiAgICBpZiAodGhpcy50cmF2ZXJzYWxRdWV1ZS5oYXMoZW50cnkua2V5KSkge1xuICAgICAgY29uc3QgZXhpc3RpbmdSZXN1bHQgPSB0aGlzLnRyYXZlcnNhbFF1ZXVlLmdldChlbnRyeS5rZXkpITtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGNvbW1pdHRlZDogZXhpc3RpbmdSZXN1bHQuY29tbWl0dGVkLFxuICAgICAgICBmaW5pc2hlZDogZXhpc3RpbmdSZXN1bHQuZmluaXNoZWQsXG4gICAgICB9O1xuICAgIH1cblxuICAgIGNvbnN0IGhhc2hDaGFuZ2UgPSBpc0hhc2hDaGFuZ2UoZnJvbVVybCwgbmV3IFVSTChlbnRyeS51cmwhLCB0aGlzLmN1cnJlbnRFbnRyeS51cmwhKSk7XG4gICAgY29uc3QgZGVzdGluYXRpb24gPSBuZXcgRmFrZU5hdmlnYXRpb25EZXN0aW5hdGlvbih7XG4gICAgICB1cmw6IGVudHJ5LnVybCEsXG4gICAgICBzdGF0ZTogZW50cnkuZ2V0U3RhdGUoKSxcbiAgICAgIGhpc3RvcnlTdGF0ZTogZW50cnkuZ2V0SGlzdG9yeVN0YXRlKCksXG4gICAgICBrZXk6IGVudHJ5LmtleSxcbiAgICAgIGlkOiBlbnRyeS5pZCxcbiAgICAgIGluZGV4OiBlbnRyeS5pbmRleCxcbiAgICAgIHNhbWVEb2N1bWVudDogZW50cnkuc2FtZURvY3VtZW50LFxuICAgIH0pO1xuICAgIHRoaXMucHJvc3BlY3RpdmVFbnRyeUluZGV4ID0gZW50cnkuaW5kZXg7XG4gICAgY29uc3QgcmVzdWx0ID0gbmV3IEludGVybmFsTmF2aWdhdGlvblJlc3VsdCgpO1xuICAgIHRoaXMudHJhdmVyc2FsUXVldWUuc2V0KGVudHJ5LmtleSwgcmVzdWx0KTtcbiAgICB0aGlzLnJ1blRyYXZlcnNhbCgoKSA9PiB7XG4gICAgICB0aGlzLnRyYXZlcnNhbFF1ZXVlLmRlbGV0ZShlbnRyeS5rZXkpO1xuICAgICAgdGhpcy51c2VyQWdlbnROYXZpZ2F0ZShkZXN0aW5hdGlvbiwgcmVzdWx0LCB7XG4gICAgICAgIG5hdmlnYXRpb25UeXBlOiAndHJhdmVyc2UnLFxuICAgICAgICBjYW5jZWxhYmxlOiB0cnVlLFxuICAgICAgICBjYW5JbnRlcmNlcHQ6IHRydWUsXG4gICAgICAgIC8vIEFsd2F5cyBmYWxzZSBmb3IgdHJhdmVyc2VUbygpLlxuICAgICAgICB1c2VySW5pdGlhdGVkOiBmYWxzZSxcbiAgICAgICAgaGFzaENoYW5nZSxcbiAgICAgICAgaW5mbzogb3B0aW9ucz8uaW5mbyxcbiAgICAgIH0pO1xuICAgIH0pO1xuICAgIHJldHVybiB7XG4gICAgICBjb21taXR0ZWQ6IHJlc3VsdC5jb21taXR0ZWQsXG4gICAgICBmaW5pc2hlZDogcmVzdWx0LmZpbmlzaGVkLFxuICAgIH07XG4gIH1cblxuICAvKiogRXF1aXZhbGVudCB0byBgbmF2aWdhdGlvbi5iYWNrKClgLiAqL1xuICBiYWNrKG9wdGlvbnM/OiBOYXZpZ2F0aW9uT3B0aW9ucyk6IEZha2VOYXZpZ2F0aW9uUmVzdWx0IHtcbiAgICBpZiAodGhpcy5jdXJyZW50RW50cnlJbmRleCA9PT0gMCkge1xuICAgICAgY29uc3QgZG9tRXhjZXB0aW9uID0gbmV3IERPTUV4Y2VwdGlvbignQ2Fubm90IGdvIGJhY2snLCAnSW52YWxpZFN0YXRlRXJyb3InKTtcbiAgICAgIGNvbnN0IGNvbW1pdHRlZCA9IFByb21pc2UucmVqZWN0KGRvbUV4Y2VwdGlvbik7XG4gICAgICBjb25zdCBmaW5pc2hlZCA9IFByb21pc2UucmVqZWN0KGRvbUV4Y2VwdGlvbik7XG4gICAgICBjb21taXR0ZWQuY2F0Y2goKCkgPT4ge30pO1xuICAgICAgZmluaXNoZWQuY2F0Y2goKCkgPT4ge30pO1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgY29tbWl0dGVkLFxuICAgICAgICBmaW5pc2hlZCxcbiAgICAgIH07XG4gICAgfVxuICAgIGNvbnN0IGVudHJ5ID0gdGhpcy5lbnRyaWVzQXJyW3RoaXMuY3VycmVudEVudHJ5SW5kZXggLSAxXTtcbiAgICByZXR1cm4gdGhpcy50cmF2ZXJzZVRvKGVudHJ5LmtleSwgb3B0aW9ucyk7XG4gIH1cblxuICAvKiogRXF1aXZhbGVudCB0byBgbmF2aWdhdGlvbi5mb3J3YXJkKClgLiAqL1xuICBmb3J3YXJkKG9wdGlvbnM/OiBOYXZpZ2F0aW9uT3B0aW9ucyk6IEZha2VOYXZpZ2F0aW9uUmVzdWx0IHtcbiAgICBpZiAodGhpcy5jdXJyZW50RW50cnlJbmRleCA9PT0gdGhpcy5lbnRyaWVzQXJyLmxlbmd0aCAtIDEpIHtcbiAgICAgIGNvbnN0IGRvbUV4Y2VwdGlvbiA9IG5ldyBET01FeGNlcHRpb24oJ0Nhbm5vdCBnbyBmb3J3YXJkJywgJ0ludmFsaWRTdGF0ZUVycm9yJyk7XG4gICAgICBjb25zdCBjb21taXR0ZWQgPSBQcm9taXNlLnJlamVjdChkb21FeGNlcHRpb24pO1xuICAgICAgY29uc3QgZmluaXNoZWQgPSBQcm9taXNlLnJlamVjdChkb21FeGNlcHRpb24pO1xuICAgICAgY29tbWl0dGVkLmNhdGNoKCgpID0+IHt9KTtcbiAgICAgIGZpbmlzaGVkLmNhdGNoKCgpID0+IHt9KTtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGNvbW1pdHRlZCxcbiAgICAgICAgZmluaXNoZWQsXG4gICAgICB9O1xuICAgIH1cbiAgICBjb25zdCBlbnRyeSA9IHRoaXMuZW50cmllc0Fyclt0aGlzLmN1cnJlbnRFbnRyeUluZGV4ICsgMV07XG4gICAgcmV0dXJuIHRoaXMudHJhdmVyc2VUbyhlbnRyeS5rZXksIG9wdGlvbnMpO1xuICB9XG5cbiAgLyoqXG4gICAqIEVxdWl2YWxlbnQgdG8gYGhpc3RvcnkuZ28oKWAuXG4gICAqIE5vdGUgdGhhdCB0aGlzIG1ldGhvZCBkb2VzIG5vdCBhY3R1YWxseSB3b3JrIHByZWNpc2VseSB0byBob3cgQ2hyb21lXG4gICAqIGRvZXMsIGluc3RlYWQgY2hvb3NpbmcgYSBzaW1wbGVyIG1vZGVsIHdpdGggbGVzcyB1bmV4cGVjdGVkIGJlaGF2aW9yLlxuICAgKiBDaHJvbWUgaGFzIGEgZmV3IGVkZ2UgY2FzZSBvcHRpbWl6YXRpb25zLCBmb3IgaW5zdGFuY2Ugd2l0aCByZXBlYXRlZFxuICAgKiBgYmFjaygpOyBmb3J3YXJkKClgIGNoYWlucyBpdCBjb2xsYXBzZXMgY2VydGFpbiB0cmF2ZXJzYWxzLlxuICAgKi9cbiAgZ28oZGlyZWN0aW9uOiBudW1iZXIpOiB2b2lkIHtcbiAgICBjb25zdCB0YXJnZXRJbmRleCA9IHRoaXMucHJvc3BlY3RpdmVFbnRyeUluZGV4ICsgZGlyZWN0aW9uO1xuICAgIGlmICh0YXJnZXRJbmRleCA+PSB0aGlzLmVudHJpZXNBcnIubGVuZ3RoIHx8IHRhcmdldEluZGV4IDwgMCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLnByb3NwZWN0aXZlRW50cnlJbmRleCA9IHRhcmdldEluZGV4O1xuICAgIHRoaXMucnVuVHJhdmVyc2FsKCgpID0+IHtcbiAgICAgIC8vIENoZWNrIGFnYWluIHRoYXQgZGVzdGluYXRpb24gaXMgaW4gdGhlIGVudHJpZXMgYXJyYXkuXG4gICAgICBpZiAodGFyZ2V0SW5kZXggPj0gdGhpcy5lbnRyaWVzQXJyLmxlbmd0aCB8fCB0YXJnZXRJbmRleCA8IDApIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgY29uc3QgZnJvbVVybCA9IG5ldyBVUkwodGhpcy5jdXJyZW50RW50cnkudXJsISk7XG4gICAgICBjb25zdCBlbnRyeSA9IHRoaXMuZW50cmllc0Fyclt0YXJnZXRJbmRleF07XG4gICAgICBjb25zdCBoYXNoQ2hhbmdlID0gaXNIYXNoQ2hhbmdlKGZyb21VcmwsIG5ldyBVUkwoZW50cnkudXJsISwgdGhpcy5jdXJyZW50RW50cnkudXJsISkpO1xuICAgICAgY29uc3QgZGVzdGluYXRpb24gPSBuZXcgRmFrZU5hdmlnYXRpb25EZXN0aW5hdGlvbih7XG4gICAgICAgIHVybDogZW50cnkudXJsISxcbiAgICAgICAgc3RhdGU6IGVudHJ5LmdldFN0YXRlKCksXG4gICAgICAgIGhpc3RvcnlTdGF0ZTogZW50cnkuZ2V0SGlzdG9yeVN0YXRlKCksXG4gICAgICAgIGtleTogZW50cnkua2V5LFxuICAgICAgICBpZDogZW50cnkuaWQsXG4gICAgICAgIGluZGV4OiBlbnRyeS5pbmRleCxcbiAgICAgICAgc2FtZURvY3VtZW50OiBlbnRyeS5zYW1lRG9jdW1lbnQsXG4gICAgICB9KTtcbiAgICAgIGNvbnN0IHJlc3VsdCA9IG5ldyBJbnRlcm5hbE5hdmlnYXRpb25SZXN1bHQoKTtcbiAgICAgIHRoaXMudXNlckFnZW50TmF2aWdhdGUoZGVzdGluYXRpb24sIHJlc3VsdCwge1xuICAgICAgICBuYXZpZ2F0aW9uVHlwZTogJ3RyYXZlcnNlJyxcbiAgICAgICAgY2FuY2VsYWJsZTogdHJ1ZSxcbiAgICAgICAgY2FuSW50ZXJjZXB0OiB0cnVlLFxuICAgICAgICAvLyBBbHdheXMgZmFsc2UgZm9yIGdvKCkuXG4gICAgICAgIHVzZXJJbml0aWF0ZWQ6IGZhbHNlLFxuICAgICAgICBoYXNoQ2hhbmdlLFxuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICAvKiogUnVucyBhIHRyYXZlcnNhbCBzeW5jaHJvbm91c2x5IG9yIGFzeW5jaHJvbm91c2x5ICovXG4gIHByaXZhdGUgcnVuVHJhdmVyc2FsKHRyYXZlcnNhbDogKCkgPT4gdm9pZCkge1xuICAgIGlmICh0aGlzLnN5bmNocm9ub3VzVHJhdmVyc2Fscykge1xuICAgICAgdHJhdmVyc2FsKCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gRWFjaCB0cmF2ZXJzYWwgb2NjdXBpZXMgYSBzaW5nbGUgdGltZW91dCByZXNvbHV0aW9uLlxuICAgIC8vIFRoaXMgbWVhbnMgdGhhdCBQcm9taXNlcyBhZGRlZCB0byBjb21taXQgYW5kIGZpbmlzaCBzaG91bGQgcmVzb2x2ZVxuICAgIC8vIGJlZm9yZSB0aGUgbmV4dCB0cmF2ZXJzYWwuXG4gICAgdGhpcy5uZXh0VHJhdmVyc2FsID0gdGhpcy5uZXh0VHJhdmVyc2FsLnRoZW4oKCkgPT4ge1xuICAgICAgcmV0dXJuIG5ldyBQcm9taXNlPHZvaWQ+KChyZXNvbHZlKSA9PiB7XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICB0cmF2ZXJzYWwoKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKiBFcXVpdmFsZW50IHRvIGBuYXZpZ2F0aW9uLmFkZEV2ZW50TGlzdGVuZXIoKWAuICovXG4gIGFkZEV2ZW50TGlzdGVuZXIoXG4gICAgdHlwZTogc3RyaW5nLFxuICAgIGNhbGxiYWNrOiBFdmVudExpc3RlbmVyT3JFdmVudExpc3RlbmVyT2JqZWN0LFxuICAgIG9wdGlvbnM/OiBBZGRFdmVudExpc3RlbmVyT3B0aW9ucyB8IGJvb2xlYW4sXG4gICkge1xuICAgIHRoaXMuZXZlbnRUYXJnZXQuYWRkRXZlbnRMaXN0ZW5lcih0eXBlLCBjYWxsYmFjaywgb3B0aW9ucyk7XG4gIH1cblxuICAvKiogRXF1aXZhbGVudCB0byBgbmF2aWdhdGlvbi5yZW1vdmVFdmVudExpc3RlbmVyKClgLiAqL1xuICByZW1vdmVFdmVudExpc3RlbmVyKFxuICAgIHR5cGU6IHN0cmluZyxcbiAgICBjYWxsYmFjazogRXZlbnRMaXN0ZW5lck9yRXZlbnRMaXN0ZW5lck9iamVjdCxcbiAgICBvcHRpb25zPzogRXZlbnRMaXN0ZW5lck9wdGlvbnMgfCBib29sZWFuLFxuICApIHtcbiAgICB0aGlzLmV2ZW50VGFyZ2V0LnJlbW92ZUV2ZW50TGlzdGVuZXIodHlwZSwgY2FsbGJhY2ssIG9wdGlvbnMpO1xuICB9XG5cbiAgLyoqIEVxdWl2YWxlbnQgdG8gYG5hdmlnYXRpb24uZGlzcGF0Y2hFdmVudCgpYCAqL1xuICBkaXNwYXRjaEV2ZW50KGV2ZW50OiBFdmVudCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmV2ZW50VGFyZ2V0LmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xuICB9XG5cbiAgLyoqIENsZWFucyB1cCByZXNvdXJjZXMuICovXG4gIGRpc3Bvc2UoKSB7XG4gICAgLy8gUmVjcmVhdGUgZXZlbnRUYXJnZXQgdG8gcmVsZWFzZSBjdXJyZW50IGxpc3RlbmVycy5cbiAgICAvLyBgZG9jdW1lbnQuY3JlYXRlRWxlbWVudGAgYmVjYXVzZSBOb2RlSlMgYEV2ZW50VGFyZ2V0YCBpcyBpbmNvbXBhdGlibGUgd2l0aCBEb21pbm8ncyBgRXZlbnRgLlxuICAgIHRoaXMuZXZlbnRUYXJnZXQgPSB0aGlzLndpbmRvdy5kb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICB0aGlzLmRpc3Bvc2VkID0gdHJ1ZTtcbiAgfVxuXG4gIC8qKiBSZXR1cm5zIHdoZXRoZXIgdGhpcyBmYWtlIGlzIGRpc3Bvc2VkLiAqL1xuICBpc0Rpc3Bvc2VkKCkge1xuICAgIHJldHVybiB0aGlzLmRpc3Bvc2VkO1xuICB9XG5cbiAgLyoqIEltcGxlbWVudGF0aW9uIGZvciBhbGwgbmF2aWdhdGlvbnMgYW5kIHRyYXZlcnNhbHMuICovXG4gIHByaXZhdGUgdXNlckFnZW50TmF2aWdhdGUoXG4gICAgZGVzdGluYXRpb246IEZha2VOYXZpZ2F0aW9uRGVzdGluYXRpb24sXG4gICAgcmVzdWx0OiBJbnRlcm5hbE5hdmlnYXRpb25SZXN1bHQsXG4gICAgb3B0aW9uczogSW50ZXJuYWxOYXZpZ2F0ZU9wdGlvbnMsXG4gICkge1xuICAgIC8vIFRoZSBmaXJzdCBuYXZpZ2F0aW9uIHNob3VsZCBkaXNhbGxvdyBhbnkgZnV0dXJlIGNhbGxzIHRvIHNldCB0aGUgaW5pdGlhbFxuICAgIC8vIGVudHJ5LlxuICAgIHRoaXMuY2FuU2V0SW5pdGlhbEVudHJ5ID0gZmFsc2U7XG4gICAgaWYgKHRoaXMubmF2aWdhdGVFdmVudCkge1xuICAgICAgdGhpcy5uYXZpZ2F0ZUV2ZW50LmNhbmNlbChuZXcgRE9NRXhjZXB0aW9uKCdOYXZpZ2F0aW9uIHdhcyBhYm9ydGVkJywgJ0Fib3J0RXJyb3InKSk7XG4gICAgICB0aGlzLm5hdmlnYXRlRXZlbnQgPSB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgY29uc3QgbmF2aWdhdGVFdmVudCA9IGNyZWF0ZUZha2VOYXZpZ2F0ZUV2ZW50KHtcbiAgICAgIG5hdmlnYXRpb25UeXBlOiBvcHRpb25zLm5hdmlnYXRpb25UeXBlLFxuICAgICAgY2FuY2VsYWJsZTogb3B0aW9ucy5jYW5jZWxhYmxlLFxuICAgICAgY2FuSW50ZXJjZXB0OiBvcHRpb25zLmNhbkludGVyY2VwdCxcbiAgICAgIHVzZXJJbml0aWF0ZWQ6IG9wdGlvbnMudXNlckluaXRpYXRlZCxcbiAgICAgIGhhc2hDaGFuZ2U6IG9wdGlvbnMuaGFzaENoYW5nZSxcbiAgICAgIHNpZ25hbDogcmVzdWx0LnNpZ25hbCxcbiAgICAgIGRlc3RpbmF0aW9uLFxuICAgICAgaW5mbzogb3B0aW9ucy5pbmZvLFxuICAgICAgc2FtZURvY3VtZW50OiBkZXN0aW5hdGlvbi5zYW1lRG9jdW1lbnQsXG4gICAgICBza2lwUG9wU3RhdGU6IG9wdGlvbnMuc2tpcFBvcFN0YXRlLFxuICAgICAgcmVzdWx0LFxuICAgICAgdXNlckFnZW50Q29tbWl0OiAoKSA9PiB7XG4gICAgICAgIHRoaXMudXNlckFnZW50Q29tbWl0KCk7XG4gICAgICB9LFxuICAgIH0pO1xuXG4gICAgdGhpcy5uYXZpZ2F0ZUV2ZW50ID0gbmF2aWdhdGVFdmVudDtcbiAgICB0aGlzLmV2ZW50VGFyZ2V0LmRpc3BhdGNoRXZlbnQobmF2aWdhdGVFdmVudCk7XG4gICAgbmF2aWdhdGVFdmVudC5kaXNwYXRjaGVkTmF2aWdhdGVFdmVudCgpO1xuICAgIGlmIChuYXZpZ2F0ZUV2ZW50LmNvbW1pdE9wdGlvbiA9PT0gJ2ltbWVkaWF0ZScpIHtcbiAgICAgIG5hdmlnYXRlRXZlbnQuY29tbWl0KC8qIGludGVybmFsPSAqLyB0cnVlKTtcbiAgICB9XG4gIH1cblxuICAvKiogSW1wbGVtZW50YXRpb24gdG8gY29tbWl0IGEgbmF2aWdhdGlvbi4gKi9cbiAgcHJpdmF0ZSB1c2VyQWdlbnRDb21taXQoKSB7XG4gICAgaWYgKCF0aGlzLm5hdmlnYXRlRXZlbnQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgZnJvbSA9IHRoaXMuY3VycmVudEVudHJ5O1xuICAgIGlmICghdGhpcy5uYXZpZ2F0ZUV2ZW50LnNhbWVEb2N1bWVudCkge1xuICAgICAgY29uc3QgZXJyb3IgPSBuZXcgRXJyb3IoJ0Nhbm5vdCBuYXZpZ2F0ZSB0byBhIG5vbi1zYW1lLWRvY3VtZW50IFVSTC4nKTtcbiAgICAgIHRoaXMubmF2aWdhdGVFdmVudC5jYW5jZWwoZXJyb3IpO1xuICAgICAgdGhyb3cgZXJyb3I7XG4gICAgfVxuICAgIGlmIChcbiAgICAgIHRoaXMubmF2aWdhdGVFdmVudC5uYXZpZ2F0aW9uVHlwZSA9PT0gJ3B1c2gnIHx8XG4gICAgICB0aGlzLm5hdmlnYXRlRXZlbnQubmF2aWdhdGlvblR5cGUgPT09ICdyZXBsYWNlJ1xuICAgICkge1xuICAgICAgdGhpcy51c2VyQWdlbnRQdXNoT3JSZXBsYWNlKHRoaXMubmF2aWdhdGVFdmVudC5kZXN0aW5hdGlvbiwge1xuICAgICAgICBuYXZpZ2F0aW9uVHlwZTogdGhpcy5uYXZpZ2F0ZUV2ZW50Lm5hdmlnYXRpb25UeXBlLFxuICAgICAgfSk7XG4gICAgfSBlbHNlIGlmICh0aGlzLm5hdmlnYXRlRXZlbnQubmF2aWdhdGlvblR5cGUgPT09ICd0cmF2ZXJzZScpIHtcbiAgICAgIHRoaXMudXNlckFnZW50VHJhdmVyc2UodGhpcy5uYXZpZ2F0ZUV2ZW50LmRlc3RpbmF0aW9uKTtcbiAgICB9XG4gICAgdGhpcy5uYXZpZ2F0ZUV2ZW50LnVzZXJBZ2VudE5hdmlnYXRlZCh0aGlzLmN1cnJlbnRFbnRyeSk7XG4gICAgY29uc3QgY3VycmVudEVudHJ5Q2hhbmdlRXZlbnQgPSBjcmVhdGVGYWtlTmF2aWdhdGlvbkN1cnJlbnRFbnRyeUNoYW5nZUV2ZW50KHtcbiAgICAgIGZyb20sXG4gICAgICBuYXZpZ2F0aW9uVHlwZTogdGhpcy5uYXZpZ2F0ZUV2ZW50Lm5hdmlnYXRpb25UeXBlLFxuICAgIH0pO1xuICAgIHRoaXMuZXZlbnRUYXJnZXQuZGlzcGF0Y2hFdmVudChjdXJyZW50RW50cnlDaGFuZ2VFdmVudCk7XG4gICAgaWYgKCF0aGlzLm5hdmlnYXRlRXZlbnQuc2tpcFBvcFN0YXRlKSB7XG4gICAgICBjb25zdCBwb3BTdGF0ZUV2ZW50ID0gY3JlYXRlUG9wU3RhdGVFdmVudCh7XG4gICAgICAgIHN0YXRlOiB0aGlzLm5hdmlnYXRlRXZlbnQuZGVzdGluYXRpb24uZ2V0SGlzdG9yeVN0YXRlKCksXG4gICAgICB9KTtcbiAgICAgIHRoaXMud2luZG93LmRpc3BhdGNoRXZlbnQocG9wU3RhdGVFdmVudCk7XG4gICAgfVxuICB9XG5cbiAgLyoqIEltcGxlbWVudGF0aW9uIGZvciBhIHB1c2ggb3IgcmVwbGFjZSBuYXZpZ2F0aW9uLiAqL1xuICBwcml2YXRlIHVzZXJBZ2VudFB1c2hPclJlcGxhY2UoXG4gICAgZGVzdGluYXRpb246IEZha2VOYXZpZ2F0aW9uRGVzdGluYXRpb24sXG4gICAge25hdmlnYXRpb25UeXBlfToge25hdmlnYXRpb25UeXBlOiBOYXZpZ2F0aW9uVHlwZVN0cmluZ30sXG4gICkge1xuICAgIGlmIChuYXZpZ2F0aW9uVHlwZSA9PT0gJ3B1c2gnKSB7XG4gICAgICB0aGlzLmN1cnJlbnRFbnRyeUluZGV4Kys7XG4gICAgICB0aGlzLnByb3NwZWN0aXZlRW50cnlJbmRleCA9IHRoaXMuY3VycmVudEVudHJ5SW5kZXg7XG4gICAgfVxuICAgIGNvbnN0IGluZGV4ID0gdGhpcy5jdXJyZW50RW50cnlJbmRleDtcbiAgICBjb25zdCBrZXkgPSBuYXZpZ2F0aW9uVHlwZSA9PT0gJ3B1c2gnID8gU3RyaW5nKHRoaXMubmV4dEtleSsrKSA6IHRoaXMuY3VycmVudEVudHJ5LmtleTtcbiAgICBjb25zdCBlbnRyeSA9IG5ldyBGYWtlTmF2aWdhdGlvbkhpc3RvcnlFbnRyeShkZXN0aW5hdGlvbi51cmwsIHtcbiAgICAgIGlkOiBTdHJpbmcodGhpcy5uZXh0SWQrKyksXG4gICAgICBrZXksXG4gICAgICBpbmRleCxcbiAgICAgIHNhbWVEb2N1bWVudDogdHJ1ZSxcbiAgICAgIHN0YXRlOiBkZXN0aW5hdGlvbi5nZXRTdGF0ZSgpLFxuICAgICAgaGlzdG9yeVN0YXRlOiBkZXN0aW5hdGlvbi5nZXRIaXN0b3J5U3RhdGUoKSxcbiAgICB9KTtcbiAgICBpZiAobmF2aWdhdGlvblR5cGUgPT09ICdwdXNoJykge1xuICAgICAgdGhpcy5lbnRyaWVzQXJyLnNwbGljZShpbmRleCwgSW5maW5pdHksIGVudHJ5KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5lbnRyaWVzQXJyW2luZGV4XSA9IGVudHJ5O1xuICAgIH1cbiAgfVxuXG4gIC8qKiBJbXBsZW1lbnRhdGlvbiBmb3IgYSB0cmF2ZXJzZSBuYXZpZ2F0aW9uLiAqL1xuICBwcml2YXRlIHVzZXJBZ2VudFRyYXZlcnNlKGRlc3RpbmF0aW9uOiBGYWtlTmF2aWdhdGlvbkRlc3RpbmF0aW9uKSB7XG4gICAgdGhpcy5jdXJyZW50RW50cnlJbmRleCA9IGRlc3RpbmF0aW9uLmluZGV4O1xuICB9XG5cbiAgLyoqIFV0aWxpdHkgbWV0aG9kIGZvciBmaW5kaW5nIGVudHJpZXMgd2l0aCB0aGUgZ2l2ZW4gYGtleWAuICovXG4gIHByaXZhdGUgZmluZEVudHJ5KGtleTogc3RyaW5nKSB7XG4gICAgZm9yIChjb25zdCBlbnRyeSBvZiB0aGlzLmVudHJpZXNBcnIpIHtcbiAgICAgIGlmIChlbnRyeS5rZXkgPT09IGtleSkgcmV0dXJuIGVudHJ5O1xuICAgIH1cbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG5cbiAgc2V0IG9ubmF2aWdhdGUoX2hhbmRsZXI6ICgodGhpczogTmF2aWdhdGlvbiwgZXY6IE5hdmlnYXRlRXZlbnQpID0+IGFueSkgfCBudWxsKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCd1bmltcGxlbWVudGVkJyk7XG4gIH1cblxuICBnZXQgb25uYXZpZ2F0ZSgpOiAoKHRoaXM6IE5hdmlnYXRpb24sIGV2OiBOYXZpZ2F0ZUV2ZW50KSA9PiBhbnkpIHwgbnVsbCB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCd1bmltcGxlbWVudGVkJyk7XG4gIH1cblxuICBzZXQgb25jdXJyZW50ZW50cnljaGFuZ2UoXG4gICAgX2hhbmRsZXI6ICgodGhpczogTmF2aWdhdGlvbiwgZXY6IE5hdmlnYXRpb25DdXJyZW50RW50cnlDaGFuZ2VFdmVudCkgPT4gYW55KSB8IG51bGwsXG4gICkge1xuICAgIHRocm93IG5ldyBFcnJvcigndW5pbXBsZW1lbnRlZCcpO1xuICB9XG5cbiAgZ2V0IG9uY3VycmVudGVudHJ5Y2hhbmdlKCk6XG4gICAgfCAoKHRoaXM6IE5hdmlnYXRpb24sIGV2OiBOYXZpZ2F0aW9uQ3VycmVudEVudHJ5Q2hhbmdlRXZlbnQpID0+IGFueSlcbiAgICB8IG51bGwge1xuICAgIHRocm93IG5ldyBFcnJvcigndW5pbXBsZW1lbnRlZCcpO1xuICB9XG5cbiAgc2V0IG9ubmF2aWdhdGVzdWNjZXNzKF9oYW5kbGVyOiAoKHRoaXM6IE5hdmlnYXRpb24sIGV2OiBFdmVudCkgPT4gYW55KSB8IG51bGwpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3VuaW1wbGVtZW50ZWQnKTtcbiAgfVxuXG4gIGdldCBvbm5hdmlnYXRlc3VjY2VzcygpOiAoKHRoaXM6IE5hdmlnYXRpb24sIGV2OiBFdmVudCkgPT4gYW55KSB8IG51bGwge1xuICAgIHRocm93IG5ldyBFcnJvcigndW5pbXBsZW1lbnRlZCcpO1xuICB9XG5cbiAgc2V0IG9ubmF2aWdhdGVlcnJvcihfaGFuZGxlcjogKCh0aGlzOiBOYXZpZ2F0aW9uLCBldjogRXJyb3JFdmVudCkgPT4gYW55KSB8IG51bGwpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3VuaW1wbGVtZW50ZWQnKTtcbiAgfVxuXG4gIGdldCBvbm5hdmlnYXRlZXJyb3IoKTogKCh0aGlzOiBOYXZpZ2F0aW9uLCBldjogRXJyb3JFdmVudCkgPT4gYW55KSB8IG51bGwge1xuICAgIHRocm93IG5ldyBFcnJvcigndW5pbXBsZW1lbnRlZCcpO1xuICB9XG5cbiAgZ2V0IHRyYW5zaXRpb24oKTogTmF2aWdhdGlvblRyYW5zaXRpb24gfCBudWxsIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3VuaW1wbGVtZW50ZWQnKTtcbiAgfVxuXG4gIHVwZGF0ZUN1cnJlbnRFbnRyeShfb3B0aW9uczogTmF2aWdhdGlvblVwZGF0ZUN1cnJlbnRFbnRyeU9wdGlvbnMpOiB2b2lkIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3VuaW1wbGVtZW50ZWQnKTtcbiAgfVxuXG4gIHJlbG9hZChfb3B0aW9ucz86IE5hdmlnYXRpb25SZWxvYWRPcHRpb25zKTogTmF2aWdhdGlvblJlc3VsdCB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCd1bmltcGxlbWVudGVkJyk7XG4gIH1cbn1cblxuLyoqXG4gKiBGYWtlIGVxdWl2YWxlbnQgb2YgdGhlIGBOYXZpZ2F0aW9uUmVzdWx0YCBpbnRlcmZhY2Ugd2l0aFxuICogYEZha2VOYXZpZ2F0aW9uSGlzdG9yeUVudHJ5YC5cbiAqL1xuaW50ZXJmYWNlIEZha2VOYXZpZ2F0aW9uUmVzdWx0IGV4dGVuZHMgTmF2aWdhdGlvblJlc3VsdCB7XG4gIHJlYWRvbmx5IGNvbW1pdHRlZDogUHJvbWlzZTxGYWtlTmF2aWdhdGlvbkhpc3RvcnlFbnRyeT47XG4gIHJlYWRvbmx5IGZpbmlzaGVkOiBQcm9taXNlPEZha2VOYXZpZ2F0aW9uSGlzdG9yeUVudHJ5Pjtcbn1cblxuLyoqXG4gKiBGYWtlIGVxdWl2YWxlbnQgb2YgYE5hdmlnYXRpb25IaXN0b3J5RW50cnlgLlxuICovXG5leHBvcnQgY2xhc3MgRmFrZU5hdmlnYXRpb25IaXN0b3J5RW50cnkgaW1wbGVtZW50cyBOYXZpZ2F0aW9uSGlzdG9yeUVudHJ5IHtcbiAgcmVhZG9ubHkgc2FtZURvY3VtZW50O1xuXG4gIHJlYWRvbmx5IGlkOiBzdHJpbmc7XG4gIHJlYWRvbmx5IGtleTogc3RyaW5nO1xuICByZWFkb25seSBpbmRleDogbnVtYmVyO1xuICBwcml2YXRlIHJlYWRvbmx5IHN0YXRlOiB1bmtub3duO1xuICBwcml2YXRlIHJlYWRvbmx5IGhpc3RvcnlTdGF0ZTogdW5rbm93bjtcblxuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tYW55XG4gIG9uZGlzcG9zZTogKCh0aGlzOiBOYXZpZ2F0aW9uSGlzdG9yeUVudHJ5LCBldjogRXZlbnQpID0+IGFueSkgfCBudWxsID0gbnVsbDtcblxuICBjb25zdHJ1Y3RvcihcbiAgICByZWFkb25seSB1cmw6IHN0cmluZyB8IG51bGwsXG4gICAge1xuICAgICAgaWQsXG4gICAgICBrZXksXG4gICAgICBpbmRleCxcbiAgICAgIHNhbWVEb2N1bWVudCxcbiAgICAgIHN0YXRlLFxuICAgICAgaGlzdG9yeVN0YXRlLFxuICAgIH06IHtcbiAgICAgIGlkOiBzdHJpbmc7XG4gICAgICBrZXk6IHN0cmluZztcbiAgICAgIGluZGV4OiBudW1iZXI7XG4gICAgICBzYW1lRG9jdW1lbnQ6IGJvb2xlYW47XG4gICAgICBoaXN0b3J5U3RhdGU6IHVua25vd247XG4gICAgICBzdGF0ZT86IHVua25vd247XG4gICAgfSxcbiAgKSB7XG4gICAgdGhpcy5pZCA9IGlkO1xuICAgIHRoaXMua2V5ID0ga2V5O1xuICAgIHRoaXMuaW5kZXggPSBpbmRleDtcbiAgICB0aGlzLnNhbWVEb2N1bWVudCA9IHNhbWVEb2N1bWVudDtcbiAgICB0aGlzLnN0YXRlID0gc3RhdGU7XG4gICAgdGhpcy5oaXN0b3J5U3RhdGUgPSBoaXN0b3J5U3RhdGU7XG4gIH1cblxuICBnZXRTdGF0ZSgpOiB1bmtub3duIHtcbiAgICAvLyBCdWRnZXQgY29weS5cbiAgICByZXR1cm4gdGhpcy5zdGF0ZSA/IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkodGhpcy5zdGF0ZSkpIDogdGhpcy5zdGF0ZTtcbiAgfVxuXG4gIGdldEhpc3RvcnlTdGF0ZSgpOiB1bmtub3duIHtcbiAgICAvLyBCdWRnZXQgY29weS5cbiAgICByZXR1cm4gdGhpcy5oaXN0b3J5U3RhdGUgPyBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KHRoaXMuaGlzdG9yeVN0YXRlKSkgOiB0aGlzLmhpc3RvcnlTdGF0ZTtcbiAgfVxuXG4gIGFkZEV2ZW50TGlzdGVuZXIoXG4gICAgdHlwZTogc3RyaW5nLFxuICAgIGNhbGxiYWNrOiBFdmVudExpc3RlbmVyT3JFdmVudExpc3RlbmVyT2JqZWN0LFxuICAgIG9wdGlvbnM/OiBBZGRFdmVudExpc3RlbmVyT3B0aW9ucyB8IGJvb2xlYW4sXG4gICkge1xuICAgIHRocm93IG5ldyBFcnJvcigndW5pbXBsZW1lbnRlZCcpO1xuICB9XG5cbiAgcmVtb3ZlRXZlbnRMaXN0ZW5lcihcbiAgICB0eXBlOiBzdHJpbmcsXG4gICAgY2FsbGJhY2s6IEV2ZW50TGlzdGVuZXJPckV2ZW50TGlzdGVuZXJPYmplY3QsXG4gICAgb3B0aW9ucz86IEV2ZW50TGlzdGVuZXJPcHRpb25zIHwgYm9vbGVhbixcbiAgKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCd1bmltcGxlbWVudGVkJyk7XG4gIH1cblxuICBkaXNwYXRjaEV2ZW50KGV2ZW50OiBFdmVudCk6IGJvb2xlYW4ge1xuICAgIHRocm93IG5ldyBFcnJvcigndW5pbXBsZW1lbnRlZCcpO1xuICB9XG59XG5cbi8qKiBgTmF2aWdhdGlvbkludGVyY2VwdE9wdGlvbnNgIHdpdGggZXhwZXJpbWVudGFsIGNvbW1pdCBvcHRpb24uICovXG5leHBvcnQgaW50ZXJmYWNlIEV4cGVyaW1lbnRhbE5hdmlnYXRpb25JbnRlcmNlcHRPcHRpb25zIGV4dGVuZHMgTmF2aWdhdGlvbkludGVyY2VwdE9wdGlvbnMge1xuICBjb21taXQ/OiAnaW1tZWRpYXRlJyB8ICdhZnRlci10cmFuc2l0aW9uJztcbn1cblxuLyoqIGBOYXZpZ2F0ZUV2ZW50YCB3aXRoIGV4cGVyaW1lbnRhbCBjb21taXQgZnVuY3Rpb24uICovXG5leHBvcnQgaW50ZXJmYWNlIEV4cGVyaW1lbnRhbE5hdmlnYXRlRXZlbnQgZXh0ZW5kcyBOYXZpZ2F0ZUV2ZW50IHtcbiAgaW50ZXJjZXB0KG9wdGlvbnM/OiBFeHBlcmltZW50YWxOYXZpZ2F0aW9uSW50ZXJjZXB0T3B0aW9ucyk6IHZvaWQ7XG5cbiAgY29tbWl0KCk6IHZvaWQ7XG59XG5cbi8qKlxuICogRmFrZSBlcXVpdmFsZW50IG9mIGBOYXZpZ2F0ZUV2ZW50YC5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBGYWtlTmF2aWdhdGVFdmVudCBleHRlbmRzIEV4cGVyaW1lbnRhbE5hdmlnYXRlRXZlbnQge1xuICByZWFkb25seSBkZXN0aW5hdGlvbjogRmFrZU5hdmlnYXRpb25EZXN0aW5hdGlvbjtcbn1cblxuaW50ZXJmYWNlIEludGVybmFsRmFrZU5hdmlnYXRlRXZlbnQgZXh0ZW5kcyBGYWtlTmF2aWdhdGVFdmVudCB7XG4gIHJlYWRvbmx5IHNhbWVEb2N1bWVudDogYm9vbGVhbjtcbiAgcmVhZG9ubHkgc2tpcFBvcFN0YXRlPzogYm9vbGVhbjtcbiAgcmVhZG9ubHkgY29tbWl0T3B0aW9uOiAnYWZ0ZXItdHJhbnNpdGlvbicgfCAnaW1tZWRpYXRlJztcbiAgcmVhZG9ubHkgcmVzdWx0OiBJbnRlcm5hbE5hdmlnYXRpb25SZXN1bHQ7XG5cbiAgY29tbWl0KGludGVybmFsPzogYm9vbGVhbik6IHZvaWQ7XG4gIGNhbmNlbChyZWFzb246IEVycm9yKTogdm9pZDtcbiAgZGlzcGF0Y2hlZE5hdmlnYXRlRXZlbnQoKTogdm9pZDtcbiAgdXNlckFnZW50TmF2aWdhdGVkKGVudHJ5OiBGYWtlTmF2aWdhdGlvbkhpc3RvcnlFbnRyeSk6IHZvaWQ7XG59XG5cbi8qKlxuICogQ3JlYXRlIGEgZmFrZSBlcXVpdmFsZW50IG9mIGBOYXZpZ2F0ZUV2ZW50YC4gVGhpcyBpcyBub3QgYSBjbGFzcyBiZWNhdXNlIEVTNVxuICogdHJhbnNwaWxlZCBKYXZhU2NyaXB0IGNhbm5vdCBleHRlbmQgbmF0aXZlIEV2ZW50LlxuICovXG5mdW5jdGlvbiBjcmVhdGVGYWtlTmF2aWdhdGVFdmVudCh7XG4gIGNhbmNlbGFibGUsXG4gIGNhbkludGVyY2VwdCxcbiAgdXNlckluaXRpYXRlZCxcbiAgaGFzaENoYW5nZSxcbiAgbmF2aWdhdGlvblR5cGUsXG4gIHNpZ25hbCxcbiAgZGVzdGluYXRpb24sXG4gIGluZm8sXG4gIHNhbWVEb2N1bWVudCxcbiAgc2tpcFBvcFN0YXRlLFxuICByZXN1bHQsXG4gIHVzZXJBZ2VudENvbW1pdCxcbn06IHtcbiAgY2FuY2VsYWJsZTogYm9vbGVhbjtcbiAgY2FuSW50ZXJjZXB0OiBib29sZWFuO1xuICB1c2VySW5pdGlhdGVkOiBib29sZWFuO1xuICBoYXNoQ2hhbmdlOiBib29sZWFuO1xuICBuYXZpZ2F0aW9uVHlwZTogTmF2aWdhdGlvblR5cGVTdHJpbmc7XG4gIHNpZ25hbDogQWJvcnRTaWduYWw7XG4gIGRlc3RpbmF0aW9uOiBGYWtlTmF2aWdhdGlvbkRlc3RpbmF0aW9uO1xuICBpbmZvOiB1bmtub3duO1xuICBzYW1lRG9jdW1lbnQ6IGJvb2xlYW47XG4gIHNraXBQb3BTdGF0ZT86IGJvb2xlYW47XG4gIHJlc3VsdDogSW50ZXJuYWxOYXZpZ2F0aW9uUmVzdWx0O1xuICB1c2VyQWdlbnRDb21taXQ6ICgpID0+IHZvaWQ7XG59KSB7XG4gIGNvbnN0IGV2ZW50ID0gbmV3IEV2ZW50KCduYXZpZ2F0ZScsIHtidWJibGVzOiBmYWxzZSwgY2FuY2VsYWJsZX0pIGFzIHtcbiAgICAtcmVhZG9ubHkgW1AgaW4ga2V5b2YgSW50ZXJuYWxGYWtlTmF2aWdhdGVFdmVudF06IEludGVybmFsRmFrZU5hdmlnYXRlRXZlbnRbUF07XG4gIH07XG4gIGV2ZW50LmNhbkludGVyY2VwdCA9IGNhbkludGVyY2VwdDtcbiAgZXZlbnQudXNlckluaXRpYXRlZCA9IHVzZXJJbml0aWF0ZWQ7XG4gIGV2ZW50Lmhhc2hDaGFuZ2UgPSBoYXNoQ2hhbmdlO1xuICBldmVudC5uYXZpZ2F0aW9uVHlwZSA9IG5hdmlnYXRpb25UeXBlO1xuICBldmVudC5zaWduYWwgPSBzaWduYWw7XG4gIGV2ZW50LmRlc3RpbmF0aW9uID0gZGVzdGluYXRpb247XG4gIGV2ZW50LmluZm8gPSBpbmZvO1xuICBldmVudC5kb3dubG9hZFJlcXVlc3QgPSBudWxsO1xuICBldmVudC5mb3JtRGF0YSA9IG51bGw7XG5cbiAgZXZlbnQuc2FtZURvY3VtZW50ID0gc2FtZURvY3VtZW50O1xuICBldmVudC5za2lwUG9wU3RhdGUgPSBza2lwUG9wU3RhdGU7XG4gIGV2ZW50LmNvbW1pdE9wdGlvbiA9ICdpbW1lZGlhdGUnO1xuXG4gIGxldCBoYW5kbGVyRmluaXNoZWQ6IFByb21pc2U8dm9pZD4gfCB1bmRlZmluZWQgPSB1bmRlZmluZWQ7XG4gIGxldCBpbnRlcmNlcHRDYWxsZWQgPSBmYWxzZTtcbiAgbGV0IGRpc3BhdGNoZWROYXZpZ2F0ZUV2ZW50ID0gZmFsc2U7XG4gIGxldCBjb21taXRDYWxsZWQgPSBmYWxzZTtcblxuICBldmVudC5pbnRlcmNlcHQgPSBmdW5jdGlvbiAoXG4gICAgdGhpczogSW50ZXJuYWxGYWtlTmF2aWdhdGVFdmVudCxcbiAgICBvcHRpb25zPzogRXhwZXJpbWVudGFsTmF2aWdhdGlvbkludGVyY2VwdE9wdGlvbnMsXG4gICk6IHZvaWQge1xuICAgIGludGVyY2VwdENhbGxlZCA9IHRydWU7XG4gICAgZXZlbnQuc2FtZURvY3VtZW50ID0gdHJ1ZTtcbiAgICBjb25zdCBoYW5kbGVyID0gb3B0aW9ucz8uaGFuZGxlcjtcbiAgICBpZiAoaGFuZGxlcikge1xuICAgICAgaGFuZGxlckZpbmlzaGVkID0gaGFuZGxlcigpO1xuICAgIH1cbiAgICBpZiAob3B0aW9ucz8uY29tbWl0KSB7XG4gICAgICBldmVudC5jb21taXRPcHRpb24gPSBvcHRpb25zLmNvbW1pdDtcbiAgICB9XG4gICAgaWYgKG9wdGlvbnM/LmZvY3VzUmVzZXQgIT09IHVuZGVmaW5lZCB8fCBvcHRpb25zPy5zY3JvbGwgIT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCd1bmltcGxlbWVudGVkJyk7XG4gICAgfVxuICB9O1xuXG4gIGV2ZW50LnNjcm9sbCA9IGZ1bmN0aW9uICh0aGlzOiBJbnRlcm5hbEZha2VOYXZpZ2F0ZUV2ZW50KTogdm9pZCB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCd1bmltcGxlbWVudGVkJyk7XG4gIH07XG5cbiAgZXZlbnQuY29tbWl0ID0gZnVuY3Rpb24gKHRoaXM6IEludGVybmFsRmFrZU5hdmlnYXRlRXZlbnQsIGludGVybmFsID0gZmFsc2UpIHtcbiAgICBpZiAoIWludGVybmFsICYmICFpbnRlcmNlcHRDYWxsZWQpIHtcbiAgICAgIHRocm93IG5ldyBET01FeGNlcHRpb24oXG4gICAgICAgIGBGYWlsZWQgdG8gZXhlY3V0ZSAnY29tbWl0JyBvbiAnTmF2aWdhdGVFdmVudCc6IGludGVyY2VwdCgpIG11c3QgYmUgYCArXG4gICAgICAgICAgYGNhbGxlZCBiZWZvcmUgY29tbWl0KCkuYCxcbiAgICAgICAgJ0ludmFsaWRTdGF0ZUVycm9yJyxcbiAgICAgICk7XG4gICAgfVxuICAgIGlmICghZGlzcGF0Y2hlZE5hdmlnYXRlRXZlbnQpIHtcbiAgICAgIHRocm93IG5ldyBET01FeGNlcHRpb24oXG4gICAgICAgIGBGYWlsZWQgdG8gZXhlY3V0ZSAnY29tbWl0JyBvbiAnTmF2aWdhdGVFdmVudCc6IGNvbW1pdCgpIG1heSBub3QgYmUgYCArXG4gICAgICAgICAgYGNhbGxlZCBkdXJpbmcgZXZlbnQgZGlzcGF0Y2guYCxcbiAgICAgICAgJ0ludmFsaWRTdGF0ZUVycm9yJyxcbiAgICAgICk7XG4gICAgfVxuICAgIGlmIChjb21taXRDYWxsZWQpIHtcbiAgICAgIHRocm93IG5ldyBET01FeGNlcHRpb24oXG4gICAgICAgIGBGYWlsZWQgdG8gZXhlY3V0ZSAnY29tbWl0JyBvbiAnTmF2aWdhdGVFdmVudCc6IGNvbW1pdCgpIGFscmVhZHkgYCArIGBjYWxsZWQuYCxcbiAgICAgICAgJ0ludmFsaWRTdGF0ZUVycm9yJyxcbiAgICAgICk7XG4gICAgfVxuICAgIGNvbW1pdENhbGxlZCA9IHRydWU7XG5cbiAgICB1c2VyQWdlbnRDb21taXQoKTtcbiAgfTtcblxuICAvLyBJbnRlcm5hbCBvbmx5LlxuICBldmVudC5jYW5jZWwgPSBmdW5jdGlvbiAodGhpczogSW50ZXJuYWxGYWtlTmF2aWdhdGVFdmVudCwgcmVhc29uOiBFcnJvcikge1xuICAgIHJlc3VsdC5jb21taXR0ZWRSZWplY3QocmVhc29uKTtcbiAgICByZXN1bHQuZmluaXNoZWRSZWplY3QocmVhc29uKTtcbiAgfTtcblxuICAvLyBJbnRlcm5hbCBvbmx5LlxuICBldmVudC5kaXNwYXRjaGVkTmF2aWdhdGVFdmVudCA9IGZ1bmN0aW9uICh0aGlzOiBJbnRlcm5hbEZha2VOYXZpZ2F0ZUV2ZW50KSB7XG4gICAgZGlzcGF0Y2hlZE5hdmlnYXRlRXZlbnQgPSB0cnVlO1xuICAgIGlmIChldmVudC5jb21taXRPcHRpb24gPT09ICdhZnRlci10cmFuc2l0aW9uJykge1xuICAgICAgLy8gSWYgaGFuZGxlciBmaW5pc2hlcyBiZWZvcmUgY29tbWl0LCBjYWxsIGNvbW1pdC5cbiAgICAgIGhhbmRsZXJGaW5pc2hlZD8udGhlbihcbiAgICAgICAgKCkgPT4ge1xuICAgICAgICAgIGlmICghY29tbWl0Q2FsbGVkKSB7XG4gICAgICAgICAgICBldmVudC5jb21taXQoLyogaW50ZXJuYWwgKi8gdHJ1ZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICAoKSA9PiB7fSxcbiAgICAgICk7XG4gICAgfVxuICAgIFByb21pc2UuYWxsKFtyZXN1bHQuY29tbWl0dGVkLCBoYW5kbGVyRmluaXNoZWRdKS50aGVuKFxuICAgICAgKFtlbnRyeV0pID0+IHtcbiAgICAgICAgcmVzdWx0LmZpbmlzaGVkUmVzb2x2ZShlbnRyeSk7XG4gICAgICB9LFxuICAgICAgKHJlYXNvbikgPT4ge1xuICAgICAgICByZXN1bHQuZmluaXNoZWRSZWplY3QocmVhc29uKTtcbiAgICAgIH0sXG4gICAgKTtcbiAgfTtcblxuICAvLyBJbnRlcm5hbCBvbmx5LlxuICBldmVudC51c2VyQWdlbnROYXZpZ2F0ZWQgPSBmdW5jdGlvbiAoXG4gICAgdGhpczogSW50ZXJuYWxGYWtlTmF2aWdhdGVFdmVudCxcbiAgICBlbnRyeTogRmFrZU5hdmlnYXRpb25IaXN0b3J5RW50cnksXG4gICkge1xuICAgIHJlc3VsdC5jb21taXR0ZWRSZXNvbHZlKGVudHJ5KTtcbiAgfTtcblxuICByZXR1cm4gZXZlbnQgYXMgSW50ZXJuYWxGYWtlTmF2aWdhdGVFdmVudDtcbn1cblxuLyoqIEZha2UgZXF1aXZhbGVudCBvZiBgTmF2aWdhdGlvbkN1cnJlbnRFbnRyeUNoYW5nZUV2ZW50YC4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgRmFrZU5hdmlnYXRpb25DdXJyZW50RW50cnlDaGFuZ2VFdmVudCBleHRlbmRzIE5hdmlnYXRpb25DdXJyZW50RW50cnlDaGFuZ2VFdmVudCB7XG4gIHJlYWRvbmx5IGZyb206IEZha2VOYXZpZ2F0aW9uSGlzdG9yeUVudHJ5O1xufVxuXG4vKipcbiAqIENyZWF0ZSBhIGZha2UgZXF1aXZhbGVudCBvZiBgTmF2aWdhdGlvbkN1cnJlbnRFbnRyeUNoYW5nZWAuIFRoaXMgZG9lcyBub3QgdXNlXG4gKiBhIGNsYXNzIGJlY2F1c2UgRVM1IHRyYW5zcGlsZWQgSmF2YVNjcmlwdCBjYW5ub3QgZXh0ZW5kIG5hdGl2ZSBFdmVudC5cbiAqL1xuZnVuY3Rpb24gY3JlYXRlRmFrZU5hdmlnYXRpb25DdXJyZW50RW50cnlDaGFuZ2VFdmVudCh7XG4gIGZyb20sXG4gIG5hdmlnYXRpb25UeXBlLFxufToge1xuICBmcm9tOiBGYWtlTmF2aWdhdGlvbkhpc3RvcnlFbnRyeTtcbiAgbmF2aWdhdGlvblR5cGU6IE5hdmlnYXRpb25UeXBlU3RyaW5nO1xufSkge1xuICBjb25zdCBldmVudCA9IG5ldyBFdmVudCgnY3VycmVudGVudHJ5Y2hhbmdlJywge1xuICAgIGJ1YmJsZXM6IGZhbHNlLFxuICAgIGNhbmNlbGFibGU6IGZhbHNlLFxuICB9KSBhcyB7XG4gICAgLXJlYWRvbmx5IFtQIGluIGtleW9mIE5hdmlnYXRpb25DdXJyZW50RW50cnlDaGFuZ2VFdmVudF06IE5hdmlnYXRpb25DdXJyZW50RW50cnlDaGFuZ2VFdmVudFtQXTtcbiAgfTtcbiAgZXZlbnQuZnJvbSA9IGZyb207XG4gIGV2ZW50Lm5hdmlnYXRpb25UeXBlID0gbmF2aWdhdGlvblR5cGU7XG4gIHJldHVybiBldmVudCBhcyBGYWtlTmF2aWdhdGlvbkN1cnJlbnRFbnRyeUNoYW5nZUV2ZW50O1xufVxuXG4vKipcbiAqIENyZWF0ZSBhIGZha2UgZXF1aXZhbGVudCBvZiBgUG9wU3RhdGVFdmVudGAuIFRoaXMgZG9lcyBub3QgdXNlIGEgY2xhc3NcbiAqIGJlY2F1c2UgRVM1IHRyYW5zcGlsZWQgSmF2YVNjcmlwdCBjYW5ub3QgZXh0ZW5kIG5hdGl2ZSBFdmVudC5cbiAqL1xuZnVuY3Rpb24gY3JlYXRlUG9wU3RhdGVFdmVudCh7c3RhdGV9OiB7c3RhdGU6IHVua25vd259KSB7XG4gIGNvbnN0IGV2ZW50ID0gbmV3IEV2ZW50KCdwb3BzdGF0ZScsIHtcbiAgICBidWJibGVzOiBmYWxzZSxcbiAgICBjYW5jZWxhYmxlOiBmYWxzZSxcbiAgfSkgYXMgey1yZWFkb25seSBbUCBpbiBrZXlvZiBQb3BTdGF0ZUV2ZW50XTogUG9wU3RhdGVFdmVudFtQXX07XG4gIGV2ZW50LnN0YXRlID0gc3RhdGU7XG4gIHJldHVybiBldmVudCBhcyBQb3BTdGF0ZUV2ZW50O1xufVxuXG4vKipcbiAqIEZha2UgZXF1aXZhbGVudCBvZiBgTmF2aWdhdGlvbkRlc3RpbmF0aW9uYC5cbiAqL1xuZXhwb3J0IGNsYXNzIEZha2VOYXZpZ2F0aW9uRGVzdGluYXRpb24gaW1wbGVtZW50cyBOYXZpZ2F0aW9uRGVzdGluYXRpb24ge1xuICByZWFkb25seSB1cmw6IHN0cmluZztcbiAgcmVhZG9ubHkgc2FtZURvY3VtZW50OiBib29sZWFuO1xuICByZWFkb25seSBrZXk6IHN0cmluZyB8IG51bGw7XG4gIHJlYWRvbmx5IGlkOiBzdHJpbmcgfCBudWxsO1xuICByZWFkb25seSBpbmRleDogbnVtYmVyO1xuXG4gIHByaXZhdGUgcmVhZG9ubHkgc3RhdGU/OiB1bmtub3duO1xuICBwcml2YXRlIHJlYWRvbmx5IGhpc3RvcnlTdGF0ZTogdW5rbm93bjtcblxuICBjb25zdHJ1Y3Rvcih7XG4gICAgdXJsLFxuICAgIHNhbWVEb2N1bWVudCxcbiAgICBoaXN0b3J5U3RhdGUsXG4gICAgc3RhdGUsXG4gICAga2V5ID0gbnVsbCxcbiAgICBpZCA9IG51bGwsXG4gICAgaW5kZXggPSAtMSxcbiAgfToge1xuICAgIHVybDogc3RyaW5nO1xuICAgIHNhbWVEb2N1bWVudDogYm9vbGVhbjtcbiAgICBoaXN0b3J5U3RhdGU6IHVua25vd247XG4gICAgc3RhdGU/OiB1bmtub3duO1xuICAgIGtleT86IHN0cmluZyB8IG51bGw7XG4gICAgaWQ/OiBzdHJpbmcgfCBudWxsO1xuICAgIGluZGV4PzogbnVtYmVyO1xuICB9KSB7XG4gICAgdGhpcy51cmwgPSB1cmw7XG4gICAgdGhpcy5zYW1lRG9jdW1lbnQgPSBzYW1lRG9jdW1lbnQ7XG4gICAgdGhpcy5zdGF0ZSA9IHN0YXRlO1xuICAgIHRoaXMuaGlzdG9yeVN0YXRlID0gaGlzdG9yeVN0YXRlO1xuICAgIHRoaXMua2V5ID0ga2V5O1xuICAgIHRoaXMuaWQgPSBpZDtcbiAgICB0aGlzLmluZGV4ID0gaW5kZXg7XG4gIH1cblxuICBnZXRTdGF0ZSgpOiB1bmtub3duIHtcbiAgICByZXR1cm4gdGhpcy5zdGF0ZTtcbiAgfVxuXG4gIGdldEhpc3RvcnlTdGF0ZSgpOiB1bmtub3duIHtcbiAgICByZXR1cm4gdGhpcy5oaXN0b3J5U3RhdGU7XG4gIH1cbn1cblxuLyoqIFV0aWxpdHkgZnVuY3Rpb24gdG8gZGV0ZXJtaW5lIHdoZXRoZXIgdHdvIFVybExpa2UgaGF2ZSB0aGUgc2FtZSBoYXNoLiAqL1xuZnVuY3Rpb24gaXNIYXNoQ2hhbmdlKGZyb206IFVSTCwgdG86IFVSTCk6IGJvb2xlYW4ge1xuICByZXR1cm4gKFxuICAgIHRvLmhhc2ggIT09IGZyb20uaGFzaCAmJlxuICAgIHRvLmhvc3RuYW1lID09PSBmcm9tLmhvc3RuYW1lICYmXG4gICAgdG8ucGF0aG5hbWUgPT09IGZyb20ucGF0aG5hbWUgJiZcbiAgICB0by5zZWFyY2ggPT09IGZyb20uc2VhcmNoXG4gICk7XG59XG5cbi8qKiBJbnRlcm5hbCB1dGlsaXR5IGNsYXNzIGZvciByZXByZXNlbnRpbmcgdGhlIHJlc3VsdCBvZiBhIG5hdmlnYXRpb24uICAqL1xuY2xhc3MgSW50ZXJuYWxOYXZpZ2F0aW9uUmVzdWx0IHtcbiAgY29tbWl0dGVkUmVzb2x2ZSE6IChlbnRyeTogRmFrZU5hdmlnYXRpb25IaXN0b3J5RW50cnkpID0+IHZvaWQ7XG4gIGNvbW1pdHRlZFJlamVjdCE6IChyZWFzb246IEVycm9yKSA9PiB2b2lkO1xuICBmaW5pc2hlZFJlc29sdmUhOiAoZW50cnk6IEZha2VOYXZpZ2F0aW9uSGlzdG9yeUVudHJ5KSA9PiB2b2lkO1xuICBmaW5pc2hlZFJlamVjdCE6IChyZWFzb246IEVycm9yKSA9PiB2b2lkO1xuICByZWFkb25seSBjb21taXR0ZWQ6IFByb21pc2U8RmFrZU5hdmlnYXRpb25IaXN0b3J5RW50cnk+O1xuICByZWFkb25seSBmaW5pc2hlZDogUHJvbWlzZTxGYWtlTmF2aWdhdGlvbkhpc3RvcnlFbnRyeT47XG4gIGdldCBzaWduYWwoKTogQWJvcnRTaWduYWwge1xuICAgIHJldHVybiB0aGlzLmFib3J0Q29udHJvbGxlci5zaWduYWw7XG4gIH1cbiAgcHJpdmF0ZSByZWFkb25seSBhYm9ydENvbnRyb2xsZXIgPSBuZXcgQWJvcnRDb250cm9sbGVyKCk7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5jb21taXR0ZWQgPSBuZXcgUHJvbWlzZTxGYWtlTmF2aWdhdGlvbkhpc3RvcnlFbnRyeT4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgdGhpcy5jb21taXR0ZWRSZXNvbHZlID0gcmVzb2x2ZTtcbiAgICAgIHRoaXMuY29tbWl0dGVkUmVqZWN0ID0gcmVqZWN0O1xuICAgIH0pO1xuXG4gICAgdGhpcy5maW5pc2hlZCA9IG5ldyBQcm9taXNlPEZha2VOYXZpZ2F0aW9uSGlzdG9yeUVudHJ5Pihhc3luYyAocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICB0aGlzLmZpbmlzaGVkUmVzb2x2ZSA9IHJlc29sdmU7XG4gICAgICB0aGlzLmZpbmlzaGVkUmVqZWN0ID0gKHJlYXNvbjogRXJyb3IpID0+IHtcbiAgICAgICAgcmVqZWN0KHJlYXNvbik7XG4gICAgICAgIHRoaXMuYWJvcnRDb250cm9sbGVyLmFib3J0KHJlYXNvbik7XG4gICAgICB9O1xuICAgIH0pO1xuICAgIC8vIEFsbCByZWplY3Rpb25zIGFyZSBoYW5kbGVkLlxuICAgIHRoaXMuY29tbWl0dGVkLmNhdGNoKCgpID0+IHt9KTtcbiAgICB0aGlzLmZpbmlzaGVkLmNhdGNoKCgpID0+IHt9KTtcbiAgfVxufVxuXG4vKiogSW50ZXJuYWwgb3B0aW9ucyBmb3IgcGVyZm9ybWluZyBhIG5hdmlnYXRlLiAqL1xuaW50ZXJmYWNlIEludGVybmFsTmF2aWdhdGVPcHRpb25zIHtcbiAgbmF2aWdhdGlvblR5cGU6IE5hdmlnYXRpb25UeXBlU3RyaW5nO1xuICBjYW5jZWxhYmxlOiBib29sZWFuO1xuICBjYW5JbnRlcmNlcHQ6IGJvb2xlYW47XG4gIHVzZXJJbml0aWF0ZWQ6IGJvb2xlYW47XG4gIGhhc2hDaGFuZ2U6IGJvb2xlYW47XG4gIGluZm8/OiB1bmtub3duO1xuICBza2lwUG9wU3RhdGU/OiBib29sZWFuO1xufVxuIl19