import { afterNextRender, ChangeDetectionStrategy, Component, computed, inject, ViewEncapsulation } from '@angular/core';
import { BaseComponent, PARENT_INSTANCE } from 'primeng/basecomponent';
import { Bind, BindModule } from 'primeng/bind';
import { CAROUSEL_ROOT } from './carousel-token';
import { CarouselStyle } from './style/carouselstyle';
import type { CarouselContentPassThrough } from 'primeng/types/carousel';

/**
 * CarouselContent is the scrollable track element that contains carousel items.
 * @group Components
 */
@Component({
    selector: 'p-carousel-content',
    standalone: true,
    imports: [BindModule],
    template: `<ng-content></ng-content>`,
    providers: [CarouselStyle, { provide: PARENT_INSTANCE, useExisting: CarouselContent }],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: {
        '[class]': "root.cx('compositionContent')",
        '[attr.data-scope]': "'carousel'",
        '[attr.data-part]': "'content'",
        '[attr.data-orientation]': 'dataOrientation()',
        '[attr.data-align]': 'dataAlign()',
        '[attr.data-page]': 'dataPage()',
        '[attr.data-autosize]': 'dataAutosize()',
        '[attr.data-swiping]': 'dataSwiping()',
        '[style.display]': "'flex'",
        '[style.flex-direction]': 'flexDirection()',
        '[style.overflow-x]': 'overflowX()',
        '[style.overflow-y]': 'overflowY()',
        '[style.overscroll-behavior-x]': 'overscrollX()',
        '[style.overscroll-behavior-y]': 'overscrollY()',
        '[style.gap]': "'var(--spacing-items)'",
        '[style.scroll-snap-type]': "'var(--scroll-snap-type)'",
        '[style.scrollbar-width]': "'none'",
        '[style.position]': "'relative'",
        '[style.--slides-per-page]': 'slidesPerPage()',
        '[style.--spacing-items]': 'spacingItems()',
        '[style.--scroll-snap-type]': 'scrollSnapType()',
        '(pointerdown)': 'onPointerDown($event)',
        '(pointermove)': 'onPointerMove($event)',
        '(pointerup)': 'onPointerUp($event)',
        '(wheel)': 'onWheel($event)'
    },
    hostDirectives: [Bind]
})
export class CarouselContent extends BaseComponent<CarouselContentPassThrough> {
    componentName = 'CarouselContent';

    bindDirectiveInstance = inject(Bind, { self: true });

    root = inject(CAROUSEL_ROOT);

    isVertical = computed(() => this.root.orientation() === 'vertical');

    flexDirection = computed(() => (this.isVertical() ? 'column' : 'row'));

    overflowX = computed(() => (this.isVertical() ? null : 'scroll'));

    overflowY = computed(() => (this.isVertical() ? 'scroll' : null));

    overscrollX = computed(() => (this.isVertical() ? null : 'contain'));

    overscrollY = computed(() => (this.isVertical() ? 'contain' : null));

    dataAutosize = computed(() => (this.root.autoSize() ? '' : null));

    dataSwiping = computed(() => (this.root.swiping() ? '' : null));

    dataOrientation = computed(() => this.root.orientation());

    dataAlign = computed(() => this.root.align());

    dataPage = computed(() => this.root.pageState());

    slidesPerPage = computed(() => this.root.slidesPerPage());

    spacingItems = computed(() => this.root.spacing() + 'px');

    scrollSnapType = computed(() => this.root.resolveSnapType());

    onPointerDown(e: PointerEvent) {
        this.root.onContentPointerDown(e);
    }

    onPointerMove(e: PointerEvent) {
        this.root.onContentPointerMove(e);
    }

    onPointerUp(e: PointerEvent) {
        this.root.onContentPointerUp(e);
    }

    onWheel(e: WheelEvent) {
        this.root.onContentWheel(e);
    }

    onAfterViewChecked() {
        this.bindDirectiveInstance.setAttrs(this.ptms(['host', 'root']));
    }

    constructor() {
        super();
        afterNextRender(() => {
            this.root.setContentEl(this.$el);
            this.root.setupObservers();
        });
    }
}
