import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, Input, NgModule, ViewEncapsulation } from '@angular/core';
import { SharedModule } from 'primeng/api';
import { BaseComponent } from 'primeng/basecomponent';
import { SkeletonStyle } from './style/skeletonstyle';

/**
 * Skeleton is a placeholder to display instead of the actual content.
 * @group Components
 */
@Component({
    selector: 'p-skeleton',
    standalone: true,
    imports: [CommonModule, SharedModule],
    template: ``,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    providers: [SkeletonStyle],
    host: {
        '[attr.aria-hidden]': 'true',
        '[attr.data-pc-name]': "'skeleton'",
        '[attr.data-pc-section]': "'root'",
        '[class]': "cn(cx('root'), styleClass)",
        '[style]': 'containerStyle'
    }
})
export class Skeleton extends BaseComponent {
    /**
     * Class of the element.
     * @deprecated since v20.0.0, use `class` instead.
     * @group Props
     */
    @Input() styleClass: string | undefined;
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

    get containerStyle() {
        const inlineStyles = this._componentStyle?.inlineStyles['root'];
        let style;
        if (this.size) style = { ...inlineStyles, width: this.size, height: this.size, borderRadius: this.borderRadius };
        else style = { ...inlineStyles, width: this.width, height: this.height, borderRadius: this.borderRadius };

        return style;
    }
}

@NgModule({
    imports: [Skeleton, SharedModule],
    exports: [Skeleton, SharedModule]
})
export class SkeletonModule {}
