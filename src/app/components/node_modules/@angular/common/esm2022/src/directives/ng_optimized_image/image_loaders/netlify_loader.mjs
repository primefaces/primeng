/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ɵformatRuntimeError as formatRuntimeError, ɵRuntimeError as RuntimeError, } from '@angular/core';
import { isAbsoluteUrl, isValidPath } from '../url';
import { IMAGE_LOADER } from './image_loader';
import { PLACEHOLDER_QUALITY } from './constants';
/**
 * Name and URL tester for Netlify.
 */
export const netlifyLoaderInfo = {
    name: 'Netlify',
    testUrl: isNetlifyUrl,
};
const NETLIFY_LOADER_REGEX = /https?\:\/\/[^\/]+\.netlify\.app\/.+/;
/**
 * Tests whether a URL is from a Netlify site. This won't catch sites with a custom domain,
 * but it's a good start for sites in development. This is only used to warn users who haven't
 * configured an image loader.
 */
function isNetlifyUrl(url) {
    return NETLIFY_LOADER_REGEX.test(url);
}
/**
 * Function that generates an ImageLoader for Netlify and turns it into an Angular provider.
 *
 * @param path optional URL of the desired Netlify site. Defaults to the current site.
 * @returns Set of providers to configure the Netlify loader.
 *
 * @publicApi
 */
