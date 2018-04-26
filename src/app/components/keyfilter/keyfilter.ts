import { NgModule, Directive, ElementRef, HostBinding, HostListener, Input, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomHandler } from '../dom/domhandler';
import { Validator, AbstractControl, NG_VALIDATORS } from '@angular/forms';

export const KEYFILTER_VALIDATOR: any = {
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => KeyFilter),
    multi: true
};

@Directive({
    selector: '[pKeyFilter]',
    providers: [DomHandler, KEYFILTER_VALIDATOR]
})
export class KeyFilter implements Validator {

    static DEFAULT_MASKS = {
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

    static KEYS = {
        TAB: 9,
        RETURN: 13,
        ESC: 27,
        BACKSPACE: 8,
        DELETE: 46
    };

    static SAFARI_KEYS = {
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

    @Input() pValidateOnly: boolean;

    regex: RegExp;

    _pattern: any;

    constructor(public el: ElementRef, public domHandler: DomHandler) { }

    get pattern(): any {
        return this._pattern;
    }

    @Input('pKeyFilter') set pattern(_pattern: any) {
        this._pattern = _pattern;
        this.regex = KeyFilter.DEFAULT_MASKS[this._pattern] || this._pattern;
    }

    isNavKeyPress(e: KeyboardEvent) {
        let k = e.keyCode;
        k = this.domHandler.getBrowser().safari ? (KeyFilter.SAFARI_KEYS[k] || k) : k;

        return (k >= 33 && k <= 40) || k == KeyFilter.KEYS.RETURN || k == KeyFilter.KEYS.TAB || k == KeyFilter.KEYS.ESC;
    };

    isSpecialKey(e: KeyboardEvent) {
        let k = e.keyCode;
        let c = e.charCode;

        return k == 9 || k == 13 || k == 27 || k == 16 || k == 17 ||(k >= 18 && k <= 20) ||
            (this.domHandler.getBrowser().opera && !e.shiftKey && (k == 8 || (k >= 33 && k <= 35) || (k >= 36 && k <= 39) || (k >= 44 && k <= 45)));
    }


    getKey(e: KeyboardEvent) {
        let k = e.keyCode || e.charCode;
        return this.domHandler.getBrowser().safari ? (KeyFilter.SAFARI_KEYS[k] || k) : k;
    }

    getCharCode(e: KeyboardEvent) {
        return e.charCode || e.keyCode || e.which;
    };

    @HostListener('keypress', ['$event'])
    onKeyPress(e: KeyboardEvent) {
        if(this.pValidateOnly) {
            return;
        }
        
        let browser = this.domHandler.getBrowser();

        if (e.ctrlKey || e.altKey) {
            return;
        }

        let k = this.getKey(e);
        if (browser.mozilla && (this.isNavKeyPress(e) || k == KeyFilter.KEYS.BACKSPACE || (k == KeyFilter.KEYS.DELETE && e.charCode == 0))) {
            return;
        }

        let c = this.getCharCode(e);
        let cc = String.fromCharCode(c);
        let ok = true;

        if (browser.mozilla && (this.isSpecialKey(e) || !cc)) {
            return;
        }

        ok = this.regex.test(cc);

        if (!ok) {
            e.preventDefault();
        }
    }

    validate(c: AbstractControl): { [key: string]: any } {
        if(this.pValidateOnly) {
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
