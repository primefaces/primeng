/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { getLocaleNumberFormat, getLocaleNumberSymbol, getNumberOfCurrencyDigits, NumberFormatStyle, NumberSymbol, } from './locale_data_api';
export const NUMBER_FORMAT_REGEXP = /^(\d+)?\.((\d+)(-(\d+))?)?$/;
const MAX_DIGITS = 22;
const DECIMAL_SEP = '.';
const ZERO_CHAR = '0';
const PATTERN_SEP = ';';
const GROUP_SEP = ',';
const DIGIT_CHAR = '#';
const CURRENCY_CHAR = '¤';
const PERCENT_CHAR = '%';
/**
 * Transforms a number to a locale string based on a style and a format.
 */
function formatNumberToLocaleString(value, pattern, locale, groupSymbol, decimalSymbol, digitsInfo, isPercent = false) {
    let formattedText = '';
    let isZero = false;
    if (!isFinite(value)) {
        formattedText = getLocaleNumberSymbol(locale, NumberSymbol.Infinity);
    }
    else {
        let parsedNumber = parseNumber(value);
        if (isPercent) {
            parsedNumber = toPercent(parsedNumber);
        }
        let minInt = pattern.minInt;
        let minFraction = pattern.minFrac;
        let maxFraction = pattern.maxFrac;
        if (digitsInfo) {
            const parts = digitsInfo.match(NUMBER_FORMAT_REGEXP);
            if (parts === null) {
                throw new Error(`${digitsInfo} is not a valid digit info`);
            }
            const minIntPart = parts[1];
            const minFractionPart = parts[3];
            const maxFractionPart = parts[5];
            if (minIntPart != null) {
                minInt = parseIntAutoRadix(minIntPart);
            }
            if (minFractionPart != null) {
                minFraction = parseIntAutoRadix(minFractionPart);
            }
            if (maxFractionPart != null) {
                maxFraction = parseIntAutoRadix(maxFractionPart);
            }
            else if (minFractionPart != null && minFraction > maxFraction) {
                maxFraction = minFraction;
            }
        }
        roundNumber(parsedNumber, minFraction, maxFraction);
        let digits = parsedNumber.digits;
        let integerLen = parsedNumber.integerLen;
        const exponent = parsedNumber.exponent;
        let decimals = [];
        isZero = digits.every((d) => !d);
        // pad zeros for small numbers
        for (; integerLen < minInt; integerLen++) {
            digits.unshift(0);
        }
        // pad zeros for small numbers
        for (; integerLen < 0; integerLen++) {
            digits.unshift(0);
        }
        // extract decimals digits
        if (integerLen > 0) {
            decimals = digits.splice(integerLen, digits.length);
        }
        else {
            decimals = digits;
            digits = [0];
        }
        // format the integer digits with grouping separators
        const groups = [];
        if (digits.length >= pattern.lgSize) {
            groups.unshift(digits.splice(-pattern.lgSize, digits.length).join(''));
        }
        while (digits.length > pattern.gSize) {
            groups.unshift(digits.splice(-pattern.gSize, digits.length).join(''));
        }
        if (digits.length) {
            groups.unshift(digits.join(''));
        }
        formattedText = groups.join(getLocaleNumberSymbol(locale, groupSymbol));
        // append the decimal digits
        if (decimals.length) {
            formattedText += getLocaleNumberSymbol(locale, decimalSymbol) + decimals.join('');
        }
        if (exponent) {
            formattedText += getLocaleNumberSymbol(locale, NumberSymbol.Exponential) + '+' + exponent;
        }
    }
    if (value < 0 && !isZero) {
        formattedText = pattern.negPre + formattedText + pattern.negSuf;
    }
    else {
        formattedText = pattern.posPre + formattedText + pattern.posSuf;
    }
    return formattedText;
}
/**
 * @ngModule CommonModule
 * @description
 *
 * Formats a number as currency using locale rules.
 *
 * @param value The number to format.
 * @param locale A locale code for the locale format rules to use.
 * @param currency A string containing the currency symbol or its name,
 * such as "$" or "Canadian Dollar". Used in output string, but does not affect the operation
 * of the function.
 * @param currencyCode The [ISO 4217](https://en.wikipedia.org/wiki/ISO_4217)
 * currency code, such as `USD` for the US dollar and `EUR` for the euro.
 * Used to determine the number of digits in the decimal part.
 * @param digitsInfo Decimal representation options, specified by a string in the following format:
 * `{minIntegerDigits}.{minFractionDigits}-{maxFractionDigits}`. See `DecimalPipe` for more details.
 *
 * @returns The formatted currency value.
 *
 * @see {@link formatNumber}
 * @see {@link DecimalPipe}
 * @see [Internationalization (i18n) Guide](/guide/i18n-overview)
 *
 * @publicApi
 */
export function formatCurrency(value, locale, currency, currencyCode, digitsInfo) {
    const format = getLocaleNumberFormat(locale, NumberFormatStyle.Currency);
    const pattern = parseNumberFormat(format, getLocaleNumberSymbol(locale, NumberSymbol.MinusSign));
    pattern.minFrac = getNumberOfCurrencyDigits(currencyCode);
    pattern.maxFrac = pattern.minFrac;
    const res = formatNumberToLocaleString(value, pattern, locale, NumberSymbol.CurrencyGroup, NumberSymbol.CurrencyDecimal, digitsInfo);
    return (res
        .replace(CURRENCY_CHAR, currency)
        // if we have 2 time the currency character, the second one is ignored
        .replace(CURRENCY_CHAR, '')
        // If there is a spacing between currency character and the value and
        // the currency character is suppressed by passing an empty string, the
        // spacing character would remain as part of the string. Then we
        // should remove it.
        .trim());
}
/**
 * @ngModule CommonModule
 * @description
 *
 * Formats a number as a percentage according to locale rules.
 *
 * @param value The number to format.
 * @param locale A locale code for the locale format rules to use.
 * @param digitsInfo Decimal representation options, specified by a string in the following format:
 * `{minIntegerDigits}.{minFractionDigits}-{maxFractionDigits}`. See `DecimalPipe` for more details.
 *
 * @returns The formatted percentage value.
 *
 * @see {@link formatNumber}
 * @see {@link DecimalPipe}
 * @see [Internationalization (i18n) Guide](/guide/i18n-overview)
 * @publicApi
 *
 */
export function formatPercent(value, locale, digitsInfo) {
    const format = getLocaleNumberFormat(locale, NumberFormatStyle.Percent);
    const pattern = parseNumberFormat(format, getLocaleNumberSymbol(locale, NumberSymbol.MinusSign));
    const res = formatNumberToLocaleString(value, pattern, locale, NumberSymbol.Group, NumberSymbol.Decimal, digitsInfo, true);
    return res.replace(new RegExp(PERCENT_CHAR, 'g'), getLocaleNumberSymbol(locale, NumberSymbol.PercentSign));
}
/**
 * @ngModule CommonModule
 * @description
 *
 * Formats a number as text, with group sizing, separator, and other
 * parameters based on the locale.
 *
 * @param value The number to format.
 * @param locale A locale code for the locale format rules to use.
 * @param digitsInfo Decimal representation options, specified by a string in the following format:
 * `{minIntegerDigits}.{minFractionDigits}-{maxFractionDigits}`. See `DecimalPipe` for more details.
 *
 * @returns The formatted text string.
 * @see [Internationalization (i18n) Guide](/guide/i18n-overview)
 *
 * @publicApi
 */
