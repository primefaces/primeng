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
    
    @Input() tabindex = 0;
    
    @Input() language: string = null;
    
    @Output() onResponse: EventEmitter<any> = new EventEmitter();
    
    @Output() onExpire: EventEmitter<any> = new EventEmitter();

    @ViewChild('target') el: ElementRef;
    
    private _instance: any = null;

    constructor(public _zone:NgZone) {}
    
    ngAfterViewInit() {
        if((<any>window).grecaptcha)
            this.init();
        else
            console.log("Recaptcha is not loaded");
    }
    
    init() {
        this._instance = (<any>window).grecaptcha.render(this.el.nativeElement, {
            'sitekey': this.siteKey,
            'theme': this.theme,
            'type': this.type,
            'size': this.size,
            'tabindex': this.tabindex,
            'hl': this.language,
            'callback': (response: string) => {this._zone.run(() => this.recaptchaCallback(response))},
            'expired-callback': () => {this._zone.run(() => this.recaptchaExpiredCallback())}
        });
    }
    
    reset() {
        if(this._instance === null)
            return;
        
        (<any>window).grecaptcha.reset(this._instance);
    }
    
    getResponse(): String {
        if (this._instance === null)
            return null;
        
        return (<any>window).grecaptcha.getResponse(this._instance);
    }
    
    recaptchaCallback(response: string) {
        this.onResponse.emit({
            response: response
        });
    }

    recaptchaExpiredCallback() {
        this.onExpire.emit();
    }
    
    ngOnDestroy() {
        if (this._instance != null) {
          (<any>window).grecaptcha.reset(this._instance);
        }
    }
}

@NgModule({
    imports: [CommonModule],
    exports: [Captcha],
    declarations: [Captcha]
})
export class CaptchaModule { }