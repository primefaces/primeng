import { NgModule, Component, ChangeDetectionStrategy, ViewEncapsulation, Input} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'p-tag',
    template: `
        <span [ngClass]="containerClass()" [class]="styleClass" [ngStyle]="style">
            <ng-content></ng-content>
            <span class="p-tag-icon" [ngClass]="icon" *ngIf="icon"></span>
            <span class="p-tag-value">{{value}}</span>
        </span>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./tag.css'],
    host: {
        'class': 'p-element'
    }
})
export class Tag {

    @Input() styleClass: string;

    @Input() style: any;

    @Input() severity: string;

    @Input() value: string;

    @Input() icon: string;

    @Input() rounded: boolean;


    containerClass() {
        return {
            'p-tag p-component': true,
            'p-tag-info': this.severity === 'info',
            'p-tag-success': this.severity === 'success',
            'p-tag-warning': this.severity === 'warning',
            'p-tag-danger': this.severity === 'danger',
            'p-tag-rounded': this.rounded
        };
    }
}

@NgModule({
    imports: [CommonModule],
    exports: [Tag],
    declarations: [Tag]
})
export class TagModule { }
