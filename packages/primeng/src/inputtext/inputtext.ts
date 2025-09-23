import { AfterViewInit, booleanAttribute, computed, Directive, DoCheck, HostListener, inject, input, Input, NgModule } from '@angular/core';
import { NgControl } from '@angular/forms';
import { BaseModelHolder } from 'primeng/basemodelholder';
import { Fluid } from 'primeng/fluid';
import { InputTextStyle } from './style/inputtextstyle';

/**
 * InputText directive is an extension to standard input element with theming.
 * @group Components
 */
@Directive({
    selector: '[pInputText]',
    standalone: true,
    host: {
        '[class]': "cx('root')"
    },
    providers: [InputTextStyle]
})
export class InputText extends BaseModelHolder implements DoCheck, AfterViewInit {
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

    ngAfterViewInit() {
        super.ngAfterViewInit();
        this.writeModelValue(this.ngControl?.value ?? this.el.nativeElement.value);
        this.cd.detectChanges();
    }

    ngDoCheck() {
        this.writeModelValue(this.ngControl?.value ?? this.el.nativeElement.value);
    }

    @HostListener('input', ['$event'])
    onInput() {
        this.writeModelValue(this.ngControl?.value ?? this.el.nativeElement.value);
    }

    get hasFluid() {
        return this.fluid() ?? !!this.pcFluid;
    }
}

@NgModule({
    imports: [InputText],
    exports: [InputText]
})
export class InputTextModule {}
