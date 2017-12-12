import {NgModule,Component,Input,Output,EventEmitter,ElementRef} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BlockableUI} from '../common/blockableui';

@Component({
    selector: 'p-toolbar',
    template: `
        <div [ngClass]="'ui-toolbar ui-widget ui-widget-header ui-corner-all ui-helper-clearfix'" [ngStyle]="style" [class]="styleClass">
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
