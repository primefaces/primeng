import { ChangeDetectionStrategy, Component, computed, inject, InjectionToken, input, NgModule, ViewEncapsulation } from '@angular/core';
import { SharedModule } from 'primeng/api';
import { BaseComponent, PARENT_INSTANCE } from 'primeng/basecomponent';
import { Bind } from 'primeng/bind';
import type { SkeletonPassThrough } from 'primeng/types/skeleton';
import { SkeletonStyle } from './style/skeletonstyle';

const SKELETON_INSTANCE = new InjectionToken<Skeleton>('SKELETON_INSTANCE');

/**
 * Skeleton is a placeholder to display instead of the actual content.
 * @group Components
 */
@Component({
    selector: 'p-skeleton',
    standalone: true,
    imports: [SharedModule],
    template: ``,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    providers: [SkeletonStyle, { provide: SKELETON_INSTANCE, useExisting: Skeleton }, { provide: PARENT_INSTANCE, useExisting: Skeleton }],
    host: {
        '[attr.aria-hidden]': 'true',
        '[class]': 'cx("root")',
        '[style]': 'containerStyle()',
        '[attr.data-p]': 'dataP()'
    },
    hostDirectives: [Bind]
})
export class Skeleton extends BaseComponent<SkeletonPassThrough> {
    componentName = 'Skeleton';

    $pcSkeleton: Skeleton | undefined = inject(SKELETON_INSTANCE, { optional: true, skipSelf: true }) ?? undefined;

    bindDirectiveInstance = inject(Bind, { self: true });

    /**
     * Shape of the element.
     * @group Props
     */
    shape = input('rectangle');

    /**
     * Type of the animation.
     * @group Props
     */
    animation = input('wave');

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
    width = input('100%');

    /**
     * Height of the element.
     * @group Props
     */
    height = input('1rem');

    _componentStyle = inject(SkeletonStyle);

    containerStyle = computed(() => {
        const inlineStyles = this._componentStyle?.inlineStyles['root'];
        const size = this.size();
        const width = this.width();
        const height = this.height();
        const borderRadius = this.borderRadius();

        if (this.$unstyled()) {
            return undefined;
        }

        if (size) {
            return { ...inlineStyles, width: size, height: size, borderRadius };
        }

        return { ...inlineStyles, width, height, borderRadius };
    });

    dataP = computed(() => {
        const shape = this.shape();
        return this.cn({
            [shape]: shape
        });
    });

    onAfterViewChecked() {
        this.bindDirectiveInstance.setAttrs(this.ptms(['host', 'root']));
    }
}

@NgModule({
    imports: [Skeleton, SharedModule],
    exports: [Skeleton, SharedModule]
})
export class SkeletonModule {}
