import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, NgModule, ViewEncapsulation } from '@angular/core';

import { SharedModule } from 'primengrtl/api';

/**
 * IconField wraps an input and an icon.
 * @group Components
 */
@Component({
    selector: 'p-iconField',
    template: ` <span class="p-icon-field" [ngClass]="containerClass"><ng-content></ng-content> </span>`,
    styleUrl: './iconfield.css',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class IconField {
    /**
     * Position of the icon.
     * @group Props
     */
    @Input() iconPosition: 'end' | 'start' = 'start';

    get containerClass() {
        return {
            'p-icon-field-left': this.iconPosition === 'start',
            'p-icon-field-right': this.iconPosition === 'end'
        };
    }
}

@NgModule({
    imports: [CommonModule],
    exports: [IconField, SharedModule],
    declarations: [IconField]
})
export class IconFieldModule {}
