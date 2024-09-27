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
    selector: 'p-iconfield, p-iconField',
    template: ` <ng-content></ng-content>`,
    providers: [IconFieldStyle],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        '[class.p-iconfield]': 'true',
        '[class.p-iconfield-left]': "iconPosition === 'left'",
        '[class.p-iconfield-right]': "iconPosition === 'right'",
    },
})
export class IconField extends BaseComponent {
    /**
     * Position of the icon.
     * @group Props
     */
    @Input() iconPosition: 'right' | 'left' | undefined
    /**
     * Style class of the component.
     * @group Props
     */
    @Input() styleClass: string;

    _componentStyle = inject(IconFieldStyle);
}

@NgModule({
    imports: [CommonModule],
    exports: [IconField, SharedModule],
    declarations: [IconField],
})
export class IconFieldModule {}
