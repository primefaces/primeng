import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, InjectionToken, Input, NgModule, ViewEncapsulation } from '@angular/core';
import { SharedModule } from 'primeng/api';
import { BaseComponent, PARENT_INSTANCE } from 'primeng/basecomponent';
import { Bind } from 'primeng/bind';
import { SkeletonPassThrough } from 'primeng/types/skeleton';
import { SkeletonStyle } from './style/skeletonstyle';

const SKELETON_INSTANCE = new InjectionToken<Skeleton>('SKELETON_INSTANCE');

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
    providers: [SkeletonStyle, { provide: SKELETON_INSTANCE, useExisting: Skeleton }, { provide: PARENT_INSTANCE, useExisting: Skeleton }],
    host: {
        '[attr.aria-hidden]': 'true',
        '[class]': "cn(cx('root'), styleClass)",
        '[style]': 'containerStyle',
        '[attr.data-p]': 'dataP'
    },
    hostDirectives: [Bind]
})
export class Skeleton extends BaseComponent<SkeletonPassThrough> {
    $pcSkeleton: Skeleton | undefined = inject(SKELETON_INSTANCE, { optional: true, skipSelf: true }) ?? undefined;

    bindDirectiveInstance = inject(Bind, { self: true });

    onAfterViewChecked(): void {
        this.bindDirectiveInstance.setAttrs(this.ptms(['host', 'root']));
    }

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

    get dataP() {
        return this.cn({
            [this.shape]: this.shape
        });
    }
}

@NgModule({
    imports: [Skeleton, SharedModule],
    exports: [Skeleton, SharedModule]
})
export class SkeletonModule {}
