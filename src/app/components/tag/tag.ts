import { NgClass, NgStyle, NgTemplateOutlet } from '@angular/common';
import {
    booleanAttribute,
    ChangeDetectionStrategy,
    Component,
    contentChild,
    inject,
    input,
    NgModule,
    TemplateRef,
    ViewEncapsulation,
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
    standalone: true,
    imports: [NgClass, NgStyle, NgTemplateOutlet, SharedModule],
    template: `
        <span [ngClass]="containerClass()" [class]="styleClass()" [ngStyle]="style()">
            <ng-content></ng-content>
            @if (iconTemplate()) {
                <span class="p-tag-icon">
                    <ng-template *ngTemplateOutlet="iconTemplate()"></ng-template>
                </span>
            } @else {
                @if (icon()) {
                    <span class="p-tag-icon" [ngClass]="icon()"></span>
                }
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
    /**
     * Template reference for the icon to be displayed inside the tag.
     * This template can be used to customize the icon content.
     */
    iconTemplate = contentChild<TemplateRef<any> | undefined>('icon');
    /**
     * Computes the CSS classes to be applied to the container element of the tag.
     *
     * @returns {Object} An object where the keys are the class names and the values are booleans indicating whether the class should be applied.
     */
    containerClass = computed<{ [klass: string]: any }>(() => {
        return {
            'p-tag p-component': true,
            [`p-tag-${this.severity()}`]: this.severity(),
            'p-tag-rounded': this.rounded(),
        };
    });

    _componentStyle = inject(TagStyle);
}

@NgModule({
    imports: [Tag, SharedModule],
    exports: [Tag, SharedModule],
})
export class TagModule {}
