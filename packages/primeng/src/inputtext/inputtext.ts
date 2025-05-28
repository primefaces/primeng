import { AfterViewInit, booleanAttribute, Directive, DoCheck, HostListener, inject, Input, NgModule } from '@angular/core';
import { NgControl, NgModel } from '@angular/forms';
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
        '[class]': "cx('root')"
    },
    providers: [InputTextStyle]
})
export class InputText extends BaseComponent implements DoCheck, AfterViewInit {
    /**
     * Specifies the input variant of the component.
     * @group Props
     */
    @Input() variant: 'filled' | 'outlined';
    /**
     * Spans 100% width of the container when enabled.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) fluid: boolean | undefined;
    /**
     * Defines the size of the component.
     * @group Props
     */
    @Input('pSize') pSize: 'large' | 'small';

    filled: Nullable<boolean>;

    _componentStyle = inject(InputTextStyle);

    ngModel = inject(NgModel, { optional: true });

    ngControl = inject(NgControl, { optional: true, self: true });

    get hasFluid() {
        const nativeElement = this.el.nativeElement;
        const fluidComponent = nativeElement.closest('p-fluid');

        return isEmpty(this.fluid) ? !!fluidComponent : this.fluid;
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

    get isInvalid() {
        const controlInvalid = !!this.ngControl?.invalid && (this.ngControl?.dirty || this.ngControl?.touched);
        const modelInvalid = !!this.ngModel?.invalid && (this.ngModel?.dirty || this.ngModel?.touched);
        return controlInvalid || modelInvalid;
    }
}

@NgModule({
    imports: [InputText],
    exports: [InputText]
})
export class InputTextModule {}
