import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, NgModule, ViewEncapsulation } from '@angular/core';
/**
 * Skeleton is a placeholder to display instead of the actual content.
 * @group Components
 */
@Component({
    selector: 'p-skeleton',
    template: ` <div [ngClass]="containerClass()" [class]="styleClass" [ngStyle]="containerStyle()"></div> `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./skeleton.css'],
    host: {
        class: 'p-element'
    }
})
export class Skeleton {
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
     * Size of the Circle or Square.
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

    containerClass() {
        return {
            'p-skeleton p-component': true,
            'p-skeleton-circle': this.shape === 'circle',
            'p-skeleton-none': this.animation === 'none'
        };
    }

    containerStyle() {
        if (this.size) return { ...this.style, width: this.size, height: this.size, borderRadius: this.borderRadius };
        else return { ...this.style, width: this.width, height: this.height, borderRadius: this.borderRadius };
    }
}

@NgModule({
    imports: [CommonModule],
    exports: [Skeleton],
    declarations: [Skeleton]
})
export class SkeletonModule {}
