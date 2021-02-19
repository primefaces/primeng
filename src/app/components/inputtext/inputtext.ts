import {NgModule,Directive,ElementRef,OnInit,DoCheck,Optional, NgZone, Renderer2, OnDestroy} from '@angular/core';
import {NgModel} from '@angular/forms';
import {CommonModule} from '@angular/common';

@Directive({
    selector: '[pInputText]',
    host: {
        '[class.p-inputtext]': 'true',
        '[class.p-component]': 'true'
    }
})
export class InputText implements OnInit, DoCheck, OnDestroy {

    filled: boolean;

    private inputListener: VoidFunction;

    constructor(
        public el: ElementRef,
        @Optional() public ngModel: NgModel,
        private ngZone: NgZone,
        private renderer: Renderer2
    ) {}

    ngOnInit() {
        // This event could be listened to via `HostListener`, the problem is that `HostListener`
        // adds event listener in the context of Angular zone and also wrapped into additional
        // function that calls `markDirty()`. This means that every time `input` event occurs the change
        // detection will be run starting from the root component and down to this input. This leads to a
        // decrease in performance, because there can be a very large tree of components for which
        // Angular calls `detectChanges()`.
        this.ngZone.runOutsideAngular(() => {
            this.inputListener = this.renderer.listen(this.el.nativeElement, 'input', () => {
                this.updateFilledState();
            });
        });
    }
        
    ngDoCheck() {
        this.updateFilledState();
    }

    ngOnDestroy() {
        this.inputListener();
    }
    
    updateFilledState() {
        this.filled = this.el.nativeElement.value?.length || this.ngModel?.model;
        if (this.filled) {
            this.renderer.addClass(this.el.nativeElement, 'p-filled');
        } else {
            this.renderer.removeClass(this.el.nativeElement, 'p-filled');
        }
    }
}

@NgModule({
    imports: [CommonModule],
    exports: [InputText],
    declarations: [InputText]
})
export class InputTextModule { }