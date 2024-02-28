import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, NgModule, ViewEncapsulation } from '@angular/core';
import { SharedModule } from 'primeng/api';

/**
 * InputIcon displays an icon.
 * @group Components
 */
@Component({
    selector: 'p-inputIcon',
    template: `<span class="p-input-icon" [ngClass]="styleClass"><ng-content></ng-content></span>`,
    styleUrl: './inputicon.css',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputIcon {
    /**
     * Style class of the element.
     * @group Props
     */
    @Input() styleClass: string | undefined;
}

@NgModule({
    imports: [CommonModule],
    exports: [InputIcon, SharedModule],
    declarations: [InputIcon]
})
export class InputIconModule {}
