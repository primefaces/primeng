import { AfterViewInit, Directive, DoCheck, HostListener, inject, Input, NgModule } from '@angular/core';
import { BaseInput } from 'primeng/baseinput';
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
        '[class]': "cx('root')",
        '[attr.pattern]': 'pattern()',
        '[attr.min]': 'min()',
        '[attr.max]': 'max()',
        '[attr.maxlength]': 'maxlength()',
        '[attr.size]': 'size()',
        '[attr.required]': 'required()',
        '[attr.disabled]': 'disabled()',
        '[attr.name]': 'name()'
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

    ngAfterViewInit() {
        super.ngAfterViewInit();
        //this.updateFilledState();
        this.writeModelValue(this.ngControl?.value ?? this.el.nativeElement.value);
        this.cd.detectChanges();
    }

    ngDoCheck() {
        //this.updateFilledState();
        this.writeModelValue(this.ngControl?.value ?? this.el.nativeElement.value);
    }

    @HostListener('input', ['$event'])
    onInput(event: Event) {
        //this.updateFilledState();
        this.writeModelValue(this.ngControl?.value ?? this.el.nativeElement.value, event);
    }

    /*updateFilledState() {
        const controlValue = this.ngControl?.value;
        const elementValue = this.el.nativeElement.value;
        this.filled = !!elementValue || !!controlValue;
    }*/
}

@NgModule({
    imports: [InputText],
    exports: [InputText]
})
export class InputTextModule {}
