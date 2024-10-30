/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ɵisPromise as isPromise } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { deepEqual, isAnchor } from './utils';
const PATH_MATCH = /^([^?#]*)(\?([^#]*))?(#(.*))?$/;
const DOUBLE_SLASH_REGEX = /^\s*[\\/]{2,}/;
const IGNORE_URI_REGEXP = /^\s*(javascript|mailto):/i;
const DEFAULT_PORTS = {
    'http:': 80,
    'https:': 443,
    'ftp:': 21,
};
/**
 * Location service that provides a drop-in replacement for the $location service
 * provided in AngularJS.
 *
 * @see [Using the Angular Unified Location Service](guide/upgrade#using-the-unified-angular-location-service)
 *
 * @publicApi
 */
export class $locationShim {
    constructor($injector, location, platformLocation, urlCodec, locationStrategy) {
        this.location = location;
        this.platformLocation = platformLocation;
        this.urlCodec = urlCodec;
        this.locationStrategy = locationStrategy;
        this.initializing = true;
        this.updateBrowser = false;
        this.$$absUrl = '';
        this.$$url = '';
        this.$$host = '';
        this.$$replace = false;
        this.$$path = '';
        this.$$search = '';
        this.$$hash = '';
        this.$$changeListeners = [];
        this.cachedState = null;
        this.urlChanges = new ReplaySubject(1);
        this.lastBrowserUrl = '';
        // This variable should be used *only* inside the cacheState function.
        this.lastCachedState = null;
        const initialUrl = this.browserUrl();
        let parsedUrl = this.urlCodec.parse(initialUrl);
        if (typeof parsedUrl === 'string') {
            throw 'Invalid URL';
        }
        this.$$protocol = parsedUrl.protocol;
        this.$$host = parsedUrl.hostname;
        this.$$port = parseInt(parsedUrl.port) || DEFAULT_PORTS[parsedUrl.protocol] || null;
        this.$$parseLinkUrl(initialUrl, initialUrl);
        this.cacheState();
        this.$$state = this.browserState();
        this.location.onUrlChange((newUrl, newState) => {
            this.urlChanges.next({ newUrl, newState });
        });
        if (isPromise($injector)) {
            $injector.then(($i) => this.initialize($i));
        }
        else {
            this.initialize($injector);
        }
    }
    initialize($injector) {
        const $rootScope = $injector.get('$rootScope');
        const $rootElement = $injector.get('$rootElement');
        $rootElement.on('click', (event) => {
            if (event.ctrlKey ||
                event.metaKey ||
                event.shiftKey ||
                event.which === 2 ||
                event.button === 2) {
                return;
            }
            let elm = event.target;
            // traverse the DOM up to find first A tag
            while (elm && elm.nodeName.toLowerCase() !== 'a') {
                // ignore rewriting if no A tag (reached root element, or no parent - removed from document)
                if (elm === $rootElement[0] || !(elm = elm.parentNode)) {
                    return;
                }
            }
            if (!isAnchor(elm)) {
                return;
            }
            const absHref = elm.href;
            const relHref = elm.getAttribute('href');
            // Ignore when url is started with javascript: or mailto:
            if (IGNORE_URI_REGEXP.test(absHref)) {
                return;
            }
            if (absHref && !elm.getAttribute('target') && !event.isDefaultPrevented()) {
                if (this.$$parseLinkUrl(absHref, relHref)) {
                    // We do a preventDefault for all urls that are part of the AngularJS application,
                    // in html5mode and also without, so that we are able to abort navigation without
                    // getting double entries in the location history.
                    event.preventDefault();
                    // update location manually
                    if (this.absUrl() !== this.browserUrl()) {
                        $rootScope.$apply();
                    }
                }
            }
        });
        this.urlChanges.subscribe(({ newUrl, newState }) => {
            const oldUrl = this.absUrl();
            const oldState = this.$$state;
            this.$$parse(newUrl);
            newUrl = this.absUrl();
            this.$$state = newState;
            const defaultPrevented = $rootScope.$broadcast('$locationChangeStart', newUrl, oldUrl, newState, oldState).defaultPrevented;
            // if the location was changed by a `$locationChangeStart` handler then stop
            // processing this location change
            if (this.absUrl() !== newUrl)
                return;
            // If default was prevented, set back to old state. This is the state that was locally
            // cached in the $location service.
            if (defaultPrevented) {
                this.$$parse(oldUrl);
                this.state(oldState);
                this.setBrowserUrlWithFallback(oldUrl, false, oldState);
                this.$$notifyChangeListeners(this.url(), this.$$state, oldUrl, oldState);
            }
            else {
                this.initializing = false;
                $rootScope.$broadcast('$locationChangeSuccess', newUrl, oldUrl, newState, oldState);
                this.resetBrowserUpdate();
            }
            if (!$rootScope.$$phase) {
                $rootScope.$digest();
            }
        });
        // update browser
        $rootScope.$watch(() => {
            if (this.initializing || this.updateBrowser) {
                this.updateBrowser = false;
                const oldUrl = this.browserUrl();
                const newUrl = this.absUrl();
                const oldState = this.browserState();
                let currentReplace = this.$$replace;
                const urlOrStateChanged = !this.urlCodec.areEqual(oldUrl, newUrl) || oldState !== this.$$state;
                // Fire location changes one time to on initialization. This must be done on the
                // next tick (thus inside $evalAsync()) in order for listeners to be registered
                // before the event fires. Mimicing behavior from $locationWatch:
                // https://github.com/angular/angular.js/blob/master/src/ng/location.js#L983
                if (this.initializing || urlOrStateChanged) {
                    this.initializing = false;
                    $rootScope.$evalAsync(() => {
                        // Get the new URL again since it could have changed due to async update
                        const newUrl = this.absUrl();
                        const defaultPrevented = $rootScope.$broadcast('$locationChangeStart', newUrl, oldUrl, this.$$state, oldState).defaultPrevented;
                        // if the location was changed by a `$locationChangeStart` handler then stop
                        // processing this location change
                        if (this.absUrl() !== newUrl)
                            return;
                        if (defaultPrevented) {
                            this.$$parse(oldUrl);
                            this.$$state = oldState;
                        }
                        else {
                            // This block doesn't run when initializing because it's going to perform the update
                            // to the URL which shouldn't be needed when initializing.
                            if (urlOrStateChanged) {
                                this.setBrowserUrlWithFallback(newUrl, currentReplace, oldState === this.$$state ? null : this.$$state);
                                this.$$replace = false;
                            }
                            $rootScope.$broadcast('$locationChangeSuccess', newUrl, oldUrl, this.$$state, oldState);
                            if (urlOrStateChanged) {
                                this.$$notifyChangeListeners(this.url(), this.$$state, oldUrl, oldState);
                            }
                        }
                    });
                }
            }
            this.$$replace = false;
        });
    }
    resetBrowserUpdate() {
        this.$$replace = false;
        this.$$state = this.browserState();
        this.updateBrowser = false;
        this.lastBrowserUrl = this.browserUrl();
    }
    browserUrl(url, replace, state) {
        // In modern browsers `history.state` is `null` by default; treating it separately
        // from `undefined` would cause `$browser.url('/foo')` to change `history.state`
        // to undefined via `pushState`. Instead, let's change `undefined` to `null` here.
        if (typeof state === 'undefined') {
            state = null;
        }
        // setter
        if (url) {
            let sameState = this.lastHistoryState === state;
            // Normalize the inputted URL
            url = this.urlCodec.parse(url).href;
            // Don't change anything if previous and current URLs and states match.
            if (this.lastBrowserUrl === url && sameState) {
                return this;
            }
            this.lastBrowserUrl = url;
            this.lastHistoryState = state;
            // Remove server base from URL as the Angular APIs for updating URL require
            // it to be the path+.
            url = this.stripBaseUrl(this.getServerBase(), url) || url;
            // Set the URL
            if (replace) {
                this.locationStrategy.replaceState(state, '', url, '');
            }
            else {
                this.locationStrategy.pushState(state, '', url, '');
            }
            this.cacheState();
            return this;
            // getter
        }
        else {
            return this.platformLocation.href;
        }
    }
    cacheState() {
        // This should be the only place in $browser where `history.state` is read.
        this.cachedState = this.platformLocation.getState();
        if (typeof this.cachedState === 'undefined') {
            this.cachedState = null;
        }
        // Prevent callbacks fo fire twice if both hashchange & popstate were fired.
        if (deepEqual(this.cachedState, this.lastCachedState)) {
            this.cachedState = this.lastCachedState;
        }
        this.lastCachedState = this.cachedState;
        this.lastHistoryState = this.cachedState;
    }
    /**
     * This function emulates the $browser.state() function from AngularJS. It will cause
     * history.state to be cached unless changed with deep equality check.
     */
    browserState() {
        return this.cachedState;
    }
    stripBaseUrl(base, url) {
        if (url.startsWith(base)) {
            return url.slice(base.length);
        }
        return undefined;
    }
    getServerBase() {
        const { protocol, hostname, port } = this.platformLocation;
        const baseHref = this.locationStrategy.getBaseHref();
        let url = `${protocol}//${hostname}${port ? ':' + port : ''}${baseHref || '/'}`;
        return url.endsWith('/') ? url : url + '/';
    }
    parseAppUrl(url) {
        if (DOUBLE_SLASH_REGEX.test(url)) {
            throw new Error(`Bad Path - URL cannot start with double slashes: ${url}`);
        }
        let prefixed = url.charAt(0) !== '/';
        if (prefixed) {
            url = '/' + url;
        }
        let match = this.urlCodec.parse(url, this.getServerBase());
        if (typeof match === 'string') {
            throw new Error(`Bad URL - Cannot parse URL: ${url}`);
        }
        let path = prefixed && match.pathname.charAt(0) === '/' ? match.pathname.substring(1) : match.pathname;
        this.$$path = this.urlCodec.decodePath(path);
        this.$$search = this.urlCodec.decodeSearch(match.search);
        this.$$hash = this.urlCodec.decodeHash(match.hash);
        // make sure path starts with '/';
        if (this.$$path && this.$$path.charAt(0) !== '/') {
            this.$$path = '/' + this.$$path;
        }
    }
    /**
     * Registers listeners for URL changes. This API is used to catch updates performed by the
     * AngularJS framework. These changes are a subset of the `$locationChangeStart` and
     * `$locationChangeSuccess` events which fire when AngularJS updates its internally-referenced
     * version of the browser URL.
     *
     * It's possible for `$locationChange` events to happen, but for the browser URL
     * (window.location) to remain unchanged. This `onChange` callback will fire only when AngularJS
     * actually updates the browser URL (window.location).
     *
     * @param fn The callback function that is triggered for the listener when the URL changes.
     * @param err The callback function that is triggered when an error occurs.
     */
    onChange(fn, err = (e) => { }) {
        this.$$changeListeners.push([fn, err]);
    }
    /** @internal */
    $$notifyChangeListeners(url = '', state, oldUrl = '', oldState) {
        this.$$changeListeners.forEach(([fn, err]) => {
            try {
                fn(url, state, oldUrl, oldState);
            }
            catch (e) {
                err(e);
            }
        });
    }
    /**
     * Parses the provided URL, and sets the current URL to the parsed result.
     *
     * @param url The URL string.
     */
    $$parse(url) {
        let pathUrl;
        if (url.startsWith('/')) {
            pathUrl = url;
        }
        else {
            // Remove protocol & hostname if URL starts with it
            pathUrl = this.stripBaseUrl(this.getServerBase(), url);
        }
        if (typeof pathUrl === 'undefined') {
            throw new Error(`Invalid url "${url}", missing path prefix "${this.getServerBase()}".`);
        }
        this.parseAppUrl(pathUrl);
        this.$$path ||= '/';
        this.composeUrls();
    }
    /**
     * Parses the provided URL and its relative URL.
     *
     * @param url The full URL string.
     * @param relHref A URL string relative to the full URL string.
     */
    $$parseLinkUrl(url, relHref) {
        // When relHref is passed, it should be a hash and is handled separately
        if (relHref && relHref[0] === '#') {
            this.hash(relHref.slice(1));
            return true;
        }
        let rewrittenUrl;
        let appUrl = this.stripBaseUrl(this.getServerBase(), url);
        if (typeof appUrl !== 'undefined') {
            rewrittenUrl = this.getServerBase() + appUrl;
        }
        else if (this.getServerBase() === url + '/') {
            rewrittenUrl = this.getServerBase();
        }
        // Set the URL
        if (rewrittenUrl) {
            this.$$parse(rewrittenUrl);
        }
        return !!rewrittenUrl;
    }
    setBrowserUrlWithFallback(url, replace, state) {
        const oldUrl = this.url();
        const oldState = this.$$state;
        try {
            this.browserUrl(url, replace, state);
            // Make sure $location.state() returns referentially identical (not just deeply equal)
            // state object; this makes possible quick checking if the state changed in the digest
            // loop. Checking deep equality would be too expensive.
            this.$$state = this.browserState();
        }
        catch (e) {
            // Restore old values if pushState fails
            this.url(oldUrl);
            this.$$state = oldState;
            throw e;
        }
    }
    composeUrls() {
        this.$$url = this.urlCodec.normalize(this.$$path, this.$$search, this.$$hash);
        this.$$absUrl = this.getServerBase() + this.$$url.slice(1); // remove '/' from front of URL
        this.updateBrowser = true;
    }
    /**
     * Retrieves the full URL representation with all segments encoded according to
     * rules specified in
     * [RFC 3986](https://tools.ietf.org/html/rfc3986).
     *
     *
     * ```js
     * // given URL http://example.com/#/some/path?foo=bar&baz=xoxo
     * let absUrl = $location.absUrl();
     * // => "http://example.com/#/some/path?foo=bar&baz=xoxo"
     * ```
     */
    absUrl() {
        return this.$$absUrl;
    }
    url(url) {
        if (typeof url === 'string') {
            if (!url.length) {
                url = '/';
            }
            const match = PATH_MATCH.exec(url);
            if (!match)
                return this;
            if (match[1] || url === '')
                this.path(this.urlCodec.decodePath(match[1]));
            if (match[2] || match[1] || url === '')
                this.search(match[3] || '');
            this.hash(match[5] || '');
            // Chainable method
            return this;
        }
        return this.$$url;
    }
    /**
     * Retrieves the protocol of the current URL.
     *
     * ```js
     * // given URL http://example.com/#/some/path?foo=bar&baz=xoxo
     * let protocol = $location.protocol();
     * // => "http"
     * ```
     */
    protocol() {
        return this.$$protocol;
    }
    /**
     * Retrieves the protocol of the current URL.
     *
     * In contrast to the non-AngularJS version `location.host` which returns `hostname:port`, this
     * returns the `hostname` portion only.
     *
     *
     * ```js
     * // given URL http://example.com/#/some/path?foo=bar&baz=xoxo
     * let host = $location.host();
     * // => "example.com"
     *
     * // given URL http://user:password@example.com:8080/#/some/path?foo=bar&baz=xoxo
     * host = $location.host();
     * // => "example.com"
     * host = location.host;
     * // => "example.com:8080"
     * ```
     */
    host() {
        return this.$$host;
    }
    /**
     * Retrieves the port of the current URL.
     *
     * ```js
     * // given URL http://example.com/#/some/path?foo=bar&baz=xoxo
     * let port = $location.port();
     * // => 80
     * ```
     */
    port() {
        return this.$$port;
    }
    path(path) {
        if (typeof path === 'undefined') {
            return this.$$path;
        }
        // null path converts to empty string. Prepend with "/" if needed.
        path = path !== null ? path.toString() : '';
        path = path.charAt(0) === '/' ? path : '/' + path;
        this.$$path = path;
        this.composeUrls();
        return this;
    }
    search(search, paramValue) {
        switch (arguments.length) {
            case 0:
                return this.$$search;
            case 1:
                if (typeof search === 'string' || typeof search === 'number') {
                    this.$$search = this.urlCodec.decodeSearch(search.toString());
                }
                else if (typeof search === 'object' && search !== null) {
                    // Copy the object so it's never mutated
                    search = { ...search };
                    // remove object undefined or null properties
                    for (const key in search) {
                        if (search[key] == null)
                            delete search[key];
                    }
                    this.$$search = search;
                }
                else {
                    throw new Error('LocationProvider.search(): First argument must be a string or an object.');
                }
                break;
            default:
                if (typeof search === 'string') {
                    const currentSearch = this.search();
                    if (typeof paramValue === 'undefined' || paramValue === null) {
                        delete currentSearch[search];
                        return this.search(currentSearch);
                    }
                    else {
                        currentSearch[search] = paramValue;
                        return this.search(currentSearch);
                    }
                }
        }
        this.composeUrls();
        return this;
    }
    hash(hash) {
        if (typeof hash === 'undefined') {
            return this.$$hash;
        }
        this.$$hash = hash !== null ? hash.toString() : '';
        this.composeUrls();
        return this;
    }
    /**
     * Changes to `$location` during the current `$digest` will replace the current
     * history record, instead of adding a new one.
     */
    replace() {
        this.$$replace = true;
        return this;
    }
    state(state) {
        if (typeof state === 'undefined') {
            return this.$$state;
        }
        this.$$state = state;
        return this;
    }
}
/**
 * The factory function used to create an instance of the `$locationShim` in Angular,
 * and provides an API-compatible `$locationProvider` for AngularJS.
 *
 * @publicApi
 */
export class $locationShimProvider {
    constructor(ngUpgrade, location, platformLocation, urlCodec, locationStrategy) {
        this.ngUpgrade = ngUpgrade;
        this.location = location;
        this.platformLocation = platformLocation;
        this.urlCodec = urlCodec;
        this.locationStrategy = locationStrategy;
    }
    /**
     * Factory method that returns an instance of the $locationShim
     */
    $get() {
        return new $locationShim(this.ngUpgrade.$injector, this.location, this.platformLocation, this.urlCodec, this.locationStrategy);
    }
    /**
     * Stub method used to keep API compatible with AngularJS. This setting is configured through
     * the LocationUpgradeModule's `config` method in your Angular app.
     */
    hashPrefix(prefix) {
        throw new Error('Configure LocationUpgrade through LocationUpgradeModule.config method.');
    }
    /**
     * Stub method used to keep API compatible with AngularJS. This setting is configured through
     * the LocationUpgradeModule's `config` method in your Angular app.
     */
    html5Mode(mode) {
        throw new Error('Configure LocationUpgrade through LocationUpgradeModule.config method.');
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9jYXRpb25fc2hpbS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2NvbW1vbi91cGdyYWRlL3NyYy9sb2NhdGlvbl9zaGltLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUdILE9BQU8sRUFBQyxVQUFVLElBQUksU0FBUyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBRXRELE9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSxNQUFNLENBQUM7QUFHbkMsT0FBTyxFQUFDLFNBQVMsRUFBRSxRQUFRLEVBQUMsTUFBTSxTQUFTLENBQUM7QUFFNUMsTUFBTSxVQUFVLEdBQUcsZ0NBQWdDLENBQUM7QUFDcEQsTUFBTSxrQkFBa0IsR0FBRyxlQUFlLENBQUM7QUFDM0MsTUFBTSxpQkFBaUIsR0FBRywyQkFBMkIsQ0FBQztBQUN0RCxNQUFNLGFBQWEsR0FBNEI7SUFDN0MsT0FBTyxFQUFFLEVBQUU7SUFDWCxRQUFRLEVBQUUsR0FBRztJQUNiLE1BQU0sRUFBRSxFQUFFO0NBQ1gsQ0FBQztBQUVGOzs7Ozs7O0dBT0c7QUFDSCxNQUFNLE9BQU8sYUFBYTtJQTRCeEIsWUFDRSxTQUFjLEVBQ04sUUFBa0IsRUFDbEIsZ0JBQWtDLEVBQ2xDLFFBQWtCLEVBQ2xCLGdCQUFrQztRQUhsQyxhQUFRLEdBQVIsUUFBUSxDQUFVO1FBQ2xCLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFDbEMsYUFBUSxHQUFSLFFBQVEsQ0FBVTtRQUNsQixxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBaENwQyxpQkFBWSxHQUFHLElBQUksQ0FBQztRQUNwQixrQkFBYSxHQUFHLEtBQUssQ0FBQztRQUN0QixhQUFRLEdBQVcsRUFBRSxDQUFDO1FBQ3RCLFVBQUssR0FBVyxFQUFFLENBQUM7UUFFbkIsV0FBTSxHQUFXLEVBQUUsQ0FBQztRQUVwQixjQUFTLEdBQVksS0FBSyxDQUFDO1FBQzNCLFdBQU0sR0FBVyxFQUFFLENBQUM7UUFDcEIsYUFBUSxHQUFRLEVBQUUsQ0FBQztRQUNuQixXQUFNLEdBQVcsRUFBRSxDQUFDO1FBRXBCLHNCQUFpQixHQVNuQixFQUFFLENBQUM7UUFFRCxnQkFBVyxHQUFZLElBQUksQ0FBQztRQUU1QixlQUFVLEdBQUcsSUFBSSxhQUFhLENBQXNDLENBQUMsQ0FBQyxDQUFDO1FBcU12RSxtQkFBYyxHQUFXLEVBQUUsQ0FBQztRQTZDcEMsc0VBQXNFO1FBQzlELG9CQUFlLEdBQVksSUFBSSxDQUFDO1FBMU90QyxNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7UUFFckMsSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUM7UUFFaEQsSUFBSSxPQUFPLFNBQVMsS0FBSyxRQUFRLEVBQUUsQ0FBQztZQUNsQyxNQUFNLGFBQWEsQ0FBQztRQUN0QixDQUFDO1FBRUQsSUFBSSxDQUFDLFVBQVUsR0FBRyxTQUFTLENBQUMsUUFBUSxDQUFDO1FBQ3JDLElBQUksQ0FBQyxNQUFNLEdBQUcsU0FBUyxDQUFDLFFBQVEsQ0FBQztRQUNqQyxJQUFJLENBQUMsTUFBTSxHQUFHLFFBQVEsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksYUFBYSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSxJQUFJLENBQUM7UUFFcEYsSUFBSSxDQUFDLGNBQWMsQ0FBQyxVQUFVLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFDNUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBQ2xCLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBRW5DLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLENBQUMsTUFBTSxFQUFFLFFBQVEsRUFBRSxFQUFFO1lBQzdDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEVBQUMsTUFBTSxFQUFFLFFBQVEsRUFBQyxDQUFDLENBQUM7UUFDM0MsQ0FBQyxDQUFDLENBQUM7UUFFSCxJQUFJLFNBQVMsQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDO1lBQ3pCLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUM5QyxDQUFDO2FBQU0sQ0FBQztZQUNOLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDN0IsQ0FBQztJQUNILENBQUM7SUFFTyxVQUFVLENBQUMsU0FBYztRQUMvQixNQUFNLFVBQVUsR0FBRyxTQUFTLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQy9DLE1BQU0sWUFBWSxHQUFHLFNBQVMsQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLENBQUM7UUFFbkQsWUFBWSxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxLQUFVLEVBQUUsRUFBRTtZQUN0QyxJQUNFLEtBQUssQ0FBQyxPQUFPO2dCQUNiLEtBQUssQ0FBQyxPQUFPO2dCQUNiLEtBQUssQ0FBQyxRQUFRO2dCQUNkLEtBQUssQ0FBQyxLQUFLLEtBQUssQ0FBQztnQkFDakIsS0FBSyxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQ2xCLENBQUM7Z0JBQ0QsT0FBTztZQUNULENBQUM7WUFFRCxJQUFJLEdBQUcsR0FBK0IsS0FBSyxDQUFDLE1BQU0sQ0FBQztZQUVuRCwwQ0FBMEM7WUFDMUMsT0FBTyxHQUFHLElBQUksR0FBRyxDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUUsS0FBSyxHQUFHLEVBQUUsQ0FBQztnQkFDakQsNEZBQTRGO2dCQUM1RixJQUFJLEdBQUcsS0FBSyxZQUFZLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQztvQkFDdkQsT0FBTztnQkFDVCxDQUFDO1lBQ0gsQ0FBQztZQUVELElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQztnQkFDbkIsT0FBTztZQUNULENBQUM7WUFFRCxNQUFNLE9BQU8sR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDO1lBQ3pCLE1BQU0sT0FBTyxHQUFHLEdBQUcsQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUM7WUFFekMseURBQXlEO1lBQ3pELElBQUksaUJBQWlCLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUM7Z0JBQ3BDLE9BQU87WUFDVCxDQUFDO1lBRUQsSUFBSSxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLGtCQUFrQixFQUFFLEVBQUUsQ0FBQztnQkFDMUUsSUFBSSxJQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsRUFBRSxDQUFDO29CQUMxQyxrRkFBa0Y7b0JBQ2xGLGlGQUFpRjtvQkFDakYsa0RBQWtEO29CQUNsRCxLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7b0JBQ3ZCLDJCQUEyQjtvQkFDM0IsSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFLEtBQUssSUFBSSxDQUFDLFVBQVUsRUFBRSxFQUFFLENBQUM7d0JBQ3hDLFVBQVUsQ0FBQyxNQUFNLEVBQUUsQ0FBQztvQkFDdEIsQ0FBQztnQkFDSCxDQUFDO1lBQ0gsQ0FBQztRQUNILENBQUMsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFDLE1BQU0sRUFBRSxRQUFRLEVBQUMsRUFBRSxFQUFFO1lBQy9DLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUM3QixNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDO1lBQzlCLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDckIsTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUN2QixJQUFJLENBQUMsT0FBTyxHQUFHLFFBQVEsQ0FBQztZQUN4QixNQUFNLGdCQUFnQixHQUFHLFVBQVUsQ0FBQyxVQUFVLENBQzVDLHNCQUFzQixFQUN0QixNQUFNLEVBQ04sTUFBTSxFQUNOLFFBQVEsRUFDUixRQUFRLENBQ1QsQ0FBQyxnQkFBZ0IsQ0FBQztZQUVuQiw0RUFBNEU7WUFDNUUsa0NBQWtDO1lBQ2xDLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRSxLQUFLLE1BQU07Z0JBQUUsT0FBTztZQUVyQyxzRkFBc0Y7WUFDdEYsbUNBQW1DO1lBQ25DLElBQUksZ0JBQWdCLEVBQUUsQ0FBQztnQkFDckIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDckIsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFDckIsSUFBSSxDQUFDLHlCQUF5QixDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUUsUUFBUSxDQUFDLENBQUM7Z0JBQ3hELElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEVBQUUsSUFBSSxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsUUFBUSxDQUFDLENBQUM7WUFDM0UsQ0FBQztpQkFBTSxDQUFDO2dCQUNOLElBQUksQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDO2dCQUMxQixVQUFVLENBQUMsVUFBVSxDQUFDLHdCQUF3QixFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLFFBQVEsQ0FBQyxDQUFDO2dCQUNwRixJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztZQUM1QixDQUFDO1lBQ0QsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLEVBQUUsQ0FBQztnQkFDeEIsVUFBVSxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBQ3ZCLENBQUM7UUFDSCxDQUFDLENBQUMsQ0FBQztRQUVILGlCQUFpQjtRQUNqQixVQUFVLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRTtZQUNyQixJQUFJLElBQUksQ0FBQyxZQUFZLElBQUksSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO2dCQUM1QyxJQUFJLENBQUMsYUFBYSxHQUFHLEtBQUssQ0FBQztnQkFFM0IsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO2dCQUNqQyxNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7Z0JBQzdCLE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztnQkFDckMsSUFBSSxjQUFjLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQztnQkFFcEMsTUFBTSxpQkFBaUIsR0FDckIsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLElBQUksUUFBUSxLQUFLLElBQUksQ0FBQyxPQUFPLENBQUM7Z0JBRXZFLGdGQUFnRjtnQkFDaEYsK0VBQStFO2dCQUMvRSxpRUFBaUU7Z0JBQ2pFLDRFQUE0RTtnQkFDNUUsSUFBSSxJQUFJLENBQUMsWUFBWSxJQUFJLGlCQUFpQixFQUFFLENBQUM7b0JBQzNDLElBQUksQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDO29CQUUxQixVQUFVLENBQUMsVUFBVSxDQUFDLEdBQUcsRUFBRTt3QkFDekIsd0VBQXdFO3dCQUN4RSxNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7d0JBQzdCLE1BQU0sZ0JBQWdCLEdBQUcsVUFBVSxDQUFDLFVBQVUsQ0FDNUMsc0JBQXNCLEVBQ3RCLE1BQU0sRUFDTixNQUFNLEVBQ04sSUFBSSxDQUFDLE9BQU8sRUFDWixRQUFRLENBQ1QsQ0FBQyxnQkFBZ0IsQ0FBQzt3QkFFbkIsNEVBQTRFO3dCQUM1RSxrQ0FBa0M7d0JBQ2xDLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRSxLQUFLLE1BQU07NEJBQUUsT0FBTzt3QkFFckMsSUFBSSxnQkFBZ0IsRUFBRSxDQUFDOzRCQUNyQixJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDOzRCQUNyQixJQUFJLENBQUMsT0FBTyxHQUFHLFFBQVEsQ0FBQzt3QkFDMUIsQ0FBQzs2QkFBTSxDQUFDOzRCQUNOLG9GQUFvRjs0QkFDcEYsMERBQTBEOzRCQUMxRCxJQUFJLGlCQUFpQixFQUFFLENBQUM7Z0NBQ3RCLElBQUksQ0FBQyx5QkFBeUIsQ0FDNUIsTUFBTSxFQUNOLGNBQWMsRUFDZCxRQUFRLEtBQUssSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUNoRCxDQUFDO2dDQUNGLElBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDOzRCQUN6QixDQUFDOzRCQUNELFVBQVUsQ0FBQyxVQUFVLENBQ25CLHdCQUF3QixFQUN4QixNQUFNLEVBQ04sTUFBTSxFQUNOLElBQUksQ0FBQyxPQUFPLEVBQ1osUUFBUSxDQUNULENBQUM7NEJBQ0YsSUFBSSxpQkFBaUIsRUFBRSxDQUFDO2dDQUN0QixJQUFJLENBQUMsdUJBQXVCLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxFQUFFLElBQUksQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLFFBQVEsQ0FBQyxDQUFDOzRCQUMzRSxDQUFDO3dCQUNILENBQUM7b0JBQ0gsQ0FBQyxDQUFDLENBQUM7Z0JBQ0wsQ0FBQztZQUNILENBQUM7WUFDRCxJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztRQUN6QixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFTyxrQkFBa0I7UUFDeEIsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7UUFDdkIsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDbkMsSUFBSSxDQUFDLGFBQWEsR0FBRyxLQUFLLENBQUM7UUFDM0IsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDMUMsQ0FBQztJQU1PLFVBQVUsQ0FBQyxHQUFZLEVBQUUsT0FBaUIsRUFBRSxLQUFlO1FBQ2pFLGtGQUFrRjtRQUNsRixnRkFBZ0Y7UUFDaEYsa0ZBQWtGO1FBQ2xGLElBQUksT0FBTyxLQUFLLEtBQUssV0FBVyxFQUFFLENBQUM7WUFDakMsS0FBSyxHQUFHLElBQUksQ0FBQztRQUNmLENBQUM7UUFFRCxTQUFTO1FBQ1QsSUFBSSxHQUFHLEVBQUUsQ0FBQztZQUNSLElBQUksU0FBUyxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsS0FBSyxLQUFLLENBQUM7WUFFaEQsNkJBQTZCO1lBQzdCLEdBQUcsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUM7WUFFcEMsdUVBQXVFO1lBQ3ZFLElBQUksSUFBSSxDQUFDLGNBQWMsS0FBSyxHQUFHLElBQUksU0FBUyxFQUFFLENBQUM7Z0JBQzdDLE9BQU8sSUFBSSxDQUFDO1lBQ2QsQ0FBQztZQUNELElBQUksQ0FBQyxjQUFjLEdBQUcsR0FBRyxDQUFDO1lBQzFCLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxLQUFLLENBQUM7WUFFOUIsMkVBQTJFO1lBQzNFLHNCQUFzQjtZQUN0QixHQUFHLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFLEVBQUUsR0FBRyxDQUFDLElBQUksR0FBRyxDQUFDO1lBRTFELGNBQWM7WUFDZCxJQUFJLE9BQU8sRUFBRSxDQUFDO2dCQUNaLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDekQsQ0FBQztpQkFBTSxDQUFDO2dCQUNOLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDdEQsQ0FBQztZQUVELElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztZQUVsQixPQUFPLElBQUksQ0FBQztZQUNaLFNBQVM7UUFDWCxDQUFDO2FBQU0sQ0FBQztZQUNOLE9BQU8sSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQztRQUNwQyxDQUFDO0lBQ0gsQ0FBQztJQUlPLFVBQVU7UUFDaEIsMkVBQTJFO1FBQzNFLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ3BELElBQUksT0FBTyxJQUFJLENBQUMsV0FBVyxLQUFLLFdBQVcsRUFBRSxDQUFDO1lBQzVDLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO1FBQzFCLENBQUM7UUFFRCw0RUFBNEU7UUFDNUUsSUFBSSxTQUFTLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsZUFBZSxDQUFDLEVBQUUsQ0FBQztZQUN0RCxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUM7UUFDMUMsQ0FBQztRQUVELElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQztRQUN4QyxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQztJQUMzQyxDQUFDO0lBRUQ7OztPQUdHO0lBQ0ssWUFBWTtRQUNsQixPQUFPLElBQUksQ0FBQyxXQUFXLENBQUM7SUFDMUIsQ0FBQztJQUVPLFlBQVksQ0FBQyxJQUFZLEVBQUUsR0FBVztRQUM1QyxJQUFJLEdBQUcsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQztZQUN6QixPQUFPLEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ2hDLENBQUM7UUFDRCxPQUFPLFNBQVMsQ0FBQztJQUNuQixDQUFDO0lBRU8sYUFBYTtRQUNuQixNQUFNLEVBQUMsUUFBUSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUMsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUM7UUFDekQsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ3JELElBQUksR0FBRyxHQUFHLEdBQUcsUUFBUSxLQUFLLFFBQVEsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxRQUFRLElBQUksR0FBRyxFQUFFLENBQUM7UUFDaEYsT0FBTyxHQUFHLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7SUFDN0MsQ0FBQztJQUVPLFdBQVcsQ0FBQyxHQUFXO1FBQzdCLElBQUksa0JBQWtCLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUM7WUFDakMsTUFBTSxJQUFJLEtBQUssQ0FBQyxvREFBb0QsR0FBRyxFQUFFLENBQUMsQ0FBQztRQUM3RSxDQUFDO1FBRUQsSUFBSSxRQUFRLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHLENBQUM7UUFDckMsSUFBSSxRQUFRLEVBQUUsQ0FBQztZQUNiLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDO1FBQ2xCLENBQUM7UUFDRCxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDLENBQUM7UUFDM0QsSUFBSSxPQUFPLEtBQUssS0FBSyxRQUFRLEVBQUUsQ0FBQztZQUM5QixNQUFNLElBQUksS0FBSyxDQUFDLCtCQUErQixHQUFHLEVBQUUsQ0FBQyxDQUFDO1FBQ3hELENBQUM7UUFDRCxJQUFJLElBQUksR0FDTixRQUFRLElBQUksS0FBSyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQztRQUM5RixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzdDLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3pELElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRW5ELGtDQUFrQztRQUNsQyxJQUFJLElBQUksQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUM7WUFDakQsSUFBSSxDQUFDLE1BQU0sR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUNsQyxDQUFDO0lBQ0gsQ0FBQztJQUVEOzs7Ozs7Ozs7Ozs7T0FZRztJQUNILFFBQVEsQ0FDTixFQUE0RSxFQUM1RSxNQUEwQixDQUFDLENBQVEsRUFBRSxFQUFFLEdBQUUsQ0FBQztRQUUxQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDekMsQ0FBQztJQUVELGdCQUFnQjtJQUNoQix1QkFBdUIsQ0FDckIsTUFBYyxFQUFFLEVBQ2hCLEtBQWMsRUFDZCxTQUFpQixFQUFFLEVBQ25CLFFBQWlCO1FBRWpCLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxHQUFHLENBQUMsRUFBRSxFQUFFO1lBQzNDLElBQUksQ0FBQztnQkFDSCxFQUFFLENBQUMsR0FBRyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsUUFBUSxDQUFDLENBQUM7WUFDbkMsQ0FBQztZQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUM7Z0JBQ1gsR0FBRyxDQUFDLENBQVUsQ0FBQyxDQUFDO1lBQ2xCLENBQUM7UUFDSCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRDs7OztPQUlHO0lBQ0gsT0FBTyxDQUFDLEdBQVc7UUFDakIsSUFBSSxPQUEyQixDQUFDO1FBQ2hDLElBQUksR0FBRyxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDO1lBQ3hCLE9BQU8sR0FBRyxHQUFHLENBQUM7UUFDaEIsQ0FBQzthQUFNLENBQUM7WUFDTixtREFBbUQ7WUFDbkQsT0FBTyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ3pELENBQUM7UUFDRCxJQUFJLE9BQU8sT0FBTyxLQUFLLFdBQVcsRUFBRSxDQUFDO1lBQ25DLE1BQU0sSUFBSSxLQUFLLENBQUMsZ0JBQWdCLEdBQUcsMkJBQTJCLElBQUksQ0FBQyxhQUFhLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDMUYsQ0FBQztRQUVELElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUM7UUFFMUIsSUFBSSxDQUFDLE1BQU0sS0FBSyxHQUFHLENBQUM7UUFDcEIsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ3JCLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNILGNBQWMsQ0FBQyxHQUFXLEVBQUUsT0FBdUI7UUFDakQsd0VBQXdFO1FBQ3hFLElBQUksT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQztZQUNsQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUM1QixPQUFPLElBQUksQ0FBQztRQUNkLENBQUM7UUFDRCxJQUFJLFlBQVksQ0FBQztRQUNqQixJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUUsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUMxRCxJQUFJLE9BQU8sTUFBTSxLQUFLLFdBQVcsRUFBRSxDQUFDO1lBQ2xDLFlBQVksR0FBRyxJQUFJLENBQUMsYUFBYSxFQUFFLEdBQUcsTUFBTSxDQUFDO1FBQy9DLENBQUM7YUFBTSxJQUFJLElBQUksQ0FBQyxhQUFhLEVBQUUsS0FBSyxHQUFHLEdBQUcsR0FBRyxFQUFFLENBQUM7WUFDOUMsWUFBWSxHQUFHLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUN0QyxDQUFDO1FBQ0QsY0FBYztRQUNkLElBQUksWUFBWSxFQUFFLENBQUM7WUFDakIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUM3QixDQUFDO1FBQ0QsT0FBTyxDQUFDLENBQUMsWUFBWSxDQUFDO0lBQ3hCLENBQUM7SUFFTyx5QkFBeUIsQ0FBQyxHQUFXLEVBQUUsT0FBZ0IsRUFBRSxLQUFjO1FBQzdFLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUMxQixNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDO1FBQzlCLElBQUksQ0FBQztZQUNILElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxFQUFFLE9BQU8sRUFBRSxLQUFLLENBQUMsQ0FBQztZQUVyQyxzRkFBc0Y7WUFDdEYsc0ZBQXNGO1lBQ3RGLHVEQUF1RDtZQUN2RCxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUNyQyxDQUFDO1FBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQztZQUNYLHdDQUF3QztZQUN4QyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ2pCLElBQUksQ0FBQyxPQUFPLEdBQUcsUUFBUSxDQUFDO1lBRXhCLE1BQU0sQ0FBQyxDQUFDO1FBQ1YsQ0FBQztJQUNILENBQUM7SUFFTyxXQUFXO1FBQ2pCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUM5RSxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxhQUFhLEVBQUUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLCtCQUErQjtRQUMzRixJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQztJQUM1QixDQUFDO0lBRUQ7Ozs7Ozs7Ozs7O09BV0c7SUFDSCxNQUFNO1FBQ0osT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ3ZCLENBQUM7SUFjRCxHQUFHLENBQUMsR0FBWTtRQUNkLElBQUksT0FBTyxHQUFHLEtBQUssUUFBUSxFQUFFLENBQUM7WUFDNUIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQztnQkFDaEIsR0FBRyxHQUFHLEdBQUcsQ0FBQztZQUNaLENBQUM7WUFFRCxNQUFNLEtBQUssR0FBRyxVQUFVLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ25DLElBQUksQ0FBQyxLQUFLO2dCQUFFLE9BQU8sSUFBSSxDQUFDO1lBQ3hCLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLEdBQUcsS0FBSyxFQUFFO2dCQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMxRSxJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksR0FBRyxLQUFLLEVBQUU7Z0JBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7WUFDcEUsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7WUFFMUIsbUJBQW1CO1lBQ25CLE9BQU8sSUFBSSxDQUFDO1FBQ2QsQ0FBQztRQUVELE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQztJQUNwQixDQUFDO0lBRUQ7Ozs7Ozs7O09BUUc7SUFDSCxRQUFRO1FBQ04sT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDO0lBQ3pCLENBQUM7SUFFRDs7Ozs7Ozs7Ozs7Ozs7Ozs7O09Ba0JHO0lBQ0gsSUFBSTtRQUNGLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUNyQixDQUFDO0lBRUQ7Ozs7Ozs7O09BUUc7SUFDSCxJQUFJO1FBQ0YsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDO0lBQ3JCLENBQUM7SUFpQkQsSUFBSSxDQUFDLElBQTZCO1FBQ2hDLElBQUksT0FBTyxJQUFJLEtBQUssV0FBVyxFQUFFLENBQUM7WUFDaEMsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDO1FBQ3JCLENBQUM7UUFFRCxrRUFBa0U7UUFDbEUsSUFBSSxHQUFHLElBQUksS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO1FBQzVDLElBQUksR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDO1FBRWxELElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1FBRW5CLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNuQixPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7SUE4Q0QsTUFBTSxDQUNKLE1BQW1ELEVBQ25ELFVBQW9FO1FBRXBFLFFBQVEsU0FBUyxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQ3pCLEtBQUssQ0FBQztnQkFDSixPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7WUFDdkIsS0FBSyxDQUFDO2dCQUNKLElBQUksT0FBTyxNQUFNLEtBQUssUUFBUSxJQUFJLE9BQU8sTUFBTSxLQUFLLFFBQVEsRUFBRSxDQUFDO29CQUM3RCxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO2dCQUNoRSxDQUFDO3FCQUFNLElBQUksT0FBTyxNQUFNLEtBQUssUUFBUSxJQUFJLE1BQU0sS0FBSyxJQUFJLEVBQUUsQ0FBQztvQkFDekQsd0NBQXdDO29CQUN4QyxNQUFNLEdBQUcsRUFBQyxHQUFHLE1BQU0sRUFBQyxDQUFDO29CQUNyQiw2Q0FBNkM7b0JBQzdDLEtBQUssTUFBTSxHQUFHLElBQUksTUFBTSxFQUFFLENBQUM7d0JBQ3pCLElBQUksTUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLElBQUk7NEJBQUUsT0FBTyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7b0JBQzlDLENBQUM7b0JBRUQsSUFBSSxDQUFDLFFBQVEsR0FBRyxNQUFNLENBQUM7Z0JBQ3pCLENBQUM7cUJBQU0sQ0FBQztvQkFDTixNQUFNLElBQUksS0FBSyxDQUNiLDBFQUEwRSxDQUMzRSxDQUFDO2dCQUNKLENBQUM7Z0JBQ0QsTUFBTTtZQUNSO2dCQUNFLElBQUksT0FBTyxNQUFNLEtBQUssUUFBUSxFQUFFLENBQUM7b0JBQy9CLE1BQU0sYUFBYSxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztvQkFDcEMsSUFBSSxPQUFPLFVBQVUsS0FBSyxXQUFXLElBQUksVUFBVSxLQUFLLElBQUksRUFBRSxDQUFDO3dCQUM3RCxPQUFPLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQzt3QkFDN0IsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxDQUFDO29CQUNwQyxDQUFDO3lCQUFNLENBQUM7d0JBQ04sYUFBYSxDQUFDLE1BQU0sQ0FBQyxHQUFHLFVBQVUsQ0FBQzt3QkFDbkMsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxDQUFDO29CQUNwQyxDQUFDO2dCQUNILENBQUM7UUFDTCxDQUFDO1FBQ0QsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ25CLE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQWNELElBQUksQ0FBQyxJQUE2QjtRQUNoQyxJQUFJLE9BQU8sSUFBSSxLQUFLLFdBQVcsRUFBRSxDQUFDO1lBQ2hDLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUNyQixDQUFDO1FBRUQsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztRQUVuRCxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDbkIsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsT0FBTztRQUNMLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO1FBQ3RCLE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQWVELEtBQUssQ0FBQyxLQUFlO1FBQ25CLElBQUksT0FBTyxLQUFLLEtBQUssV0FBVyxFQUFFLENBQUM7WUFDakMsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDO1FBQ3RCLENBQUM7UUFFRCxJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztRQUNyQixPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7Q0FDRjtBQUVEOzs7OztHQUtHO0FBQ0gsTUFBTSxPQUFPLHFCQUFxQjtJQUNoQyxZQUNVLFNBQXdCLEVBQ3hCLFFBQWtCLEVBQ2xCLGdCQUFrQyxFQUNsQyxRQUFrQixFQUNsQixnQkFBa0M7UUFKbEMsY0FBUyxHQUFULFNBQVMsQ0FBZTtRQUN4QixhQUFRLEdBQVIsUUFBUSxDQUFVO1FBQ2xCLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFDbEMsYUFBUSxHQUFSLFFBQVEsQ0FBVTtRQUNsQixxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO0lBQ3pDLENBQUM7SUFFSjs7T0FFRztJQUNILElBQUk7UUFDRixPQUFPLElBQUksYUFBYSxDQUN0QixJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsRUFDeEIsSUFBSSxDQUFDLFFBQVEsRUFDYixJQUFJLENBQUMsZ0JBQWdCLEVBQ3JCLElBQUksQ0FBQyxRQUFRLEVBQ2IsSUFBSSxDQUFDLGdCQUFnQixDQUN0QixDQUFDO0lBQ0osQ0FBQztJQUVEOzs7T0FHRztJQUNILFVBQVUsQ0FBQyxNQUFlO1FBQ3hCLE1BQU0sSUFBSSxLQUFLLENBQUMsd0VBQXdFLENBQUMsQ0FBQztJQUM1RixDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsU0FBUyxDQUFDLElBQVU7UUFDbEIsTUFBTSxJQUFJLEtBQUssQ0FBQyx3RUFBd0UsQ0FBQyxDQUFDO0lBQzVGLENBQUM7Q0FDRiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0xvY2F0aW9uLCBMb2NhdGlvblN0cmF0ZWd5LCBQbGF0Zm9ybUxvY2F0aW9ufSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHvJtWlzUHJvbWlzZSBhcyBpc1Byb21pc2V9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtVcGdyYWRlTW9kdWxlfSBmcm9tICdAYW5ndWxhci91cGdyYWRlL3N0YXRpYyc7XG5pbXBvcnQge1JlcGxheVN1YmplY3R9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQge1VybENvZGVjfSBmcm9tICcuL3BhcmFtcyc7XG5pbXBvcnQge2RlZXBFcXVhbCwgaXNBbmNob3J9IGZyb20gJy4vdXRpbHMnO1xuXG5jb25zdCBQQVRIX01BVENIID0gL14oW14/I10qKShcXD8oW14jXSopKT8oIyguKikpPyQvO1xuY29uc3QgRE9VQkxFX1NMQVNIX1JFR0VYID0gL15cXHMqW1xcXFwvXXsyLH0vO1xuY29uc3QgSUdOT1JFX1VSSV9SRUdFWFAgPSAvXlxccyooamF2YXNjcmlwdHxtYWlsdG8pOi9pO1xuY29uc3QgREVGQVVMVF9QT1JUUzoge1trZXk6IHN0cmluZ106IG51bWJlcn0gPSB7XG4gICdodHRwOic6IDgwLFxuICAnaHR0cHM6JzogNDQzLFxuICAnZnRwOic6IDIxLFxufTtcblxuLyoqXG4gKiBMb2NhdGlvbiBzZXJ2aWNlIHRoYXQgcHJvdmlkZXMgYSBkcm9wLWluIHJlcGxhY2VtZW50IGZvciB0aGUgJGxvY2F0aW9uIHNlcnZpY2VcbiAqIHByb3ZpZGVkIGluIEFuZ3VsYXJKUy5cbiAqXG4gKiBAc2VlIFtVc2luZyB0aGUgQW5ndWxhciBVbmlmaWVkIExvY2F0aW9uIFNlcnZpY2VdKGd1aWRlL3VwZ3JhZGUjdXNpbmctdGhlLXVuaWZpZWQtYW5ndWxhci1sb2NhdGlvbi1zZXJ2aWNlKVxuICpcbiAqIEBwdWJsaWNBcGlcbiAqL1xuZXhwb3J0IGNsYXNzICRsb2NhdGlvblNoaW0ge1xuICBwcml2YXRlIGluaXRpYWxpemluZyA9IHRydWU7XG4gIHByaXZhdGUgdXBkYXRlQnJvd3NlciA9IGZhbHNlO1xuICBwcml2YXRlICQkYWJzVXJsOiBzdHJpbmcgPSAnJztcbiAgcHJpdmF0ZSAkJHVybDogc3RyaW5nID0gJyc7XG4gIHByaXZhdGUgJCRwcm90b2NvbDogc3RyaW5nO1xuICBwcml2YXRlICQkaG9zdDogc3RyaW5nID0gJyc7XG4gIHByaXZhdGUgJCRwb3J0OiBudW1iZXIgfCBudWxsO1xuICBwcml2YXRlICQkcmVwbGFjZTogYm9vbGVhbiA9IGZhbHNlO1xuICBwcml2YXRlICQkcGF0aDogc3RyaW5nID0gJyc7XG4gIHByaXZhdGUgJCRzZWFyY2g6IGFueSA9ICcnO1xuICBwcml2YXRlICQkaGFzaDogc3RyaW5nID0gJyc7XG4gIHByaXZhdGUgJCRzdGF0ZTogdW5rbm93bjtcbiAgcHJpdmF0ZSAkJGNoYW5nZUxpc3RlbmVyczogW1xuICAgIChcbiAgICAgIHVybDogc3RyaW5nLFxuICAgICAgc3RhdGU6IHVua25vd24sXG4gICAgICBvbGRVcmw6IHN0cmluZyxcbiAgICAgIG9sZFN0YXRlOiB1bmtub3duLFxuICAgICAgZXJyPzogKGU6IEVycm9yKSA9PiB2b2lkLFxuICAgICkgPT4gdm9pZCxcbiAgICAoZTogRXJyb3IpID0+IHZvaWQsXG4gIF1bXSA9IFtdO1xuXG4gIHByaXZhdGUgY2FjaGVkU3RhdGU6IHVua25vd24gPSBudWxsO1xuXG4gIHByaXZhdGUgdXJsQ2hhbmdlcyA9IG5ldyBSZXBsYXlTdWJqZWN0PHtuZXdVcmw6IHN0cmluZzsgbmV3U3RhdGU6IHVua25vd259PigxKTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICAkaW5qZWN0b3I6IGFueSxcbiAgICBwcml2YXRlIGxvY2F0aW9uOiBMb2NhdGlvbixcbiAgICBwcml2YXRlIHBsYXRmb3JtTG9jYXRpb246IFBsYXRmb3JtTG9jYXRpb24sXG4gICAgcHJpdmF0ZSB1cmxDb2RlYzogVXJsQ29kZWMsXG4gICAgcHJpdmF0ZSBsb2NhdGlvblN0cmF0ZWd5OiBMb2NhdGlvblN0cmF0ZWd5LFxuICApIHtcbiAgICBjb25zdCBpbml0aWFsVXJsID0gdGhpcy5icm93c2VyVXJsKCk7XG5cbiAgICBsZXQgcGFyc2VkVXJsID0gdGhpcy51cmxDb2RlYy5wYXJzZShpbml0aWFsVXJsKTtcblxuICAgIGlmICh0eXBlb2YgcGFyc2VkVXJsID09PSAnc3RyaW5nJykge1xuICAgICAgdGhyb3cgJ0ludmFsaWQgVVJMJztcbiAgICB9XG5cbiAgICB0aGlzLiQkcHJvdG9jb2wgPSBwYXJzZWRVcmwucHJvdG9jb2w7XG4gICAgdGhpcy4kJGhvc3QgPSBwYXJzZWRVcmwuaG9zdG5hbWU7XG4gICAgdGhpcy4kJHBvcnQgPSBwYXJzZUludChwYXJzZWRVcmwucG9ydCkgfHwgREVGQVVMVF9QT1JUU1twYXJzZWRVcmwucHJvdG9jb2xdIHx8IG51bGw7XG5cbiAgICB0aGlzLiQkcGFyc2VMaW5rVXJsKGluaXRpYWxVcmwsIGluaXRpYWxVcmwpO1xuICAgIHRoaXMuY2FjaGVTdGF0ZSgpO1xuICAgIHRoaXMuJCRzdGF0ZSA9IHRoaXMuYnJvd3NlclN0YXRlKCk7XG5cbiAgICB0aGlzLmxvY2F0aW9uLm9uVXJsQ2hhbmdlKChuZXdVcmwsIG5ld1N0YXRlKSA9PiB7XG4gICAgICB0aGlzLnVybENoYW5nZXMubmV4dCh7bmV3VXJsLCBuZXdTdGF0ZX0pO1xuICAgIH0pO1xuXG4gICAgaWYgKGlzUHJvbWlzZSgkaW5qZWN0b3IpKSB7XG4gICAgICAkaW5qZWN0b3IudGhlbigoJGkpID0+IHRoaXMuaW5pdGlhbGl6ZSgkaSkpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmluaXRpYWxpemUoJGluamVjdG9yKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGluaXRpYWxpemUoJGluamVjdG9yOiBhbnkpIHtcbiAgICBjb25zdCAkcm9vdFNjb3BlID0gJGluamVjdG9yLmdldCgnJHJvb3RTY29wZScpO1xuICAgIGNvbnN0ICRyb290RWxlbWVudCA9ICRpbmplY3Rvci5nZXQoJyRyb290RWxlbWVudCcpO1xuXG4gICAgJHJvb3RFbGVtZW50Lm9uKCdjbGljaycsIChldmVudDogYW55KSA9PiB7XG4gICAgICBpZiAoXG4gICAgICAgIGV2ZW50LmN0cmxLZXkgfHxcbiAgICAgICAgZXZlbnQubWV0YUtleSB8fFxuICAgICAgICBldmVudC5zaGlmdEtleSB8fFxuICAgICAgICBldmVudC53aGljaCA9PT0gMiB8fFxuICAgICAgICBldmVudC5idXR0b24gPT09IDJcbiAgICAgICkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGxldCBlbG06IChOb2RlICYgUGFyZW50Tm9kZSkgfCBudWxsID0gZXZlbnQudGFyZ2V0O1xuXG4gICAgICAvLyB0cmF2ZXJzZSB0aGUgRE9NIHVwIHRvIGZpbmQgZmlyc3QgQSB0YWdcbiAgICAgIHdoaWxlIChlbG0gJiYgZWxtLm5vZGVOYW1lLnRvTG93ZXJDYXNlKCkgIT09ICdhJykge1xuICAgICAgICAvLyBpZ25vcmUgcmV3cml0aW5nIGlmIG5vIEEgdGFnIChyZWFjaGVkIHJvb3QgZWxlbWVudCwgb3Igbm8gcGFyZW50IC0gcmVtb3ZlZCBmcm9tIGRvY3VtZW50KVxuICAgICAgICBpZiAoZWxtID09PSAkcm9vdEVsZW1lbnRbMF0gfHwgIShlbG0gPSBlbG0ucGFyZW50Tm9kZSkpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKCFpc0FuY2hvcihlbG0pKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgY29uc3QgYWJzSHJlZiA9IGVsbS5ocmVmO1xuICAgICAgY29uc3QgcmVsSHJlZiA9IGVsbS5nZXRBdHRyaWJ1dGUoJ2hyZWYnKTtcblxuICAgICAgLy8gSWdub3JlIHdoZW4gdXJsIGlzIHN0YXJ0ZWQgd2l0aCBqYXZhc2NyaXB0OiBvciBtYWlsdG86XG4gICAgICBpZiAoSUdOT1JFX1VSSV9SRUdFWFAudGVzdChhYnNIcmVmKSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGlmIChhYnNIcmVmICYmICFlbG0uZ2V0QXR0cmlidXRlKCd0YXJnZXQnKSAmJiAhZXZlbnQuaXNEZWZhdWx0UHJldmVudGVkKCkpIHtcbiAgICAgICAgaWYgKHRoaXMuJCRwYXJzZUxpbmtVcmwoYWJzSHJlZiwgcmVsSHJlZikpIHtcbiAgICAgICAgICAvLyBXZSBkbyBhIHByZXZlbnREZWZhdWx0IGZvciBhbGwgdXJscyB0aGF0IGFyZSBwYXJ0IG9mIHRoZSBBbmd1bGFySlMgYXBwbGljYXRpb24sXG4gICAgICAgICAgLy8gaW4gaHRtbDVtb2RlIGFuZCBhbHNvIHdpdGhvdXQsIHNvIHRoYXQgd2UgYXJlIGFibGUgdG8gYWJvcnQgbmF2aWdhdGlvbiB3aXRob3V0XG4gICAgICAgICAgLy8gZ2V0dGluZyBkb3VibGUgZW50cmllcyBpbiB0aGUgbG9jYXRpb24gaGlzdG9yeS5cbiAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgIC8vIHVwZGF0ZSBsb2NhdGlvbiBtYW51YWxseVxuICAgICAgICAgIGlmICh0aGlzLmFic1VybCgpICE9PSB0aGlzLmJyb3dzZXJVcmwoKSkge1xuICAgICAgICAgICAgJHJvb3RTY29wZS4kYXBwbHkoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHRoaXMudXJsQ2hhbmdlcy5zdWJzY3JpYmUoKHtuZXdVcmwsIG5ld1N0YXRlfSkgPT4ge1xuICAgICAgY29uc3Qgb2xkVXJsID0gdGhpcy5hYnNVcmwoKTtcbiAgICAgIGNvbnN0IG9sZFN0YXRlID0gdGhpcy4kJHN0YXRlO1xuICAgICAgdGhpcy4kJHBhcnNlKG5ld1VybCk7XG4gICAgICBuZXdVcmwgPSB0aGlzLmFic1VybCgpO1xuICAgICAgdGhpcy4kJHN0YXRlID0gbmV3U3RhdGU7XG4gICAgICBjb25zdCBkZWZhdWx0UHJldmVudGVkID0gJHJvb3RTY29wZS4kYnJvYWRjYXN0KFxuICAgICAgICAnJGxvY2F0aW9uQ2hhbmdlU3RhcnQnLFxuICAgICAgICBuZXdVcmwsXG4gICAgICAgIG9sZFVybCxcbiAgICAgICAgbmV3U3RhdGUsXG4gICAgICAgIG9sZFN0YXRlLFxuICAgICAgKS5kZWZhdWx0UHJldmVudGVkO1xuXG4gICAgICAvLyBpZiB0aGUgbG9jYXRpb24gd2FzIGNoYW5nZWQgYnkgYSBgJGxvY2F0aW9uQ2hhbmdlU3RhcnRgIGhhbmRsZXIgdGhlbiBzdG9wXG4gICAgICAvLyBwcm9jZXNzaW5nIHRoaXMgbG9jYXRpb24gY2hhbmdlXG4gICAgICBpZiAodGhpcy5hYnNVcmwoKSAhPT0gbmV3VXJsKSByZXR1cm47XG5cbiAgICAgIC8vIElmIGRlZmF1bHQgd2FzIHByZXZlbnRlZCwgc2V0IGJhY2sgdG8gb2xkIHN0YXRlLiBUaGlzIGlzIHRoZSBzdGF0ZSB0aGF0IHdhcyBsb2NhbGx5XG4gICAgICAvLyBjYWNoZWQgaW4gdGhlICRsb2NhdGlvbiBzZXJ2aWNlLlxuICAgICAgaWYgKGRlZmF1bHRQcmV2ZW50ZWQpIHtcbiAgICAgICAgdGhpcy4kJHBhcnNlKG9sZFVybCk7XG4gICAgICAgIHRoaXMuc3RhdGUob2xkU3RhdGUpO1xuICAgICAgICB0aGlzLnNldEJyb3dzZXJVcmxXaXRoRmFsbGJhY2sob2xkVXJsLCBmYWxzZSwgb2xkU3RhdGUpO1xuICAgICAgICB0aGlzLiQkbm90aWZ5Q2hhbmdlTGlzdGVuZXJzKHRoaXMudXJsKCksIHRoaXMuJCRzdGF0ZSwgb2xkVXJsLCBvbGRTdGF0ZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmluaXRpYWxpemluZyA9IGZhbHNlO1xuICAgICAgICAkcm9vdFNjb3BlLiRicm9hZGNhc3QoJyRsb2NhdGlvbkNoYW5nZVN1Y2Nlc3MnLCBuZXdVcmwsIG9sZFVybCwgbmV3U3RhdGUsIG9sZFN0YXRlKTtcbiAgICAgICAgdGhpcy5yZXNldEJyb3dzZXJVcGRhdGUoKTtcbiAgICAgIH1cbiAgICAgIGlmICghJHJvb3RTY29wZS4kJHBoYXNlKSB7XG4gICAgICAgICRyb290U2NvcGUuJGRpZ2VzdCgpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgLy8gdXBkYXRlIGJyb3dzZXJcbiAgICAkcm9vdFNjb3BlLiR3YXRjaCgoKSA9PiB7XG4gICAgICBpZiAodGhpcy5pbml0aWFsaXppbmcgfHwgdGhpcy51cGRhdGVCcm93c2VyKSB7XG4gICAgICAgIHRoaXMudXBkYXRlQnJvd3NlciA9IGZhbHNlO1xuXG4gICAgICAgIGNvbnN0IG9sZFVybCA9IHRoaXMuYnJvd3NlclVybCgpO1xuICAgICAgICBjb25zdCBuZXdVcmwgPSB0aGlzLmFic1VybCgpO1xuICAgICAgICBjb25zdCBvbGRTdGF0ZSA9IHRoaXMuYnJvd3NlclN0YXRlKCk7XG4gICAgICAgIGxldCBjdXJyZW50UmVwbGFjZSA9IHRoaXMuJCRyZXBsYWNlO1xuXG4gICAgICAgIGNvbnN0IHVybE9yU3RhdGVDaGFuZ2VkID1cbiAgICAgICAgICAhdGhpcy51cmxDb2RlYy5hcmVFcXVhbChvbGRVcmwsIG5ld1VybCkgfHwgb2xkU3RhdGUgIT09IHRoaXMuJCRzdGF0ZTtcblxuICAgICAgICAvLyBGaXJlIGxvY2F0aW9uIGNoYW5nZXMgb25lIHRpbWUgdG8gb24gaW5pdGlhbGl6YXRpb24uIFRoaXMgbXVzdCBiZSBkb25lIG9uIHRoZVxuICAgICAgICAvLyBuZXh0IHRpY2sgKHRodXMgaW5zaWRlICRldmFsQXN5bmMoKSkgaW4gb3JkZXIgZm9yIGxpc3RlbmVycyB0byBiZSByZWdpc3RlcmVkXG4gICAgICAgIC8vIGJlZm9yZSB0aGUgZXZlbnQgZmlyZXMuIE1pbWljaW5nIGJlaGF2aW9yIGZyb20gJGxvY2F0aW9uV2F0Y2g6XG4gICAgICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9hbmd1bGFyL2FuZ3VsYXIuanMvYmxvYi9tYXN0ZXIvc3JjL25nL2xvY2F0aW9uLmpzI0w5ODNcbiAgICAgICAgaWYgKHRoaXMuaW5pdGlhbGl6aW5nIHx8IHVybE9yU3RhdGVDaGFuZ2VkKSB7XG4gICAgICAgICAgdGhpcy5pbml0aWFsaXppbmcgPSBmYWxzZTtcblxuICAgICAgICAgICRyb290U2NvcGUuJGV2YWxBc3luYygoKSA9PiB7XG4gICAgICAgICAgICAvLyBHZXQgdGhlIG5ldyBVUkwgYWdhaW4gc2luY2UgaXQgY291bGQgaGF2ZSBjaGFuZ2VkIGR1ZSB0byBhc3luYyB1cGRhdGVcbiAgICAgICAgICAgIGNvbnN0IG5ld1VybCA9IHRoaXMuYWJzVXJsKCk7XG4gICAgICAgICAgICBjb25zdCBkZWZhdWx0UHJldmVudGVkID0gJHJvb3RTY29wZS4kYnJvYWRjYXN0KFxuICAgICAgICAgICAgICAnJGxvY2F0aW9uQ2hhbmdlU3RhcnQnLFxuICAgICAgICAgICAgICBuZXdVcmwsXG4gICAgICAgICAgICAgIG9sZFVybCxcbiAgICAgICAgICAgICAgdGhpcy4kJHN0YXRlLFxuICAgICAgICAgICAgICBvbGRTdGF0ZSxcbiAgICAgICAgICAgICkuZGVmYXVsdFByZXZlbnRlZDtcblxuICAgICAgICAgICAgLy8gaWYgdGhlIGxvY2F0aW9uIHdhcyBjaGFuZ2VkIGJ5IGEgYCRsb2NhdGlvbkNoYW5nZVN0YXJ0YCBoYW5kbGVyIHRoZW4gc3RvcFxuICAgICAgICAgICAgLy8gcHJvY2Vzc2luZyB0aGlzIGxvY2F0aW9uIGNoYW5nZVxuICAgICAgICAgICAgaWYgKHRoaXMuYWJzVXJsKCkgIT09IG5ld1VybCkgcmV0dXJuO1xuXG4gICAgICAgICAgICBpZiAoZGVmYXVsdFByZXZlbnRlZCkge1xuICAgICAgICAgICAgICB0aGlzLiQkcGFyc2Uob2xkVXJsKTtcbiAgICAgICAgICAgICAgdGhpcy4kJHN0YXRlID0gb2xkU3RhdGU7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAvLyBUaGlzIGJsb2NrIGRvZXNuJ3QgcnVuIHdoZW4gaW5pdGlhbGl6aW5nIGJlY2F1c2UgaXQncyBnb2luZyB0byBwZXJmb3JtIHRoZSB1cGRhdGVcbiAgICAgICAgICAgICAgLy8gdG8gdGhlIFVSTCB3aGljaCBzaG91bGRuJ3QgYmUgbmVlZGVkIHdoZW4gaW5pdGlhbGl6aW5nLlxuICAgICAgICAgICAgICBpZiAodXJsT3JTdGF0ZUNoYW5nZWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNldEJyb3dzZXJVcmxXaXRoRmFsbGJhY2soXG4gICAgICAgICAgICAgICAgICBuZXdVcmwsXG4gICAgICAgICAgICAgICAgICBjdXJyZW50UmVwbGFjZSxcbiAgICAgICAgICAgICAgICAgIG9sZFN0YXRlID09PSB0aGlzLiQkc3RhdGUgPyBudWxsIDogdGhpcy4kJHN0YXRlLFxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgdGhpcy4kJHJlcGxhY2UgPSBmYWxzZTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAkcm9vdFNjb3BlLiRicm9hZGNhc3QoXG4gICAgICAgICAgICAgICAgJyRsb2NhdGlvbkNoYW5nZVN1Y2Nlc3MnLFxuICAgICAgICAgICAgICAgIG5ld1VybCxcbiAgICAgICAgICAgICAgICBvbGRVcmwsXG4gICAgICAgICAgICAgICAgdGhpcy4kJHN0YXRlLFxuICAgICAgICAgICAgICAgIG9sZFN0YXRlLFxuICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICBpZiAodXJsT3JTdGF0ZUNoYW5nZWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLiQkbm90aWZ5Q2hhbmdlTGlzdGVuZXJzKHRoaXMudXJsKCksIHRoaXMuJCRzdGF0ZSwgb2xkVXJsLCBvbGRTdGF0ZSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgdGhpcy4kJHJlcGxhY2UgPSBmYWxzZTtcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgcmVzZXRCcm93c2VyVXBkYXRlKCkge1xuICAgIHRoaXMuJCRyZXBsYWNlID0gZmFsc2U7XG4gICAgdGhpcy4kJHN0YXRlID0gdGhpcy5icm93c2VyU3RhdGUoKTtcbiAgICB0aGlzLnVwZGF0ZUJyb3dzZXIgPSBmYWxzZTtcbiAgICB0aGlzLmxhc3RCcm93c2VyVXJsID0gdGhpcy5icm93c2VyVXJsKCk7XG4gIH1cblxuICBwcml2YXRlIGxhc3RIaXN0b3J5U3RhdGU6IHVua25vd247XG4gIHByaXZhdGUgbGFzdEJyb3dzZXJVcmw6IHN0cmluZyA9ICcnO1xuICBwcml2YXRlIGJyb3dzZXJVcmwoKTogc3RyaW5nO1xuICBwcml2YXRlIGJyb3dzZXJVcmwodXJsOiBzdHJpbmcsIHJlcGxhY2U/OiBib29sZWFuLCBzdGF0ZT86IHVua25vd24pOiB0aGlzO1xuICBwcml2YXRlIGJyb3dzZXJVcmwodXJsPzogc3RyaW5nLCByZXBsYWNlPzogYm9vbGVhbiwgc3RhdGU/OiB1bmtub3duKSB7XG4gICAgLy8gSW4gbW9kZXJuIGJyb3dzZXJzIGBoaXN0b3J5LnN0YXRlYCBpcyBgbnVsbGAgYnkgZGVmYXVsdDsgdHJlYXRpbmcgaXQgc2VwYXJhdGVseVxuICAgIC8vIGZyb20gYHVuZGVmaW5lZGAgd291bGQgY2F1c2UgYCRicm93c2VyLnVybCgnL2ZvbycpYCB0byBjaGFuZ2UgYGhpc3Rvcnkuc3RhdGVgXG4gICAgLy8gdG8gdW5kZWZpbmVkIHZpYSBgcHVzaFN0YXRlYC4gSW5zdGVhZCwgbGV0J3MgY2hhbmdlIGB1bmRlZmluZWRgIHRvIGBudWxsYCBoZXJlLlxuICAgIGlmICh0eXBlb2Ygc3RhdGUgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICBzdGF0ZSA9IG51bGw7XG4gICAgfVxuXG4gICAgLy8gc2V0dGVyXG4gICAgaWYgKHVybCkge1xuICAgICAgbGV0IHNhbWVTdGF0ZSA9IHRoaXMubGFzdEhpc3RvcnlTdGF0ZSA9PT0gc3RhdGU7XG5cbiAgICAgIC8vIE5vcm1hbGl6ZSB0aGUgaW5wdXR0ZWQgVVJMXG4gICAgICB1cmwgPSB0aGlzLnVybENvZGVjLnBhcnNlKHVybCkuaHJlZjtcblxuICAgICAgLy8gRG9uJ3QgY2hhbmdlIGFueXRoaW5nIGlmIHByZXZpb3VzIGFuZCBjdXJyZW50IFVSTHMgYW5kIHN0YXRlcyBtYXRjaC5cbiAgICAgIGlmICh0aGlzLmxhc3RCcm93c2VyVXJsID09PSB1cmwgJiYgc2FtZVN0YXRlKSB7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgfVxuICAgICAgdGhpcy5sYXN0QnJvd3NlclVybCA9IHVybDtcbiAgICAgIHRoaXMubGFzdEhpc3RvcnlTdGF0ZSA9IHN0YXRlO1xuXG4gICAgICAvLyBSZW1vdmUgc2VydmVyIGJhc2UgZnJvbSBVUkwgYXMgdGhlIEFuZ3VsYXIgQVBJcyBmb3IgdXBkYXRpbmcgVVJMIHJlcXVpcmVcbiAgICAgIC8vIGl0IHRvIGJlIHRoZSBwYXRoKy5cbiAgICAgIHVybCA9IHRoaXMuc3RyaXBCYXNlVXJsKHRoaXMuZ2V0U2VydmVyQmFzZSgpLCB1cmwpIHx8IHVybDtcblxuICAgICAgLy8gU2V0IHRoZSBVUkxcbiAgICAgIGlmIChyZXBsYWNlKSB7XG4gICAgICAgIHRoaXMubG9jYXRpb25TdHJhdGVneS5yZXBsYWNlU3RhdGUoc3RhdGUsICcnLCB1cmwsICcnKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMubG9jYXRpb25TdHJhdGVneS5wdXNoU3RhdGUoc3RhdGUsICcnLCB1cmwsICcnKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5jYWNoZVN0YXRlKCk7XG5cbiAgICAgIHJldHVybiB0aGlzO1xuICAgICAgLy8gZ2V0dGVyXG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0aGlzLnBsYXRmb3JtTG9jYXRpb24uaHJlZjtcbiAgICB9XG4gIH1cblxuICAvLyBUaGlzIHZhcmlhYmxlIHNob3VsZCBiZSB1c2VkICpvbmx5KiBpbnNpZGUgdGhlIGNhY2hlU3RhdGUgZnVuY3Rpb24uXG4gIHByaXZhdGUgbGFzdENhY2hlZFN0YXRlOiB1bmtub3duID0gbnVsbDtcbiAgcHJpdmF0ZSBjYWNoZVN0YXRlKCkge1xuICAgIC8vIFRoaXMgc2hvdWxkIGJlIHRoZSBvbmx5IHBsYWNlIGluICRicm93c2VyIHdoZXJlIGBoaXN0b3J5LnN0YXRlYCBpcyByZWFkLlxuICAgIHRoaXMuY2FjaGVkU3RhdGUgPSB0aGlzLnBsYXRmb3JtTG9jYXRpb24uZ2V0U3RhdGUoKTtcbiAgICBpZiAodHlwZW9mIHRoaXMuY2FjaGVkU3RhdGUgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICB0aGlzLmNhY2hlZFN0YXRlID0gbnVsbDtcbiAgICB9XG5cbiAgICAvLyBQcmV2ZW50IGNhbGxiYWNrcyBmbyBmaXJlIHR3aWNlIGlmIGJvdGggaGFzaGNoYW5nZSAmIHBvcHN0YXRlIHdlcmUgZmlyZWQuXG4gICAgaWYgKGRlZXBFcXVhbCh0aGlzLmNhY2hlZFN0YXRlLCB0aGlzLmxhc3RDYWNoZWRTdGF0ZSkpIHtcbiAgICAgIHRoaXMuY2FjaGVkU3RhdGUgPSB0aGlzLmxhc3RDYWNoZWRTdGF0ZTtcbiAgICB9XG5cbiAgICB0aGlzLmxhc3RDYWNoZWRTdGF0ZSA9IHRoaXMuY2FjaGVkU3RhdGU7XG4gICAgdGhpcy5sYXN0SGlzdG9yeVN0YXRlID0gdGhpcy5jYWNoZWRTdGF0ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGlzIGZ1bmN0aW9uIGVtdWxhdGVzIHRoZSAkYnJvd3Nlci5zdGF0ZSgpIGZ1bmN0aW9uIGZyb20gQW5ndWxhckpTLiBJdCB3aWxsIGNhdXNlXG4gICAqIGhpc3Rvcnkuc3RhdGUgdG8gYmUgY2FjaGVkIHVubGVzcyBjaGFuZ2VkIHdpdGggZGVlcCBlcXVhbGl0eSBjaGVjay5cbiAgICovXG4gIHByaXZhdGUgYnJvd3NlclN0YXRlKCk6IHVua25vd24ge1xuICAgIHJldHVybiB0aGlzLmNhY2hlZFN0YXRlO1xuICB9XG5cbiAgcHJpdmF0ZSBzdHJpcEJhc2VVcmwoYmFzZTogc3RyaW5nLCB1cmw6IHN0cmluZykge1xuICAgIGlmICh1cmwuc3RhcnRzV2l0aChiYXNlKSkge1xuICAgICAgcmV0dXJuIHVybC5zbGljZShiYXNlLmxlbmd0aCk7XG4gICAgfVxuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cblxuICBwcml2YXRlIGdldFNlcnZlckJhc2UoKSB7XG4gICAgY29uc3Qge3Byb3RvY29sLCBob3N0bmFtZSwgcG9ydH0gPSB0aGlzLnBsYXRmb3JtTG9jYXRpb247XG4gICAgY29uc3QgYmFzZUhyZWYgPSB0aGlzLmxvY2F0aW9uU3RyYXRlZ3kuZ2V0QmFzZUhyZWYoKTtcbiAgICBsZXQgdXJsID0gYCR7cHJvdG9jb2x9Ly8ke2hvc3RuYW1lfSR7cG9ydCA/ICc6JyArIHBvcnQgOiAnJ30ke2Jhc2VIcmVmIHx8ICcvJ31gO1xuICAgIHJldHVybiB1cmwuZW5kc1dpdGgoJy8nKSA/IHVybCA6IHVybCArICcvJztcbiAgfVxuXG4gIHByaXZhdGUgcGFyc2VBcHBVcmwodXJsOiBzdHJpbmcpIHtcbiAgICBpZiAoRE9VQkxFX1NMQVNIX1JFR0VYLnRlc3QodXJsKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBCYWQgUGF0aCAtIFVSTCBjYW5ub3Qgc3RhcnQgd2l0aCBkb3VibGUgc2xhc2hlczogJHt1cmx9YCk7XG4gICAgfVxuXG4gICAgbGV0IHByZWZpeGVkID0gdXJsLmNoYXJBdCgwKSAhPT0gJy8nO1xuICAgIGlmIChwcmVmaXhlZCkge1xuICAgICAgdXJsID0gJy8nICsgdXJsO1xuICAgIH1cbiAgICBsZXQgbWF0Y2ggPSB0aGlzLnVybENvZGVjLnBhcnNlKHVybCwgdGhpcy5nZXRTZXJ2ZXJCYXNlKCkpO1xuICAgIGlmICh0eXBlb2YgbWF0Y2ggPT09ICdzdHJpbmcnKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYEJhZCBVUkwgLSBDYW5ub3QgcGFyc2UgVVJMOiAke3VybH1gKTtcbiAgICB9XG4gICAgbGV0IHBhdGggPVxuICAgICAgcHJlZml4ZWQgJiYgbWF0Y2gucGF0aG5hbWUuY2hhckF0KDApID09PSAnLycgPyBtYXRjaC5wYXRobmFtZS5zdWJzdHJpbmcoMSkgOiBtYXRjaC5wYXRobmFtZTtcbiAgICB0aGlzLiQkcGF0aCA9IHRoaXMudXJsQ29kZWMuZGVjb2RlUGF0aChwYXRoKTtcbiAgICB0aGlzLiQkc2VhcmNoID0gdGhpcy51cmxDb2RlYy5kZWNvZGVTZWFyY2gobWF0Y2guc2VhcmNoKTtcbiAgICB0aGlzLiQkaGFzaCA9IHRoaXMudXJsQ29kZWMuZGVjb2RlSGFzaChtYXRjaC5oYXNoKTtcblxuICAgIC8vIG1ha2Ugc3VyZSBwYXRoIHN0YXJ0cyB3aXRoICcvJztcbiAgICBpZiAodGhpcy4kJHBhdGggJiYgdGhpcy4kJHBhdGguY2hhckF0KDApICE9PSAnLycpIHtcbiAgICAgIHRoaXMuJCRwYXRoID0gJy8nICsgdGhpcy4kJHBhdGg7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFJlZ2lzdGVycyBsaXN0ZW5lcnMgZm9yIFVSTCBjaGFuZ2VzLiBUaGlzIEFQSSBpcyB1c2VkIHRvIGNhdGNoIHVwZGF0ZXMgcGVyZm9ybWVkIGJ5IHRoZVxuICAgKiBBbmd1bGFySlMgZnJhbWV3b3JrLiBUaGVzZSBjaGFuZ2VzIGFyZSBhIHN1YnNldCBvZiB0aGUgYCRsb2NhdGlvbkNoYW5nZVN0YXJ0YCBhbmRcbiAgICogYCRsb2NhdGlvbkNoYW5nZVN1Y2Nlc3NgIGV2ZW50cyB3aGljaCBmaXJlIHdoZW4gQW5ndWxhckpTIHVwZGF0ZXMgaXRzIGludGVybmFsbHktcmVmZXJlbmNlZFxuICAgKiB2ZXJzaW9uIG9mIHRoZSBicm93c2VyIFVSTC5cbiAgICpcbiAgICogSXQncyBwb3NzaWJsZSBmb3IgYCRsb2NhdGlvbkNoYW5nZWAgZXZlbnRzIHRvIGhhcHBlbiwgYnV0IGZvciB0aGUgYnJvd3NlciBVUkxcbiAgICogKHdpbmRvdy5sb2NhdGlvbikgdG8gcmVtYWluIHVuY2hhbmdlZC4gVGhpcyBgb25DaGFuZ2VgIGNhbGxiYWNrIHdpbGwgZmlyZSBvbmx5IHdoZW4gQW5ndWxhckpTXG4gICAqIGFjdHVhbGx5IHVwZGF0ZXMgdGhlIGJyb3dzZXIgVVJMICh3aW5kb3cubG9jYXRpb24pLlxuICAgKlxuICAgKiBAcGFyYW0gZm4gVGhlIGNhbGxiYWNrIGZ1bmN0aW9uIHRoYXQgaXMgdHJpZ2dlcmVkIGZvciB0aGUgbGlzdGVuZXIgd2hlbiB0aGUgVVJMIGNoYW5nZXMuXG4gICAqIEBwYXJhbSBlcnIgVGhlIGNhbGxiYWNrIGZ1bmN0aW9uIHRoYXQgaXMgdHJpZ2dlcmVkIHdoZW4gYW4gZXJyb3Igb2NjdXJzLlxuICAgKi9cbiAgb25DaGFuZ2UoXG4gICAgZm46ICh1cmw6IHN0cmluZywgc3RhdGU6IHVua25vd24sIG9sZFVybDogc3RyaW5nLCBvbGRTdGF0ZTogdW5rbm93bikgPT4gdm9pZCxcbiAgICBlcnI6IChlOiBFcnJvcikgPT4gdm9pZCA9IChlOiBFcnJvcikgPT4ge30sXG4gICkge1xuICAgIHRoaXMuJCRjaGFuZ2VMaXN0ZW5lcnMucHVzaChbZm4sIGVycl0pO1xuICB9XG5cbiAgLyoqIEBpbnRlcm5hbCAqL1xuICAkJG5vdGlmeUNoYW5nZUxpc3RlbmVycyhcbiAgICB1cmw6IHN0cmluZyA9ICcnLFxuICAgIHN0YXRlOiB1bmtub3duLFxuICAgIG9sZFVybDogc3RyaW5nID0gJycsXG4gICAgb2xkU3RhdGU6IHVua25vd24sXG4gICkge1xuICAgIHRoaXMuJCRjaGFuZ2VMaXN0ZW5lcnMuZm9yRWFjaCgoW2ZuLCBlcnJdKSA9PiB7XG4gICAgICB0cnkge1xuICAgICAgICBmbih1cmwsIHN0YXRlLCBvbGRVcmwsIG9sZFN0YXRlKTtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgZXJyKGUgYXMgRXJyb3IpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFBhcnNlcyB0aGUgcHJvdmlkZWQgVVJMLCBhbmQgc2V0cyB0aGUgY3VycmVudCBVUkwgdG8gdGhlIHBhcnNlZCByZXN1bHQuXG4gICAqXG4gICAqIEBwYXJhbSB1cmwgVGhlIFVSTCBzdHJpbmcuXG4gICAqL1xuICAkJHBhcnNlKHVybDogc3RyaW5nKSB7XG4gICAgbGV0IHBhdGhVcmw6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICBpZiAodXJsLnN0YXJ0c1dpdGgoJy8nKSkge1xuICAgICAgcGF0aFVybCA9IHVybDtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gUmVtb3ZlIHByb3RvY29sICYgaG9zdG5hbWUgaWYgVVJMIHN0YXJ0cyB3aXRoIGl0XG4gICAgICBwYXRoVXJsID0gdGhpcy5zdHJpcEJhc2VVcmwodGhpcy5nZXRTZXJ2ZXJCYXNlKCksIHVybCk7XG4gICAgfVxuICAgIGlmICh0eXBlb2YgcGF0aFVybCA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgSW52YWxpZCB1cmwgXCIke3VybH1cIiwgbWlzc2luZyBwYXRoIHByZWZpeCBcIiR7dGhpcy5nZXRTZXJ2ZXJCYXNlKCl9XCIuYCk7XG4gICAgfVxuXG4gICAgdGhpcy5wYXJzZUFwcFVybChwYXRoVXJsKTtcblxuICAgIHRoaXMuJCRwYXRoIHx8PSAnLyc7XG4gICAgdGhpcy5jb21wb3NlVXJscygpO1xuICB9XG5cbiAgLyoqXG4gICAqIFBhcnNlcyB0aGUgcHJvdmlkZWQgVVJMIGFuZCBpdHMgcmVsYXRpdmUgVVJMLlxuICAgKlxuICAgKiBAcGFyYW0gdXJsIFRoZSBmdWxsIFVSTCBzdHJpbmcuXG4gICAqIEBwYXJhbSByZWxIcmVmIEEgVVJMIHN0cmluZyByZWxhdGl2ZSB0byB0aGUgZnVsbCBVUkwgc3RyaW5nLlxuICAgKi9cbiAgJCRwYXJzZUxpbmtVcmwodXJsOiBzdHJpbmcsIHJlbEhyZWY/OiBzdHJpbmcgfCBudWxsKTogYm9vbGVhbiB7XG4gICAgLy8gV2hlbiByZWxIcmVmIGlzIHBhc3NlZCwgaXQgc2hvdWxkIGJlIGEgaGFzaCBhbmQgaXMgaGFuZGxlZCBzZXBhcmF0ZWx5XG4gICAgaWYgKHJlbEhyZWYgJiYgcmVsSHJlZlswXSA9PT0gJyMnKSB7XG4gICAgICB0aGlzLmhhc2gocmVsSHJlZi5zbGljZSgxKSk7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgbGV0IHJld3JpdHRlblVybDtcbiAgICBsZXQgYXBwVXJsID0gdGhpcy5zdHJpcEJhc2VVcmwodGhpcy5nZXRTZXJ2ZXJCYXNlKCksIHVybCk7XG4gICAgaWYgKHR5cGVvZiBhcHBVcmwgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICByZXdyaXR0ZW5VcmwgPSB0aGlzLmdldFNlcnZlckJhc2UoKSArIGFwcFVybDtcbiAgICB9IGVsc2UgaWYgKHRoaXMuZ2V0U2VydmVyQmFzZSgpID09PSB1cmwgKyAnLycpIHtcbiAgICAgIHJld3JpdHRlblVybCA9IHRoaXMuZ2V0U2VydmVyQmFzZSgpO1xuICAgIH1cbiAgICAvLyBTZXQgdGhlIFVSTFxuICAgIGlmIChyZXdyaXR0ZW5VcmwpIHtcbiAgICAgIHRoaXMuJCRwYXJzZShyZXdyaXR0ZW5VcmwpO1xuICAgIH1cbiAgICByZXR1cm4gISFyZXdyaXR0ZW5Vcmw7XG4gIH1cblxuICBwcml2YXRlIHNldEJyb3dzZXJVcmxXaXRoRmFsbGJhY2sodXJsOiBzdHJpbmcsIHJlcGxhY2U6IGJvb2xlYW4sIHN0YXRlOiB1bmtub3duKSB7XG4gICAgY29uc3Qgb2xkVXJsID0gdGhpcy51cmwoKTtcbiAgICBjb25zdCBvbGRTdGF0ZSA9IHRoaXMuJCRzdGF0ZTtcbiAgICB0cnkge1xuICAgICAgdGhpcy5icm93c2VyVXJsKHVybCwgcmVwbGFjZSwgc3RhdGUpO1xuXG4gICAgICAvLyBNYWtlIHN1cmUgJGxvY2F0aW9uLnN0YXRlKCkgcmV0dXJucyByZWZlcmVudGlhbGx5IGlkZW50aWNhbCAobm90IGp1c3QgZGVlcGx5IGVxdWFsKVxuICAgICAgLy8gc3RhdGUgb2JqZWN0OyB0aGlzIG1ha2VzIHBvc3NpYmxlIHF1aWNrIGNoZWNraW5nIGlmIHRoZSBzdGF0ZSBjaGFuZ2VkIGluIHRoZSBkaWdlc3RcbiAgICAgIC8vIGxvb3AuIENoZWNraW5nIGRlZXAgZXF1YWxpdHkgd291bGQgYmUgdG9vIGV4cGVuc2l2ZS5cbiAgICAgIHRoaXMuJCRzdGF0ZSA9IHRoaXMuYnJvd3NlclN0YXRlKCk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgLy8gUmVzdG9yZSBvbGQgdmFsdWVzIGlmIHB1c2hTdGF0ZSBmYWlsc1xuICAgICAgdGhpcy51cmwob2xkVXJsKTtcbiAgICAgIHRoaXMuJCRzdGF0ZSA9IG9sZFN0YXRlO1xuXG4gICAgICB0aHJvdyBlO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgY29tcG9zZVVybHMoKSB7XG4gICAgdGhpcy4kJHVybCA9IHRoaXMudXJsQ29kZWMubm9ybWFsaXplKHRoaXMuJCRwYXRoLCB0aGlzLiQkc2VhcmNoLCB0aGlzLiQkaGFzaCk7XG4gICAgdGhpcy4kJGFic1VybCA9IHRoaXMuZ2V0U2VydmVyQmFzZSgpICsgdGhpcy4kJHVybC5zbGljZSgxKTsgLy8gcmVtb3ZlICcvJyBmcm9tIGZyb250IG9mIFVSTFxuICAgIHRoaXMudXBkYXRlQnJvd3NlciA9IHRydWU7XG4gIH1cblxuICAvKipcbiAgICogUmV0cmlldmVzIHRoZSBmdWxsIFVSTCByZXByZXNlbnRhdGlvbiB3aXRoIGFsbCBzZWdtZW50cyBlbmNvZGVkIGFjY29yZGluZyB0b1xuICAgKiBydWxlcyBzcGVjaWZpZWQgaW5cbiAgICogW1JGQyAzOTg2XShodHRwczovL3Rvb2xzLmlldGYub3JnL2h0bWwvcmZjMzk4NikuXG4gICAqXG4gICAqXG4gICAqIGBgYGpzXG4gICAqIC8vIGdpdmVuIFVSTCBodHRwOi8vZXhhbXBsZS5jb20vIy9zb21lL3BhdGg/Zm9vPWJhciZiYXo9eG94b1xuICAgKiBsZXQgYWJzVXJsID0gJGxvY2F0aW9uLmFic1VybCgpO1xuICAgKiAvLyA9PiBcImh0dHA6Ly9leGFtcGxlLmNvbS8jL3NvbWUvcGF0aD9mb289YmFyJmJhej14b3hvXCJcbiAgICogYGBgXG4gICAqL1xuICBhYnNVcmwoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy4kJGFic1VybDtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXRyaWV2ZXMgdGhlIGN1cnJlbnQgVVJMLCBvciBzZXRzIGEgbmV3IFVSTC4gV2hlbiBzZXR0aW5nIGEgVVJMLFxuICAgKiBjaGFuZ2VzIHRoZSBwYXRoLCBzZWFyY2gsIGFuZCBoYXNoLCBhbmQgcmV0dXJucyBhIHJlZmVyZW5jZSB0byBpdHMgb3duIGluc3RhbmNlLlxuICAgKlxuICAgKiBgYGBqc1xuICAgKiAvLyBnaXZlbiBVUkwgaHR0cDovL2V4YW1wbGUuY29tLyMvc29tZS9wYXRoP2Zvbz1iYXImYmF6PXhveG9cbiAgICogbGV0IHVybCA9ICRsb2NhdGlvbi51cmwoKTtcbiAgICogLy8gPT4gXCIvc29tZS9wYXRoP2Zvbz1iYXImYmF6PXhveG9cIlxuICAgKiBgYGBcbiAgICovXG4gIHVybCgpOiBzdHJpbmc7XG4gIHVybCh1cmw6IHN0cmluZyk6IHRoaXM7XG4gIHVybCh1cmw/OiBzdHJpbmcpOiBzdHJpbmcgfCB0aGlzIHtcbiAgICBpZiAodHlwZW9mIHVybCA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGlmICghdXJsLmxlbmd0aCkge1xuICAgICAgICB1cmwgPSAnLyc7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IG1hdGNoID0gUEFUSF9NQVRDSC5leGVjKHVybCk7XG4gICAgICBpZiAoIW1hdGNoKSByZXR1cm4gdGhpcztcbiAgICAgIGlmIChtYXRjaFsxXSB8fCB1cmwgPT09ICcnKSB0aGlzLnBhdGgodGhpcy51cmxDb2RlYy5kZWNvZGVQYXRoKG1hdGNoWzFdKSk7XG4gICAgICBpZiAobWF0Y2hbMl0gfHwgbWF0Y2hbMV0gfHwgdXJsID09PSAnJykgdGhpcy5zZWFyY2gobWF0Y2hbM10gfHwgJycpO1xuICAgICAgdGhpcy5oYXNoKG1hdGNoWzVdIHx8ICcnKTtcblxuICAgICAgLy8gQ2hhaW5hYmxlIG1ldGhvZFxuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuJCR1cmw7XG4gIH1cblxuICAvKipcbiAgICogUmV0cmlldmVzIHRoZSBwcm90b2NvbCBvZiB0aGUgY3VycmVudCBVUkwuXG4gICAqXG4gICAqIGBgYGpzXG4gICAqIC8vIGdpdmVuIFVSTCBodHRwOi8vZXhhbXBsZS5jb20vIy9zb21lL3BhdGg/Zm9vPWJhciZiYXo9eG94b1xuICAgKiBsZXQgcHJvdG9jb2wgPSAkbG9jYXRpb24ucHJvdG9jb2woKTtcbiAgICogLy8gPT4gXCJodHRwXCJcbiAgICogYGBgXG4gICAqL1xuICBwcm90b2NvbCgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLiQkcHJvdG9jb2w7XG4gIH1cblxuICAvKipcbiAgICogUmV0cmlldmVzIHRoZSBwcm90b2NvbCBvZiB0aGUgY3VycmVudCBVUkwuXG4gICAqXG4gICAqIEluIGNvbnRyYXN0IHRvIHRoZSBub24tQW5ndWxhckpTIHZlcnNpb24gYGxvY2F0aW9uLmhvc3RgIHdoaWNoIHJldHVybnMgYGhvc3RuYW1lOnBvcnRgLCB0aGlzXG4gICAqIHJldHVybnMgdGhlIGBob3N0bmFtZWAgcG9ydGlvbiBvbmx5LlxuICAgKlxuICAgKlxuICAgKiBgYGBqc1xuICAgKiAvLyBnaXZlbiBVUkwgaHR0cDovL2V4YW1wbGUuY29tLyMvc29tZS9wYXRoP2Zvbz1iYXImYmF6PXhveG9cbiAgICogbGV0IGhvc3QgPSAkbG9jYXRpb24uaG9zdCgpO1xuICAgKiAvLyA9PiBcImV4YW1wbGUuY29tXCJcbiAgICpcbiAgICogLy8gZ2l2ZW4gVVJMIGh0dHA6Ly91c2VyOnBhc3N3b3JkQGV4YW1wbGUuY29tOjgwODAvIy9zb21lL3BhdGg/Zm9vPWJhciZiYXo9eG94b1xuICAgKiBob3N0ID0gJGxvY2F0aW9uLmhvc3QoKTtcbiAgICogLy8gPT4gXCJleGFtcGxlLmNvbVwiXG4gICAqIGhvc3QgPSBsb2NhdGlvbi5ob3N0O1xuICAgKiAvLyA9PiBcImV4YW1wbGUuY29tOjgwODBcIlxuICAgKiBgYGBcbiAgICovXG4gIGhvc3QoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy4kJGhvc3Q7XG4gIH1cblxuICAvKipcbiAgICogUmV0cmlldmVzIHRoZSBwb3J0IG9mIHRoZSBjdXJyZW50IFVSTC5cbiAgICpcbiAgICogYGBganNcbiAgICogLy8gZ2l2ZW4gVVJMIGh0dHA6Ly9leGFtcGxlLmNvbS8jL3NvbWUvcGF0aD9mb289YmFyJmJhej14b3hvXG4gICAqIGxldCBwb3J0ID0gJGxvY2F0aW9uLnBvcnQoKTtcbiAgICogLy8gPT4gODBcbiAgICogYGBgXG4gICAqL1xuICBwb3J0KCk6IG51bWJlciB8IG51bGwge1xuICAgIHJldHVybiB0aGlzLiQkcG9ydDtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXRyaWV2ZXMgdGhlIHBhdGggb2YgdGhlIGN1cnJlbnQgVVJMLCBvciBjaGFuZ2VzIHRoZSBwYXRoIGFuZCByZXR1cm5zIGEgcmVmZXJlbmNlIHRvIGl0cyBvd25cbiAgICogaW5zdGFuY2UuXG4gICAqXG4gICAqIFBhdGhzIHNob3VsZCBhbHdheXMgYmVnaW4gd2l0aCBmb3J3YXJkIHNsYXNoICgvKS4gVGhpcyBtZXRob2QgYWRkcyB0aGUgZm9yd2FyZCBzbGFzaFxuICAgKiBpZiBpdCBpcyBtaXNzaW5nLlxuICAgKlxuICAgKiBgYGBqc1xuICAgKiAvLyBnaXZlbiBVUkwgaHR0cDovL2V4YW1wbGUuY29tLyMvc29tZS9wYXRoP2Zvbz1iYXImYmF6PXhveG9cbiAgICogbGV0IHBhdGggPSAkbG9jYXRpb24ucGF0aCgpO1xuICAgKiAvLyA9PiBcIi9zb21lL3BhdGhcIlxuICAgKiBgYGBcbiAgICovXG4gIHBhdGgoKTogc3RyaW5nO1xuICBwYXRoKHBhdGg6IHN0cmluZyB8IG51bWJlciB8IG51bGwpOiB0aGlzO1xuICBwYXRoKHBhdGg/OiBzdHJpbmcgfCBudW1iZXIgfCBudWxsKTogc3RyaW5nIHwgdGhpcyB7XG4gICAgaWYgKHR5cGVvZiBwYXRoID09PSAndW5kZWZpbmVkJykge1xuICAgICAgcmV0dXJuIHRoaXMuJCRwYXRoO1xuICAgIH1cblxuICAgIC8vIG51bGwgcGF0aCBjb252ZXJ0cyB0byBlbXB0eSBzdHJpbmcuIFByZXBlbmQgd2l0aCBcIi9cIiBpZiBuZWVkZWQuXG4gICAgcGF0aCA9IHBhdGggIT09IG51bGwgPyBwYXRoLnRvU3RyaW5nKCkgOiAnJztcbiAgICBwYXRoID0gcGF0aC5jaGFyQXQoMCkgPT09ICcvJyA/IHBhdGggOiAnLycgKyBwYXRoO1xuXG4gICAgdGhpcy4kJHBhdGggPSBwYXRoO1xuXG4gICAgdGhpcy5jb21wb3NlVXJscygpO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHJpZXZlcyBhIG1hcCBvZiB0aGUgc2VhcmNoIHBhcmFtZXRlcnMgb2YgdGhlIGN1cnJlbnQgVVJMLCBvciBjaGFuZ2VzIGEgc2VhcmNoXG4gICAqIHBhcnQgYW5kIHJldHVybnMgYSByZWZlcmVuY2UgdG8gaXRzIG93biBpbnN0YW5jZS5cbiAgICpcbiAgICpcbiAgICogYGBganNcbiAgICogLy8gZ2l2ZW4gVVJMIGh0dHA6Ly9leGFtcGxlLmNvbS8jL3NvbWUvcGF0aD9mb289YmFyJmJhej14b3hvXG4gICAqIGxldCBzZWFyY2hPYmplY3QgPSAkbG9jYXRpb24uc2VhcmNoKCk7XG4gICAqIC8vID0+IHtmb286ICdiYXInLCBiYXo6ICd4b3hvJ31cbiAgICpcbiAgICogLy8gc2V0IGZvbyB0byAneWlwZWUnXG4gICAqICRsb2NhdGlvbi5zZWFyY2goJ2ZvbycsICd5aXBlZScpO1xuICAgKiAvLyAkbG9jYXRpb24uc2VhcmNoKCkgPT4ge2ZvbzogJ3lpcGVlJywgYmF6OiAneG94byd9XG4gICAqIGBgYFxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ3xPYmplY3QuPHN0cmluZz58T2JqZWN0LjxBcnJheS48c3RyaW5nPj59IHNlYXJjaCBOZXcgc2VhcmNoIHBhcmFtcyAtIHN0cmluZyBvclxuICAgKiBoYXNoIG9iamVjdC5cbiAgICpcbiAgICogV2hlbiBjYWxsZWQgd2l0aCBhIHNpbmdsZSBhcmd1bWVudCB0aGUgbWV0aG9kIGFjdHMgYXMgYSBzZXR0ZXIsIHNldHRpbmcgdGhlIGBzZWFyY2hgIGNvbXBvbmVudFxuICAgKiBvZiBgJGxvY2F0aW9uYCB0byB0aGUgc3BlY2lmaWVkIHZhbHVlLlxuICAgKlxuICAgKiBJZiB0aGUgYXJndW1lbnQgaXMgYSBoYXNoIG9iamVjdCBjb250YWluaW5nIGFuIGFycmF5IG9mIHZhbHVlcywgdGhlc2UgdmFsdWVzIHdpbGwgYmUgZW5jb2RlZFxuICAgKiBhcyBkdXBsaWNhdGUgc2VhcmNoIHBhcmFtZXRlcnMgaW4gdGhlIFVSTC5cbiAgICpcbiAgICogQHBhcmFtIHsoc3RyaW5nfE51bWJlcnxBcnJheTxzdHJpbmc+fGJvb2xlYW4pPX0gcGFyYW1WYWx1ZSBJZiBgc2VhcmNoYCBpcyBhIHN0cmluZyBvciBudW1iZXIsXG4gICAqICAgICB0aGVuIGBwYXJhbVZhbHVlYFxuICAgKiB3aWxsIG92ZXJyaWRlIG9ubHkgYSBzaW5nbGUgc2VhcmNoIHByb3BlcnR5LlxuICAgKlxuICAgKiBJZiBgcGFyYW1WYWx1ZWAgaXMgYW4gYXJyYXksIGl0IHdpbGwgb3ZlcnJpZGUgdGhlIHByb3BlcnR5IG9mIHRoZSBgc2VhcmNoYCBjb21wb25lbnQgb2ZcbiAgICogYCRsb2NhdGlvbmAgc3BlY2lmaWVkIHZpYSB0aGUgZmlyc3QgYXJndW1lbnQuXG4gICAqXG4gICAqIElmIGBwYXJhbVZhbHVlYCBpcyBgbnVsbGAsIHRoZSBwcm9wZXJ0eSBzcGVjaWZpZWQgdmlhIHRoZSBmaXJzdCBhcmd1bWVudCB3aWxsIGJlIGRlbGV0ZWQuXG4gICAqXG4gICAqIElmIGBwYXJhbVZhbHVlYCBpcyBgdHJ1ZWAsIHRoZSBwcm9wZXJ0eSBzcGVjaWZpZWQgdmlhIHRoZSBmaXJzdCBhcmd1bWVudCB3aWxsIGJlIGFkZGVkIHdpdGggbm9cbiAgICogdmFsdWUgbm9yIHRyYWlsaW5nIGVxdWFsIHNpZ24uXG4gICAqXG4gICAqIEByZXR1cm4ge09iamVjdH0gVGhlIHBhcnNlZCBgc2VhcmNoYCBvYmplY3Qgb2YgdGhlIGN1cnJlbnQgVVJMLCBvciB0aGUgY2hhbmdlZCBgc2VhcmNoYCBvYmplY3QuXG4gICAqL1xuICBzZWFyY2goKToge1trZXk6IHN0cmluZ106IHVua25vd259O1xuICBzZWFyY2goc2VhcmNoOiBzdHJpbmcgfCBudW1iZXIgfCB7W2tleTogc3RyaW5nXTogdW5rbm93bn0pOiB0aGlzO1xuICBzZWFyY2goXG4gICAgc2VhcmNoOiBzdHJpbmcgfCBudW1iZXIgfCB7W2tleTogc3RyaW5nXTogdW5rbm93bn0sXG4gICAgcGFyYW1WYWx1ZTogbnVsbCB8IHVuZGVmaW5lZCB8IHN0cmluZyB8IG51bWJlciB8IGJvb2xlYW4gfCBzdHJpbmdbXSxcbiAgKTogdGhpcztcbiAgc2VhcmNoKFxuICAgIHNlYXJjaD86IHN0cmluZyB8IG51bWJlciB8IHtba2V5OiBzdHJpbmddOiB1bmtub3dufSxcbiAgICBwYXJhbVZhbHVlPzogbnVsbCB8IHVuZGVmaW5lZCB8IHN0cmluZyB8IG51bWJlciB8IGJvb2xlYW4gfCBzdHJpbmdbXSxcbiAgKToge1trZXk6IHN0cmluZ106IHVua25vd259IHwgdGhpcyB7XG4gICAgc3dpdGNoIChhcmd1bWVudHMubGVuZ3RoKSB7XG4gICAgICBjYXNlIDA6XG4gICAgICAgIHJldHVybiB0aGlzLiQkc2VhcmNoO1xuICAgICAgY2FzZSAxOlxuICAgICAgICBpZiAodHlwZW9mIHNlYXJjaCA9PT0gJ3N0cmluZycgfHwgdHlwZW9mIHNlYXJjaCA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgICB0aGlzLiQkc2VhcmNoID0gdGhpcy51cmxDb2RlYy5kZWNvZGVTZWFyY2goc2VhcmNoLnRvU3RyaW5nKCkpO1xuICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBzZWFyY2ggPT09ICdvYmplY3QnICYmIHNlYXJjaCAhPT0gbnVsbCkge1xuICAgICAgICAgIC8vIENvcHkgdGhlIG9iamVjdCBzbyBpdCdzIG5ldmVyIG11dGF0ZWRcbiAgICAgICAgICBzZWFyY2ggPSB7Li4uc2VhcmNofTtcbiAgICAgICAgICAvLyByZW1vdmUgb2JqZWN0IHVuZGVmaW5lZCBvciBudWxsIHByb3BlcnRpZXNcbiAgICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiBzZWFyY2gpIHtcbiAgICAgICAgICAgIGlmIChzZWFyY2hba2V5XSA9PSBudWxsKSBkZWxldGUgc2VhcmNoW2tleV07XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdGhpcy4kJHNlYXJjaCA9IHNlYXJjaDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICAgICAnTG9jYXRpb25Qcm92aWRlci5zZWFyY2goKTogRmlyc3QgYXJndW1lbnQgbXVzdCBiZSBhIHN0cmluZyBvciBhbiBvYmplY3QuJyxcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgaWYgKHR5cGVvZiBzZWFyY2ggPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgY29uc3QgY3VycmVudFNlYXJjaCA9IHRoaXMuc2VhcmNoKCk7XG4gICAgICAgICAgaWYgKHR5cGVvZiBwYXJhbVZhbHVlID09PSAndW5kZWZpbmVkJyB8fCBwYXJhbVZhbHVlID09PSBudWxsKSB7XG4gICAgICAgICAgICBkZWxldGUgY3VycmVudFNlYXJjaFtzZWFyY2hdO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2VhcmNoKGN1cnJlbnRTZWFyY2gpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjdXJyZW50U2VhcmNoW3NlYXJjaF0gPSBwYXJhbVZhbHVlO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2VhcmNoKGN1cnJlbnRTZWFyY2gpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICB0aGlzLmNvbXBvc2VVcmxzKCk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogUmV0cmlldmVzIHRoZSBjdXJyZW50IGhhc2ggZnJhZ21lbnQsIG9yIGNoYW5nZXMgdGhlIGhhc2ggZnJhZ21lbnQgYW5kIHJldHVybnMgYSByZWZlcmVuY2UgdG9cbiAgICogaXRzIG93biBpbnN0YW5jZS5cbiAgICpcbiAgICogYGBganNcbiAgICogLy8gZ2l2ZW4gVVJMIGh0dHA6Ly9leGFtcGxlLmNvbS8jL3NvbWUvcGF0aD9mb289YmFyJmJhej14b3hvI2hhc2hWYWx1ZVxuICAgKiBsZXQgaGFzaCA9ICRsb2NhdGlvbi5oYXNoKCk7XG4gICAqIC8vID0+IFwiaGFzaFZhbHVlXCJcbiAgICogYGBgXG4gICAqL1xuICBoYXNoKCk6IHN0cmluZztcbiAgaGFzaChoYXNoOiBzdHJpbmcgfCBudW1iZXIgfCBudWxsKTogdGhpcztcbiAgaGFzaChoYXNoPzogc3RyaW5nIHwgbnVtYmVyIHwgbnVsbCk6IHN0cmluZyB8IHRoaXMge1xuICAgIGlmICh0eXBlb2YgaGFzaCA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHJldHVybiB0aGlzLiQkaGFzaDtcbiAgICB9XG5cbiAgICB0aGlzLiQkaGFzaCA9IGhhc2ggIT09IG51bGwgPyBoYXNoLnRvU3RyaW5nKCkgOiAnJztcblxuICAgIHRoaXMuY29tcG9zZVVybHMoKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBDaGFuZ2VzIHRvIGAkbG9jYXRpb25gIGR1cmluZyB0aGUgY3VycmVudCBgJGRpZ2VzdGAgd2lsbCByZXBsYWNlIHRoZSBjdXJyZW50XG4gICAqIGhpc3RvcnkgcmVjb3JkLCBpbnN0ZWFkIG9mIGFkZGluZyBhIG5ldyBvbmUuXG4gICAqL1xuICByZXBsYWNlKCk6IHRoaXMge1xuICAgIHRoaXMuJCRyZXBsYWNlID0gdHJ1ZTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXRyaWV2ZXMgdGhlIGhpc3Rvcnkgc3RhdGUgb2JqZWN0IHdoZW4gY2FsbGVkIHdpdGhvdXQgYW55IHBhcmFtZXRlci5cbiAgICpcbiAgICogQ2hhbmdlIHRoZSBoaXN0b3J5IHN0YXRlIG9iamVjdCB3aGVuIGNhbGxlZCB3aXRoIG9uZSBwYXJhbWV0ZXIgYW5kIHJldHVybiBgJGxvY2F0aW9uYC5cbiAgICogVGhlIHN0YXRlIG9iamVjdCBpcyBsYXRlciBwYXNzZWQgdG8gYHB1c2hTdGF0ZWAgb3IgYHJlcGxhY2VTdGF0ZWAuXG4gICAqXG4gICAqIFRoaXMgbWV0aG9kIGlzIHN1cHBvcnRlZCBvbmx5IGluIEhUTUw1IG1vZGUgYW5kIG9ubHkgaW4gYnJvd3NlcnMgc3VwcG9ydGluZ1xuICAgKiB0aGUgSFRNTDUgSGlzdG9yeSBBUEkgbWV0aG9kcyBzdWNoIGFzIGBwdXNoU3RhdGVgIGFuZCBgcmVwbGFjZVN0YXRlYC4gSWYgeW91IG5lZWQgdG8gc3VwcG9ydFxuICAgKiBvbGRlciBicm93c2VycyAobGlrZSBBbmRyb2lkIDwgNC4wKSwgZG9uJ3QgdXNlIHRoaXMgbWV0aG9kLlxuICAgKlxuICAgKi9cbiAgc3RhdGUoKTogdW5rbm93bjtcbiAgc3RhdGUoc3RhdGU6IHVua25vd24pOiB0aGlzO1xuICBzdGF0ZShzdGF0ZT86IHVua25vd24pOiB1bmtub3duIHwgdGhpcyB7XG4gICAgaWYgKHR5cGVvZiBzdGF0ZSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHJldHVybiB0aGlzLiQkc3RhdGU7XG4gICAgfVxuXG4gICAgdGhpcy4kJHN0YXRlID0gc3RhdGU7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbn1cblxuLyoqXG4gKiBUaGUgZmFjdG9yeSBmdW5jdGlvbiB1c2VkIHRvIGNyZWF0ZSBhbiBpbnN0YW5jZSBvZiB0aGUgYCRsb2NhdGlvblNoaW1gIGluIEFuZ3VsYXIsXG4gKiBhbmQgcHJvdmlkZXMgYW4gQVBJLWNvbXBhdGlibGUgYCRsb2NhdGlvblByb3ZpZGVyYCBmb3IgQW5ndWxhckpTLlxuICpcbiAqIEBwdWJsaWNBcGlcbiAqL1xuZXhwb3J0IGNsYXNzICRsb2NhdGlvblNoaW1Qcm92aWRlciB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgbmdVcGdyYWRlOiBVcGdyYWRlTW9kdWxlLFxuICAgIHByaXZhdGUgbG9jYXRpb246IExvY2F0aW9uLFxuICAgIHByaXZhdGUgcGxhdGZvcm1Mb2NhdGlvbjogUGxhdGZvcm1Mb2NhdGlvbixcbiAgICBwcml2YXRlIHVybENvZGVjOiBVcmxDb2RlYyxcbiAgICBwcml2YXRlIGxvY2F0aW9uU3RyYXRlZ3k6IExvY2F0aW9uU3RyYXRlZ3ksXG4gICkge31cblxuICAvKipcbiAgICogRmFjdG9yeSBtZXRob2QgdGhhdCByZXR1cm5zIGFuIGluc3RhbmNlIG9mIHRoZSAkbG9jYXRpb25TaGltXG4gICAqL1xuICAkZ2V0KCkge1xuICAgIHJldHVybiBuZXcgJGxvY2F0aW9uU2hpbShcbiAgICAgIHRoaXMubmdVcGdyYWRlLiRpbmplY3RvcixcbiAgICAgIHRoaXMubG9jYXRpb24sXG4gICAgICB0aGlzLnBsYXRmb3JtTG9jYXRpb24sXG4gICAgICB0aGlzLnVybENvZGVjLFxuICAgICAgdGhpcy5sb2NhdGlvblN0cmF0ZWd5LFxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogU3R1YiBtZXRob2QgdXNlZCB0byBrZWVwIEFQSSBjb21wYXRpYmxlIHdpdGggQW5ndWxhckpTLiBUaGlzIHNldHRpbmcgaXMgY29uZmlndXJlZCB0aHJvdWdoXG4gICAqIHRoZSBMb2NhdGlvblVwZ3JhZGVNb2R1bGUncyBgY29uZmlnYCBtZXRob2QgaW4geW91ciBBbmd1bGFyIGFwcC5cbiAgICovXG4gIGhhc2hQcmVmaXgocHJlZml4Pzogc3RyaW5nKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdDb25maWd1cmUgTG9jYXRpb25VcGdyYWRlIHRocm91Z2ggTG9jYXRpb25VcGdyYWRlTW9kdWxlLmNvbmZpZyBtZXRob2QuJyk7XG4gIH1cblxuICAvKipcbiAgICogU3R1YiBtZXRob2QgdXNlZCB0byBrZWVwIEFQSSBjb21wYXRpYmxlIHdpdGggQW5ndWxhckpTLiBUaGlzIHNldHRpbmcgaXMgY29uZmlndXJlZCB0aHJvdWdoXG4gICAqIHRoZSBMb2NhdGlvblVwZ3JhZGVNb2R1bGUncyBgY29uZmlnYCBtZXRob2QgaW4geW91ciBBbmd1bGFyIGFwcC5cbiAgICovXG4gIGh0bWw1TW9kZShtb2RlPzogYW55KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdDb25maWd1cmUgTG9jYXRpb25VcGdyYWRlIHRocm91Z2ggTG9jYXRpb25VcGdyYWRlTW9kdWxlLmNvbmZpZyBtZXRob2QuJyk7XG4gIH1cbn1cbiJdfQ==