export function formatNumber(value, locale, digitsInfo) {
    const format = getLocaleNumberFormat(locale, NumberFormatStyle.Decimal);
    const pattern = parseNumberFormat(format, getLocaleNumberSymbol(locale, NumberSymbol.MinusSign));
    return formatNumberToLocaleString(value, pattern, locale, NumberSymbol.Group, NumberSymbol.Decimal, digitsInfo);
}
function parseNumberFormat(format, minusSign = '-') {
    const p = {
        minInt: 1,
        minFrac: 0,
        maxFrac: 0,
        posPre: '',
        posSuf: '',
        negPre: '',
        negSuf: '',
        gSize: 0,
        lgSize: 0,
    };
    const patternParts = format.split(PATTERN_SEP);
    const positive = patternParts[0];
    const negative = patternParts[1];
    const positiveParts = positive.indexOf(DECIMAL_SEP) !== -1
        ? positive.split(DECIMAL_SEP)
        : [
            positive.substring(0, positive.lastIndexOf(ZERO_CHAR) + 1),
            positive.substring(positive.lastIndexOf(ZERO_CHAR) + 1),
        ], integer = positiveParts[0], fraction = positiveParts[1] || '';
    p.posPre = integer.substring(0, integer.indexOf(DIGIT_CHAR));
    for (let i = 0; i < fraction.length; i++) {
        const ch = fraction.charAt(i);
        if (ch === ZERO_CHAR) {
            p.minFrac = p.maxFrac = i + 1;
        }
        else if (ch === DIGIT_CHAR) {
            p.maxFrac = i + 1;
        }
        else {
            p.posSuf += ch;
        }
    }
    const groups = integer.split(GROUP_SEP);
    p.gSize = groups[1] ? groups[1].length : 0;
    p.lgSize = groups[2] || groups[1] ? (groups[2] || groups[1]).length : 0;
    if (negative) {
        const trunkLen = positive.length - p.posPre.length - p.posSuf.length, pos = negative.indexOf(DIGIT_CHAR);
        p.negPre = negative.substring(0, pos).replace(/'/g, '');
        p.negSuf = negative.slice(pos + trunkLen).replace(/'/g, '');
    }
    else {
        p.negPre = minusSign + p.posPre;
        p.negSuf = p.posSuf;
    }
    return p;
}
// Transforms a parsed number into a percentage by multiplying it by 100
function toPercent(parsedNumber) {
    // if the number is 0, don't do anything
    if (parsedNumber.digits[0] === 0) {
        return parsedNumber;
    }
    // Getting the current number of decimals
    const fractionLen = parsedNumber.digits.length - parsedNumber.integerLen;
    if (parsedNumber.exponent) {
        parsedNumber.exponent += 2;
    }
    else {
        if (fractionLen === 0) {
            parsedNumber.digits.push(0, 0);
        }
        else if (fractionLen === 1) {
            parsedNumber.digits.push(0);
        }
        parsedNumber.integerLen += 2;
    }
    return parsedNumber;
}
/**
 * Parses a number.
 * Significant bits of this parse algorithm came from https://github.com/MikeMcl/big.js/
 */
function parseNumber(num) {
    let numStr = Math.abs(num) + '';
    let exponent = 0, digits, integerLen;
    let i, j, zeros;
    // Decimal point?
    if ((integerLen = numStr.indexOf(DECIMAL_SEP)) > -1) {
        numStr = numStr.replace(DECIMAL_SEP, '');
    }
    // Exponential form?
    if ((i = numStr.search(/e/i)) > 0) {
        // Work out the exponent.
        if (integerLen < 0)
            integerLen = i;
        integerLen += +numStr.slice(i + 1);
        numStr = numStr.substring(0, i);
    }
    else if (integerLen < 0) {
        // There was no decimal point or exponent so it is an integer.
        integerLen = numStr.length;
    }
    // Count the number of leading zeros.
    for (i = 0; numStr.charAt(i) === ZERO_CHAR; i++) {
        /* empty */
    }
    if (i === (zeros = numStr.length)) {
        // The digits are all zero.
        digits = [0];
        integerLen = 1;
    }
    else {
        // Count the number of trailing zeros
        zeros--;
        while (numStr.charAt(zeros) === ZERO_CHAR)
            zeros--;
        // Trailing zeros are insignificant so ignore them
        integerLen -= i;
        digits = [];
        // Convert string to array of digits without leading/trailing zeros.
        for (j = 0; i <= zeros; i++, j++) {
            digits[j] = Number(numStr.charAt(i));
        }
    }
    // If the number overflows the maximum allowed digits then use an exponent.
    if (integerLen > MAX_DIGITS) {
        digits = digits.splice(0, MAX_DIGITS - 1);
        exponent = integerLen - 1;
        integerLen = 1;
    }
    return { digits, exponent, integerLen };
}
/**
 * Round the parsed number to the specified number of decimal places
 * This function changes the parsedNumber in-place
 */
function roundNumber(parsedNumber, minFrac, maxFrac) {
    if (minFrac > maxFrac) {
        throw new Error(`The minimum number of digits after fraction (${minFrac}) is higher than the maximum (${maxFrac}).`);
    }
    let digits = parsedNumber.digits;
    let fractionLen = digits.length - parsedNumber.integerLen;
    const fractionSize = Math.min(Math.max(minFrac, fractionLen), maxFrac);
    // The index of the digit to where rounding is to occur
    let roundAt = fractionSize + parsedNumber.integerLen;
    let digit = digits[roundAt];
    if (roundAt > 0) {
        // Drop fractional digits beyond `roundAt`
        digits.splice(Math.max(parsedNumber.integerLen, roundAt));
        // Set non-fractional digits beyond `roundAt` to 0
        for (let j = roundAt; j < digits.length; j++) {
            digits[j] = 0;
        }
    }
    else {
        // We rounded to zero so reset the parsedNumber
        fractionLen = Math.max(0, fractionLen);
        parsedNumber.integerLen = 1;
        digits.length = Math.max(1, (roundAt = fractionSize + 1));
        digits[0] = 0;
        for (let i = 1; i < roundAt; i++)
            digits[i] = 0;
    }
    if (digit >= 5) {
        if (roundAt - 1 < 0) {
            for (let k = 0; k > roundAt; k--) {
                digits.unshift(0);
                parsedNumber.integerLen++;
            }
            digits.unshift(1);
            parsedNumber.integerLen++;
        }
        else {
            digits[roundAt - 1]++;
        }
    }
    // Pad out with zeros to get the required fraction length
    for (; fractionLen < Math.max(0, fractionSize); fractionLen++)
        digits.push(0);
    let dropTrailingZeros = fractionSize !== 0;
    // Minimal length = nb of decimals required + current nb of integers
    // Any number besides that is optional and can be removed if it's a trailing 0
    const minLen = minFrac + parsedNumber.integerLen;
    // Do any carrying, e.g. a digit was rounded up to 10
    const carry = digits.reduceRight(function (carry, d, i, digits) {
        d = d + carry;
        digits[i] = d < 10 ? d : d - 10; // d % 10
        if (dropTrailingZeros) {
            // Do not keep meaningless fractional trailing zeros (e.g. 15.52000 --> 15.52)
            if (digits[i] === 0 && i >= minLen) {
                digits.pop();
            }
            else {
                dropTrailingZeros = false;
            }
        }
        return d >= 10 ? 1 : 0; // Math.floor(d / 10);
    }, 0);
    if (carry) {
        digits.unshift(carry);
        parsedNumber.integerLen++;
    }
}
export function parseIntAutoRadix(text) {
    const result = parseInt(text);
    if (isNaN(result)) {
        throw new Error('Invalid integer literal when parsing ' + text);
    }
    return result;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybWF0X251bWJlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2NvbW1vbi9zcmMvaTE4bi9mb3JtYXRfbnVtYmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUVILE9BQU8sRUFDTCxxQkFBcUIsRUFDckIscUJBQXFCLEVBQ3JCLHlCQUF5QixFQUN6QixpQkFBaUIsRUFDakIsWUFBWSxHQUNiLE1BQU0sbUJBQW1CLENBQUM7QUFFM0IsTUFBTSxDQUFDLE1BQU0sb0JBQW9CLEdBQUcsNkJBQTZCLENBQUM7QUFDbEUsTUFBTSxVQUFVLEdBQUcsRUFBRSxDQUFDO0FBQ3RCLE1BQU0sV0FBVyxHQUFHLEdBQUcsQ0FBQztBQUN4QixNQUFNLFNBQVMsR0FBRyxHQUFHLENBQUM7QUFDdEIsTUFBTSxXQUFXLEdBQUcsR0FBRyxDQUFDO0FBQ3hCLE1BQU0sU0FBUyxHQUFHLEdBQUcsQ0FBQztBQUN0QixNQUFNLFVBQVUsR0FBRyxHQUFHLENBQUM7QUFDdkIsTUFBTSxhQUFhLEdBQUcsR0FBRyxDQUFDO0FBQzFCLE1BQU0sWUFBWSxHQUFHLEdBQUcsQ0FBQztBQUV6Qjs7R0FFRztBQUNILFNBQVMsMEJBQTBCLENBQ2pDLEtBQWEsRUFDYixPQUEyQixFQUMzQixNQUFjLEVBQ2QsV0FBeUIsRUFDekIsYUFBMkIsRUFDM0IsVUFBbUIsRUFDbkIsU0FBUyxHQUFHLEtBQUs7SUFFakIsSUFBSSxhQUFhLEdBQUcsRUFBRSxDQUFDO0lBQ3ZCLElBQUksTUFBTSxHQUFHLEtBQUssQ0FBQztJQUVuQixJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUM7UUFDckIsYUFBYSxHQUFHLHFCQUFxQixDQUFDLE1BQU0sRUFBRSxZQUFZLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDdkUsQ0FBQztTQUFNLENBQUM7UUFDTixJQUFJLFlBQVksR0FBRyxXQUFXLENBQUMsS0FB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RUFBRSxDQUFDLENBQUMsU0FBUztRQUMxQyxJQUFJLGlCQUFpQixFQUFFLENBQUM7WUFDdEIsOEVBQThFO1lBQzlFLElBQUksTUFBTSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksTUFBTSxFQUFFLENBQUM7Z0JBQ25DLE1BQU0sQ0FBQyxHQUFHLEVBQUUsQ0FBQztZQUNmLENBQUM7aUJBQU0sQ0FBQztnQkFDTixpQkFBaUIsR0FBRyxLQUFLLENBQUM7WUFDNUIsQ0FBQztRQUNILENBQUM7UUFDRCxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsc0JBQXNCO0lBQ2hELENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUNOLElBQUksS0FBSyxFQUFFLENBQUM7UUFDVixNQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3RCLFlBQVksQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUM1QixDQUFDO0FBQ0gsQ0FBQztBQUVELE1BQU0sVUFBVSxpQkFBaUIsQ0FBQyxJQUFZO0lBQzVDLE1BQU0sTUFBTSxHQUFXLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN0QyxJQUFJLEtBQUssQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDO1FBQ2xCLE1BQU0sSUFBSSxLQUFLLENBQUMsdUNBQXVDLEdBQUcsSUFBSSxDQUFDLENBQUM7SUFDbEUsQ0FBQztJQUNELE9BQU8sTUFBTSxDQUFDO0FBQ2hCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtcbiAgZ2V0TG9jYWxlTnVtYmVyRm9ybWF0LFxuICBnZXRMb2NhbGVOdW1iZXJTeW1ib2wsXG4gIGdldE51bWJlck9mQ3VycmVuY3lEaWdpdHMsXG4gIE51bWJlckZvcm1hdFN0eWxlLFxuICBOdW1iZXJTeW1ib2wsXG59IGZyb20gJy4vbG9jYWxlX2RhdGFfYXBpJztcblxuZXhwb3J0IGNvbnN0IE5VTUJFUl9GT1JNQVRfUkVHRVhQID0gL14oXFxkKyk/XFwuKChcXGQrKSgtKFxcZCspKT8pPyQvO1xuY29uc3QgTUFYX0RJR0lUUyA9IDIyO1xuY29uc3QgREVDSU1BTF9TRVAgPSAnLic7XG5jb25zdCBaRVJPX0NIQVIgPSAnMCc7XG5jb25zdCBQQVRURVJOX1NFUCA9ICc7JztcbmNvbnN0IEdST1VQX1NFUCA9ICcsJztcbmNvbnN0IERJR0lUX0NIQVIgPSAnIyc7XG5jb25zdCBDVVJSRU5DWV9DSEFSID0gJ8KkJztcbmNvbnN0IFBFUkNFTlRfQ0hBUiA9ICclJztcblxuLyoqXG4gKiBUcmFuc2Zvcm1zIGEgbnVtYmVyIHRvIGEgbG9jYWxlIHN0cmluZyBiYXNlZCBvbiBhIHN0eWxlIGFuZCBhIGZvcm1hdC5cbiAqL1xuZnVuY3Rpb24gZm9ybWF0TnVtYmVyVG9Mb2NhbGVTdHJpbmcoXG4gIHZhbHVlOiBudW1iZXIsXG4gIHBhdHRlcm46IFBhcnNlZE51bWJlckZvcm1hdCxcbiAgbG9jYWxlOiBzdHJpbmcsXG4gIGdyb3VwU3ltYm9sOiBOdW1iZXJTeW1ib2wsXG4gIGRlY2ltYWxTeW1ib2w6IE51bWJlclN5bWJvbCxcbiAgZGlnaXRzSW5mbz86IHN0cmluZyxcbiAgaXNQZXJjZW50ID0gZmFsc2UsXG4pOiBzdHJpbmcge1xuICBsZXQgZm9ybWF0dGVkVGV4dCA9ICcnO1xuICBsZXQgaXNaZXJvID0gZmFsc2U7XG5cbiAgaWYgKCFpc0Zpbml0ZSh2YWx1ZSkpIHtcbiAgICBmb3JtYXR0ZWRUZXh0ID0gZ2V0TG9jYWxlTnVtYmVyU3ltYm9sKGxvY2FsZSwgTnVtYmVyU3ltYm9sLkluZmluaXR5KTtcbiAgfSBlbHNlIHtcbiAgICBsZXQgcGFyc2VkTnVtYmVyID0gcGFyc2VOdW1iZXIodmFsdWUpO1xuXG4gICAgaWYgKGlzUGVyY2VudCkge1xuICAgICAgcGFyc2VkTnVtYmVyID0gdG9QZXJjZW50KHBhcnNlZE51bWJlcik7XG4gICAgfVxuXG4gICAgbGV0IG1pbkludCA9IHBhdHRlcm4ubWluSW50O1xuICAgIGxldCBtaW5GcmFjdGlvbiA9IHBhdHRlcm4ubWluRnJhYztcbiAgICBsZXQgbWF4RnJhY3Rpb24gPSBwYXR0ZXJuLm1heEZyYWM7XG5cbiAgICBpZiAoZGlnaXRzSW5mbykge1xuICAgICAgY29uc3QgcGFydHMgPSBkaWdpdHNJbmZvLm1hdGNoKE5VTUJFUl9GT1JNQVRfUkVHRVhQKTtcbiAgICAgIGlmIChwYXJ0cyA9PT0gbnVsbCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYCR7ZGlnaXRzSW5mb30gaXMgbm90IGEgdmFsaWQgZGlnaXQgaW5mb2ApO1xuICAgICAgfVxuICAgICAgY29uc3QgbWluSW50UGFydCA9IHBhcnRzWzFdO1xuICAgICAgY29uc3QgbWluRnJhY3Rpb25QYXJ0ID0gcGFydHNbM107XG4gICAgICBjb25zdCBtYXhGcmFjdGlvblBhcnQgPSBwYXJ0c1s1XTtcbiAgICAgIGlmIChtaW5JbnRQYXJ0ICE9IG51bGwpIHtcbiAgICAgICAgbWluSW50ID0gcGFyc2VJbnRBdXRvUmFkaXgobWluSW50UGFydCk7XG4gICAgICB9XG4gICAgICBpZiAobWluRnJhY3Rpb25QYXJ0ICE9IG51bGwpIHtcbiAgICAgICAgbWluRnJhY3Rpb24gPSBwYXJzZUludEF1dG9SYWRpeChtaW5GcmFjdGlvblBhcnQpO1xuICAgICAgfVxuICAgICAgaWYgKG1heEZyYWN0aW9uUGFydCAhPSBudWxsKSB7XG4gICAgICAgIG1heEZyYWN0aW9uID0gcGFyc2VJbnRBdXRvUmFkaXgobWF4RnJhY3Rpb25QYXJ0KTtcbiAgICAgIH0gZWxzZSBpZiAobWluRnJhY3Rpb25QYXJ0ICE9IG51bGwgJiYgbWluRnJhY3Rpb24gPiBtYXhGcmFjdGlvbikge1xuICAgICAgICBtYXhGcmFjdGlvbiA9IG1pbkZyYWN0aW9uO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJvdW5kTnVtYmVyKHBhcnNlZE51bWJlciwgbWluRnJhY3Rpb24sIG1heEZyYWN0aW9uKTtcblxuICAgIGxldCBkaWdpdHMgPSBwYXJzZWROdW1iZXIuZGlnaXRzO1xuICAgIGxldCBpbnRlZ2VyTGVuID0gcGFyc2VkTnVtYmVyLmludGVnZXJMZW47XG4gICAgY29uc3QgZXhwb25lbnQgPSBwYXJzZWROdW1iZXIuZXhwb25lbnQ7XG4gICAgbGV0IGRlY2ltYWxzID0gW107XG4gICAgaXNaZXJvID0gZGlnaXRzLmV2ZXJ5KChkKSA9PiAhZCk7XG5cbiAgICAvLyBwYWQgemVyb3MgZm9yIHNtYWxsIG51bWJlcnNcbiAgICBmb3IgKDsgaW50ZWdlckxlbiA8IG1pbkludDsgaW50ZWdlckxlbisrKSB7XG4gICAgICBkaWdpdHMudW5zaGlmdCgwKTtcbiAgICB9XG5cbiAgICAvLyBwYWQgemVyb3MgZm9yIHNtYWxsIG51bWJlcnNcbiAgICBmb3IgKDsgaW50ZWdlckxlbiA8IDA7IGludGVnZXJMZW4rKykge1xuICAgICAgZGlnaXRzLnVuc2hpZnQoMCk7XG4gICAgfVxuXG4gICAgLy8gZXh0cmFjdCBkZWNpbWFscyBkaWdpdHNcbiAgICBpZiAoaW50ZWdlckxlbiA+IDApIHtcbiAgICAgIGRlY2ltYWxzID0gZGlnaXRzLnNwbGljZShpbnRlZ2VyTGVuLCBkaWdpdHMubGVuZ3RoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZGVjaW1hbHMgPSBkaWdpdHM7XG4gICAgICBkaWdpdHMgPSBbMF07XG4gICAgfVxuXG4gICAgLy8gZm9ybWF0IHRoZSBpbnRlZ2VyIGRpZ2l0cyB3aXRoIGdyb3VwaW5nIHNlcGFyYXRvcnNcbiAgICBjb25zdCBncm91cHMgPSBbXTtcbiAgICBpZiAoZGlnaXRzLmxlbmd0aCA+PSBwYXR0ZXJuLmxnU2l6ZSkge1xuICAgICAgZ3JvdXBzLnVuc2hpZnQoZGlnaXRzLnNwbGljZSgtcGF0dGVybi5sZ1NpemUsIGRpZ2l0cy5sZW5ndGgpLmpvaW4oJycpKTtcbiAgICB9XG5cbiAgICB3aGlsZSAoZGlnaXRzLmxlbmd0aCA+IHBhdHRlcm4uZ1NpemUpIHtcbiAgICAgIGdyb3Vwcy51bnNoaWZ0KGRpZ2l0cy5zcGxpY2UoLXBhdHRlcm4uZ1NpemUsIGRpZ2l0cy5sZW5ndGgpLmpvaW4oJycpKTtcbiAgICB9XG5cbiAgICBpZiAoZGlnaXRzLmxlbmd0aCkge1xuICAgICAgZ3JvdXBzLnVuc2hpZnQoZGlnaXRzLmpvaW4oJycpKTtcbiAgICB9XG5cbiAgICBmb3JtYXR0ZWRUZXh0ID0gZ3JvdXBzLmpvaW4oZ2V0TG9jYWxlTnVtYmVyU3ltYm9sKGxvY2FsZSwgZ3JvdXBTeW1ib2wpKTtcblxuICAgIC8vIGFwcGVuZCB0aGUgZGVjaW1hbCBkaWdpdHNcbiAgICBpZiAoZGVjaW1hbHMubGVuZ3RoKSB7XG4gICAgICBmb3JtYXR0ZWRUZXh0ICs9IGdldExvY2FsZU51bWJlclN5bWJvbChsb2NhbGUsIGRlY2ltYWxTeW1ib2wpICsgZGVjaW1hbHMuam9pbignJyk7XG4gICAgfVxuXG4gICAgaWYgKGV4cG9uZW50KSB7XG4gICAgICBmb3JtYXR0ZWRUZXh0ICs9IGdldExvY2FsZU51bWJlclN5bWJvbChsb2NhbGUsIE51bWJlclN5bWJvbC5FeHBvbmVudGlhbCkgKyAnKycgKyBleHBvbmVudDtcbiAgICB9XG4gIH1cblxuICBpZiAodmFsdWUgPCAwICYmICFpc1plcm8pIHtcbiAgICBmb3JtYXR0ZWRUZXh0ID0gcGF0dGVybi5uZWdQcmUgKyBmb3JtYXR0ZWRUZXh0ICsgcGF0dGVybi5uZWdTdWY7XG4gIH0gZWxzZSB7XG4gICAgZm9ybWF0dGVkVGV4dCA9IHBhdHRlcm4ucG9zUHJlICsgZm9ybWF0dGVkVGV4dCArIHBhdHRlcm4ucG9zU3VmO1xuICB9XG5cbiAgcmV0dXJuIGZvcm1hdHRlZFRleHQ7XG59XG5cbi8qKlxuICogQG5nTW9kdWxlIENvbW1vbk1vZHVsZVxuICogQGRlc2NyaXB0aW9uXG4gKlxuICogRm9ybWF0cyBhIG51bWJlciBhcyBjdXJyZW5jeSB1c2luZyBsb2NhbGUgcnVsZXMuXG4gKlxuICogQHBhcmFtIHZhbHVlIFRoZSBudW1iZXIgdG8gZm9ybWF0LlxuICogQHBhcmFtIGxvY2FsZSBBIGxvY2FsZSBjb2RlIGZvciB0aGUgbG9jYWxlIGZvcm1hdCBydWxlcyB0byB1c2UuXG4gKiBAcGFyYW0gY3VycmVuY3kgQSBzdHJpbmcgY29udGFpbmluZyB0aGUgY3VycmVuY3kgc3ltYm9sIG9yIGl0cyBuYW1lLFxuICogc3VjaCBhcyBcIiRcIiBvciBcIkNhbmFkaWFuIERvbGxhclwiLiBVc2VkIGluIG91dHB1dCBzdHJpbmcsIGJ1dCBkb2VzIG5vdCBhZmZlY3QgdGhlIG9wZXJhdGlvblxuICogb2YgdGhlIGZ1bmN0aW9uLlxuICogQHBhcmFtIGN1cnJlbmN5Q29kZSBUaGUgW0lTTyA0MjE3XShodHRwczovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9JU09fNDIxNylcbiAqIGN1cnJlbmN5IGNvZGUsIHN1Y2ggYXMgYFVTRGAgZm9yIHRoZSBVUyBkb2xsYXIgYW5kIGBFVVJgIGZvciB0aGUgZXVyby5cbiAqIFVzZWQgdG8gZGV0ZXJtaW5lIHRoZSBudW1iZXIgb2YgZGlnaXRzIGluIHRoZSBkZWNpbWFsIHBhcnQuXG4gKiBAcGFyYW0gZGlnaXRzSW5mbyBEZWNpbWFsIHJlcHJlc2VudGF0aW9uIG9wdGlvbnMsIHNwZWNpZmllZCBieSBhIHN0cmluZyBpbiB0aGUgZm9sbG93aW5nIGZvcm1hdDpcbiAqIGB7bWluSW50ZWdlckRpZ2l0c30ue21pbkZyYWN0aW9uRGlnaXRzfS17bWF4RnJhY3Rpb25EaWdpdHN9YC4gU2VlIGBEZWNpbWFsUGlwZWAgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBAcmV0dXJucyBUaGUgZm9ybWF0dGVkIGN1cnJlbmN5IHZhbHVlLlxuICpcbiAqIEBzZWUge0BsaW5rIGZvcm1hdE51bWJlcn1cbiAqIEBzZWUge0BsaW5rIERlY2ltYWxQaXBlfVxuICogQHNlZSBbSW50ZXJuYXRpb25hbGl6YXRpb24gKGkxOG4pIEd1aWRlXSgvZ3VpZGUvaTE4bi1vdmVydmlldylcbiAqXG4gKiBAcHVibGljQXBpXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBmb3JtYXRDdXJyZW5jeShcbiAgdmFsdWU6IG51bWJlcixcbiAgbG9jYWxlOiBzdHJpbmcsXG4gIGN1cnJlbmN5OiBzdHJpbmcsXG4gIGN1cnJlbmN5Q29kZT86IHN0cmluZyxcbiAgZGlnaXRzSW5mbz86IHN0cmluZyxcbik6IHN0cmluZyB7XG4gIGNvbnN0IGZvcm1hdCA9IGdldExvY2FsZU51bWJlckZvcm1hdChsb2NhbGUsIE51bWJlckZvcm1hdFN0eWxlLkN1cnJlbmN5KTtcbiAgY29uc3QgcGF0dGVybiA9IHBhcnNlTnVtYmVyRm9ybWF0KGZvcm1hdCwgZ2V0TG9jYWxlTnVtYmVyU3ltYm9sKGxvY2FsZSwgTnVtYmVyU3ltYm9sLk1pbnVzU2lnbikpO1xuXG4gIHBhdHRlcm4ubWluRnJhYyA9IGdldE51bWJlck9mQ3VycmVuY3lEaWdpdHMoY3VycmVuY3lDb2RlISk7XG4gIHBhdHRlcm4ubWF4RnJhYyA9IHBhdHRlcm4ubWluRnJhYztcblxuICBjb25zdCByZXMgPSBmb3JtYXROdW1iZXJUb0xvY2FsZVN0cmluZyhcbiAgICB2YWx1ZSxcbiAgICBwYXR0ZXJuLFxuICAgIGxvY2FsZSxcbiAgICBOdW1iZXJTeW1ib2wuQ3VycmVuY3lHcm91cCxcbiAgICBOdW1iZXJTeW1ib2wuQ3VycmVuY3lEZWNpbWFsLFxuICAgIGRpZ2l0c0luZm8sXG4gICk7XG4gIHJldHVybiAoXG4gICAgcmVzXG4gICAgICAucmVwbGFjZShDVVJSRU5DWV9DSEFSLCBjdXJyZW5jeSlcbiAgICAgIC8vIGlmIHdlIGhhdmUgMiB0aW1lIHRoZSBjdXJyZW5jeSBjaGFyYWN0ZXIsIHRoZSBzZWNvbmQgb25lIGlzIGlnbm9yZWRcbiAgICAgIC5yZXBsYWNlKENVUlJFTkNZX0NIQVIsICcnKVxuICAgICAgLy8gSWYgdGhlcmUgaXMgYSBzcGFjaW5nIGJldHdlZW4gY3VycmVuY3kgY2hhcmFjdGVyIGFuZCB0aGUgdmFsdWUgYW5kXG4gICAgICAvLyB0aGUgY3VycmVuY3kgY2hhcmFjdGVyIGlzIHN1cHByZXNzZWQgYnkgcGFzc2luZyBhbiBlbXB0eSBzdHJpbmcsIHRoZVxuICAgICAgLy8gc3BhY2luZyBjaGFyYWN0ZXIgd291bGQgcmVtYWluIGFzIHBhcnQgb2YgdGhlIHN0cmluZy4gVGhlbiB3ZVxuICAgICAgLy8gc2hvdWxkIHJlbW92ZSBpdC5cbiAgICAgIC50cmltKClcbiAgKTtcbn1cblxuLyoqXG4gKiBAbmdNb2R1bGUgQ29tbW9uTW9kdWxlXG4gKiBAZGVzY3JpcHRpb25cbiAqXG4gKiBGb3JtYXRzIGEgbnVtYmVyIGFzIGEgcGVyY2VudGFnZSBhY2NvcmRpbmcgdG8gbG9jYWxlIHJ1bGVzLlxuICpcbiAqIEBwYXJhbSB2YWx1ZSBUaGUgbnVtYmVyIHRvIGZvcm1hdC5cbiAqIEBwYXJhbSBsb2NhbGUgQSBsb2NhbGUgY29kZSBmb3IgdGhlIGxvY2FsZSBmb3JtYXQgcnVsZXMgdG8gdXNlLlxuICogQHBhcmFtIGRpZ2l0c0luZm8gRGVjaW1hbCByZXByZXNlbnRhdGlvbiBvcHRpb25zLCBzcGVjaWZpZWQgYnkgYSBzdHJpbmcgaW4gdGhlIGZvbGxvd2luZyBmb3JtYXQ6XG4gKiBge21pbkludGVnZXJEaWdpdHN9LnttaW5GcmFjdGlvbkRpZ2l0c30te21heEZyYWN0aW9uRGlnaXRzfWAuIFNlZSBgRGVjaW1hbFBpcGVgIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogQHJldHVybnMgVGhlIGZvcm1hdHRlZCBwZXJjZW50YWdlIHZhbHVlLlxuICpcbiAqIEBzZWUge0BsaW5rIGZvcm1hdE51bWJlcn1cbiAqIEBzZWUge0BsaW5rIERlY2ltYWxQaXBlfVxuICogQHNlZSBbSW50ZXJuYXRpb25hbGl6YXRpb24gKGkxOG4pIEd1aWRlXSgvZ3VpZGUvaTE4bi1vdmVydmlldylcbiAqIEBwdWJsaWNBcGlcbiAqXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBmb3JtYXRQZXJjZW50KHZhbHVlOiBudW1iZXIsIGxvY2FsZTogc3RyaW5nLCBkaWdpdHNJbmZvPzogc3RyaW5nKTogc3RyaW5nIHtcbiAgY29uc3QgZm9ybWF0ID0gZ2V0TG9jYWxlTnVtYmVyRm9ybWF0KGxvY2FsZSwgTnVtYmVyRm9ybWF0U3R5bGUuUGVyY2VudCk7XG4gIGNvbnN0IHBhdHRlcm4gPSBwYXJzZU51bWJlckZvcm1hdChmb3JtYXQsIGdldExvY2FsZU51bWJlclN5bWJvbChsb2NhbGUsIE51bWJlclN5bWJvbC5NaW51c1NpZ24pKTtcbiAgY29uc3QgcmVzID0gZm9ybWF0TnVtYmVyVG9Mb2NhbGVTdHJpbmcoXG4gICAgdmFsdWUsXG4gICAgcGF0dGVybixcbiAgICBsb2NhbGUsXG4gICAgTnVtYmVyU3ltYm9sLkdyb3VwLFxuICAgIE51bWJlclN5bWJvbC5EZWNpbWFsLFxuICAgIGRpZ2l0c0luZm8sXG4gICAgdHJ1ZSxcbiAgKTtcbiAgcmV0dXJuIHJlcy5yZXBsYWNlKFxuICAgIG5ldyBSZWdFeHAoUEVSQ0VOVF9DSEFSLCAnZycpLFxuICAgIGdldExvY2FsZU51bWJlclN5bWJvbChsb2NhbGUsIE51bWJlclN5bWJvbC5QZXJjZW50U2lnbiksXG4gICk7XG59XG5cbi8qKlxuICogQG5nTW9kdWxlIENvbW1vbk1vZHVsZVxuICogQGRlc2NyaXB0aW9uXG4gKlxuICogRm9ybWF0cyBhIG51bWJlciBhcyB0ZXh0LCB3aXRoIGdyb3VwIHNpemluZywgc2VwYXJhdG9yLCBhbmQgb3RoZXJcbiAqIHBhcmFtZXRlcnMgYmFzZWQgb24gdGhlIGxvY2FsZS5cbiAqXG4gKiBAcGFyYW0gdmFsdWUgVGhlIG51bWJlciB0byBmb3JtYXQuXG4gKiBAcGFyYW0gbG9jYWxlIEEgbG9jYWxlIGNvZGUgZm9yIHRoZSBsb2NhbGUgZm9ybWF0IHJ1bGVzIHRvIHVzZS5cbiAqIEBwYXJhbSBkaWdpdHNJbmZvIERlY2ltYWwgcmVwcmVzZW50YXRpb24gb3B0aW9ucywgc3BlY2lmaWVkIGJ5IGEgc3RyaW5nIGluIHRoZSBmb2xsb3dpbmcgZm9ybWF0OlxuICogYHttaW5JbnRlZ2VyRGlnaXRzfS57bWluRnJhY3Rpb25EaWdpdHN9LXttYXhGcmFjdGlvbkRpZ2l0c31gLiBTZWUgYERlY2ltYWxQaXBlYCBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIEByZXR1cm5zIFRoZSBmb3JtYXR0ZWQgdGV4dCBzdHJpbmcuXG4gKiBAc2VlIFtJbnRlcm5hdGlvbmFsaXphdGlvbiAoaTE4bikgR3VpZGVdKC9ndWlkZS9pMThuLW92ZXJ2aWV3KVxuICpcbiAqIEBwdWJsaWNBcGlcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGZvcm1hdE51bWJlcih2YWx1ZTogbnVtYmVyLCBsb2NhbGU6IHN0cmluZywgZGlnaXRzSW5mbz86IHN0cmluZyk6IHN0cmluZyB7XG4gIGNvbnN0IGZvcm1hdCA9IGdldExvY2FsZU51bWJlckZvcm1hdChsb2NhbGUsIE51bWJlckZvcm1hdFN0eWxlLkRlY2ltYWwpO1xuICBjb25zdCBwYXR0ZXJuID0gcGFyc2VOdW1iZXJGb3JtYXQoZm9ybWF0LCBnZXRMb2NhbGVOdW1iZXJTeW1ib2wobG9jYWxlLCBOdW1iZXJTeW1ib2wuTWludXNTaWduKSk7XG4gIHJldHVybiBmb3JtYXROdW1iZXJUb0xvY2FsZVN0cmluZyhcbiAgICB2YWx1ZSxcbiAgICBwYXR0ZXJuLFxuICAgIGxvY2FsZSxcbiAgICBOdW1iZXJTeW1ib2wuR3JvdXAsXG4gICAgTnVtYmVyU3ltYm9sLkRlY2ltYWwsXG4gICAgZGlnaXRzSW5mbyxcbiAgKTtcbn1cblxuaW50ZXJmYWNlIFBhcnNlZE51bWJlckZvcm1hdCB7XG4gIG1pbkludDogbnVtYmVyO1xuICAvLyB0aGUgbWluaW11bSBudW1iZXIgb2YgZGlnaXRzIHJlcXVpcmVkIGluIHRoZSBmcmFjdGlvbiBwYXJ0IG9mIHRoZSBudW1iZXJcbiAgbWluRnJhYzogbnVtYmVyO1xuICAvLyB0aGUgbWF4aW11bSBudW1iZXIgb2YgZGlnaXRzIHJlcXVpcmVkIGluIHRoZSBmcmFjdGlvbiBwYXJ0IG9mIHRoZSBudW1iZXJcbiAgbWF4RnJhYzogbnVtYmVyO1xuICAvLyB0aGUgcHJlZml4IGZvciBhIHBvc2l0aXZlIG51bWJlclxuICBwb3NQcmU6IHN0cmluZztcbiAgLy8gdGhlIHN1ZmZpeCBmb3IgYSBwb3NpdGl2ZSBudW1iZXJcbiAgcG9zU3VmOiBzdHJpbmc7XG4gIC8vIHRoZSBwcmVmaXggZm9yIGEgbmVnYXRpdmUgbnVtYmVyIChlLmcuIGAtYCBvciBgKGApKVxuICBuZWdQcmU6IHN0cmluZztcbiAgLy8gdGhlIHN1ZmZpeCBmb3IgYSBuZWdhdGl2ZSBudW1iZXIgKGUuZy4gYClgKVxuICBuZWdTdWY6IHN0cmluZztcbiAgLy8gbnVtYmVyIG9mIGRpZ2l0cyBpbiBlYWNoIGdyb3VwIG9mIHNlcGFyYXRlZCBkaWdpdHNcbiAgZ1NpemU6IG51bWJlcjtcbiAgLy8gbnVtYmVyIG9mIGRpZ2l0cyBpbiB0aGUgbGFzdCBncm91cCBvZiBkaWdpdHMgYmVmb3JlIHRoZSBkZWNpbWFsIHNlcGFyYXRvclxuICBsZ1NpemU6IG51bWJlcjtcbn1cblxuZnVuY3Rpb24gcGFyc2VOdW1iZXJGb3JtYXQoZm9ybWF0OiBzdHJpbmcsIG1pbnVzU2lnbiA9ICctJyk6IFBhcnNlZE51bWJlckZvcm1hdCB7XG4gIGNvbnN0IHAgPSB7XG4gICAgbWluSW50OiAxLFxuICAgIG1pbkZyYWM6IDAsXG4gICAgbWF4RnJhYzogMCxcbiAgICBwb3NQcmU6ICcnLFxuICAgIHBvc1N1ZjogJycsXG4gICAgbmVnUHJlOiAnJyxcbiAgICBuZWdTdWY6ICcnLFxuICAgIGdTaXplOiAwLFxuICAgIGxnU2l6ZTogMCxcbiAgfTtcblxuICBjb25zdCBwYXR0ZXJuUGFydHMgPSBmb3JtYXQuc3BsaXQoUEFUVEVSTl9TRVApO1xuICBjb25zdCBwb3NpdGl2ZSA9IHBhdHRlcm5QYXJ0c1swXTtcbiAgY29uc3QgbmVnYXRpdmUgPSBwYXR0ZXJuUGFydHNbMV07XG5cbiAgY29uc3QgcG9zaXRpdmVQYXJ0cyA9XG4gICAgICBwb3NpdGl2ZS5pbmRleE9mKERFQ0lNQUxfU0VQKSAhPT0gLTFcbiAgICAgICAgPyBwb3NpdGl2ZS5zcGxpdChERUNJTUFMX1NFUClcbiAgICAgICAgOiBbXG4gICAgICAgICAgICBwb3NpdGl2ZS5zdWJzdHJpbmcoMCwgcG9zaXRpdmUubGFzdEluZGV4T2YoWkVST19DSEFSKSArIDEpLFxuICAgICAgICAgICAgcG9zaXRpdmUuc3Vic3RyaW5nKHBvc2l0aXZlLmxhc3RJbmRleE9mKFpFUk9fQ0hBUikgKyAxKSxcbiAgICAgICAgICBdLFxuICAgIGludGVnZXIgPSBwb3NpdGl2ZVBhcnRzWzBdLFxuICAgIGZyYWN0aW9uID0gcG9zaXRpdmVQYXJ0c1sxXSB8fCAnJztcblxuICBwLnBvc1ByZSA9IGludGVnZXIuc3Vic3RyaW5nKDAsIGludGVnZXIuaW5kZXhPZihESUdJVF9DSEFSKSk7XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBmcmFjdGlvbi5sZW5ndGg7IGkrKykge1xuICAgIGNvbnN0IGNoID0gZnJhY3Rpb24uY2hhckF0KGkpO1xuICAgIGlmIChjaCA9PT0gWkVST19DSEFSKSB7XG4gICAgICBwLm1pbkZyYWMgPSBwLm1heEZyYWMgPSBpICsgMTtcbiAgICB9IGVsc2UgaWYgKGNoID09PSBESUdJVF9DSEFSKSB7XG4gICAgICBwLm1heEZyYWMgPSBpICsgMTtcbiAgICB9IGVsc2Uge1xuICAgICAgcC5wb3NTdWYgKz0gY2g7XG4gICAgfVxuICB9XG5cbiAgY29uc3QgZ3JvdXBzID0gaW50ZWdlci5zcGxpdChHUk9VUF9TRVApO1xuICBwLmdTaXplID0gZ3JvdXBzWzFdID8gZ3JvdXBzWzFdLmxlbmd0aCA6IDA7XG4gIHAubGdTaXplID0gZ3JvdXBzWzJdIHx8IGdyb3Vwc1sxXSA/IChncm91cHNbMl0gfHwgZ3JvdXBzWzFdKS5sZW5ndGggOiAwO1xuXG4gIGlmIChuZWdhdGl2ZSkge1xuICAgIGNvbnN0IHRydW5rTGVuID0gcG9zaXRpdmUubGVuZ3RoIC0gcC5wb3NQcmUubGVuZ3RoIC0gcC5wb3NTdWYubGVuZ3RoLFxuICAgICAgcG9zID0gbmVnYXRpdmUuaW5kZXhPZihESUdJVF9DSEFSKTtcblxuICAgIHAubmVnUHJlID0gbmVnYXRpdmUuc3Vic3RyaW5nKDAsIHBvcykucmVwbGFjZSgvJy9nLCAnJyk7XG4gICAgcC5uZWdTdWYgPSBuZWdhdGl2ZS5zbGljZShwb3MgKyB0cnVua0xlbikucmVwbGFjZSgvJy9nLCAnJyk7XG4gIH0gZWxzZSB7XG4gICAgcC5uZWdQcmUgPSBtaW51c1NpZ24gKyBwLnBvc1ByZTtcbiAgICBwLm5lZ1N1ZiA9IHAucG9zU3VmO1xuICB9XG5cbiAgcmV0dXJuIHA7XG59XG5cbmludGVyZmFjZSBQYXJzZWROdW1iZXIge1xuICAvLyBhbiBhcnJheSBvZiBkaWdpdHMgY29udGFpbmluZyBsZWFkaW5nIHplcm9zIGFzIG5lY2Vzc2FyeVxuICBkaWdpdHM6IG51bWJlcltdO1xuICAvLyB0aGUgZXhwb25lbnQgZm9yIG51bWJlcnMgdGhhdCB3b3VsZCBuZWVkIG1vcmUgdGhhbiBgTUFYX0RJR0lUU2AgZGlnaXRzIGluIGBkYFxuICBleHBvbmVudDogbnVtYmVyO1xuICAvLyB0aGUgbnVtYmVyIG9mIHRoZSBkaWdpdHMgaW4gYGRgIHRoYXQgYXJlIHRvIHRoZSBsZWZ0IG9mIHRoZSBkZWNpbWFsIHBvaW50XG4gIGludGVnZXJMZW46IG51bWJlcjtcbn1cblxuLy8gVHJhbnNmb3JtcyBhIHBhcnNlZCBudW1iZXIgaW50byBhIHBlcmNlbnRhZ2UgYnkgbXVsdGlwbHlpbmcgaXQgYnkgMTAwXG5mdW5jdGlvbiB0b1BlcmNlbnQocGFyc2VkTnVtYmVyOiBQYXJzZWROdW1iZXIpOiBQYXJzZWROdW1iZXIge1xuICAvLyBpZiB0aGUgbnVtYmVyIGlzIDAsIGRvbid0IGRvIGFueXRoaW5nXG4gIGlmIChwYXJzZWROdW1iZXIuZGlnaXRzWzBdID09PSAwKSB7XG4gICAgcmV0dXJuIHBhcnNlZE51bWJlcjtcbiAgfVxuXG4gIC8vIEdldHRpbmcgdGhlIGN1cnJlbnQgbnVtYmVyIG9mIGRlY2ltYWxzXG4gIGNvbnN0IGZyYWN0aW9uTGVuID0gcGFyc2VkTnVtYmVyLmRpZ2l0cy5sZW5ndGggLSBwYXJzZWROdW1iZXIuaW50ZWdlckxlbjtcbiAgaWYgKHBhcnNlZE51bWJlci5leHBvbmVudCkge1xuICAgIHBhcnNlZE51bWJlci5leHBvbmVudCArPSAyO1xuICB9IGVsc2Uge1xuICAgIGlmIChmcmFjdGlvbkxlbiA9PT0gMCkge1xuICAgICAgcGFyc2VkTnVtYmVyLmRpZ2l0cy5wdXNoKDAsIDApO1xuICAgIH0gZWxzZSBpZiAoZnJhY3Rpb25MZW4gPT09IDEpIHtcbiAgICAgIHBhcnNlZE51bWJlci5kaWdpdHMucHVzaCgwKTtcbiAgICB9XG4gICAgcGFyc2VkTnVtYmVyLmludGVnZXJMZW4gKz0gMjtcbiAgfVxuXG4gIHJldHVybiBwYXJzZWROdW1iZXI7XG59XG5cbi8qKlxuICogUGFyc2VzIGEgbnVtYmVyLlxuICogU2lnbmlmaWNhbnQgYml0cyBvZiB0aGlzIHBhcnNlIGFsZ29yaXRobSBjYW1lIGZyb20gaHR0cHM6Ly9naXRodWIuY29tL01pa2VNY2wvYmlnLmpzL1xuICovXG5mdW5jdGlvbiBwYXJzZU51bWJlcihudW06IG51bWJlcik6IFBhcnNlZE51bWJlciB7XG4gIGxldCBudW1TdHIgPSBNYXRoLmFicyhudW0pICsgJyc7XG4gIGxldCBleHBvbmVudCA9IDAsXG4gICAgZGlnaXRzLFxuICAgIGludGVnZXJMZW47XG4gIGxldCBpLCBqLCB6ZXJvcztcblxuICAvLyBEZWNpbWFsIHBvaW50P1xuICBpZiAoKGludGVnZXJMZW4gPSBudW1TdHIuaW5kZXhPZihERUNJTUFMX1NFUCkpID4gLTEpIHtcbiAgICBudW1TdHIgPSBudW1TdHIucmVwbGFjZShERUNJTUFMX1NFUCwgJycpO1xuICB9XG5cbiAgLy8gRXhwb25lbnRpYWwgZm9ybT9cbiAgaWYgKChpID0gbnVtU3RyLnNlYXJjaCgvZS9pKSkgPiAwKSB7XG4gICAgLy8gV29yayBvdXQgdGhlIGV4cG9uZW50LlxuICAgIGlmIChpbnRlZ2VyTGVuIDwgMCkgaW50ZWdlckxlbiA9IGk7XG4gICAgaW50ZWdlckxlbiArPSArbnVtU3RyLnNsaWNlKGkgKyAxKTtcbiAgICBudW1TdHIgPSBudW1TdHIuc3Vic3RyaW5nKDAsIGkpO1xuICB9IGVsc2UgaWYgKGludGVnZXJMZW4gPCAwKSB7XG4gICAgLy8gVGhlcmUgd2FzIG5vIGRlY2ltYWwgcG9pbnQgb3IgZXhwb25lbnQgc28gaXQgaXMgYW4gaW50ZWdlci5cbiAgICBpbnRlZ2VyTGVuID0gbnVtU3RyLmxlbmd0aDtcbiAgfVxuXG4gIC8vIENvdW50IHRoZSBudW1iZXIgb2YgbGVhZGluZyB6ZXJvcy5cbiAgZm9yIChpID0gMDsgbnVtU3RyLmNoYXJBdChpKSA9PT0gWkVST19DSEFSOyBpKyspIHtcbiAgICAvKiBlbXB0eSAqL1xuICB9XG5cbiAgaWYgKGkgPT09ICh6ZXJvcyA9IG51bVN0ci5sZW5ndGgpKSB7XG4gICAgLy8gVGhlIGRpZ2l0cyBhcmUgYWxsIHplcm8uXG4gICAgZGlnaXRzID0gWzBdO1xuICAgIGludGVnZXJMZW4gPSAxO1xuICB9IGVsc2Uge1xuICAgIC8vIENvdW50IHRoZSBudW1iZXIgb2YgdHJhaWxpbmcgemVyb3NcbiAgICB6ZXJvcy0tO1xuICAgIHdoaWxlIChudW1TdHIuY2hhckF0KHplcm9zKSA9PT0gWkVST19DSEFSKSB6ZXJvcy0tO1xuXG4gICAgLy8gVHJhaWxpbmcgemVyb3MgYXJlIGluc2lnbmlmaWNhbnQgc28gaWdub3JlIHRoZW1cbiAgICBpbnRlZ2VyTGVuIC09IGk7XG4gICAgZGlnaXRzID0gW107XG4gICAgLy8gQ29udmVydCBzdHJpbmcgdG8gYXJyYXkgb2YgZGlnaXRzIHdpdGhvdXQgbGVhZGluZy90cmFpbGluZyB6ZXJvcy5cbiAgICBmb3IgKGogPSAwOyBpIDw9IHplcm9zOyBpKyssIGorKykge1xuICAgICAgZGlnaXRzW2pdID0gTnVtYmVyKG51bVN0ci5jaGFyQXQoaSkpO1xuICAgIH1cbiAgfVxuXG4gIC8vIElmIHRoZSBudW1iZXIgb3ZlcmZsb3dzIHRoZSBtYXhpbXVtIGFsbG93ZWQgZGlnaXRzIHRoZW4gdXNlIGFuIGV4cG9uZW50LlxuICBpZiAoaW50ZWdlckxlbiA+IE1BWF9ESUdJVFMpIHtcbiAgICBkaWdpdHMgPSBkaWdpdHMuc3BsaWNlKDAsIE1BWF9ESUdJVFMgLSAxKTtcbiAgICBleHBvbmVudCA9IGludGVnZXJMZW4gLSAxO1xuICAgIGludGVnZXJMZW4gPSAxO1xuICB9XG5cbiAgcmV0dXJuIHtkaWdpdHMsIGV4cG9uZW50LCBpbnRlZ2VyTGVufTtcbn1cblxuLyoqXG4gKiBSb3VuZCB0aGUgcGFyc2VkIG51bWJlciB0byB0aGUgc3BlY2lmaWVkIG51bWJlciBvZiBkZWNpbWFsIHBsYWNlc1xuICogVGhpcyBmdW5jdGlvbiBjaGFuZ2VzIHRoZSBwYXJzZWROdW1iZXIgaW4tcGxhY2VcbiAqL1xuZnVuY3Rpb24gcm91bmROdW1iZXIocGFyc2VkTnVtYmVyOiBQYXJzZWROdW1iZXIsIG1pbkZyYWM6IG51bWJlciwgbWF4RnJhYzogbnVtYmVyKSB7XG4gIGlmIChtaW5GcmFjID4gbWF4RnJhYykge1xuICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgIGBUaGUgbWluaW11bSBudW1iZXIgb2YgZGlnaXRzIGFmdGVyIGZyYWN0aW9uICgke21pbkZyYWN9KSBpcyBoaWdoZXIgdGhhbiB0aGUgbWF4aW11bSAoJHttYXhGcmFjfSkuYCxcbiAgICApO1xuICB9XG5cbiAgbGV0IGRpZ2l0cyA9IHBhcnNlZE51bWJlci5kaWdpdHM7XG4gIGxldCBmcmFjdGlvbkxlbiA9IGRpZ2l0cy5sZW5ndGggLSBwYXJzZWROdW1iZXIuaW50ZWdlckxlbjtcbiAgY29uc3QgZnJhY3Rpb25TaXplID0gTWF0aC5taW4oTWF0aC5tYXgobWluRnJhYywgZnJhY3Rpb25MZW4pLCBtYXhGcmFjKTtcblxuICAvLyBUaGUgaW5kZXggb2YgdGhlIGRpZ2l0IHRvIHdoZXJlIHJvdW5kaW5nIGlzIHRvIG9jY3VyXG4gIGxldCByb3VuZEF0ID0gZnJhY3Rpb25TaXplICsgcGFyc2VkTnVtYmVyLmludGVnZXJMZW47XG4gIGxldCBkaWdpdCA9IGRpZ2l0c1tyb3VuZEF0XTtcblxuICBpZiAocm91bmRBdCA+IDApIHtcbiAgICAvLyBEcm9wIGZyYWN0aW9uYWwgZGlnaXRzIGJleW9uZCBgcm91bmRBdGBcbiAgICBkaWdpdHMuc3BsaWNlKE1hdGgubWF4KHBhcnNlZE51bWJlci5pbnRlZ2VyTGVuLCByb3VuZEF0KSk7XG5cbiAgICAvLyBTZXQgbm9uLWZyYWN0aW9uYWwgZGlnaXRzIGJleW9uZCBgcm91bmRBdGAgdG8gMFxuICAgIGZvciAobGV0IGogPSByb3VuZEF0OyBqIDwgZGlnaXRzLmxlbmd0aDsgaisrKSB7XG4gICAgICBkaWdpdHNbal0gPSAwO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICAvLyBXZSByb3VuZGVkIHRvIHplcm8gc28gcmVzZXQgdGhlIHBhcnNlZE51bWJlclxuICAgIGZyYWN0aW9uTGVuID0gTWF0aC5tYXgoMCwgZnJhY3Rpb25MZW4pO1xuICAgIHBhcnNlZE51bWJlci5pbnRlZ2VyTGVuID0gMTtcbiAgICBkaWdpdHMubGVuZ3RoID0gTWF0aC5tYXgoMSwgKHJvdW5kQXQgPSBmcmFjdGlvblNpemUgKyAxKSk7XG4gICAgZGlnaXRzWzBdID0gMDtcbiAgICBmb3IgKGxldCBpID0gMTsgaSA8IHJvdW5kQXQ7IGkrKykgZGlnaXRzW2ldID0gMDtcbiAgfVxuXG4gIGlmIChkaWdpdCA+PSA1KSB7XG4gICAgaWYgKHJvdW5kQXQgLSAxIDwgMCkge1xuICAgICAgZm9yIChsZXQgayA9IDA7IGsgPiByb3VuZEF0OyBrLS0pIHtcbiAgICAgICAgZGlnaXRzLnVuc2hpZnQoMCk7XG4gICAgICAgIHBhcnNlZE51bWJlci5pbnRlZ2VyTGVuKys7XG4gICAgICB9XG4gICAgICBkaWdpdHMudW5zaGlmdCgxKTtcbiAgICAgIHBhcnNlZE51bWJlci5pbnRlZ2VyTGVuKys7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRpZ2l0c1tyb3VuZEF0IC0gMV0rKztcbiAgICB9XG4gIH1cblxuICAvLyBQYWQgb3V0IHdpdGggemVyb3MgdG8gZ2V0IHRoZSByZXF1aXJlZCBmcmFjdGlvbiBsZW5ndGhcbiAgZm9yICg7IGZyYWN0aW9uTGVuIDwgTWF0aC5tYXgoMCwgZnJhY3Rpb25TaXplKTsgZnJhY3Rpb25MZW4rKykgZGlnaXRzLnB1c2goMCk7XG5cbiAgbGV0IGRyb3BUcmFpbGluZ1plcm9zID0gZnJhY3Rpb25TaXplICE9PSAwO1xuICAvLyBNaW5pbWFsIGxlbmd0aCA9IG5iIG9mIGRlY2ltYWxzIHJlcXVpcmVkICsgY3VycmVudCBuYiBvZiBpbnRlZ2Vyc1xuICAvLyBBbnkgbnVtYmVyIGJlc2lkZXMgdGhhdCBpcyBvcHRpb25hbCBhbmQgY2FuIGJlIHJlbW92ZWQgaWYgaXQncyBhIHRyYWlsaW5nIDBcbiAgY29uc3QgbWluTGVuID0gbWluRnJhYyArIHBhcnNlZE51bWJlci5pbnRlZ2VyTGVuO1xuICAvLyBEbyBhbnkgY2FycnlpbmcsIGUuZy4gYSBkaWdpdCB3YXMgcm91bmRlZCB1cCB0byAxMFxuICBjb25zdCBjYXJyeSA9IGRpZ2l0cy5yZWR1Y2VSaWdodChmdW5jdGlvbiAoY2FycnksIGQsIGksIGRpZ2l0cykge1xuICAgIGQgPSBkICsgY2Fycnk7XG4gICAgZGlnaXRzW2ldID0gZCA8IDEwID8gZCA6IGQgLSAxMDsgLy8gZCAlIDEwXG4gICAgaWYgKGRyb3BUcmFpbGluZ1plcm9zKSB7XG4gICAgICAvLyBEbyBub3Qga2VlcCBtZWFuaW5nbGVzcyBmcmFjdGlvbmFsIHRyYWlsaW5nIHplcm9zIChlLmcuIDE1LjUyMDAwIC0tPiAxNS41MilcbiAgICAgIGlmIChkaWdpdHNbaV0gPT09IDAgJiYgaSA+PSBtaW5MZW4pIHtcbiAgICAgICAgZGlnaXRzLnBvcCgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZHJvcFRyYWlsaW5nWmVyb3MgPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGQgPj0gMTAgPyAxIDogMDsgLy8gTWF0aC5mbG9vcihkIC8gMTApO1xuICB9LCAwKTtcbiAgaWYgKGNhcnJ5KSB7XG4gICAgZGlnaXRzLnVuc2hpZnQoY2FycnkpO1xuICAgIHBhcnNlZE51bWJlci5pbnRlZ2VyTGVuKys7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlSW50QXV0b1JhZGl4KHRleHQ6IHN0cmluZyk6IG51bWJlciB7XG4gIGNvbnN0IHJlc3VsdDogbnVtYmVyID0gcGFyc2VJbnQodGV4dCk7XG4gIGlmIChpc05hTihyZXN1bHQpKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIGludGVnZXIgbGl0ZXJhbCB3aGVuIHBhcnNpbmcgJyArIHRleHQpO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG4iXX0=