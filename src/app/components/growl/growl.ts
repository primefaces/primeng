import {NgModule,Component,ElementRef,AfterViewInit,DoCheck,OnDestroy,Input,Output,ViewChild,EventEmitter,IterableDiffers,Optional,NgZone} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Message} from '../common/message';
import {DomHandler} from '../dom/domhandler';
import {MessageService} from '../common/messageservice';
import {Subscription}   from 'rxjs/Subscription';

@Component({
    selector: 'p-growl',
    template: `
        <div #container [ngClass]="'ui-growl ui-widget'" [ngStyle]="style" [class]="styleClass">
            <div #msgel *ngFor="let msg of value;let i = index" class="ui-growl-item-container ui-state-highlight ui-corner-all ui-shadow" aria-live="polite"
                [ngClass]="{'ui-growl-message-info':msg.severity == 'info','ui-growl-message-warn':msg.severity == 'warn',
                    'ui-growl-message-error':msg.severity == 'error','ui-growl-message-success':msg.severity == 'success'}"
                    (click)="onMessageClick(i)" (mouseenter)="onMessageHover(i)">
                <div class="ui-growl-item">
                     <div class="ui-growl-icon-close fa fa-close" (click)="remove(i,msgel)"></div>
                     <span class="ui-growl-image fa fa-2x"
                        [ngClass]="{'fa-info-circle':msg.severity == 'info','fa-exclamation-circle':msg.severity == 'warn',
                                'fa-close':msg.severity == 'error','fa-check':msg.severity == 'success'}"></span>
                     <div class="ui-growl-message">
                        <span class="ui-growl-title">{{msg.summary}}</span>
                        <p [innerHTML]="msg.detail||''"></p>
                     </div>
                     <div style="clear: both;"></div>
                </div>
            </div>
        </div>
    `,
    providers: [DomHandler]
})
export class Growl implements AfterViewInit,DoCheck,OnDestroy {

    @Input() life: number = 3000;
        
    @Input() style: any;
        
    @Input() styleClass: string;
    
    @Input() immutable: boolean = true;
    
    @Input() autoZIndex: boolean = true;
    
    @Input() baseZIndex: number = 0;

    @Input() key: string;
    
    @Output() onClick: EventEmitter<any> = new EventEmitter();
    
    @Output() onHover: EventEmitter<any> = new EventEmitter();
    
    @Output() onClose: EventEmitter<any> = new EventEmitter();
    
    @Output() valueChange: EventEmitter<Message[]> = new EventEmitter<Message[]>();
    
    @ViewChild('container') containerViewChild: ElementRef;

    _sticky: boolean;
    
    _value: Message[];
                        
    timeout: any;
    
    preventRerender: boolean;
    
    differ: any;
    
    subscription: Subscription;
    
    closeIconClick: boolean;

    constructor(public el: ElementRef, public domHandler: DomHandler, public differs: IterableDiffers, @Optional() public messageService: MessageService, private zone: NgZone) {
        this.differ = differs.find([]).create(null);
        
        if(messageService) {
            this.subscription = messageService.messageObserver.subscribe(messages => {
                if(messages) {
                    if(messages instanceof Array) {
                        let filteredMessages = messages.filter(m => this.key === m.key);
                        this.value = this.value ? [...this.value, ...filteredMessages] : [...filteredMessages];
                    }
                    else if (this.key === messages.key) {
                        this.value = this.value ? [...this.value, ...[messages]] : [messages];
                    }
                }
                else {
                    this.value = null;
                }
            });
        }
    }

    ngAfterViewInit() {
        if(!this.sticky) {
            this.initTimeout();
        }
    }
    
    @Input() get value(): Message[] {
        return this._value;
    }

    set value(val:Message[]) {
        this._value = val;
        if(this.containerViewChild && this.containerViewChild.nativeElement && this.immutable) {
            this.handleValueChange();
        }
    }
    
    @Input() get sticky(): boolean {
        return this._sticky;
    }

    set sticky(value: boolean) {
        if(value && this.timeout) {
            clearTimeout(this.timeout);
        }
        this._sticky = value;
    }

    ngDoCheck() {
        if(!this.immutable && this.containerViewChild && this.containerViewChild.nativeElement) {
            let changes = this.differ.diff(this.value);
            if(changes) {
                this.handleValueChange();
            }
        }
    }
    
    handleValueChange() {
        if(this.preventRerender) {
            this.preventRerender = false;
            return;
        }
        
        if(this.autoZIndex) {
            this.containerViewChild.nativeElement.style.zIndex = String(this.baseZIndex + (++DomHandler.zindex));
        }
        this.domHandler.fadeIn(this.containerViewChild.nativeElement, 250);
        
        if(!this.sticky) {
            this.initTimeout();
        }
    }
    
    initTimeout() {
        if(this.timeout) {
            clearTimeout(this.timeout);
        }
        this.zone.runOutsideAngular(() => {
            this.timeout = setTimeout(() => {
                this.zone.run(() => {
                    this.removeAll();
                });
            }, this.life);
        });
    }
        
    remove(index: number, msgel: any) {      
        this.closeIconClick = true;  
        this.domHandler.fadeOut(msgel, 250);
        
        setTimeout(() => {
            this.preventRerender = true;
            this.onClose.emit({message:this.value[index]});
            
            if(this.immutable) {
                this._value = this.value.filter((val,i) => i!=index);
                this.valueChange.emit(this._value);
            }
            else {
                this._value.splice(index, 1);
            }
        }, 250);        
    }
    
    removeAll() {
        if(this.value && this.value.length) {            
            this.domHandler.fadeOut(this.containerViewChild.nativeElement, 250);
            
            setTimeout(() => {                
                this.value.forEach((msg,index) => this.onClose.emit({message:this.value[index]}));
                if(this.immutable) {
                    this.value = [];
                    this.valueChange.emit(this.value);
                }
                else {
                    this.value.splice(0, this.value.length);
                }
            }, 250);
        }
    }
    
    onMessageClick(i: number) {
        if(this.closeIconClick)
            this.closeIconClick = false;
        else
            this.onClick.emit({message: this.value[i]});
    }
    
    onMessageHover(i: number) {
        this.onHover.emit({message: this.value[i]});
    }
    
    ngOnDestroy() {
        if(!this.sticky) {
            clearTimeout(this.timeout);
        }
        
        if(this.subscription) {
            this.subscription.unsubscribe();
        }
    }

}

@NgModule({
    imports: [CommonModule],
    exports: [Growl],
    declarations: [Growl]
})
export class GrowlModule { }