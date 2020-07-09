import {NgModule,AfterViewInit,Component,EventEmitter,Input,NgZone,OnDestroy,Output,ElementRef,ChangeDetectionStrategy, ViewEncapsulation, ChangeDetectorRef} from '@angular/core';
import {CommonModule} from '@angular/common';

@Component({
    selector: 'p-captcha',
    template: `<div></div>`,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class Captcha implements AfterViewInit,OnDestroy {

    @Input() siteKey: string = null;
        
    @Input() theme = 'light';
    
    @Input() type = 'image';
    
    @Input() size = 'normal';
    
    @Input() tabindex = 0;
    
    @Input() language: string = null;
     
    @Input() initCallback = "initRecaptcha";
    
    @Output() onResponse: EventEmitter<any> = new EventEmitter();
    
    @Output() onExpire: EventEmitter<any> = new EventEmitter();
    
    private _instance: any = null;

    constructor(public el: ElementRef, public _zone: NgZone, public cd: ChangeDetectorRef) {}
    
    ngAfterViewInit() {
        if ((<any>window).grecaptcha) {
            if (!(<any>window).grecaptcha.render){
                setTimeout(() =>{
                    this.init();
                },100)
            }
            else {
                this.init();
            }
        }
        else {
            (<any>window)[this.initCallback] = () => {
              this.init();
            }
        } 
    }
    
    init() {
        this._instance = (<any>window).grecaptcha.render(this.el.nativeElement.children[0], {
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
        if (this._instance === null)
            return;
        
        (<any>window).grecaptcha.reset(this._instance);
        this.cd.markForCheck();
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
