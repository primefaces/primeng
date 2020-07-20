import {NgModule,Component,Input,ElementRef,ChangeDetectionStrategy, ViewEncapsulation} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BlockableUI} from 'primeng/api';

@Component({
    selector: 'p-toolbar',
    template: `
        <div [ngClass]="'p-toolbar p-component'" [ngStyle]="style" [class]="styleClass" role="toolbar">
            <ng-content></ng-content>
        </div>
    `,
   changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./toolbar.css']
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
