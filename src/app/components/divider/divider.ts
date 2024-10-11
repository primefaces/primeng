import { NgModule, Component, ChangeDetectionStrategy, ViewEncapsulation, input, inject, HostBinding } from '@angular/core';
import { BaseComponent } from 'primeng/basecomponent';
import { DividerStyle } from './style/dividerstyle';
/**
 * Divider is used to separate contents.
 * @group Components
 */
@Component({
    selector: 'p-divider',
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
        '[class.p-divider-horizontal]': 'layout() === "horizontal"',
        '[class.p-divider-vertical]': 'layout() === "vertical"',
        '[class.p-divider-solid]': 'type() === "solid"',
        '[class.p-divider-dashed]': 'type() === "dashed"',
        '[class.p-divider-dotted]': 'type() === "dotted"',
        '[class.p-divider-left]': 'layout() === "horizontal" && (!align() || align() === "left")',
        '[class.p-divider-center]':
            '(layout() === "horizontal" && align() === "center") || (layout() === "vertical" && (!align()|| align() === "center"))',
        '[class.p-divider-right]': 'layout() === "horizontal" && align() === "right"',
        '[class.p-divider-top]': 'layout() === "vertical" && align() === "top"',
        '[class.p-divider-bottom]': 'layout() === "vertical" && align() === "bottom"',
        '[style]': 'inlineStyles',
        '[attr.aria-orientation]': 'layout()',
        '[attr.data-pc-name]': "'divider'",
        '[attr.role]': '"separator"',
        '[style.justifyContent]':
            'layout() === "horizontal" ? (align() === "center" || align() === undefined ? "center" : (align() === "left" ? "flex-start" : (align() === "right" ? "flex-end" : null))) : null',
        '[style.alignItems]':
            'layout() === "vertical" ? (align() === "center" || align() === undefined ? "center" : (align() === "top" ? "flex-start" : (align() === "bottom" ? "flex-end" : null))) : null',
    },
    providers: [DividerStyle],
})
export class Divider extends BaseComponent {
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
     * Specifies the orientation.
     * @group Props
     */
    layout = input<'horizontal' | 'vertical'>('horizontal');
    /**
     * Border style type.
     * @group Props
     */
    type = input<'solid' | 'dashed' | 'dotted'>('solid');
    /**
     * Alignment of the content.
     * @group Props
     */
    align = input<'left' | 'right' | 'top' | 'center' | 'bottom'>();

    _componentStyle = inject(DividerStyle);

    @HostBinding('class') get hostClass() {
        return this.styleClass();
    }
}

@NgModule({
    imports: [],
    exports: [Divider],
    declarations: [Divider],
})
export class DividerModule {}
