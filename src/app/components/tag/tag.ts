import { NgModule, Component, ChangeDetectionStrategy, ViewEncapsulation, Input, TemplateRef, ContentChildren, QueryList } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimeTemplate } from 'primeng/api';
import { SharedModule } from 'primeng/api';

@Component({
    selector: 'p-tag',
    template: `
        <span [ngClass]="containerClass()" [class]="styleClass" [ngStyle]="style">
            <ng-content></ng-content>
            <ng-container *ngIf="!iconTemplate">
                <span class="p-tag-icon" [ngClass]="icon" *ngIf="icon"></span>
            </ng-container>
            <span class="p-tag-icon" *ngIf="iconTemplate">
                <ng-template *ngTemplateOutlet="iconTemplate"></ng-template>
            </span>
            <span class="p-tag-value">{{ value }}</span>
        </span>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./tag.css'],
    host: {
        class: 'p-element'
    }
})
export class Tag {
    @Input() styleClass: string;

    @Input() style: any;

    @Input() severity: string;

    @Input() value: string;

    @Input() icon: string;

    @Input() rounded: boolean;

    @ContentChildren(PrimeTemplate) templates: QueryList<any>;

    iconTemplate: TemplateRef<any>;

    ngAfterContentInit() {
        this.templates.forEach((item) => {
            switch (item.getType()) {
                case 'icon':
                    this.iconTemplate = item.template;
                    break;
            }
        });
    }

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
    imports: [CommonModule, SharedModule],
    exports: [Tag, SharedModule],
    declarations: [Tag]
})
export class TagModule {}
