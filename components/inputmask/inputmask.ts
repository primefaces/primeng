/* 
    Port of jQuery MaskedInput by DigitalBush as a Native Angular2 Component 
    https://github.com/digitalBush/jquery.maskedinput/
*/
import {NgModule,Component,ElementRef,AfterViewInit,OnDestroy,HostBinding,HostListener,Input,forwardRef,Output,EventEmitter} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DomHandler} from '../dom/domhandler';
import {InputTextModule} from '../inputtext/inputtext';
import {NG_VALUE_ACCESSOR, ControlValueAccessor} from '@angular/forms';

export const INPUTMASK_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => InputMask),
  multi: true
};

@Component({
    selector: 'p-inputMask',
    template: `<input pInputText type="text" [value]="value||''" [ngStyle]="style" [ngClass]="styleClass" [placeholder]="placeholder"
        [attr.size]="size" [attr.maxlength]="maxlength" [attr.tabindex]="tabindex" [disabled]="disabled" [readonly]="readonly"
        (focus)="onFocus($event)" (blur)="onBlur($event)" (keydown)="onKeyDown($event)" (keypress)="onKeyPress($event)"
        (input)="onInput($event)" (paste)="handleInputChange($event)">`,
    providers: [INPUTMASK_VALUE_ACCESSOR,DomHandler]
})
export class InputMask implements AfterViewInit,OnDestroy,ControlValueAccessor {

    @Input() mask: string;
    
    @Input() slotChar: string = '_';
    
    @Input() autoClear: boolean = true;
    
    @Input() dataName: string = 'pInputMask';
    
    @Input() style: string;
    
    @Input() styleClass: string;
    
    @Input() placeholder: string;
            
    @Input() size: number;
    
    @Input() maxlength: number;
    
    @Input() tabindex: string;
    
    @Input() disabled: boolean;
    
    @Input() readonly: boolean;
    
    @Output() onComplete: EventEmitter<any> = new EventEmitter();
        
    value: any;
    
    onModelChange: Function = () => {};
    
    onModelTouched: Function = () => {};
    
    input: HTMLInputElement;
    
    defs: any;
    
    tests: any[];
    
    partialPosition: any;
    
    firstNonMaskPos: number;
    
    lastRequiredNonMaskPos: any;
    
    len: number;
    
    oldVal: string;
    
    buffer: any;
    
    defaultBuffer: string;
    
    focusText: string;
    
    caretTimeoutId: any;
    
    androidChrome: boolean;
            
    constructor(protected el: ElementRef, protected domHandler: DomHandler) {}
        
    ngAfterViewInit() {
        this.input = this.el.nativeElement.children[0];
        this.tests = [];
        this.partialPosition = this.mask.length;
        this.len = this.mask.length;
        this.firstNonMaskPos = null;
        this.defs = {
            '9': '[0-9]',
            'a': '[A-Za-z]',
            '*': '[A-Za-z0-9]'
        };
        
        let ua = this.domHandler.getUserAgent();
        this.androidChrome = /chrome/i.test(ua) && /android/i.test(ua);
        
        let maskTokens = this.mask.split('');
        for(let i = 0; i < maskTokens.length; i++) {
            let c = maskTokens[i];
            if (c == '?') {
				this.len--;
				this.partialPosition = i;
			} 
            else if (this.defs[c]) {
				this.tests.push(new RegExp(this.defs[c]));
				if(this.firstNonMaskPos === null) {
	                this.firstNonMaskPos = this.tests.length - 1;
				}
                if(i < this.partialPosition){
                    this.lastRequiredNonMaskPos = this.tests.length - 1;
                }
			} 
            else {
				this.tests.push(null);
			}
        }
        
        this.buffer = [];
        for(let i = 0; i < maskTokens.length; i++) {
            let c = maskTokens[i];
            if(c != '?') {
                if(this.defs[c])
                    this.buffer.push(this.getPlaceholder(i));
                else
                    this.buffer.push(c);
            }
        }
        this.defaultBuffer = this.buffer.join('');
        this.focusText = this.input.value;
        
        this.checkVal(); //Perform initial check for existing values
    }
    
    writeValue(value: any) : void {
        this.value = value;
    }
    
    registerOnChange(fn: Function): void {
        this.onModelChange = fn;
    }

    registerOnTouched(fn: Function): void {
        this.onModelTouched = fn;
    }
    
    setDisabledState(val: boolean): void {
        this.disabled = val;
    }
                        
