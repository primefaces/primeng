import { NgModule, Component, ChangeDetectionStrategy, ViewEncapsulation, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseComponent } from 'primeng/basecomponent';
import { DividerStyle } from './style/dividerstyle';
/**
 * Divider is used to separate contents.
 * @group Components
 */
@Component({
    selector: 'p-divider',
    template: `
        <div [ngClass]="containerClass()" [class]="styleClass" [ngStyle]="style" role="separator" [attr.aria-orientation]="layout" [attr.data-pc-name]="'divider'">
            <div class="p-divider-content">
                <ng-content></ng-content>
            </div>
        </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: {
        class: 'p-element'
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

    containerClass() {
        return {
            'p-divider p-component': true,
            'p-divider-horizontal': this.layout === 'horizontal',
            'p-divider-vertical': this.layout === 'vertical',
            'p-divider-solid': this.type === 'solid',
            'p-divider-dashed': this.type === 'dashed',
            'p-divider-dotted': this.type === 'dotted',
            'p-divider-left': this.layout === 'horizontal' && (!this.align || this.align === 'left'),
            'p-divider-center': (this.layout === 'horizontal' && this.align === 'center') || (this.layout === 'vertical' && (!this.align || this.align === 'center')),
            'p-divider-right': this.layout === 'horizontal' && this.align === 'right',
            'p-divider-top': this.layout === 'vertical' && this.align === 'top',
            'p-divider-bottom': this.layout === 'vertical' && this.align === 'bottom'
        };
    }
}

@NgModule({
    imports: [CommonModule],
    exports: [Divider],
    declarations: [Divider]
})
export class DividerModule {}
