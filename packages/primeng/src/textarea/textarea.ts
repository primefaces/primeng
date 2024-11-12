import { AfterViewInit, booleanAttribute, Directive, EventEmitter, HostListener, inject, Input, NgModule, OnDestroy, OnInit, Optional, Output } from '@angular/core';
import { NgControl, NgModel } from '@angular/forms';
import { BaseComponent } from 'primeng/basecomponent';
import { Subscription } from 'rxjs';
import { TextareaStyle } from './style/textareastyle';

/**
 * Textarea adds styling and autoResize functionality to standard textarea element.
 * @group Components
 */
@Directive({
    selector: '[pTextarea]',
    standalone: true,
    host: {
        class: 'p-textarea p-component',
        '[class.p-filled]': 'filled',
        '[class.p-textarea-resizable]': 'autoResize',
        '[class.p-variant-filled]': 'variant === "filled" || config.inputStyle() === "filled"',
        '[class.p-textarea-fluid]': 'hasFluid',
        '[class.p-textarea-sm]': 'size === "small"',
        '[class.p-inputfield-sm]': 'size === "small"',
        '[class.p-textarea-lg]': 'size === "large"',
        '[class.p-inputfield-lg]': 'size === "large"'
    },
    providers: [TextareaStyle]
})
export class Textarea extends BaseComponent implements OnInit, AfterViewInit, OnDestroy {
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
     * Spans 100% width of the container when enabled.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) fluid: boolean = false;
    /**
     * Defines the size of the component.
     * @group Props
     */
    @Input() size: 'large' | 'small';
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

    _componentStyle = inject(TextareaStyle);

    constructor(
        @Optional() public ngModel: NgModel,
        @Optional() public control: NgControl
    ) {
        super();
    }

    ngOnInit() {
        super.ngOnInit();
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

    get hasFluid() {
        const nativeElement = this.el.nativeElement;
        const fluidComponent = nativeElement.closest('p-fluid');
        return this.fluid || !!fluidComponent;
    }

    ngAfterViewInit() {
        super.ngAfterViewInit();
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

        super.ngOnDestroy();
    }
}

@NgModule({
    imports: [Textarea],
    exports: [Textarea]
})
export class TextareaModule {}
