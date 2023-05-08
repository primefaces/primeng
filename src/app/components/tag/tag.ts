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
     * Severity type of the tag.
     * @group Props
     */
    @Input() severity: 'success' | 'info' | 'warning' | 'danger' | string | undefined;
    /**
     * Value to display inside the tag.
     * @group Props
     */
    @Input() value: string;
    /**
     * Icon of the tag to display next to the value.
     * @deprecated since 15.4.2. Use 'icon' template.
     * @group Props
     */
    @Input() icon: string;
    /**
     * Whether the corners of the tag are rounded.
     * @group Props
     */
    @Input() rounded: boolean;

    @ContentChildren(PrimeTemplate) templates: QueryList<PrimeTemplate> | undefined;

    iconTemplate: TemplateRef<any> | undefined;

    ngAfterContentInit() {
        (this.templates as QueryList<PrimeTemplate>).forEach((item) => {
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
