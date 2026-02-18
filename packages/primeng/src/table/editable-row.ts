import { booleanAttribute, Directive, input } from '@angular/core';
import { BaseComponent } from 'primeng/basecomponent';

@Directive({
    selector: '[pEditableRow]',
    standalone: true
})
export class EditableRow extends BaseComponent {
    data = input<any>(undefined, { alias: 'pEditableRow' });

    pEditableRowDisabled = input(undefined, { transform: booleanAttribute });

    isEnabled() {
        return this.pEditableRowDisabled() !== true;
    }
}
