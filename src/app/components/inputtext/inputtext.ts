import { NgModule, Directive, HostListener, DoCheck, Optional, AfterViewInit, Input, inject, booleanAttribute } from '@angular/core';
import { NgModel } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Nullable } from 'primeng/ts-helpers';
import { BaseComponent } from 'primeng/basecomponent';
import { InputTextStyle } from './style/inputtextstyle';

/**
 * InputText directive is an extension to standard input element with theming.
 * @group Components
 */
@Directive({
    selector: '[pInputText]',
    host: {
        class: 'p-inputtext p-component',
        '[class.p-filled]': 'filled',
        '[class.p-variant-filled]': 'variant === "filled" || config.inputStyle() === "filled"',
        '[class.p-inputtext-fluid]': 'fluid'
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
    @Input({ transform: booleanAttribute }) fluid: boolean = false;

    filled: Nullable<boolean>;

    _componentStyle = inject(InputTextStyle);

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
    imports: [CommonModule],
    exports: [InputText],
    declarations: [InputText]
})
export class InputTextModule {}
