import { booleanAttribute, computed, Directive, effect, EventEmitter, HostListener, inject, InjectionToken, input, Input, NgModule, Output } from '@angular/core';
import { NgControl } from '@angular/forms';
import { PARENT_INSTANCE } from 'primeng/basecomponent';
import { BaseModelHolder } from 'primeng/basemodelholder';
import { Bind } from 'primeng/bind';
import { Fluid } from 'primeng/fluid';
import { TextareaPassThrough } from 'primeng/types/textarea';
import { Subscription } from 'rxjs';
import { TextareaStyle } from './style/textareastyle';

const TEXTAREA_INSTANCE = new InjectionToken<Textarea>('TEXTAREA_INSTANCE');

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
    providers: [TextareaStyle, { provide: TEXTAREA_INSTANCE, useExisting: Textarea }, { provide: PARENT_INSTANCE, useExisting: Textarea }],
    hostDirectives: [Bind]
})
export class Textarea extends BaseModelHolder<TextareaPassThrough> {
    bindDirectiveInstance = inject(Bind, { self: true });

    $pcTextarea: Textarea | undefined = inject(TEXTAREA_INSTANCE, { optional: true, skipSelf: true }) ?? undefined;

    /**
     * Used to pass attributes to DOM elements inside the Textarea component.
     * @defaultValue undefined
     * @group Props
     */
    pTextareaPT = input<TextareaPassThrough>();
    /**
     * Indicates whether the component should be rendered without styles.
     * @defaultValue undefined
     * @group Props
     */
    pTextareaUnstyled = input<boolean | undefined>();

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
    /**
     * When present, it specifies that the component should have invalid state style.
     * @defaultValue false
     * @group Props
     */
    invalid = input(undefined, { transform: booleanAttribute });

    $variant = computed(() => this.variant() || this.config.inputStyle() || this.config.inputVariant());
    /**
     * Callback to invoke on textarea resize.
     * @param {(Event | {})} event - Custom resize event.
     * @group Emits
     */
    @Output() onResize: EventEmitter<Event | {}> = new EventEmitter<Event | {}>();

    ngControlSubscription: Subscription | undefined;

    _componentStyle = inject(TextareaStyle);

    ngControl = inject(NgControl, { optional: true, self: true });

    pcFluid: Fluid | null = inject(Fluid, { optional: true, host: true, skipSelf: true });

    get hasFluid() {
        return this.fluid() ?? !!this.pcFluid;
    }

    constructor() {
        super();
        effect(() => {
            const pt = this.pTextareaPT();
            pt && this.directivePT.set(pt);
        });

        effect(() => {
            this.pTextareaUnstyled() && this.directiveUnstyled.set(this.pTextareaUnstyled());
        });
    }

    onInit() {
        if (this.ngControl) {
            this.ngControlSubscription = (this.ngControl as any).valueChanges.subscribe(() => {
                this.updateState();
            });
        }
    }

    onAfterViewInit() {
        if (this.autoResize) this.resize();

        this.cd.detectChanges();
    }

    onAfterViewChecked() {
        this.bindDirectiveInstance.setAttrs(this.ptms(['host', 'root']));
        if (this.autoResize) {
            this.resize();
        }
        this.writeModelValue(this.ngControl?.value ?? this.el.nativeElement.value);
    }

    @HostListener('input', ['$event'])
    onInput(e: Event) {
        this.writeModelValue((e.target as HTMLTextAreaElement)?.value);
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

    onDestroy() {
        if (this.ngControlSubscription) {
            this.ngControlSubscription.unsubscribe();
        }
    }
}

@NgModule({
    imports: [Textarea],
    exports: [Textarea]
})
export class TextareaModule {}
