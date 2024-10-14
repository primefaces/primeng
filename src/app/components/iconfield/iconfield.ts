import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, input, NgModule, ViewEncapsulation } from '@angular/core';
import { SharedModule } from 'primeng/api';
import { BaseComponent } from 'primeng/basecomponent';
import { IconFieldStyle } from './style/iconfieldstyle';

/**
 * IconField wraps an input and an icon.
 * @group Components
 */
@Component({
    selector: 'p-iconfield, p-iconField',
    template: ` <div class="p-iconfield" [ngClass]="containerClass()" [class]="styleClass()"><ng-content></ng-content></div>`,
    providers: [IconFieldStyle],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconField extends BaseComponent {
    /**
     * Position of the icon.
     * @group Props
     */
    iconPosition = input<'right' | 'left'>();
    /**
     * Style class of the component.
     * @group Props
     */
    styleClass = input<string>();

    /**
     * Computes the container class based on the icon position.
     * @returns An object with the container class.
     * @group Methods
     */
    containerClass = computed(() => {
        return {
            'p-iconfield-left': this.iconPosition() === 'left',
            'p-iconfield-right': this.iconPosition() === 'right',
        };
    });

    _componentStyle = inject(IconFieldStyle);
}

@NgModule({
    imports: [NgClass],
    exports: [IconField, SharedModule],
    declarations: [IconField],
})
export class IconFieldModule {}
