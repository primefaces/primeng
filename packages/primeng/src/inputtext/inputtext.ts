import { booleanAttribute, computed, Directive, effect, inject, InjectionToken, input, NgModule } from '@angular/core';
import { NgControl } from '@angular/forms';
import { PARENT_INSTANCE } from 'primeng/basecomponent';
import { BaseModelHolder } from 'primeng/basemodelholder';
import { Bind } from 'primeng/bind';
import { Fluid } from 'primeng/fluid';
import { InputTextPassThrough } from 'primeng/types/inputtext';
import type { InputSize, InputVariant } from 'primeng/types/shared';
import { InputTextStyle } from './style/inputtextstyle';

const INPUTTEXT_INSTANCE = new InjectionToken<InputText>('INPUTTEXT_INSTANCE');

/**
 * InputText directive is an extension to standard input element with theming.
 * @group Components
 */
@Directive({
    selector: '[pInputText]',
    standalone: true,
    host: {
        '[class]': "cx('root')",
        '[attr.data-p]': 'dataP()',
        '(input)': 'onInput()'
    },
    providers: [InputTextStyle, { provide: INPUTTEXT_INSTANCE, useExisting: InputText }, { provide: PARENT_INSTANCE, useExisting: InputText }],
    hostDirectives: [Bind]
})
export class InputText extends BaseModelHolder<InputTextPassThrough> {
    componentName = 'InputText';

    hostName = input('');

    /**
     * Used to pass attributes to DOM elements inside the InputText component.
     * @defaultValue undefined
     * @group Props
     */
    pInputTextPT = input<InputTextPassThrough>();
    /**
     * Indicates whether the component should be rendered without styles.
     * @defaultValue undefined
     * @group Props
     */
    pInputTextUnstyled = input<boolean>();

    bindDirectiveInstance = inject(Bind, { self: true });

    $pcInputText: InputText | undefined = inject(INPUTTEXT_INSTANCE, { optional: true, skipSelf: true }) ?? undefined;

    ngControl = inject(NgControl, { optional: true, self: true });

    pcFluid: Fluid | null = inject(Fluid, { optional: true, host: true, skipSelf: true });

    /**
     * Defines the size of the component.
     * @group Props
     */
    pSize = input<InputSize>(undefined, { alias: 'pSize' });
    /**
     * Specifies the input variant of the component.
     * @defaultValue undefined
     * @group Props
     */
    variant = input<InputVariant>();
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

    $variant = computed(() => this.variant() || this.config.inputVariant());

    _componentStyle = inject(InputTextStyle);

    get hasFluid() {
        return this.fluid() ?? !!this.pcFluid;
    }

    dataP = computed(() =>
        this.cn({
            invalid: this.invalid(),
            fluid: this.hasFluid,
            filled: this.$variant() === 'filled',
            [this.pSize() as string]: this.pSize()
        })
    );

    constructor() {
        super();
        effect(() => {
            const pt = this.pInputTextPT();
            pt && this.directivePT.set(pt);
        });

        effect(() => {
            this.pInputTextUnstyled() && this.directiveUnstyled.set(this.pInputTextUnstyled());
        });
    }

    onAfterViewInit() {
        this.writeModelValue(this.ngControl?.value ?? this.el.nativeElement.value);
        this.cd.detectChanges();
    }

    onAfterViewChecked(): void {
        this.bindDirectiveInstance.setAttrs(this.ptm('root'));
    }

    onDoCheck() {
        this.writeModelValue(this.ngControl?.value ?? this.el.nativeElement.value);
    }

    onInput() {
        this.writeModelValue(this.ngControl?.value ?? this.el.nativeElement.value);
    }
}

@NgModule({
    imports: [InputText],
    exports: [InputText]
})
export class InputTextModule {}
