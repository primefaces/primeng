import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, Input, NgModule, ViewEncapsulation } from '@angular/core';

import { SharedModule } from 'primeng/api';
import { BaseComponent } from 'primeng/basecomponent';
import { IconFieldStyle } from './style/iconfieldstyle';

/**
 * IconField wraps an input and an icon.
 * @group Components
 */
@Component({
    selector: 'p-iconField',
    template: ` <span class="p-iconfield" [ngClass]="containerClass" [class]="styleClass"
        ><ng-content></ng-content>
    </span>`,
    providers: [IconFieldStyle],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconField extends BaseComponent {
    /**
     * Position of the icon.
     * @group Props
     */
    @Input() iconPosition: 'right' | 'left' = 'left';
    /**
     * Style class of the component.
     * @group Props
     */
    @Input() styleClass: string;

    _componentStyle = inject(IconFieldStyle);

    get containerClass() {
        return {
            'p-iconfield-left': this.iconPosition === 'left',
            'p-iconfield-right': this.iconPosition === 'right',
        };
    }
}

@NgModule({
    imports: [CommonModule],
    exports: [IconField, SharedModule],
    declarations: [IconField],
})
export class IconFieldModule {}
