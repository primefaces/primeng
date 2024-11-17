import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, HostBinding, inject, Input, NgModule, ViewEncapsulation } from '@angular/core';
import { SharedModule } from 'primeng/api';
import { BaseComponent } from 'primeng/basecomponent';
import { InputIconStyle } from './style/inputiconstyle';

/**
 * InputIcon displays an icon.
 * @group Components
 */
@Component({
    selector: 'p-inputicon, p-inputIcon',
    standalone: true,
    imports: [CommonModule, SharedModule],
    template: `<ng-content></ng-content>`,
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [InputIconStyle],
    host: {
        '[class]': 'styleClass',
        '[class.p-inputicon]': 'true'
    }
})
export class InputIcon extends BaseComponent {
    /**
     * Style class of the element.
     * @group Props
     */
    @Input() styleClass: string | undefined;

    @HostBinding('class') get hostClasses(): string {
        return this.styleClass;
    }

    _componentStyle = inject(InputIconStyle);
}

@NgModule({
    imports: [InputIcon, SharedModule],
    exports: [InputIcon, SharedModule]
})
export class InputIconModule {}
