import { CommonModule } from '@angular/common';
import { AfterContentInit, ChangeDetectionStrategy, Component, ContentChildren, ElementRef, Input, NgModule, QueryList, TemplateRef, ViewEncapsulation } from '@angular/core';
import { BlockableUI, PrimeTemplate } from 'primeng/api';

@Component({
    selector: 'p-toolbar',
    template: `
        <div [ngClass]="'p-toolbar p-component'" [ngStyle]="style" [class]="styleClass" role="toolbar">
            <ng-content></ng-content>
            <div class="p-toolbar-group-left p-toolbar-group-start" *ngIf="startTemplate">
                <ng-container *ngTemplateOutlet="startTemplate"></ng-container>
            </div>
            <div class="p-toolbar-group-center" *ngIf="centerTemplate">
                <ng-container *ngTemplateOutlet="centerTemplate"></ng-container>
            </div>
            <div class="p-toolbar-group-right p-toolbar-group-end" *ngIf="endTemplate">
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
    @Input() style: any;

    @Input() styleClass: string;

    @ContentChildren(PrimeTemplate) templates: QueryList<any>;

    startTemplate: TemplateRef<any>;

    endTemplate: TemplateRef<any>;

    centerTemplate: TemplateRef<any>;

    constructor(private el: ElementRef) {}

    getBlockableElement(): HTMLElement {
        return this.el.nativeElement.children[0];
    }

    ngAfterContentInit() {
        this.templates.forEach((item) => {
            switch (item.getType()) {
                case 'left':
                    this.startTemplate = item.template;
                    break;

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
    imports: [CommonModule],
    exports: [Toolbar],
    declarations: [Toolbar]
})
export class ToolbarModule {}
