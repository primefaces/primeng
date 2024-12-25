import { CommonModule } from '@angular/common';
import { AfterContentInit, booleanAttribute, ChangeDetectionStrategy, Component, ContentChild, ContentChildren, inject, Input, NgModule, QueryList, TemplateRef, ViewEncapsulation } from '@angular/core';
import { PrimeTemplate, SharedModule } from 'primeng/api';
import { BaseComponent } from 'primeng/basecomponent';
import { TagStyle } from './style/tagstyle';

/**
 * Tag component is used to categorize content.
 * @group Components
 */
@Component({
    selector: 'p-tag',
    standalone: true,
    imports: [CommonModule, SharedModule],
    template: `
        <ng-content></ng-content>
        <ng-container *ngIf="!iconTemplate && !_iconTemplate">
            <span class="p-tag-icon" [ngClass]="icon" *ngIf="icon"></span>
        </ng-container>
        <span class="p-tag-icon" *ngIf="iconTemplate || _iconTemplate">
            <ng-template *ngTemplateOutlet="iconTemplate || _iconTemplate"></ng-template>
        </span>
        <span class="p-tag-label">{{ value }}</span>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    providers: [TagStyle],
    host: {
        '[class]': 'containerClass()',
        '[style]': 'style'
    }
})
export class Tag extends BaseComponent implements AfterContentInit {
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
    @Input() severity: 'success' | 'secondary' | 'info' | 'warn' | 'danger' | 'contrast' | undefined;
    /**
     * Value to display inside the tag.
     * @group Props
     */
    @Input() value: string | undefined;
    /**
     * Icon of the tag to display next to the value.
     * @group Props
     */
    @Input() icon: string | undefined;
    /**
     * Whether the corners of the tag are rounded.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) rounded: boolean | undefined;

    @ContentChild('icon', { descendants: false }) iconTemplate: TemplateRef<any>;

    @ContentChildren(PrimeTemplate) templates: QueryList<PrimeTemplate> | undefined;

    _iconTemplate: TemplateRef<any> | undefined;

    _style: { [klass: string]: any } | null | undefined;

    _componentStyle = inject(TagStyle);

    ngAfterContentInit() {
        this.templates?.forEach((item) => {
            switch (item.getType()) {
                case 'icon':
                    this._iconTemplate = item.template;
                    break;
            }
        });
    }

    containerClass() {
        let classes = 'p-tag p-component';

        if (this.severity) {
            classes += ` p-tag-${this.severity}`;
        }

        if (this.rounded) {
            classes += ' p-tag-rounded';
        }

        if (this.styleClass) {
            classes += ` ${this.styleClass}`;
        }

        return classes;
    }
}

@NgModule({
    imports: [Tag, SharedModule],
    exports: [Tag, SharedModule]
})
export class TagModule {}
