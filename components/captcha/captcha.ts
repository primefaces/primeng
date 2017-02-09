import {NgModule,AfterViewInit,Component,EventEmitter,Input,NgZone,OnDestroy,Output,ViewChild, ElementRef} from '@angular/core';
import {CommonModule} from '@angular/common';

@Component({
    selector: 'p-captcha',
    template: `<div #target></div>`
})
export class Captcha implements AfterViewInit {

    @Input() siteKey: string = null;
        
    @Input() theme = 'light';
    
    @Input() type = 'image';
    
    @Input() size = 'normal';
    
    @Input() tabIndex = 0;
    
    @Input() language: string = null;
    
    @Output() onResponse: EventEmitter<any> = new EventEmitter();
    
    @Output() onExpire: EventEmitter<any> = new EventEmitter();

    @ViewChild('target') el: ElementRef;
    
    captcha: any = null;

    constructor(public _zone:NgZone) {}
    
    ngAfterViewInit() {
        this.captcha = (<any>window).grecaptcha.render(this.el.nativeElement, {
            'sitekey': this.siteKey,
            'theme': this.theme,
            'type': this.type,
            'size': this.size,
            'tabindex': this.tabIndex,
            'hl': this.language,
            'callback': (response: string) => { this._zone.run(() => this.recaptchaCallback(response))},
            'expired-callback': () => { this._zone.run(() => this.recaptchaExpiredCallback()) }
        });
    }
    
    reset() {
        if (this.captcha === null)
            return;
        
        (<any>window).grecaptcha.reset(this.captcha);
    }
    
    getResponse(): String {
        if (this.captcha === null)
            return null;
        
        return (<any>window).grecaptcha.getResponse(this.captcha);
    }
    
    private recaptchaCallback(response: string) {
        this.onResponse.emit(response);
    }

    private recaptchaExpiredCallback() {
        this.onExpire.emit();
    }
    
    public ngOnDestroy() {
        if (this.captcha != null) {
          (<any>window).grecaptcha.reset(this.captcha);
        }
    }
}

@NgModule({
    imports: [CommonModule],
    exports: [Captcha],
    declarations: [Captcha]
})
export class CaptchaModule { }