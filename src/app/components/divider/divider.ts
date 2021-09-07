import { NgModule, Component, ChangeDetectionStrategy, ViewEncapsulation, Input} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'p-divider',
    template: `
        <div [ngClass]="containerClass()" [class]="styleClass" [ngStyle]="style" role="separator">
            <div class="p-divider-content">
                <ng-content></ng-content>
            </div>
        </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./divider.css'],
    host: {
        'class': 'p-element'
    }
})
export class Divider {

    @Input() styleClass: string;

    @Input() style: any;

    @Input() layout: string = "horizontal";

    @Input() type: string = "solid";

    @Input() align: string;

    containerClass() {
        return {
            'p-divider p-component': true,
            'p-divider-horizontal': this.layout === "horizontal",
            'p-divider-vertical': this.layout === "vertical",
            'p-divider-solid': this.type === "solid",
            'p-divider-dashed': this.type === "dashed",
            'p-divider-dotted': this.type === "dotted",
            'p-divider-left': this.layout === 'horizontal' && (!this.align || this.align === 'left'),
            'p-divider-center': (this.layout === 'horizontal' && this.align === 'center') || (this.layout === 'vertical' && (!this.align || this.align === 'center')),
            'p-divider-right': this.layout === 'horizontal' && this.align === 'right',
            'p-divider-top': this.layout === 'vertical' && (this.align === 'top'),
            'p-divider-bottom': this.layout === 'vertical' && this.align === 'bottom'
        };
    }
}

@NgModule({
    imports: [CommonModule],
    exports: [Divider],
    declarations: [Divider]
})
export class DividerModule { }
