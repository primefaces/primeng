import {NgModule,Directive,ElementRef,HostListener,Input,AfterViewInit,OnDestroy,DoCheck} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DomHandler} from '../dom/domhandler';

@Directive({
    selector: '[pPassword]',
    host: {
        '[class.ui-inputtext]': 'true',
        '[class.ui-corner-all]': 'true',
        '[class.ui-state-default]': 'true',
        '[class.ui-widget]': 'true',
        '[class.ui-state-filled]': 'filled'
    },
    providers: [DomHandler]
})
export class Password implements AfterViewInit,OnDestroy,DoCheck {

    @Input() promptLabel: string = 'Please enter a password';

    @Input() weakLabel: string = 'Weak';

    @Input() mediumLabel: string = 'Medium';

    @Input() strongLabel: string = 'Strong';
    
    @Input() feedback: boolean = true;
    
    panel: any;
    
    meter: any;
    
    info: any;
    
    filled: boolean;
    
    constructor(public el: ElementRef, public domHandler: DomHandler) {}
    
    ngAfterViewInit() {
        this.panel = document.createElement('div');
        this.panel.className = 'ui-password-panel ui-widget ui-state-highlight ui-corner-all ui-helper-hidden ui-password-panel-overlay';
        this.meter = document.createElement('div');
        this.meter.className = 'ui-password-meter';
        this.info = document.createElement('div');
        this.info.className = 'ui-password-info';
        this.info.textContent = this.promptLabel;
        
        if(this.feedback) {
            this.panel.appendChild(this.meter);
            this.panel.appendChild(this.info);
            document.body.appendChild(this.panel);
        }
    }
    
    ngDoCheck() {
        this.updateFilledState();
    }
    
    //To trigger change detection to manage ui-state-filled for material labels when there is no value binding
    @HostListener('input', ['$event']) 
    onInput(e) {
        this.updateFilledState();
    }
    
    updateFilledState() {
        this.filled = this.el.nativeElement.value && this.el.nativeElement.value.length;
    }
        
    @HostListener('focus', ['$event']) 
    onFocus(e) {
        this.panel.style.zIndex = String(++DomHandler.zindex);
        this.domHandler.removeClass(this.panel, 'ui-helper-hidden');
        this.domHandler.absolutePosition(this.panel, this.el.nativeElement);
        this.domHandler.fadeIn(this.panel, 250);
    }
    
    @HostListener('blur', ['$event']) 
    onBlur(e) {        
        this.domHandler.addClass(this.panel, 'ui-helper-hidden');
    }
    
    @HostListener('keyup', ['$event'])
    onKeyup(e) {
        let value = e.target.value,
        label = null,
        meterPos = null;

        if(value.length === 0) {
            label = this.promptLabel;
            meterPos = '0px 0px';
        }
        else {
            var score = this.testStrength(value);

            if(score < 30) {
                label = this.weakLabel;
                meterPos = '0px -10px';
            }
            else if(score >= 30 && score < 80) {
                label = this.mediumLabel;
                meterPos = '0px -20px';
            } 
            else if(score >= 80) {
                label = this.strongLabel;
                meterPos = '0px -30px';
            }
        }

        this.meter.style.backgroundPosition = meterPos;
        this.info.textContent = label;
    }
    
    testStrength(str: string) {
        let grade: number = 0;
        let val;

        val = str.match('[0-9]');
        grade += this.normalize(val ? val.length : 1/4, 1) * 25;

        val = str.match('[a-zA-Z]');
        grade += this.normalize(val ? val.length : 1/2, 3) * 10;

        val = str.match('[!@#$%^&*?_~.,;=]');
        grade += this.normalize(val ? val.length : 1/6, 1) * 35;

        val = str.match('[A-Z]');
        grade += this.normalize(val ? val.length : 1/6, 1) * 30;

        grade *= str.length / 8;

        return grade > 100 ? 100 : grade;
    }
    
    normalize(x, y) {
        let diff = x - y;

        if(diff <= 0)
            return x / y;
        else
            return 1 + 0.5 * (x / (x + y/4));
    }
    
    get disabled(): boolean {
        return this.el.nativeElement.disabled;
    }
    
    ngOnDestroy() {
        if (!this.feedback)
            return;
            
        this.panel.removeChild(this.meter);
        this.panel.removeChild(this.info);
        document.body.removeChild(this.panel);
        this.panel = null;
        this.meter = null;
        this.info = null;
    }
}

@NgModule({
    imports: [CommonModule],
    exports: [Password],
    declarations: [Password]
})
export class PasswordModule { }
