import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, NgModule, ViewEncapsulation } from '@angular/core';

import { SharedModule } from '@alamote/primeng/api';

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
    @Input() iconPosition: 'right' | 'left' = 'left';

    get containerClass() {
        return {
            'p-icon-field-left': this.iconPosition === 'left',
            'p-icon-field-right': this.iconPosition === 'right'
        };
    }
}

@NgModule({
    imports: [CommonModule],
    exports: [IconField, SharedModule],
    declarations: [IconField]
})
export class IconFieldModule {}
