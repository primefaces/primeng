import { NgModule, Directive, ElementRef, HostListener, Input, Output, EventEmitter, Optional, AfterViewInit, OnInit, OnDestroy, ChangeDetectorRef, AfterViewChecked, booleanAttribute } from '@angular/core';
import { NgModel, NgControl, FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { PrimeNGConfig } from 'primeng/api';
/**
 * InputTextarea adds styling and autoResize functionality to standard textarea element.
 * @group Components
 */
@Directive({
    selector: '[pInputTextarea]',
    host: {
        class: 'p-inputtextarea p-inputtext p-component p-element',
        '[class.p-filled]': 'filled',
        '[class.p-inputtextarea-resizable]': 'autoResize',
        '[class.p-variant-filled]': 'variant === "filled" || config.inputStyle() === "filled"'
    }
})
export class InputTextarea implements OnInit, AfterViewInit, OnDestroy {
    /**
     * When present, textarea size changes as being typed.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) autoResize: boolean | undefined;
    /**
     * Specifies the input variant of the component.
     * @group Props
     */
    @Input() variant: 'filled' | 'outlined' = 'outlined';
    /**
     * Callback to invoke on textarea resize.
     * @param {(Event | {})} event - Custom resize event.
     * @group Emits
     */
    @Output() onResize: EventEmitter<Event | {}> = new EventEmitter<Event | {}>();

    filled: boolean | undefined;

    cachedScrollHeight: number | undefined;

    ngModelSubscription: Subscription | undefined;

    ngControlSubscription: Subscription | undefined;

    constructor(public el: ElementRef, @Optional() public ngModel: NgModel, @Optional() public control: NgControl, private cd: ChangeDetectorRef, public config: PrimeNGConfig) {}

    ngOnInit() {
        if (this.ngModel) {
            this.ngModelSubscription = (this.ngModel as any).valueChanges.subscribe(() => {
                this.updateState();
            });
        }

        if (this.control) {
            this.ngControlSubscription = (this.control as any).valueChanges.subscribe(() => {
                this.updateState();
            });
        }
    }

    ngAfterViewInit() {
        if (this.autoResize) this.resize();

        this.updateFilledState();
        this.cd.detectChanges();
    }

    @HostListener('input', ['$event'])
    onInput(e: Event) {
        this.updateState();
    }

    updateFilledState() {
        this.filled = this.el.nativeElement.value && this.el.nativeElement.value.length;
    }

    resize(event?: Event) {
        this.el.nativeElement.style.height = 'auto';
        this.el.nativeElement.style.height = this.el.nativeElement.scrollHeight + 'px';

        if (parseFloat(this.el.nativeElement.style.height) >= parseFloat(this.el.nativeElement.style.maxHeight)) {
            this.el.nativeElement.style.overflowY = 'scroll';
            this.el.nativeElement.style.height = this.el.nativeElement.style.maxHeight;
        } else {
            this.el.nativeElement.style.overflow = 'hidden';
        }

        this.onResize.emit(event || {});
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
    }
}

@NgModule({
    imports: [CommonModule],
    exports: [InputTextarea],
    declarations: [InputTextarea]
})
export class InputTextareaModule {}