    caret(first?: number, last?: number) {
        let range, begin, end;

        if(!this.input.offsetParent||this.input !== document.activeElement) {
            return;
        }
        
        if(typeof first == 'number') {
            begin = first;
            end = (typeof last === 'number') ? last : begin;
            if(this.input.setSelectionRange) {
                this.input.setSelectionRange(begin, end);
            }
            else if(this.input['createTextRange']) {
                range = this.input['createTextRange']();
                range.collapse(true);
                range.moveEnd('character', end);
                range.moveStart('character', begin);
                range.select();
            }
        }
        else {
            if (this.input.setSelectionRange) {
    			begin = this.input.selectionStart;
    			end = this.input.selectionEnd;
    		} 
            else if (document['selection'] && document['selection'].createRange) {
    			range = document['selection'].createRange();
    			begin = 0 - range.duplicate().moveStart('character', -100000);
    			end = begin + range.text.length;
    		}
            
    		return {begin: begin, end: end};
        }
    }
    
    tryFireCompleted() {
        for (let i = this.firstNonMaskPos; i <= this.lastRequiredNonMaskPos; i++) {
            if (this.tests[i] && this.buffer[i] === this.getPlaceholder(i)) {
                return;
            }
        }
        this.onComplete.emit();
    }
    
    getPlaceholder(i: number) {
        if(i < this.slotChar.length) {
            return this.slotChar.charAt(i);
        }
        return this.slotChar.charAt(0);
    }
    
    seekNext(pos) {
        while (++pos < this.len && !this.tests[pos]);
        return pos;
    }

    seekPrev(pos) {
        while (--pos >= 0 && !this.tests[pos]);
        return pos;
    }
    
    shiftL(begin:number,end:number) {
        let i, j;

        if (begin<0) {
            return;
        }

        for (i = begin, j = this.seekNext(end); i < this.len; i++) {
            if (this.tests[i]) {
                if (j < this.len && this.tests[i].test(this.buffer[j])) {
                    this.buffer[i] = this.buffer[j];
                    this.buffer[j] = this.getPlaceholder(j);
                } else {
                    break;
                }

                j = this.seekNext(j);
            }
        }
        //this.writeBuffer();
        this.caret(Math.max(this.firstNonMaskPos, begin));
    }
    
    shiftR(pos) {
        let i, c, j, t;

        for (i = pos, c = this.getPlaceholder(pos); i < this.len; i++) {
            if (this.tests[i]) {
                j = this.seekNext(i);
                t = this.buffer[i];
                this.buffer[i] = c;
                if (j < this.len && this.tests[j].test(t)) {
                    c = t;
                } else {
                    break;
                }
            }
        }
    }
    
    handleAndroidInput(e) {
        var curVal = this.input.value;
        var pos = this.caret();
        if (this.oldVal && this.oldVal.length && this.oldVal.length > curVal.length ) {
            // a deletion or backspace happened
            this.checkVal(true);
            while (pos.begin > 0 && !this.tests[pos.begin-1])
                  pos.begin--;
            if (pos.begin === 0)
            {
               while (pos.begin < this.firstNonMaskPos && !this.tests[pos.begin])
                  pos.begin++;
            }
            this.caret(pos.begin,pos.begin);
        } else {
            var pos2 = this.checkVal(true);
            while (pos.begin < this.len && !this.tests[pos.begin])
                  pos.begin++;

            this.caret(pos.begin,pos.begin);
        }

        this.tryFireCompleted();
    }
    
    onBlur(e) {
        this.onModelTouched();
        this.checkVal();

        if (this.input.value != this.focusText) {
            let event = document.createEvent('HTMLEvents');
            event.initEvent('change', true, false);
            this.input.dispatchEvent(event);
        }    
    }
    
    onKeyDown(e) {
        if (this.readonly) {
            return;
        }

        let k = e.which||e.keyCode,
            pos,
            begin,
            end;
        let iPhone = /iphone/i.test(this.domHandler.getUserAgent());
        this.oldVal = this.input.value;
        
        //backspace, delete, and escape get special treatment
        if (k === 8 || k === 46 || (iPhone && k === 127)) {
            pos = this.caret();
            begin = pos.begin;
            end = pos.end;

            if (end - begin === 0) {
                begin=k!==46?this.seekPrev(begin):(end=this.seekNext(begin-1));
                end=k===46?this.seekNext(end):end;
            }
            this.clearBuffer(begin, end);
            this.shiftL(begin, end - 1);

            e.preventDefault();
        } else if( k === 13 ) { // enter
            this.onBlur(e);
        } else if (k === 27) { // escape
            this.input.value = this.focusText;
            this.caret(0, this.checkVal());
            e.preventDefault();
        }
    }
    
