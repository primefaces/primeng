import { AfterViewInit, Directive, DoCheck, HostListener, inject, Input, NgModule } from '@angular/core';
import { isEmpty } from '@primeuix/utils';
import { Nullable } from 'primeng/ts-helpers';
import { InputTextStyle } from './style/inputtextstyle';
import { BaseInput } from 'primeng/baseinput';

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
export class InputText extends BaseInput implements DoCheck, AfterViewInit {
    /**
     * Defines the size of the component.
     * @group Props
     */
    @Input('pSize') pSize: 'large' | 'small';

    filled: Nullable<boolean>;

    _componentStyle = inject(InputTextStyle);

    get hasFluid() {
        const nativeElement = this.el.nativeElement;
        const fluidComponent = nativeElement.closest('p-fluid');

        return isEmpty(this.fluid()) ? !!fluidComponent : this.fluid();
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
