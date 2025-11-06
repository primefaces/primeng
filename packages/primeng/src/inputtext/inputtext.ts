import { booleanAttribute, computed, Directive, effect, HostListener, inject, InjectionToken, input, Input, NgModule } from '@angular/core';
import { NgControl } from '@angular/forms';
import { PARENT_INSTANCE } from 'primeng/basecomponent';
import { BaseModelHolder } from 'primeng/basemodelholder';
import { Bind } from 'primeng/bind';
import { Fluid } from 'primeng/fluid';
import { InputTextPassThrough } from 'primeng/types/inputtext';
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
        '[attr.data-p]': 'dataP'
    },
    providers: [InputTextStyle, { provide: INPUTTEXT_INSTANCE, useExisting: InputText }, { provide: PARENT_INSTANCE, useExisting: InputText }],
    hostDirectives: [Bind]
})
export class InputText extends BaseModelHolder<InputTextPassThrough> {
    @Input() hostName: any = '';

    ptInputText = input<InputTextPassThrough>();

    unstyledInputText = input<boolean | undefined>();

    bindDirectiveInstance = inject(Bind, { self: true });

    $pcInputText: InputText | undefined = inject(INPUTTEXT_INSTANCE, { optional: true, skipSelf: true }) ?? undefined;

    ngControl = inject(NgControl, { optional: true, self: true });

    pcFluid: Fluid | null = inject(Fluid, { optional: true, host: true, skipSelf: true });

    /**
     * Defines the size of the component.
     * @group Props
     */
    @Input('pSize') pSize: 'large' | 'small';
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

    _componentStyle = inject(InputTextStyle);

    constructor() {
        super();
        effect(() => {
            this.ptInputText() && this.directivePT.set(this.ptInputText());
        });

        effect(() => {
            this.unstyledInputText() && this.directiveUnstyled.set(this.unstyledInputText());
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

    @HostListener('input', ['$event'])
    onInput() {
        this.writeModelValue(this.ngControl?.value ?? this.el.nativeElement.value);
    }

    get hasFluid() {
        return this.fluid() ?? !!this.pcFluid;
    }

    get dataP() {
        return this.cn({
            invalid: this.invalid(),
            fluid: this.hasFluid,
            filled: this.$variant() === 'filled',
            [this.pSize]: this.pSize
        });
    }
}

@NgModule({
    imports: [InputText],
    exports: [InputText]
})
export class InputTextModule {}
