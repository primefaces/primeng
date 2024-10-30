/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { InjectionToken } from '../di/injection_token';
import { inject } from '../di/injector_compatibility';
import { InjectFlags } from '../di/interface/injector';
import { DEFAULT_LOCALE_ID, USD_CURRENCY_CODE } from './localization';
/**
 * Work out the locale from the potential global properties.
 *
 * * Closure Compiler: use `goog.LOCALE`.
 * * Ivy enabled: use `$localize.locale`
 */
export function getGlobalLocale() {
    if (typeof ngI18nClosureMode !== 'undefined' && ngI18nClosureMode &&
        typeof goog !== 'undefined' && goog.LOCALE !== 'en') {
        // * The default `goog.LOCALE` value is `en`, while Angular used `en-US`.
        // * In order to preserve backwards compatibility, we use Angular default value over
        //   Closure Compiler's one.
        return goog.LOCALE;
    }
    else {
        // KEEP `typeof $localize !== 'undefined' && $localize.locale` IN SYNC WITH THE LOCALIZE
        // COMPILE-TIME INLINER.
        //
        // * During compile time inlining of translations the expression will be replaced
        //   with a string literal that is the current locale. Other forms of this expression are not
        //   guaranteed to be replaced.
        //
        // * During runtime translation evaluation, the developer is required to set `$localize.locale`
        //   if required, or just to provide their own `LOCALE_ID` provider.
        return (typeof $localize !== 'undefined' && $localize.locale) || DEFAULT_LOCALE_ID;
    }
}
/**
 * Provide this token to set the locale of your application.
 * It is used for i18n extraction, by i18n pipes (DatePipe, I18nPluralPipe, CurrencyPipe,
 * DecimalPipe and PercentPipe) and by ICU expressions.
 *
 * See the [i18n guide](guide/i18n-common-locale-id) for more information.
 *
 * @usageNotes
 * ### Example
 *
 * ```typescript
 * import { LOCALE_ID } from '@angular/core';
 * import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
 * import { AppModule } from './app/app.module';
 *
 * platformBrowserDynamic().bootstrapModule(AppModule, {
 *   providers: [{provide: LOCALE_ID, useValue: 'en-US' }]
 * });
 * ```
 *
 * @publicApi
 */
export const LOCALE_ID = new InjectionToken(ngDevMode ? 'LocaleId' : '', {
    providedIn: 'root',
    factory: () => inject(LOCALE_ID, InjectFlags.Optional | InjectFlags.SkipSelf) || getGlobalLocale(),
});
/**
 * Provide this token to set the default currency code your application uses for
 * CurrencyPipe when there is no currency code passed into it. This is only used by
 * CurrencyPipe and has no relation to locale currency. Defaults to USD if not configured.
 *
 * See the [i18n guide](guide/i18n-common-locale-id) for more information.
 *
 * <div class="alert is-helpful">
 *
 * **Deprecation notice:**
 *
 * The default currency code is currently always `USD` but this is deprecated from v9.
 *
 * **In v10 the default currency code will be taken from the current locale.**
 *
 * If you need the previous behavior then set it by creating a `DEFAULT_CURRENCY_CODE` provider in
 * your application `NgModule`:
 *
 * ```ts
 * {provide: DEFAULT_CURRENCY_CODE, useValue: 'USD'}
 * ```
 *
 * </div>
 *
 * @usageNotes
 * ### Example
 *
 * ```typescript
 * import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
 * import { AppModule } from './app/app.module';
 *
 * platformBrowserDynamic().bootstrapModule(AppModule, {
 *   providers: [{provide: DEFAULT_CURRENCY_CODE, useValue: 'EUR' }]
 * });
 * ```
 *
 * @publicApi
 */
export const DEFAULT_CURRENCY_CODE = new InjectionToken(ngDevMode ? 'DefaultCurrencyCode' : '', {
    providedIn: 'root',
    factory: () => USD_CURRENCY_CODE,
});
/**
 * Use this token at bootstrap to provide the content of your translation file (`xtb`,
 * `xlf` or `xlf2`) when you want to translate your application in another language.
 *
 * See the [i18n guide](guide/i18n-common-merge) for more information.
 *
 * @usageNotes
 * ### Example
 *
 * ```typescript
 * import { TRANSLATIONS } from '@angular/core';
 * import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
 * import { AppModule } from './app/app.module';
 *
 * // content of your translation file
 * const translations = '....';
 *
 * platformBrowserDynamic().bootstrapModule(AppModule, {
 *   providers: [{provide: TRANSLATIONS, useValue: translations }]
 * });
 * ```
 *
 * @publicApi
 */
