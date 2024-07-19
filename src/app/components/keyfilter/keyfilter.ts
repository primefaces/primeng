import { CommonModule, DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Directive, ElementRef, EventEmitter, HostListener, Inject, Input, NgModule, Output, PLATFORM_ID, Provider, booleanAttribute, forwardRef } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, Validator } from '@angular/forms';
import { DomHandler } from 'primeng/dom';
import { KeyFilterPattern } from './keyfilter.interface';

export const KEYFILTER_VALIDATOR: Provider = {
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => KeyFilter),
    multi: true
};

type SafariKeys = {
    63234: number;
    63235: number;
    63232: number;
    63233: number;
    63276: number;
    63277: number;
    63272: number;
    63273: number;
    63275: number;
};

type Keys = {
    TAB: number;
    RETURN: number;
    ESC: number;
    BACKSPACE: number;
    DELETE: number;
};

const DEFAULT_MASKS: Record<KeyFilterPattern, RegExp> = {
    pint: /^[\d]*$/,
    int: /^[-]?[\d]*$/,
    pnum: /^[\d\.]*$/,
    money: /^[\d\.\s,]*$/,
    num: /^[-]?[\d\.]*$/,
    hex: /^[0-9a-f]*$/i,
    email: /^[a-z0-9_\.\-@]*$/i,
    alpha: /^[a-z_]*$/i,
    alphanum: /^[a-z0-9_]*$/i
};

const KEYS: Keys = {
    TAB: 9,
    RETURN: 13,
    ESC: 27,
    BACKSPACE: 8,
    DELETE: 46
};

const SAFARI_KEYS: SafariKeys = {
    63234: 37, // left
    63235: 39, // right
    63232: 38, // up
    63233: 40, // down
    63276: 33, // page up
    63277: 34, // page down
    63272: 46, // delete
    63273: 36, // home
    63275: 35 // end
};
/**
 * KeyFilter Directive is a built-in feature of InputText to restrict user input based on a regular expression.
 * @group Components
 */
@Directive({
    selector: '[pKeyFilter]',
    providers: [KEYFILTER_VALIDATOR]
})
export class KeyFilter implements Validator {
    /**
     * When enabled, instead of blocking keys, input is validated internally to test against the regular expression.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) pValidateOnly: boolean | undefined;
    /**
     * Sets the pattern for key filtering.
     * @group Props
     */

    @Input('pKeyFilter') set pattern(_pattern: RegExp | KeyFilterPattern | null | undefined) {
        this._pattern = _pattern;

        if (_pattern instanceof RegExp) {
            this.regex = _pattern;
        } else if (_pattern in DEFAULT_MASKS) {
            this.regex = DEFAULT_MASKS[_pattern];
        } else {
            this.regex = /./;
        }
    }
    get pattern(): RegExp | KeyFilterPattern | null | undefined {
        return this._pattern;
    }

    /**
     * Emits a value whenever the ngModel of the component changes.
     * @param {(string | number)} modelValue - Custom model change event.
     * @group Emits
     */
    @Output() ngModelChange: EventEmitter<string | number> = new EventEmitter<string | number>();

    regex: RegExp = /./;

    _pattern: RegExp | KeyFilterPattern | null | undefined;

    isAndroid: boolean;

    lastValue: any;

    constructor(@Inject(DOCUMENT) private document: Document, @Inject(PLATFORM_ID) private platformId: any, public el: ElementRef) {
        if (isPlatformBrowser(this.platformId)) {
            this.isAndroid = DomHandler.isAndroid();
        } else {
            this.isAndroid = false;
        }
    }

    isNavKeyPress(e: KeyboardEvent) {
        let k = e.keyCode;
        k = DomHandler.getBrowser().safari ? (SAFARI_KEYS as any)[k] || k : k;

        return (k >= 33 && k <= 40) || k == KEYS.RETURN || k == KEYS.TAB || k == KEYS.ESC;
    }

