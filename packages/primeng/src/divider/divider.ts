import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, HostBinding, inject, Input, NgModule, ViewEncapsulation } from '@angular/core';
import { SharedModule } from 'primeng/api';
import { BaseComponent } from 'primeng/basecomponent';
import { DividerStyle } from './style/dividerstyle';

/**
 * Divider is used to separate contents.
 * @group Components
 */
@Component({
    selector: 'p-divider',
    standalone: true,
    imports: [CommonModule, SharedModule],
    template: `
        <div class="p-divider-content">
            <ng-content></ng-content>
        </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: {
        '[class.p-divider]': 'true',
        '[class.p-component]': 'true',
        '[class.p-divider-horizontal]': 'layout === "horizontal"',
        '[class.p-divider-vertical]': 'layout === "vertical"',
        '[class.p-divider-solid]': 'type === "solid"',
        '[class.p-divider-dashed]': 'type === "dashed"',
        '[class.p-divider-dotted]': 'type === "dotted"',
        '[class.p-divider-left]': 'layout === "horizontal" && (!align || align === "left")',
        '[class.p-divider-center]': '(layout === "horizontal" && align === "center") || (layout === "vertical" && (!align || align === "center"))',
        '[class.p-divider-right]': 'layout === "horizontal" && align === "right"',
        '[class.p-divider-top]': 'layout === "vertical" && align === "top"',
        '[class.p-divider-bottom]': 'layout === "vertical" && align === "bottom"',
        '[style]': 'inlineStyles',
        '[attr.aria-orientation]': 'layout',
        '[attr.data-pc-name]': "'divider'",
        '[attr.role]': '"separator"',
        '[style.justifyContent]': 'layout === "horizontal" ? (align === "center" || align === undefined ? "center" : (align === "left" ? "flex-start" : (align === "right" ? "flex-end" : null))) : null',
        '[style.alignItems]': 'layout === "vertical" ? (align === "center" || align === undefined ? "center" : (align === "top" ? "flex-start" : (align === "bottom" ? "flex-end" : null))) : null'
    },
    providers: [DividerStyle]
})
export class Divider extends BaseComponent {
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
     * Specifies the orientation.
     * @group Props
     */
    @Input() layout: 'horizontal' | 'vertical' | undefined = 'horizontal';
    /**
     * Border style type.
     * @group Props
     */
    @Input() type: 'solid' | 'dashed' | 'dotted' | undefined = 'solid';
    /**
     * Alignment of the content.
     * @group Props
     */
    @Input() align: 'left' | 'center' | 'right' | 'top' | 'center' | 'bottom' | undefined;

    _componentStyle = inject(DividerStyle);

    @HostBinding('class') get hostClass() {
        return this.styleClass;
    }
}

@NgModule({
    imports: [Divider],
    exports: [Divider]
})
export class DividerModule {}
