import { NgClass, NgStyle } from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    ContentChildren,
    input,
    NgModule,
    QueryList,
    TemplateRef,
    ViewEncapsulation,
    booleanAttribute,
    inject,
    computed,
} from '@angular/core';
import { PrimeTemplate, SharedModule } from 'primeng/api';
import { BaseComponent } from 'primeng/basecomponent';
import { TagStyle } from './style/tagstyle';

/**
 * Tag component is used to categorize content.
 * @group Components
 */
@Component({
    selector: 'p-tag',
    template: `
        <span [ngClass]="containerClass()" [class]="styleClass()" [ngStyle]="style()">
            <ng-content></ng-content>
            @if (!iconTemplate) {
                @if (icon()) {
                    <span class="p-tag-icon" [ngClass]="icon()"></span>
                }
            }
            @if (iconTemplate) {
                <span class="p-tag-icon">
                    <ng-template *ngTemplateOutlet="iconTemplate"></ng-template>
                </span>
            }
            <span class="p-tag-label">{{ value() }}</span>
        </span>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,

    providers: [TagStyle],
})
export class Tag extends BaseComponent {
    /**
     * Inline style of the component.
     * @group Props
     */
    style = input<{ [klass: string]: any } | null>();
    /**
     * Style class of the component.
     * @group Props
     */
    styleClass = input<string>();
    /**
     * Severity type of the tag.
     * @group Props
     */
    severity = input<'success' | 'secondary' | 'info' | 'warn' | 'danger' | 'contrast'>();
    /**
     * Value to display inside the tag.
     * @group Props
     */
    value = input<string>();
    /**
     * Icon of the tag to display next to the value.
     * @group Props
     * @deprecated since 15.4.2. Use 'icon' template.
     */
    icon = input<string>();
    /**
     * Whether the corners of the tag are rounded.
     * @group Props
     */
    rounded = input<boolean, any>(undefined, { transform: booleanAttribute });

    @ContentChildren(PrimeTemplate) templates: QueryList<PrimeTemplate> | undefined;

    iconTemplate: TemplateRef<any> | undefined;

    _componentStyle = inject(TagStyle);

    ngAfterContentInit() {
        this.templates?.forEach((item) => {
            switch (item.getType()) {
                case 'icon':
                    this.iconTemplate = item.template;
                    break;
            }
        });
    }

    containerClass = computed<{ [klass: string]: any }>(() => {
        return {
            'p-tag p-component': true,
            [`p-tag-${this.severity()}`]: this.severity(),
            'p-tag-rounded': this.rounded(),
        };
    });
}

@NgModule({
    imports: [NgClass, NgStyle, SharedModule],
    exports: [Tag, SharedModule],
    declarations: [Tag],
})
export class TagModule {}
