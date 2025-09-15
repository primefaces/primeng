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
            <span [class]="cx('icon')" [ngClass]="icon" *ngIf="icon"></span>
        </ng-container>
        <span [class]="cx('icon')" *ngIf="iconTemplate || _iconTemplate">
            <ng-template *ngTemplateOutlet="iconTemplate || _iconTemplate"></ng-template>
        </span>
        <span [class]="cx('label')">{{ value }}</span>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    providers: [TagStyle],
    host: {
        '[class]': "cn(cx('root'), styleClass)"
    }
})
export class Tag extends BaseComponent implements AfterContentInit {
    /**
     * Style class of the component.
     * @deprecated since v20.0.0, use `class` instead.
     * @group Props
     */
    @Input() styleClass: string | undefined;
    /**
     * Severity type of the tag.
     * @group Props
     */
    @Input() severity: string | 'success' | 'secondary' | 'info' | 'warn' | 'danger' | 'contrast' | undefined | null;
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
}

@NgModule({
    imports: [Tag, SharedModule],
    exports: [Tag, SharedModule]
})
export class TagModule {}