    isSpecialKey(e: KeyboardEvent) {
        let k = e.keyCode || e.charCode;

        return k == 9 || k == 13 || k == 27 || k == 16 || k == 17 || (k >= 18 && k <= 20) || (DomHandler.getBrowser().opera && !e.shiftKey && (k == 8 || (k >= 33 && k <= 35) || (k >= 36 && k <= 39) || (k >= 44 && k <= 45)));
    }

    getKey(e: KeyboardEvent) {
        let k = e.keyCode || e.charCode;
        return DomHandler.getBrowser().safari ? (SAFARI_KEYS as any)[k] || k : k;
    }

    getCharCode(e: KeyboardEvent) {
        return e.charCode || e.keyCode || e.which;
    }

    findDelta(value: string, prevValue: string) {
        let delta = '';

        for (let i = 0; i < value.length; i++) {
            let str = value.substr(0, i) + value.substr(i + value.length - prevValue.length);

            if (str === prevValue) delta = value.substr(i, value.length - prevValue.length);
        }

        return delta;
    }

    isValidChar(c: string) {
        return (<RegExp>this.regex).test(c);
    }

    isValidString(str: string) {
        for (let i = 0; i < str.length; i++) {
            if (!this.isValidChar(str.substr(i, 1))) {
                return false;
            }
        }

        return true;
    }

    @HostListener('input', ['$event'])
    onInput(e: KeyboardEvent) {
        if (this.isAndroid && !this.pValidateOnly) {
            let val = this.el.nativeElement.value;
            let lastVal = this.lastValue || '';

            let inserted = this.findDelta(val, lastVal);
            let removed = this.findDelta(lastVal, val);
            let pasted = inserted.length > 1 || (!inserted && !removed);

            if (pasted) {
                if (!this.isValidString(val)) {
                    this.el.nativeElement.value = lastVal;
                    this.ngModelChange.emit(lastVal);
                }
            } else if (!removed) {
                if (!this.isValidChar(inserted)) {
                    this.el.nativeElement.value = lastVal;
                    this.ngModelChange.emit(lastVal);
                }
            }

            val = this.el.nativeElement.value;
            if (this.isValidString(val)) {
                this.lastValue = val;
            }
        }
    }

    @HostListener('keypress', ['$event'])
    onKeyPress(e: KeyboardEvent) {
        if (this.isAndroid || this.pValidateOnly) {
            return;
        }

        let browser = DomHandler.getBrowser();
        let k = this.getKey(e);

        if (browser.mozilla && (e.ctrlKey || e.altKey)) {
            return;
        } else if (k == 17 || k == 18) {
            return;
        }

        // Enter key
        if (k == 13) {
            return;
        }

        let c = this.getCharCode(e);
        let cc = String.fromCharCode(c);
        let ok = true;

        if (!browser.mozilla && (this.isSpecialKey(e) || !cc)) {
            return;
        }
        let val = this.el.nativeElement.value + cc;
        ok = (<RegExp>this.regex).test(val);

        if (!ok) {
            e.preventDefault();
        }
    }

    @HostListener('paste', ['$event'])
    onPaste(e: ClipboardEvent) {
        const clipboardData = e.clipboardData || (<any>this.document.defaultView).clipboardData.getData('text');
        if (clipboardData) {
            let pattern = /\{[0-9]+\}/;
            const pastedText = clipboardData.getData('text');
            if (pattern.test(this.regex.toString())) {
                if (!this.regex.test(pastedText)) {
                    e.preventDefault();
                    return;
                }
            } else {
                for (let char of pastedText.toString()) {
                    if (!this.regex.test(char)) {
                        e.preventDefault();
                        return;
                    }
                }
            }
        }
    }

    validate(c: AbstractControl): { [key: string]: any } | any {
        if (this.pValidateOnly) {
            let value = this.el.nativeElement.value;
            if (value && !this.regex.test(value)) {
                return {
                    validatePattern: false
                };
            }
        }
    }
}

@NgModule({
    imports: [CommonModule],
    exports: [KeyFilter],
    declarations: [KeyFilter]
})
export class KeyFilterModule {}