export function provideNetlifyLoader(path) {
    if (path && !isValidPath(path)) {
        throw new RuntimeError(2959 /* RuntimeErrorCode.INVALID_LOADER_ARGUMENTS */, ngDevMode &&
            `Image loader has detected an invalid path (\`${path}\`). ` +
                `To fix this, supply either the full URL to the Netlify site, or leave it empty to use the current site.`);
    }
    if (path) {
        const url = new URL(path);
        path = url.origin;
    }
    const loaderFn = (config) => {
        return createNetlifyUrl(config, path);
    };
    const providers = [{ provide: IMAGE_LOADER, useValue: loaderFn }];
    return providers;
}
const validParams = new Map([
    ['height', 'h'],
    ['fit', 'fit'],
    ['quality', 'q'],
    ['q', 'q'],
    ['position', 'position'],
]);
function createNetlifyUrl(config, path) {
    // Note: `path` can be undefined, in which case we use a fake one to construct a `URL` instance.
    const url = new URL(path ?? 'https://a/');
    url.pathname = '/.netlify/images';
    if (!isAbsoluteUrl(config.src) && !config.src.startsWith('/')) {
        config.src = '/' + config.src;
    }
    url.searchParams.set('url', config.src);
    if (config.width) {
        url.searchParams.set('w', config.width.toString());
    }
    // When requesting a placeholder image we ask for a low quality image to reduce the load time.
    // If the quality is specified in the loader config - always use provided value.
    const configQuality = config.loaderParams?.['quality'] ?? config.loaderParams?.['q'];
    if (config.isPlaceholder && !configQuality) {
        url.searchParams.set('q', PLACEHOLDER_QUALITY);
    }
    for (const [param, value] of Object.entries(config.loaderParams ?? {})) {
        if (validParams.has(param)) {
            url.searchParams.set(validParams.get(param), value.toString());
        }
        else {
            if (ngDevMode) {
                console.warn(formatRuntimeError(2959 /* RuntimeErrorCode.INVALID_LOADER_ARGUMENTS */, `The Netlify image loader has detected an \`<img>\` tag with the unsupported attribute "\`${param}\`".`));
            }
        }
    }
    // The "a" hostname is used for relative URLs, so we can remove it from the final URL.
    return url.hostname === 'a' ? url.href.replace(url.origin, '') : url.href;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmV0bGlmeV9sb2FkZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9jb21tb24vc3JjL2RpcmVjdGl2ZXMvbmdfb3B0aW1pemVkX2ltYWdlL2ltYWdlX2xvYWRlcnMvbmV0bGlmeV9sb2FkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUVMLG1CQUFtQixJQUFJLGtCQUFrQixFQUN6QyxhQUFhLElBQUksWUFBWSxHQUM5QixNQUFNLGVBQWUsQ0FBQztBQUd2QixPQUFPLEVBQUMsYUFBYSxFQUFFLFdBQVcsRUFBQyxNQUFNLFFBQVEsQ0FBQztBQUVsRCxPQUFPLEVBQUMsWUFBWSxFQUFxQyxNQUFNLGdCQUFnQixDQUFDO0FBQ2hGLE9BQU8sRUFBQyxtQkFBbUIsRUFBQyxNQUFNLGFBQWEsQ0FBQztBQUVoRDs7R0FFRztBQUNILE1BQU0sQ0FBQyxNQUFNLGlCQUFpQixHQUFvQjtJQUNoRCxJQUFJLEVBQUUsU0FBUztJQUNmLE9BQU8sRUFBRSxZQUFZO0NBQ3RCLENBQUM7QUFFRixNQUFNLG9CQUFvQixHQUFHLHNDQUFzQyxDQUFDO0FBRXBFOzs7O0dBSUc7QUFDSCxTQUFTLFlBQVksQ0FBQyxHQUFXO0lBQy9CLE9BQU8sb0JBQW9CLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ3hDLENBQUM7QUFFRDs7Ozs7OztHQU9HO0FBQ0gsTUFBTSxVQUFVLG9CQUFvQixDQUFDLElBQWE7SUFDaEQsSUFBSSxJQUFJLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQztRQUMvQixNQUFNLElBQUksWUFBWSx1REFFcEIsU0FBUztZQUNQLGdEQUFnRCxJQUFJLE9BQU87Z0JBQ3pELHlHQUF5RyxDQUM5RyxDQUFDO0lBQ0osQ0FBQztJQUVELElBQUksSUFBSSxFQUFFLENBQUM7UUFDVCxNQUFNLEdBQUcsR0FBRyxJ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QUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQztBQUM1RSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7XG4gIFByb3ZpZGVyLFxuICDJtWZvcm1hdFJ1bnRpbWVFcnJvciBhcyBmb3JtYXRSdW50aW1lRXJyb3IsXG4gIMm1UnVudGltZUVycm9yIGFzIFJ1bnRpbWVFcnJvcixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7UnVudGltZUVycm9yQ29kZX0gZnJvbSAnLi4vLi4vLi4vZXJyb3JzJztcbmltcG9ydCB7aXNBYnNvbHV0ZVVybCwgaXNWYWxpZFBhdGh9IGZyb20gJy4uL3VybCc7XG5cbmltcG9ydCB7SU1BR0VfTE9BREVSLCBJbWFnZUxvYWRlckNvbmZpZywgSW1hZ2VMb2FkZXJJbmZvfSBmcm9tICcuL2ltYWdlX2xvYWRlcic7XG5pbXBvcnQge1BMQUNFSE9MREVSX1FVQUxJVFl9IGZyb20gJy4vY29uc3RhbnRzJztcblxuLyoqXG4gKiBOYW1lIGFuZCBVUkwgdGVzdGVyIGZvciBOZXRsaWZ5LlxuICovXG5leHBvcnQgY29uc3QgbmV0bGlmeUxvYWRlckluZm86IEltYWdlTG9hZGVySW5mbyA9IHtcbiAgbmFtZTogJ05ldGxpZnknLFxuICB0ZXN0VXJsOiBpc05ldGxpZnlVcmwsXG59O1xuXG5jb25zdCBORVRMSUZZX0xPQURFUl9SRUdFWCA9IC9odHRwcz9cXDpcXC9cXC9bXlxcL10rXFwubmV0bGlmeVxcLmFwcFxcLy4rLztcblxuLyoqXG4gKiBUZXN0cyB3aGV0aGVyIGEgVVJMIGlzIGZyb20gYSBOZXRsaWZ5IHNpdGUuIFRoaXMgd29uJ3QgY2F0Y2ggc2l0ZXMgd2l0aCBhIGN1c3RvbSBkb21haW4sXG4gKiBidXQgaXQncyBhIGdvb2Qgc3RhcnQgZm9yIHNpdGVzIGluIGRldmVsb3BtZW50LiBUaGlzIGlzIG9ubHkgdXNlZCB0byB3YXJuIHVzZXJzIHdobyBoYXZlbid0XG4gKiBjb25maWd1cmVkIGFuIGltYWdlIGxvYWRlci5cbiAqL1xuZnVuY3Rpb24gaXNOZXRsaWZ5VXJsKHVybDogc3RyaW5nKTogYm9vbGVhbiB7XG4gIHJldHVybiBORVRMSUZZX0xPQURFUl9SRUdFWC50ZXN0KHVybCk7XG59XG5cbi8qKlxuICogRnVuY3Rpb24gdGhhdCBnZW5lcmF0ZXMgYW4gSW1hZ2VMb2FkZXIgZm9yIE5ldGxpZnkgYW5kIHR1cm5zIGl0IGludG8gYW4gQW5ndWxhciBwcm92aWRlci5cbiAqXG4gKiBAcGFyYW0gcGF0aCBvcHRpb25hbCBVUkwgb2YgdGhlIGRlc2lyZWQgTmV0bGlmeSBzaXRlLiBEZWZhdWx0cyB0byB0aGUgY3VycmVudCBzaXRlLlxuICogQHJldHVybnMgU2V0IG9mIHByb3ZpZGVycyB0byBjb25maWd1cmUgdGhlIE5ldGxpZnkgbG9hZGVyLlxuICpcbiAqIEBwdWJsaWNBcGlcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHByb3ZpZGVOZXRsaWZ5TG9hZGVyKHBhdGg/OiBzdHJpbmcpIHtcbiAgaWYgKHBhdGggJiYgIWlzVmFsaWRQYXRoKHBhdGgpKSB7XG4gICAgdGhyb3cgbmV3IFJ1bnRpbWVFcnJvcihcbiAgICAgIFJ1bnRpbWVFcnJvckNvZGUuSU5WQUxJRF9MT0FERVJfQVJHVU1FTlRTLFxuICAgICAgbmdEZXZNb2RlICYmXG4gICAgICAgIGBJbWFnZSBsb2FkZXIgaGFzIGRldGVjdGVkIGFuIGludmFsaWQgcGF0aCAoXFxgJHtwYXRofVxcYCkuIGAgK1xuICAgICAgICAgIGBUbyBmaXggdGhpcywgc3VwcGx5IGVpdGhlciB0aGUgZnVsbCBVUkwgdG8gdGhlIE5ldGxpZnkgc2l0ZSwgb3IgbGVhdmUgaXQgZW1wdHkgdG8gdXNlIHRoZSBjdXJyZW50IHNpdGUuYCxcbiAgICApO1xuICB9XG5cbiAgaWYgKHBhdGgpIHtcbiAgICBjb25zdCB1cmwgPSBuZXcgVVJMKHBhdGgpO1xuICAgIHBhdGggPSB1cmwub3JpZ2luO1xuICB9XG5cbiAgY29uc3QgbG9hZGVyRm4gPSAoY29uZmlnOiBJbWFnZUxvYWRlckNvbmZpZykgPT4ge1xuICAgIHJldHVybiBjcmVhdGVOZXRsaWZ5VXJsKGNvbmZpZywgcGF0aCk7XG4gIH07XG5cbiAgY29uc3QgcHJvdmlkZXJzOiBQcm92aWRlcltdID0gW3twcm92aWRlOiBJTUFHRV9MT0FERVIsIHVzZVZhbHVlOiBsb2FkZXJGbn1dO1xuICByZXR1cm4gcHJvdmlkZXJzO1xufVxuXG5jb25zdCB2YWxpZFBhcmFtcyA9IG5ldyBNYXA8c3RyaW5nLCBzdHJpbmc+KFtcbiAgWydoZWlnaHQnLCAnaCddLFxuICBbJ2ZpdCcsICdmaXQnXSxcbiAgWydxdWFsaXR5JywgJ3EnXSxcbiAgWydxJywgJ3EnXSxcbiAgWydwb3NpdGlvbicsICdwb3NpdGlvbiddLFxuXSk7XG5cbmZ1bmN0aW9uIGNyZWF0ZU5ldGxpZnlVcmwoY29uZmlnOiBJbWFnZUxvYWRlckNvbmZpZywgcGF0aD86IHN0cmluZykge1xuICAvLyBOb3RlOiBgcGF0aGAgY2FuIGJlIHVuZGVmaW5lZCwgaW4gd2hpY2ggY2FzZSB3ZSB1c2UgYSBmYWtlIG9uZSB0byBjb25zdHJ1Y3QgYSBgVVJMYCBpbnN0YW5jZS5cbiAgY29uc3QgdXJsID0gbmV3IFVSTChwYXRoID8/ICdodHRwczovL2EvJyk7XG4gIHVybC5wYXRobmFtZSA9ICcvLm5ldGxpZnkvaW1hZ2VzJztcblxuICBpZiAoIWlzQWJzb2x1dGVVcmwoY29uZmlnLnNyYykgJiYgIWNvbmZpZy5zcmMuc3RhcnRzV2l0aCgnLycpKSB7XG4gICAgY29uZmlnLnNyYyA9ICcvJyArIGNvbmZpZy5zcmM7XG4gIH1cblxuICB1cmwuc2VhcmNoUGFyYW1zLnNldCgndXJsJywgY29uZmlnLnNyYyk7XG5cbiAgaWYgKGNvbmZpZy53aWR0aCkge1xuICAgIHVybC5zZWFyY2hQYXJhbXMuc2V0KCd3JywgY29uZmlnLndpZHRoLnRvU3RyaW5nKCkpO1xuICB9XG5cbiAgLy8gV2hlbiByZXF1ZXN0aW5nIGEgcGxhY2Vob2xkZXIgaW1hZ2Ugd2UgYXNrIGZvciBhIGxvdyBxdWFsaXR5IGltYWdlIHRvIHJlZHVjZSB0aGUgbG9hZCB0aW1lLlxuICAvLyBJZiB0aGUgcXVhbGl0eSBpcyBzcGVjaWZpZWQgaW4gdGhlIGxvYWRlciBjb25maWcgLSBhbHdheXMgdXNlIHByb3ZpZGVkIHZhbHVlLlxuICBjb25zdCBjb25maWdRdWFsaXR5ID0gY29uZmlnLmxvYWRlclBhcmFtcz8uWydxdWFsaXR5J10gPz8gY29uZmlnLmxvYWRlclBhcmFtcz8uWydxJ107XG4gIGlmIChjb25maWcuaXNQbGFjZWhvbGRlciAmJiAhY29uZmlnUXVhbGl0eSkge1xuICAgIHVybC5zZWFyY2hQYXJhbXMuc2V0KCdxJywgUExBQ0VIT0xERVJfUVVBTElUWSk7XG4gIH1cblxuICBmb3IgKGNvbnN0IFtwYXJhbSwgdmFsdWVdIG9mIE9iamVjdC5lbnRyaWVzKGNvbmZpZy5sb2FkZXJQYXJhbXMgPz8ge30pKSB7XG4gICAgaWYgKHZhbGlkUGFyYW1zLmhhcyhwYXJhbSkpIHtcbiAgICAgIHVybC5zZWFyY2hQYXJhbXMuc2V0KHZhbGlkUGFyYW1zLmdldChwYXJhbSkhLCB2YWx1ZS50b1N0cmluZygpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKG5nRGV2TW9kZSkge1xuICAgICAgICBjb25zb2xlLndhcm4oXG4gICAgICAgICAgZm9ybWF0UnVudGltZUVycm9yKFxuICAgICAgICAgICAgUnVudGltZUVycm9yQ29kZS5JTlZBTElEX0xPQURFUl9BUkdVTUVOVFMsXG4gICAgICAgICAgICBgVGhlIE5ldGxpZnkgaW1hZ2UgbG9hZGVyIGhhcyBkZXRlY3RlZCBhbiBcXGA8aW1nPlxcYCB0YWcgd2l0aCB0aGUgdW5zdXBwb3J0ZWQgYXR0cmlidXRlIFwiXFxgJHtwYXJhbX1cXGBcIi5gLFxuICAgICAgICAgICksXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIC8vIFRoZSBcImFcIiBob3N0bmFtZSBpcyB1c2VkIGZvciByZWxhdGl2ZSBVUkxzLCBzbyB3ZSBjYW4gcmVtb3ZlIGl0IGZyb20gdGhlIGZpbmFsIFVSTC5cbiAgcmV0dXJuIHVybC5ob3N0bmFtZSA9PT0gJ2EnID8gdXJsLmhyZWYucmVwbGFjZSh1cmwub3JpZ2luLCAnJykgOiB1cmwuaHJlZjtcbn1cbiJdfQ==