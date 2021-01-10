import {NgModule,Component,Input,ElementRef,ChangeDetectionStrategy, ViewEncapsulation, AfterContentInit, ContentChildren, QueryList, TemplateRef} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BlockableUI, PrimeTemplate} from 'primeng/api';

@Component({
    selector: 'p-toolbar',
    template: `
        <div [ngClass]="'p-toolbar p-component'" [ngStyle]="style" [class]="styleClass" role="toolbar">
            <ng-content></ng-content>
            <div class="p-toolbar-group-left" *ngIf="leftTemplate">
                <ng-container *ngTemplateOutlet="leftTemplate"></ng-container>
            </div>
            <div class="p-toolbar-group-right" *ngIf="rightTemplate">
                <ng-container *ngTemplateOutlet="rightTemplate"></ng-container>
            </div>
        </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./toolbar.css']
})
export class Toolbar implements AfterContentInit,BlockableUI {

    @Input() style: any;

    @Input() styleClass: string;

    @ContentChildren(PrimeTemplate) templates: QueryList<any>;

    leftTemplate: TemplateRef<any>;

    rightTemplate: TemplateRef<any>;

    constructor(private el: ElementRef) {}

    getBlockableElement(): HTMLElement {
      return this.el.nativeElement.children[0];
    }

    ngAfterContentInit() {
        this.templates.forEach((item) => {
            switch(item.getType()) {
                case 'left':
                    this.leftTemplate = item.template;
                break;

                case 'right':
                    this.rightTemplate = item.template;
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
export class ToolbarModule { }