export const TRANSLATIONS = new InjectionToken(ngDevMode ? 'Translations' : '');
/**
 * Provide this token at bootstrap to set the format of your {@link TRANSLATIONS}: `xtb`,
 * `xlf` or `xlf2`.
 *
 * See the [i18n guide](guide/i18n-common-merge) for more information.
 *
 * @usageNotes
 * ### Example
 *
 * ```typescript
 * import { TRANSLATIONS_FORMAT } from '@angular/core';
 * import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
 * import { AppModule } from './app/app.module';
 *
 * platformBrowserDynamic().bootstrapModule(AppModule, {
 *   providers: [{provide: TRANSLATIONS_FORMAT, useValue: 'xlf' }]
 * });
 * ```
 *
 * @publicApi
 */
export const TRANSLATIONS_FORMAT = new InjectionToken(ngDevMode ? 'TranslationsFormat' : '');
/**
 * Use this enum at bootstrap as an option of `bootstrapModule` to define the strategy
 * that the compiler should use in case of missing translations:
 * - Error: throw if you have missing translations.
 * - Warning (default): show a warning in the console and/or shell.
 * - Ignore: do nothing.
 *
 * See the [i18n guide](guide/i18n-common-merge#report-missing-translations) for more information.
 *
 * @usageNotes
 * ### Example
 * ```typescript
 * import { MissingTranslationStrategy } from '@angular/core';
 * import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
 * import { AppModule } from './app/app.module';
 *
 * platformBrowserDynamic().bootstrapModule(AppModule, {
 *   missingTranslation: MissingTranslationStrategy.Error
 * });
 * ```
 *
 * @publicApi
 */
