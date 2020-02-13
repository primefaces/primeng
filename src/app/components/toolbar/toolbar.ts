import {NgModule,Component,Input,ElementRef} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BlockableUI} from 'primeng/api';

@Component({
    selector: 'p-toolbar',
    template: `
        <div [ngClass]="'ui-toolbar ui-widget ui-widget-header ui-corner-all ui-helper-clearfix'" [ngStyle]="style" [class]="styleClass" role="toolbar">
            <ng-content></ng-content>
        </div>
    `
})
export class Toolbar implements BlockableUI {

    @Input() style: any;

    @Input() styleClass: string;

    constructor(private el: ElementRef) {}

    getBlockableElement(): HTMLElement {
      return this.el.nativeElement.children[0];
    }

}

@NgModule({
    imports: [CommonModule],
    exports: [Toolbar],
    declarations: [Toolbar]
})
export class ToolbarModule { }
