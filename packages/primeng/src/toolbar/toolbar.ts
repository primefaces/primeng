import { CommonModule } from '@angular/common';
import { AfterContentInit, ChangeDetectionStrategy, Component, ContentChild, ContentChildren, inject, Input, NgModule, QueryList, TemplateRef, ViewEncapsulation } from '@angular/core';
import { BlockableUI, PrimeTemplate, SharedModule } from 'primeng/api';
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
            <div class="p-toolbar-start" *ngIf="startTemplate || _startTemplate" [attr.data-pc-section]="'start'">
                <ng-container *ngTemplateOutlet="startTemplate || _startTemplate"></ng-container>
            </div>
            <div class="p-toolbar-center" *ngIf="centerTemplate || _centerTemplate" [attr.data-pc-section]="'center'">
                <ng-container *ngTemplateOutlet="centerTemplate || _centerTemplate"></ng-container>
            </div>
            <div class="p-toolbar-end" *ngIf="endTemplate || _endTemplate" [attr.data-pc-section]="'end'">
                <ng-container *ngTemplateOutlet="endTemplate || _endTemplate"></ng-container>
            </div>
        </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    providers: [ToolbarStyle]
})
export class Toolbar extends BaseComponent implements AfterContentInit, BlockableUI {
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
    @ContentChild('start', { descendants: false }) startTemplate: TemplateRef<any> | undefined;

    /**
     * Defines template option for end.
     * @group Templates
     */
    @ContentChild('end', { descendants: false }) endTemplate: TemplateRef<any> | undefined;

    /**
     * Defines template option for center.
     * @group Templates
     */
    @ContentChild('center', { descendants: false }) centerTemplate: TemplateRef<any> | undefined;

    @ContentChildren(PrimeTemplate) templates: QueryList<PrimeTemplate> | undefined;

    _startTemplate: TemplateRef<any> | undefined;

    _endTemplate: TemplateRef<any> | undefined;

    _centerTemplate: TemplateRef<any> | undefined;

    ngAfterContentInit() {
        (this.templates as QueryList<PrimeTemplate>).forEach((item) => {
            switch (item.getType()) {
                case 'start':
                case 'left':
                    this._startTemplate = item.template;
                    break;

                case 'end':
                case 'right':
                    this._endTemplate = item.template;
                    break;

                case 'center':
                    this._centerTemplate = item.template;
                    break;
            }
        });
    }
}

@NgModule({
    imports: [Toolbar, SharedModule],
    exports: [Toolbar, SharedModule]
})
export class ToolbarModule {}