export var MissingTranslationStrategy;
(function (MissingTranslationStrategy) {
    MissingTranslationStrategy[MissingTranslationStrategy["Error"] = 0] = "Error";
    MissingTranslationStrategy[MissingTranslationStrategy["Warning"] = 1] = "Warning";
    MissingTranslationStrategy[MissingTranslationStrategy["Ignore"] = 2] = "Ignore";
})(MissingTranslationStrategy || (MissingTranslationStrategy = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9rZW5zLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvY29yZS9zcmMvaTE4bi90b2tlbnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFDLGNBQWMsRUFBQyxNQUFNLHVCQUF1QixDQUFDO0FBQ3JELE9BQU8sRUFBQyxNQUFNLEVBQUMsTUFBTSw4QkFBOEIsQ0FBQztBQUNwRCxPQUFPLEVBQUMsV0FBVyxFQUFDLE1BQU0sMEJBQTBCLENBQUM7QUFFckQsT0FBTyxFQUFDLGlCQUFpQixFQUFFLGlCQUFpQixFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFJcEU7Ozs7O0dBS0c7QUFDSCxNQUFNLFVBQVUsZUFBZTtJQUM3QixJQUFJLE9BQU8saUJBQWlCLEtBQUssV0FBVyxJQUFJLGlCQUFpQjtRQUM3RCxPQUFPLElBQUksS0FBSyxXQUFXLElBQUksSUFBSSxDQUFDLE1BQU0sS0FBSyxJQUFJLEVBQUUsQ0FBQztRQUN4RCx5RUFBeUU7UUFDekUsb0ZBQW9GO1FBQ3BGLDRCQUE0QjtRQUM1QixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUM7SUFDckIsQ0FBQztTQUFNLENBQUM7UUFDTix3RkFBd0Y7UUFDeEYsd0JBQXdCO1FBQ3hCLEVBQUU7UUFDRixpRkFBaUY7UUFDakYsNkZBQTZGO1FBQzdGLCtCQUErQjtRQUMvQixFQUFFO1FBQ0YsK0ZBQStGO1FBQy9GLG9FQUFvRTtRQUNwRSxPQUFPLENBQUMsT0FBTyxTQUFTLEtBQUssV0FBVyxJQUFJLFNBQVMsQ0FBQyxNQUFNLENBQUMsSUFBSSxpQkFBaUIsQ0FBQztJQUNyRixDQUFDO0FBQ0gsQ0FBQztBQUVEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FxQkc7QUFDSCxNQUFNLENBQUMsTUFBTSxTQUFTLEdBQTJCLElBQUksY0FBYyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7SUFDL0YsVUFBVSxFQUFFLE1BQU07SUFDbEIsT0FBTyxFQUFFLEdBQUcsRUFBRSxDQUNWLE1BQU0sQ0FBQyxTQUFTLEVBQUUsV0FBVyxDQUFDLFFBQVEsR0FBRyxXQUFXLENBQUMsUUFBUSxDQUFDLElBQUksZUFBZSxFQUFFO0NBQ3hGLENBQUMsQ0FBQztBQUVIOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBcUNHO0FBQ0gsTUFBTSxDQUFDLE1BQU0scUJBQXFCLEdBQzlCLElBQUksY0FBYyxDQUFTLFNBQVMsQ0FBQyxDQUFDLENBQUMscUJBQXFCLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRTtJQUNqRSxVQUFVLEVBQUUsTUFBTTtJQUNsQixPQUFPLEVBQUUsR0FBRyxFQUFFLENBQUMsaUJBQWlCO0NBQ2pDLENBQUMsQ0FBQztBQUVQOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXVCRztBQUNILE1BQU0sQ0FBQyxNQUFNLFlBQVksR0FBRyxJQUFJLGNBQWMsQ0FBUyxTQUFTLENBQUMsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7QUFFeEY7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0JHO0FBQ0gsTUFBTSxDQUFDLE1BQU0sbUJBQW1CLEdBQzVCLElBQUksY0FBYyxDQUFTLFNBQVMsQ0FBQyxDQUFDLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0FBRXRFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBc0JHO0FBQ0gsTUFBTSxDQUFOLElBQVksMEJBSVg7QUFKRCxXQUFZLDBCQUEwQjtJQUNwQyw2RUFBUyxDQUFBO0lBQ1QsaUZBQVcsQ0FBQTtJQUNYLCtFQUFVLENBQUE7QUFDWixDQUFDLEVBSlcsMEJBQTBCLEtBQTFCLDBCQUEwQixRQUlyQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0luamVjdGlvblRva2VufSBmcm9tICcuLi9kaS9pbmplY3Rpb25fdG9rZW4nO1xuaW1wb3J0IHtpbmplY3R9IGZyb20gJy4uL2RpL2luamVjdG9yX2NvbXBhdGliaWxpdHknO1xuaW1wb3J0IHtJbmplY3RGbGFnc30gZnJvbSAnLi4vZGkvaW50ZXJmYWNlL2luamVjdG9yJztcblxuaW1wb3J0IHtERUZBVUxUX0xPQ0FMRV9JRCwgVVNEX0NVUlJFTkNZX0NPREV9IGZyb20gJy4vbG9jYWxpemF0aW9uJztcblxuZGVjbGFyZSBjb25zdCAkbG9jYWxpemU6IHtsb2NhbGU/OiBzdHJpbmd9O1xuXG4vKipcbiAqIFdvcmsgb3V0IHRoZSBsb2NhbGUgZnJvbSB0aGUgcG90ZW50aWFsIGdsb2JhbCBwcm9wZXJ0aWVzLlxuICpcbiAqICogQ2xvc3VyZSBDb21waWxlcjogdXNlIGBnb29nLkxPQ0FMRWAuXG4gKiAqIEl2eSBlbmFibGVkOiB1c2UgYCRsb2NhbGl6ZS5sb2NhbGVgXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRHbG9iYWxMb2NhbGUoKTogc3RyaW5nIHtcbiAgaWYgKHR5cGVvZiBuZ0kxOG5DbG9zdXJlTW9kZSAhPT0gJ3VuZGVmaW5lZCcgJiYgbmdJMThuQ2xvc3VyZU1vZGUgJiZcbiAgICAgIHR5cGVvZiBnb29nICE9PSAndW5kZWZpbmVkJyAmJiBnb29nLkxPQ0FMRSAhPT0gJ2VuJykge1xuICAgIC8vICogVGhlIGRlZmF1bHQgYGdvb2cuTE9DQUxFYCB2YWx1ZSBpcyBgZW5gLCB3aGlsZSBBbmd1bGFyIHVzZWQgYGVuLVVTYC5cbiAgICAvLyAqIEluIG9yZGVyIHRvIHByZXNlcnZlIGJhY2t3YXJkcyBjb21wYXRpYmlsaXR5LCB3ZSB1c2UgQW5ndWxhciBkZWZhdWx0IHZhbHVlIG92ZXJcbiAgICAvLyAgIENsb3N1cmUgQ29tcGlsZXIncyBvbmUuXG4gICAgcmV0dXJuIGdvb2cuTE9DQUxFO1xuICB9IGVsc2Uge1xuICAgIC8vIEtFRVAgYHR5cGVvZiAkbG9jYWxpemUgIT09ICd1bmRlZmluZWQnICYmICRsb2NhbGl6ZS5sb2NhbGVgIElOIFNZTkMgV0lUSCBUSEUgTE9DQUxJWkVcbiAgICAvLyBDT01QSUxFLVRJTUUgSU5MSU5FUi5cbiAgICAvL1xuICAgIC8vICogRHVyaW5nIGNvbXBpbGUgdGltZSBpbmxpbmluZyBvZiB0cmFuc2xhdGlvbnMgdGhlIGV4cHJlc3Npb24gd2lsbCBiZSByZXBsYWNlZFxuICAgIC8vICAgd2l0aCBhIHN0cmluZyBsaXRlcmFsIHRoYXQgaXMgdGhlIGN1cnJlbnQgbG9jYWxlLiBPdGhlciBmb3JtcyBvZiB0aGlzIGV4cHJlc3Npb24gYXJlIG5vdFxuICAgIC8vICAgZ3VhcmFudGVlZCB0byBiZSByZXBsYWNlZC5cbiAgICAvL1xuICAgIC8vICogRHVyaW5nIHJ1bnRpbWUgdHJhbnNsYXRpb24gZXZhbHVhdGlvbiwgdGhlIGRldmVsb3BlciBpcyByZXF1aXJlZCB0byBzZXQgYCRsb2NhbGl6ZS5sb2NhbGVgXG4gICAgLy8gICBpZiByZXF1aXJlZCwgb3IganVzdCB0byBwcm92aWRlIHRoZWlyIG93biBgTE9DQUxFX0lEYCBwcm92aWRlci5cbiAgICByZXR1cm4gKHR5cGVvZiAkbG9jYWxpemUgIT09ICd1bmRlZmluZWQnICYmICRsb2NhbGl6ZS5sb2NhbGUpIHx8IERFRkFVTFRfTE9DQUxFX0lEO1xuICB9XG59XG5cbi8qKlxuICogUHJvdmlkZSB0aGlzIHRva2VuIHRvIHNldCB0aGUgbG9jYWxlIG9mIHlvdXIgYXBwbGljYXRpb24uXG4gKiBJdCBpcyB1c2VkIGZvciBpMThuIGV4dHJhY3Rpb24sIGJ5IGkxOG4gcGlwZXMgKERhdGVQaXBlLCBJMThuUGx1cmFsUGlwZSwgQ3VycmVuY3lQaXBlLFxuICogRGVjaW1hbFBpcGUgYW5kIFBlcmNlbnRQaXBlKSBhbmQgYnkgSUNVIGV4cHJlc3Npb25zLlxuICpcbiAqIFNlZSB0aGUgW2kxOG4gZ3VpZGVdKGd1aWRlL2kxOG4tY29tbW9uLWxvY2FsZS1pZCkgZm9yIG1vcmUgaW5mb3JtYXRpb24uXG4gKlxuICogQHVzYWdlTm90ZXNcbiAqICMjIyBFeGFtcGxlXG4gKlxuICogYGBgdHlwZXNjcmlwdFxuICogaW1wb3J0IHsgTE9DQUxFX0lEIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG4gKiBpbXBvcnQgeyBwbGF0Zm9ybUJyb3dzZXJEeW5hbWljIH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlci1keW5hbWljJztcbiAqIGltcG9ydCB7IEFwcE1vZHVsZSB9IGZyb20gJy4vYXBwL2FwcC5tb2R1bGUnO1xuICpcbiAqIHBsYXRmb3JtQnJvd3NlckR5bmFtaWMoKS5ib290c3RyYXBNb2R1bGUoQXBwTW9kdWxlLCB7XG4gKiAgIHByb3ZpZGVyczogW3twcm92aWRlOiBMT0NBTEVfSUQsIHVzZVZhbHVlOiAnZW4tVVMnIH1dXG4gKiB9KTtcbiAqIGBgYFxuICpcbiAqIEBwdWJsaWNBcGlcbiAqL1xuZXhwb3J0IGNvbnN0IExPQ0FMRV9JRDogSW5qZWN0aW9uVG9rZW48c3RyaW5nPiA9IG5ldyBJbmplY3Rpb25Ub2tlbihuZ0Rldk1vZGUgPyAnTG9jYWxlSWQnIDogJycsIHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxuICBmYWN0b3J5OiAoKSA9PlxuICAgICAgaW5qZWN0KExPQ0FMRV9JRCwgSW5qZWN0RmxhZ3MuT3B0aW9uYWwgfCBJbmplY3RGbGFncy5Ta2lwU2VsZikgfHwgZ2V0R2xvYmFsTG9jYWxlKCksXG59KTtcblxuLyoqXG4gKiBQcm92aWRlIHRoaXMgdG9rZW4gdG8gc2V0IHRoZSBkZWZhdWx0IGN1cnJlbmN5IGNvZGUgeW91ciBhcHBsaWNhdGlvbiB1c2VzIGZvclxuICogQ3VycmVuY3lQaXBlIHdoZW4gdGhlcmUgaXMgbm8gY3VycmVuY3kgY29kZSBwYXNzZWQgaW50byBpdC4gVGhpcyBpcyBvbmx5IHVzZWQgYnlcbiAqIEN1cnJlbmN5UGlwZSBhbmQgaGFzIG5vIHJlbGF0aW9uIHRvIGxvY2FsZSBjdXJyZW5jeS4gRGVmYXVsdHMgdG8gVVNEIGlmIG5vdCBjb25maWd1cmVkLlxuICpcbiAqIFNlZSB0aGUgW2kxOG4gZ3VpZGVdKGd1aWRlL2kxOG4tY29tbW9uLWxvY2FsZS1pZCkgZm9yIG1vcmUgaW5mb3JtYXRpb24uXG4gKlxuICogPGRpdiBjbGFzcz1cImFsZXJ0IGlzLWhlbHBmdWxcIj5cbiAqXG4gKiAqKkRlcHJlY2F0aW9uIG5vdGljZToqKlxuICpcbiAqIFRoZSBkZWZhdWx0IGN1cnJlbmN5IGNvZGUgaXMgY3VycmVudGx5IGFsd2F5cyBgVVNEYCBidXQgdGhpcyBpcyBkZXByZWNhdGVkIGZyb20gdjkuXG4gKlxuICogKipJbiB2MTAgdGhlIGRlZmF1bHQgY3VycmVuY3kgY29kZSB3aWxsIGJlIHRha2VuIGZyb20gdGhlIGN1cnJlbnQgbG9jYWxlLioqXG4gKlxuICogSWYgeW91IG5lZWQgdGhlIHByZXZpb3VzIGJlaGF2aW9yIHRoZW4gc2V0IGl0IGJ5IGNyZWF0aW5nIGEgYERFRkFVTFRfQ1VSUkVOQ1lfQ09ERWAgcHJvdmlkZXIgaW5cbiAqIHlvdXIgYXBwbGljYXRpb24gYE5nTW9kdWxlYDpcbiAqXG4gKiBgYGB0c1xuICoge3Byb3ZpZGU6IERFRkFVTFRfQ1VSUkVOQ1lfQ09ERSwgdXNlVmFsdWU6ICdVU0QnfVxuICogYGBgXG4gKlxuICogPC9kaXY+XG4gKlxuICogQHVzYWdlTm90ZXNcbiAqICMjIyBFeGFtcGxlXG4gKlxuICogYGBgdHlwZXNjcmlwdFxuICogaW1wb3J0IHsgcGxhdGZvcm1Ccm93c2VyRHluYW1pYyB9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXItZHluYW1pYyc7XG4gKiBpbXBvcnQgeyBBcHBNb2R1bGUgfSBmcm9tICcuL2FwcC9hcHAubW9kdWxlJztcbiAqXG4gKiBwbGF0Zm9ybUJyb3dzZXJEeW5hbWljKCkuYm9vdHN0cmFwTW9kdWxlKEFwcE1vZHVsZSwge1xuICogICBwcm92aWRlcnM6IFt7cHJvdmlkZTogREVGQVVMVF9DVVJSRU5DWV9DT0RFLCB1c2VWYWx1ZTogJ0VVUicgfV1cbiAqIH0pO1xuICogYGBgXG4gKlxuICogQHB1YmxpY0FwaVxuICovXG5leHBvcnQgY29uc3QgREVGQVVMVF9DVVJSRU5DWV9DT0RFID1cbiAgICBuZXcgSW5qZWN0aW9uVG9rZW48c3RyaW5nPihuZ0Rldk1vZGUgPyAnRGVmYXVsdEN1cnJlbmN5Q29kZScgOiAnJywge1xuICAgICAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxuICAgICAgZmFjdG9yeTogKCkgPT4gVVNEX0NVUlJFTkNZX0NPREUsXG4gICAgfSk7XG5cbi8qKlxuICogVXNlIHRoaXMgdG9rZW4gYXQgYm9vdHN0cmFwIHRvIHByb3ZpZGUgdGhlIGNvbnRlbnQgb2YgeW91ciB0cmFuc2xhdGlvbiBmaWxlIChgeHRiYCxcbiAqIGB4bGZgIG9yIGB4bGYyYCkgd2hlbiB5b3Ugd2FudCB0byB0cmFuc2xhdGUgeW91ciBhcHBsaWNhdGlvbiBpbiBhbm90aGVyIGxhbmd1YWdlLlxuICpcbiAqIFNlZSB0aGUgW2kxOG4gZ3VpZGVdKGd1aWRlL2kxOG4tY29tbW9uLW1lcmdlKSBmb3IgbW9yZSBpbmZvcm1hdGlvbi5cbiAqXG4gKiBAdXNhZ2VOb3Rlc1xuICogIyMjIEV4YW1wbGVcbiAqXG4gKiBgYGB0eXBlc2NyaXB0XG4gKiBpbXBvcnQgeyBUUkFOU0xBVElPTlMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbiAqIGltcG9ydCB7IHBsYXRmb3JtQnJvd3NlckR5bmFtaWMgfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyLWR5bmFtaWMnO1xuICogaW1wb3J0IHsgQXBwTW9kdWxlIH0gZnJvbSAnLi9hcHAvYXBwLm1vZHVsZSc7XG4gKlxuICogLy8gY29udGVudCBvZiB5b3VyIHRyYW5zbGF0aW9uIGZpbGVcbiAqIGNvbnN0IHRyYW5zbGF0aW9ucyA9ICcuLi4uJztcbiAqXG4gKiBwbGF0Zm9ybUJyb3dzZXJEeW5hbWljKCkuYm9vdHN0cmFwTW9kdWxlKEFwcE1vZHVsZSwge1xuICogICBwcm92aWRlcnM6IFt7cHJvdmlkZTogVFJBTlNMQVRJT05TLCB1c2VWYWx1ZTogdHJhbnNsYXRpb25zIH1dXG4gKiB9KTtcbiAqIGBgYFxuICpcbiAqIEBwdWJsaWNBcGlcbiAqL1xuZXhwb3J0IGNvbnN0IFRSQU5TTEFUSU9OUyA9IG5ldyBJbmplY3Rpb25Ub2tlbjxzdHJpbmc+KG5nRGV2TW9kZSA/ICdUcmFuc2xhdGlvbnMnIDogJycpO1xuXG4vKipcbiAqIFByb3ZpZGUgdGhpcyB0b2tlbiBhdCBib290c3RyYXAgdG8gc2V0IHRoZSBmb3JtYXQgb2YgeW91ciB7QGxpbmsgVFJBTlNMQVRJT05TfTogYHh0YmAsXG4gKiBgeGxmYCBvciBgeGxmMmAuXG4gKlxuICogU2VlIHRoZSBbaTE4biBndWlkZV0oZ3VpZGUvaTE4bi1jb21tb24tbWVyZ2UpIGZvciBtb3JlIGluZm9ybWF0aW9uLlxuICpcbiAqIEB1c2FnZU5vdGVzXG4gKiAjIyMgRXhhbXBsZVxuICpcbiAqIGBgYHR5cGVzY3JpcHRcbiAqIGltcG9ydCB7IFRSQU5TTEFUSU9OU19GT1JNQVQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbiAqIGltcG9ydCB7IHBsYXRmb3JtQnJvd3NlckR5bmFtaWMgfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyLWR5bmFtaWMnO1xuICogaW1wb3J0IHsgQXBwTW9kdWxlIH0gZnJvbSAnLi9hcHAvYXBwLm1vZHVsZSc7XG4gKlxuICogcGxhdGZvcm1Ccm93c2VyRHluYW1pYygpLmJvb3RzdHJhcE1vZHVsZShBcHBNb2R1bGUsIHtcbiAqICAgcHJvdmlkZXJzOiBbe3Byb3ZpZGU6IFRSQU5TTEFUSU9OU19GT1JNQVQsIHVzZVZhbHVlOiAneGxmJyB9XVxuICogfSk7XG4gKiBgYGBcbiAqXG4gKiBAcHVibGljQXBpXG4gKi9cbmV4cG9ydCBjb25zdCBUUkFOU0xBVElPTlNfRk9STUFUID1cbiAgICBuZXcgSW5qZWN0aW9uVG9rZW48c3RyaW5nPihuZ0Rldk1vZGUgPyAnVHJhbnNsYXRpb25zRm9ybWF0JyA6ICcnKTtcblxuLyoqXG4gKiBVc2UgdGhpcyBlbnVtIGF0IGJvb3RzdHJhcCBhcyBhbiBvcHRpb24gb2YgYGJvb3RzdHJhcE1vZHVsZWAgdG8gZGVmaW5lIHRoZSBzdHJhdGVneVxuICogdGhhdCB0aGUgY29tcGlsZXIgc2hvdWxkIHVzZSBpbiBjYXNlIG9mIG1pc3NpbmcgdHJhbnNsYXRpb25zOlxuICogLSBFcnJvcjogdGhyb3cgaWYgeW91IGhhdmUgbWlzc2luZyB0cmFuc2xhdGlvbnMuXG4gKiAtIFdhcm5pbmcgKGRlZmF1bHQpOiBzaG93IGEgd2FybmluZyBpbiB0aGUgY29uc29sZSBhbmQvb3Igc2hlbGwuXG4gKiAtIElnbm9yZTogZG8gbm90aGluZy5cbiAqXG4gKiBTZWUgdGhlIFtpMThuIGd1aWRlXShndWlkZS9pMThuLWNvbW1vbi1tZXJnZSNyZXBvcnQtbWlzc2luZy10cmFuc2xhdGlvbnMpIGZvciBtb3JlIGluZm9ybWF0aW9uLlxuICpcbiAqIEB1c2FnZU5vdGVzXG4gKiAjIyMgRXhhbXBsZVxuICogYGBgdHlwZXNjcmlwdFxuICogaW1wb3J0IHsgTWlzc2luZ1RyYW5zbGF0aW9uU3RyYXRlZ3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbiAqIGltcG9ydCB7IHBsYXRmb3JtQnJvd3NlckR5bmFtaWMgfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyLWR5bmFtaWMnO1xuICogaW1wb3J0IHsgQXBwTW9kdWxlIH0gZnJvbSAnLi9hcHAvYXBwLm1vZHVsZSc7XG4gKlxuICogcGxhdGZvcm1Ccm93c2VyRHluYW1pYygpLmJvb3RzdHJhcE1vZHVsZShBcHBNb2R1bGUsIHtcbiAqICAgbWlzc2luZ1RyYW5zbGF0aW9uOiBNaXNzaW5nVHJhbnNsYXRpb25TdHJhdGVneS5FcnJvclxuICogfSk7XG4gKiBgYGBcbiAqXG4gKiBAcHVibGljQXBpXG4gKi9cbmV4cG9ydCBlbnVtIE1pc3NpbmdUcmFuc2xhdGlvblN0cmF0ZWd5IHtcbiAgRXJyb3IgPSAwLFxuICBXYXJuaW5nID0gMSxcbiAgSWdub3JlID0gMixcbn1cbiJdfQ==