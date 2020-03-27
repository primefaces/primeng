import { NgModule, Directive, ElementRef, HostListener, Input, forwardRef, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomHandler } from 'primeng/dom';
import { Validator, AbstractControl, NG_VALIDATORS } from '@angular/forms';

export const KEYFILTER_VALIDATOR: any = {
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => KeyFilter),
    multi: true
};

const DEFAULT_MASKS = {
    pint: /[\d]/,
    'int': /[\d\-]/,
    pnum: /[\d\.]/,
    money: /[\d\.\s,]/,
    num: /[\d\-\.]/,
    hex: /[0-9a-f]/i,
    email: /[a-z0-9_\.\-@]/i,
    alpha: /[a-z_]/i,
    alphanum: /[a-z0-9_]/i
};

const KEYS = {
    TAB: 9,
    RETURN: 13,
    ESC: 27,
    BACKSPACE: 8,
    DELETE: 46
};

const SAFARI_KEYS = {
    63234: 37, // left
    63235: 39, // right
    63232: 38, // up
    63233: 40, // down
    63276: 33, // page up
    63277: 34, // page down
    63272: 46, // delete
    63273: 36, // home
    63275: 35  // end
};

@Directive({
    selector: '[pKeyFilter]',
    providers: [KEYFILTER_VALIDATOR]
})
export class KeyFilter implements Validator {

    @Input() pValidateOnly: boolean;

    @Output() ngModelChange: EventEmitter<any> = new EventEmitter();

    regex: RegExp;

    _pattern: any;

    isAndroid: boolean;

    lastValue: any;

    constructor(public el: ElementRef) {
        this.isAndroid = DomHandler.isAndroid();
    }

    get pattern(): any {
        return this._pattern;
    }

    @Input('pKeyFilter') set pattern(_pattern: any) {
        this._pattern = _pattern;
        this.regex = DEFAULT_MASKS[this._pattern] || this._pattern;
    }

    isNavKeyPress(e: KeyboardEvent) {
        let k = e.keyCode;
        k = DomHandler.getBrowser().safari ? (SAFARI_KEYS[k] || k) : k;

        return (k >= 33 && k <= 40) || k == KEYS.RETURN || k == KEYS.TAB || k == KEYS.ESC;
    };

    isSpecialKey(e: KeyboardEvent) {
        let k = e.keyCode || e.charCode;

        return k == 9 || k == 13 || k == 27 || k == 16 || k == 17 ||(k >= 18 && k <= 20) ||
            (DomHandler.getBrowser().opera && !e.shiftKey && (k == 8 || (k >= 33 && k <= 35) || (k >= 36 && k <= 39) || (k >= 44 && k <= 45)));
    }


    getKey(e: KeyboardEvent) {
        let k = e.keyCode || e.charCode;
        return DomHandler.getBrowser().safari ? (SAFARI_KEYS[k] || k) : k;
    }

    getCharCode(e: KeyboardEvent) {
        return e.charCode || e.keyCode || e.which;
    }

    findDelta(value: string, prevValue: string) {
        let delta = '';

        for (let i = 0; i < value.length; i++) {
            let str = value.substr(0, i) + value.substr(i + value.length - prevValue.length);

            if (str === prevValue)
                delta = value.substr(i, value.length - prevValue.length);
        }

        return delta;
    }

    isValidChar(c: string) {
        return this.regex.test(c);
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
            }
            else if (!removed) {
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
        }
        else if (k == 17 || k == 18) {
            return;
        }

        let c = this.getCharCode(e);
        let cc = String.fromCharCode(c);
        let ok = true;

        if (!browser.mozilla && (this.isSpecialKey(e) || !cc)) {
            return;
        }

        ok = this.regex.test(cc);

        if (!ok) {
            e.preventDefault();
        }
    }

    @HostListener('paste', ['$event'])
    onPaste(e) {
        const clipboardData = e.clipboardData || (<any>window).clipboardData.getData('text');
        if (clipboardData) {
            const pastedText = clipboardData.getData('text');
            for (let char of pastedText.toString()) {
                if (!this.regex.test(char)) {
                    e.preventDefault();
                    return;
                }
            }
        }
    }

    validate(c: AbstractControl): { [key: string]: any } {
        if (this.pValidateOnly) {
            let value = this.el.nativeElement.value;
            if (value && !this.regex.test(value)) {
                return {
                    validatePattern: false
                }
            }
        }
    }

}

@NgModule({
    imports: [CommonModule],
    exports: [KeyFilter],
    declarations: [KeyFilter]
})
export class KeyFilterModule { }
