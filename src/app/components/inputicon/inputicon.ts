import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, Input, NgModule, ViewEncapsulation } from '@angular/core';
import { SharedModule } from 'primeng/api';
import { BaseComponent } from 'primeng/basecomponent';
import { InputIconStyle } from './style/inputiconstyle';

/**
 * InputIcon displays an icon.
 * @group Components
 */
@Component({
    selector: 'p-inputIcon',
    template: `<span class="p-inputicon" [ngClass]="styleClass"><ng-content></ng-content></span>`,
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [InputIconStyle]
})
export class InputIcon extends BaseComponent {
    /**
     * Style class of the element.
     * @group Props
     */
    @Input() styleClass: string | undefined;

    _componentStyle = inject(InputIconStyle);
}

@NgModule({
    imports: [CommonModule],
    exports: [InputIcon, SharedModule],
    declarations: [InputIcon]
})
export class InputIconModule {}
