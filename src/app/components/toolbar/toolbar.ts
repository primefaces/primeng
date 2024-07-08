import { CommonModule } from '@angular/common';
import { AfterContentInit, ChangeDetectionStrategy, Component, ContentChildren, ElementRef, Input, NgModule, QueryList, TemplateRef, ViewEncapsulation } from '@angular/core';
import { BlockableUI, PrimeTemplate, SharedModule } from 'primeng/api';
/**
 * Toolbar is a grouping component for buttons and other content.
 * @group Components
 */
@Component({
    selector: 'p-toolbar',
    template: `
        <div [ngClass]="'p-toolbar p-component'" [attr.aria-labelledby]="ariaLabelledBy" [ngStyle]="style" [class]="styleClass" role="toolbar" [attr.data-pc-name]="'toolbar'">
            <ng-content></ng-content>
            <div class="p-toolbar-group-left p-toolbar-group-start" *ngIf="startTemplate" [attr.data-pc-section]="'start'">
                <ng-container *ngTemplateOutlet="startTemplate"></ng-container>
            </div>
            <div class="p-toolbar-group-center" *ngIf="centerTemplate" [attr.data-pc-section]="'center'">
                <ng-container *ngTemplateOutlet="centerTemplate"></ng-container>
            </div>
            <div class="p-toolbar-group-right p-toolbar-group-end" *ngIf="endTemplate" [attr.data-pc-section]="'end'">
                <ng-container *ngTemplateOutlet="endTemplate"></ng-container>
            </div>
        </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./toolbar.css'],
    host: {
        class: 'p-element'
    }
})
export class Toolbar implements AfterContentInit, BlockableUI {
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

    @ContentChildren(PrimeTemplate) templates: QueryList<PrimeTemplate> | undefined;

    startTemplate: TemplateRef<any> | undefined;

    endTemplate: TemplateRef<any> | undefined;

    centerTemplate: TemplateRef<any> | undefined;

    constructor(private el: ElementRef) {}

    getBlockableElement(): HTMLElement {
        return this.el.nativeElement.children[0];
    }

    ngAfterContentInit() {
        (this.templates as QueryList<PrimeTemplate>).forEach((item) => {
            switch (item.getType()) {
                case 'start':
                case 'left':
                    this.startTemplate = item.template;
                    break;

                case 'end':
                case 'right':
                    this.endTemplate = item.template;
                    break;

                case 'center':
                    this.centerTemplate = item.template;
                    break;
            }
        });
    }
}

@NgModule({
    imports: [CommonModule, SharedModule],
    exports: [Toolbar, SharedModule],
    declarations: [Toolbar]
})
export class ToolbarModule {}
