import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, Input, NgModule, ViewEncapsulation } from '@angular/core';
import { ChangeDetectionStrategy, Component, computed, inject, input, NgModule, ViewEncapsulation } from '@angular/core';
import { BaseComponent } from 'primeng/basecomponent';
import { SkeletonStyle } from './style/skeletonstyle';

/**
 * Skeleton is a placeholder to display instead of the actual content.
 * @group Components
 */
@Component({
    selector: 'p-skeleton',
    template: `
        <div
            [ngClass]="containerClass()"
            [class]="styleClass()"
            [ngStyle]="containerStyle()"
            [attr.data-pc-name]="'skeleton'"
            [attr.aria-hidden]="true"
            [attr.data-pc-section]="'root'"
        ></div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,

    providers: [SkeletonStyle],
})
export class Skeleton extends BaseComponent {
    /**
     * Class of the element.
     * @group Props
     */
    styleClass = input<string>();
    /**
     * Inline style of the element.
     * @group Props
     */
    style = input<{ [klass: string]: any } | null>();
    /**
     * Shape of the element.
     * @group Props
     */
    shape = input<string>('rectangle');
    /**
     * Type of the animation.
     * @gruop Props
     */
    animation = input<string>('wave');
    /**
     * Border radius of the element, defaults to value from theme.
     * @group Props
     */
    borderRadius = input<string>();
    /**
     * Size of the skeleton.
     * @group Props
     */
    size = input<string>();
    /**
     * Width of the element.
     * @group Props
     */
    width = input<string>('100%');
    /**
     * Height of the element.
     * @group Props
     */
    height = input<string>('1rem');

    _componentStyle = inject(SkeletonStyle);

    containerClass = computed<{ [klass: string]: boolean }>(() => {
        return {
            'p-skeleton p-component': true,
            'p-skeleton-circle': this.shape() === 'circle',
            'p-skeleton-animation-none': this.animation() === 'none',
        };
    });

    containerStyle = computed<{ [klass: string]: any }>(() => {
        const customStyles = {
            ...this._componentStyle?.inlineStyles['root'],
            width: this.size() ? this.size() : this.width(),
            height: this.size() ? this.size() : this.height(),
            borderRadius: this.borderRadius(),
        };
        return this.size() ? { ...this.style(), ...customStyles } : { ...customStyles, ...this.style() };
    });
}

@NgModule({
    imports: [CommonModule],
    exports: [Skeleton],
    declarations: [Skeleton],
})
export class SkeletonModule {}
