import { booleanAttribute, Directive, Input } from '@angular/core';
import { BaseComponent } from 'primeng/basecomponent';

@Directive({
    selector: '[pEditableRow]',
    standalone: true
})
export class EditableRow extends BaseComponent {
    @Input('pEditableRow') data: any;

    @Input({ transform: booleanAttribute }) pEditableRowDisabled: boolean | undefined;

    isEnabled() {
        return this.pEditableRowDisabled !== true;
    }
}
