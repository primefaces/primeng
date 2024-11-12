import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ContentChild, inject, Input, NgModule, TemplateRef, ViewEncapsulation } from '@angular/core';
import { BlockableUI, SharedModule } from 'primeng/api';
import { BaseComponent } from 'primeng/basecomponent';
import { ToolbarStyle } from './style/toolbarstyle';

/**
 * Toolbar is a grouping component for buttons and other content.
 * @group Components
 */
@Component({
    selector: 'p-toolbar',
    standalone: true,
    imports: [CommonModule, SharedModule],
    template: `
        <div [ngClass]="'p-toolbar p-component'" [attr.aria-labelledby]="ariaLabelledBy" [ngStyle]="style" [class]="styleClass" role="toolbar" [attr.data-pc-name]="'toolbar'">
            <ng-content></ng-content>
            <div class="p-toolbar-start" *ngIf="startTemplate" [attr.data-pc-section]="'start'">
                <ng-container *ngTemplateOutlet="startTemplate"></ng-container>
            </div>
            <div class="p-toolbar-center" *ngIf="centerTemplate" [attr.data-pc-section]="'center'">
                <ng-container *ngTemplateOutlet="centerTemplate"></ng-container>
            </div>
            <div class="p-toolbar-end" *ngIf="endTemplate" [attr.data-pc-section]="'end'">
                <ng-container *ngTemplateOutlet="endTemplate"></ng-container>
            </div>
        </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    providers: [ToolbarStyle]
})
export class Toolbar extends BaseComponent implements BlockableUI {
    /**
     * Inline style of the component.
     * @group Props
     */
    @Input() style: { [klass: string]: any } | null | undefined;
    /**
     * Style class of the component.
     * @group Props
     */
    @Input() styleClass: string | undefined;
    /**
     * Defines a string value that labels an interactive element.
     * @group Props
     */
    @Input() ariaLabelledBy: string | undefined;

    _componentStyle = inject(ToolbarStyle);

    getBlockableElement(): HTMLElement {
        return this.el.nativeElement.children[0];
    }
    /**
     * Defines template option for start.
     * @group Templates
     */
    @ContentChild('start') startTemplate: TemplateRef<any> | undefined;

    /**
     * Defines template option for end.
     * @group Templates
     */
    @ContentChild('end') endTemplate: TemplateRef<any> | undefined;

    /**
     * Defines template option for center.
     * @group Templates
     */
    @ContentChild('center') centerTemplate: TemplateRef<any> | undefined;
}

@NgModule({
    imports: [Toolbar, SharedModule],
    exports: [Toolbar, SharedModule]
})
export class ToolbarModule {}
