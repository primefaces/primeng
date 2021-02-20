import {NgModule,Directive,ElementRef,Input,Output, EventEmitter,Optional, AfterViewInit, OnInit, OnDestroy, NgZone, Renderer2} from '@angular/core';
import {NgModel, NgControl} from '@angular/forms';
import {CommonModule} from '@angular/common';
import { Subscription } from 'rxjs';

@Directive({
    selector: '[pInputTextarea]',
    host: {
        '[class.p-inputtextarea]': 'true',
        '[class.p-inputtext]': 'true',
        '[class.p-component]': 'true',
        '[class.p-inputtextarea-resizable]': 'autoResize'
    }
})
export class InputTextarea implements OnInit, AfterViewInit, OnDestroy  {
    
    @Input() autoResize: boolean;
    
    @Output() onResize: EventEmitter<any> = new EventEmitter();
        
    filled: boolean;

    cachedScrollHeight:number;

    ngModelSubscription: Subscription;

    ngControlSubscription: Subscription;

    private listeners: VoidFunction[] = [];

    constructor(
        public el: ElementRef,
        @Optional() public ngModel: NgModel,
        @Optional() public control : NgControl,
        private ngZone: NgZone,
        private renderer: Renderer2
    ) {}
        
    ngOnInit() {
        if (this.ngModel) {
            this.ngModelSubscription = this.ngModel.valueChanges.subscribe(() =>{
                this.updateState();
            })
        }

        if (this.control) {
            this.ngControlSubscription = this.control.valueChanges.subscribe(() => {
                this.updateState();
            });
        }

        this.ngZone.runOutsideAngular(() => {
            const inputListener = this.renderer.listen(this.el.nativeElement, 'input', () => {
                this.updateState();
            });

            const blurListener = this.renderer.listen(this.el.nativeElement, 'blur', event => {
                if (this.autoResize) {
                    this.resize(event);
                }
            });

            const focusListener = this.renderer.listen(this.el.nativeElement, 'focus', event => {
                if (this.autoResize) {
                    this.resize(event);
                }
            });

            this.listeners.push(inputListener, blurListener, focusListener);
        });
    }

    ngAfterViewInit() {
        if (this.autoResize)
            this.resize();

        this.updateFilledState();
    }
    
    updateFilledState() {
        this.filled = this.el.nativeElement.value?.length;
        if (this.filled) {
            this.renderer.addClass(this.el.nativeElement, 'p-filled');
        } else {
            this.renderer.removeClass(this.el.nativeElement, 'p-filled');
        }
    }
    
    resize(event?: Event) {
        this.el.nativeElement.style.height = 'auto';
        this.el.nativeElement.style.height = this.el.nativeElement.scrollHeight + 'px';

        if (parseFloat(this.el.nativeElement.style.height) >= parseFloat(this.el.nativeElement.style.maxHeight)) {
            this.el.nativeElement.style.overflowY = "scroll";
            this.el.nativeElement.style.height = this.el.nativeElement.style.maxHeight;
        }
        else {
            this.el.nativeElement.style.overflow = "hidden";
        }

        if (this.onResize.observers.length > 0) {
            this.ngZone.run(() => {
                this.onResize.emit(event || {});
            });
        }
    }

    updateState() {
        this.updateFilledState();
            
        if (this.autoResize) {
            this.resize();
        }
    }

    ngOnDestroy() {
        if (this.ngModelSubscription) {
            this.ngModelSubscription.unsubscribe();
        }

        if (this.ngControlSubscription) {
            this.ngControlSubscription.unsubscribe();
        }

        while (this.listeners.length) this.listeners.pop()();
    }
}

@NgModule({
    imports: [CommonModule],
    exports: [InputTextarea],
    declarations: [InputTextarea]
})
export class InputTextareaModule { }
