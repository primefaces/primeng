import { AfterViewInit, booleanAttribute, Directive, DoCheck, HostListener, inject, Input, NgModule, Optional } from '@angular/core';
import { NgModel } from '@angular/forms';
import { isEmpty } from '@primeuix/utils';
import { BaseComponent } from 'primeng/basecomponent';
import { Nullable } from 'primeng/ts-helpers';
import { InputTextStyle } from './style/inputtextstyle';

/**
 * InputText directive is an extension to standard input element with theming.
 * @group Components
 */
@Directive({
    selector: '[pInputText]',
    standalone: true,
    host: {
        class: 'p-inputtext p-component',
        '[class.p-filled]': 'filled',
        '[class.p-variant-filled]': 'variant === "filled" || config.inputStyle() === "filled"',
        '[class.p-inputtext-fluid]': 'hasFluid',
        '[class.p-inputtext-sm]': 'size === "small"',
        '[class.p-inputfield-sm]': 'size === "small"',
        '[class.p-inputtext-lg]': 'size === "large"',
        '[class.p-inputfield-lg]': 'size === "large"'
    },
    providers: [InputTextStyle]
})
export class InputText extends BaseComponent implements DoCheck, AfterViewInit {
    /**
     * Specifies the input variant of the component.
     * @group Props
     */
    @Input() variant: 'filled' | 'outlined' = 'outlined';
    /**
     * Spans 100% width of the container when enabled.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) fluid: boolean | undefined;
    /**
     * Defines the size of the component.
     * @group Props
     */
    @Input() size: 'large' | 'small';

    filled: Nullable<boolean>;

    _componentStyle = inject(InputTextStyle);

    get hasFluid() {
        const nativeElement = this.el.nativeElement;
        const fluidComponent = nativeElement.closest('p-fluid');

        return isEmpty(this.fluid) ? !!fluidComponent : this.fluid;
    }

    constructor(@Optional() public ngModel: NgModel) {
        super();
    }

    ngAfterViewInit() {
        super.ngAfterViewInit();
        this.updateFilledState();
        this.cd.detectChanges();
    }

    ngDoCheck() {
        this.updateFilledState();
    }

    @HostListener('input', ['$event'])
    onInput() {
        this.updateFilledState();
    }

    updateFilledState() {
        this.filled = (this.el.nativeElement.value && this.el.nativeElement.value.length) || (this.ngModel && this.ngModel.model);
    }
}

@NgModule({
    imports: [InputText],
    exports: [InputText]
})
export class InputTextModule {}