    onKeyPress(e) {
        if (this.readonly){
            return;
        }

        var k = e.which || e.keyCode,
            pos = this.caret(),
            p,
            c,
            next;

        if (e.ctrlKey || e.altKey || e.metaKey || k < 32) {//Ignore
            return;
        } else if ( k && k !== 13 ) {
            if (pos.end - pos.begin !== 0){
                this.clearBuffer(pos.begin, pos.end);
                this.shiftL(pos.begin, pos.end-1);
            }

            p = this.seekNext(pos.begin - 1);
            if (p < this.len) {
                c = String.fromCharCode(k);
                if (this.tests[p].test(c)) {
                    this.shiftR(p);

                    this.buffer[p] = c;
                    this.writeBuffer();
                    next = this.seekNext(p);

                    if(/android/i.test(this.domHandler.getUserAgent())){
                        //Path for CSP Violation on FireFox OS 1.1
                        let proxy = function() {
                            this.caret.bind(this,next)();
                        };

                        setTimeout(proxy,0);
                    }else{
                        this.caret(next);
                    }
                    if(pos.begin <= this.lastRequiredNonMaskPos){
                         this.tryFireCompleted();
                     }
                }
            }
            e.preventDefault();
        }
    }
    
    clearBuffer(start, end) {
        let i;
        for (i = start; i < end && i < this.len; i++) {
            if (this.tests[i]) {
                this.buffer[i] = this.getPlaceholder(i);
            }
        }
    }

    writeBuffer() { 
        this.input.value = this.buffer.join(''); 
    }
    
    checkVal(allow?: boolean) {
        //try to place characters where they belong
        let test = this.input.value,
            lastMatch = -1,
            i,
            c,
            pos;

        for (i = 0, pos = 0; i < this.len; i++) {
            if (this.tests[i]) {
                this.buffer[i] = this.getPlaceholder(i);
                while (pos++ < test.length) {
                    c = test.charAt(pos - 1);
                    if (this.tests[i].test(c)) {
                        this.buffer[i] = c;
                        lastMatch = i;
                        break;
                    }
                }
                if (pos > test.length) {
                    this.clearBuffer(i + 1, this.len);
                    break;
                }
            } else {
                if (this.buffer[i] === test.charAt(pos)) {
                    pos++;
                }
                if( i < this.partialPosition){
                    lastMatch = i;
                }
            }
        }
        if (allow) {
            this.writeBuffer();
        } else if (lastMatch + 1 < this.partialPosition) {
            if (this.autoClear || this.buffer.join('') === this.defaultBuffer) {
                // Invalid value. Remove it and replace it with the
                // mask, which is the default behavior.
                if(this.input.value) this.input.value = '';
                this.clearBuffer(0, this.len);
            } else {
                // Invalid value, but we opt to show the value to the
                // user and allow them to correct their mistake.
                this.writeBuffer();
            }
        } else {
            this.writeBuffer();
            this.input.value = this.input.value.substring(0, lastMatch + 1);
        }
        return (this.partialPosition ? i : this.firstNonMaskPos);
    }
    
    onFocus(event) {
        if (this.readonly){
            return;
        }

        clearTimeout(this.caretTimeoutId);
        let pos;

        this.focusText = this.input.value;

        pos = this.checkVal();

        this.caretTimeoutId = setTimeout(function(){
            if(this.input !== document.activeElement){
                return;
            }
            this.writeBuffer();
            if (pos == this.mask.replace("?","").length) {
                this.caret(0, pos);
            } else {
                this.caret(pos);
            }
        }, 10);
    }
    
    onInput(event) {        
        if (this.androidChrome)
            this.handleAndroidInput(event);
        else
            this.handleInputChange(event);
    }
    
    handleInputChange(event) {
        if (this.readonly){
            return;
        }

        setTimeout(function() {
            var pos=this.checkVal(true);
            this.caret(pos);
            this.tryFireCompleted();
        }, 0);
    }
    
    ngOnDestroy() {
        
    }
}

@NgModule({
    imports: [CommonModule,InputTextModule],
    exports: [InputMask],
    declarations: [InputMask]
})
export class InputMaskModule { }