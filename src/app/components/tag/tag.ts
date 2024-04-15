import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChildren, Input, NgModule, QueryList, TemplateRef, ViewEncapsulation, booleanAttribute } from '@angular/core';
import { PrimeTemplate, SharedModule } from '@alamote/primeng/api';
/**
 * Tag component is used to categorize content.
 * @group Components
 */
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
    @Input() get style(): { [klass: string]: any } | null | undefined {
        return this._style;
    }
    set style(value: { [klass: string]: any } | null | undefined) {
        this._style = value;
        this.cd.markForCheck();
    }
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
    @Input() value: string | undefined;
    /**
     * Icon of the tag to display next to the value.
     * @group Props
     * @deprecated since 15.4.2. Use 'icon' template.
     */
    @Input() icon: string | undefined;
    /**
     * Whether the corners of the tag are rounded.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) rounded: boolean | undefined;

    @ContentChildren(PrimeTemplate) templates: QueryList<PrimeTemplate> | undefined;

    iconTemplate: TemplateRef<any> | undefined;

    _style: { [klass: string]: any } | null | undefined;

    ngAfterContentInit() {
        this.templates?.forEach((item) => {
            switch (item.getType()) {
                case 'icon':
                    this.iconTemplate = item.template;
                    break;
            }
        });
    }

    constructor(private cd: ChangeDetectorRef) {}

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
