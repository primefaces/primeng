import { AfterViewInit, booleanAttribute, computed, Directive, EventEmitter, HostListener, inject, input, Input, NgModule, OnDestroy, OnInit, Output } from '@angular/core';
import { NgControl } from '@angular/forms';
import { BaseEditableHolder } from 'primeng/baseeditableholder';
import { Fluid } from 'primeng/fluid';
import { Subscription } from 'rxjs';
import { TextareaStyle } from './style/textareastyle';

/**
 * Textarea adds styling and autoResize functionality to standard textarea element.
 * @group Components
 */
@Directive({
    selector: '[pTextarea], [pInputTextarea]',
    standalone: true,
    host: {
        '[class]': "cx('root')"
    },
    providers: [TextareaStyle]
})
export class Textarea extends BaseEditableHolder implements OnInit, AfterViewInit, OnDestroy {
    /**
     * When present, textarea size changes as being typed.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) autoResize: boolean | undefined;
    /**
     * Defines the size of the component.
     * @group Props
     */
    @Input() pSize: 'large' | 'small';
    /**
     * Specifies the input variant of the component.
     * @defaultValue undefined
     * @group Props
     */
    variant = input<'filled' | 'outlined' | undefined>();
    /**
     * Spans 100% width of the container when enabled.
     * @defaultValue undefined
     * @group Props
     */
    fluid = input(undefined, { transform: booleanAttribute });

    $variant = computed(() => this.variant() || this.config.inputStyle() || this.config.inputVariant());
    /**
     * Callback to invoke on textarea resize.
     * @param {(Event | {})} event - Custom resize event.
     * @group Emits
     */
    @Output() onResize: EventEmitter<Event | {}> = new EventEmitter<Event | {}>();

    ngModelSubscription: Subscription | undefined;

    ngControlSubscription: Subscription | undefined;

    _componentStyle = inject(TextareaStyle);

    ngControl = inject(NgControl, { optional: true, self: true });

    pcFluid: Fluid = inject(Fluid, { optional: true, host: true, skipSelf: true });

    get hasFluid() {
        return this.fluid() ?? !!this.pcFluid;
    }

    ngOnInit() {
        super.ngOnInit();
        if (this.ngControl) {
            this.ngControlSubscription = (this.ngControl as any).valueChanges.subscribe(() => {
                this.updateState();
            });
        }
    }

    ngAfterViewInit() {
        super.ngAfterViewInit();
        if (this.autoResize) this.resize();

        this.cd.detectChanges();
    }

    ngAfterViewChecked() {
        if (this.autoResize) this.resize();
    }

    @HostListener('input', ['$event'])
    onInput(e: Event) {
        this.writeModelValue(e.target['value']);
        this.updateState();
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
