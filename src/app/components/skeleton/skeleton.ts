import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, Input, NgModule, ViewEncapsulation } from '@angular/core';
import { BaseComponent } from 'primeng/basecomponent';
import { SkeletonStyle } from './style/skeletonstyle';

/**
 * Skeleton is a placeholder to display instead of the actual content.
 * @group Components
 */
@Component({
    selector: 'p-skeleton',
    template: ` <div [ngClass]="containerClass()" [class]="styleClass" [ngStyle]="containerStyle" [attr.data-pc-name]="'skeleton'" [attr.aria-hidden]="true" [attr.data-pc-section]="'root'"></div> `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: {
        class: 'p-element'
    },
    providers: [SkeletonStyle]
})
export class Skeleton extends BaseComponent {
    /**
     * Class of the element.
     * @group Props
     */
    @Input() styleClass: string | undefined;
    /**
     * Inline style of the element.
     * @group Props
     */
    @Input() style: { [klass: string]: any } | null | undefined;
    /**
     * Shape of the element.
     * @group Props
     */
    @Input() shape: string = 'rectangle';
    /**
     * Type of the animation.
     * @gruop Props
     */
    @Input() animation: string = 'wave';
    /**
     * Border radius of the element, defaults to value from theme.
     * @group Props
     */
    @Input() borderRadius: string | undefined;
    /**
     * Size of the skeleton.
     * @group Props
     */
    @Input() size: string | undefined;
    /**
     * Width of the element.
     * @group Props
     */
    @Input() width: string = '100%';
    /**
     * Height of the element.
     * @group Props
     */
    @Input() height: string = '1rem';

    _componentStyle = inject(SkeletonStyle);

    containerClass() {
        return {
            'p-skeleton p-component': true,
            'p-skeleton-circle': this.shape === 'circle',
            'p-skeleton-animation-none': this.animation === 'none'
        };
    }

    get containerStyle() {
        const inlineStyles = this._componentStyle?.inlineStyles['root'];
        let style;
        if (this.size) style = { ...this.style, ...inlineStyles, width: this.size, height: this.size, borderRadius: this.borderRadius };
        else style = { ...inlineStyles, width: this.width, height: this.height, borderRadius: this.borderRadius, ...this.style };

        return style;
    }
}

@NgModule({
    imports: [CommonModule],
    exports: [Skeleton],
    declarations: [Skeleton]
})
export class SkeletonModule {}
