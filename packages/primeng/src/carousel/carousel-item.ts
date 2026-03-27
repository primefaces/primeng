import { ChangeDetectionStrategy, Component, computed, inject, input, ViewEncapsulation } from '@angular/core';
import { BaseComponent, PARENT_INSTANCE } from 'primeng/basecomponent';
import { Bind, BindModule } from 'primeng/bind';
import { CAROUSEL_ROOT } from './carousel-token';
import { CarouselStyle } from './style/carouselstyle';
import type { CarouselItemPassThrough } from 'primeng/types/carousel';

/**
 * CarouselItem represents an individual item in the composition-based carousel.
 * @group Components
 */
@Component({
    selector: 'p-carousel-item',
    standalone: true,
    imports: [BindModule],
    template: `<ng-content></ng-content>`,
    providers: [CarouselStyle, { provide: PARENT_INSTANCE, useExisting: CarouselItem }],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: {
        '[class]': "root.cx('compositionItem')",
        '[attr.data-scope]': "'carousel'",
        '[attr.data-part]': "'item'",
        '[attr.data-item]': "''",
        '[attr.data-value]': 'value()',
        '[attr.data-orientation]': 'dataOrientation()',
        '[attr.data-align]': 'dataAlign()',
        '[attr.data-page]': 'dataPage()',
        '[attr.data-swiping]': 'dataSwiping()',
        '[attr.data-autosize]': 'dataAutosize()',
        '[style.flex-grow]': '0',
        '[style.flex-shrink]': '0',
        '[style.min-width]': '0',
        '[style.flex-basis]': 'flexBasis()',
        '[style.scroll-snap-align]': 'scrollSnapAlign()'
    },
    hostDirectives: [Bind]
})
export class CarouselItem extends BaseComponent<CarouselItemPassThrough> {
    componentName = 'CarouselItem';

    bindDirectiveInstance = inject(Bind, { self: true });

    /**
     * The value/identifier of the carousel item.
     * @group Props
     */
    value = input<unknown>();

    root = inject(CAROUSEL_ROOT);

    dataOrientation = computed(() => this.root.orientation());

    dataAlign = computed(() => this.root.align());

    dataPage = computed(() => this.root.pageState());

    dataSwiping = computed(() => (this.root.swiping() ? '' : null));

    dataAutosize = computed(() => (this.root.autoSize() ? '' : null));

    flexBasis = computed(() => (this.root.autoSize() ? 'auto' : 'calc(100% / var(--slides-per-page) - var(--spacing-items) * (var(--slides-per-page) - 1) / var(--slides-per-page))'));

    scrollSnapAlign = computed(() => this.root.align());

    onAfterViewChecked() {
        this.bindDirectiveInstance.setAttrs(this.ptms(['host', 'root']));
    }
}
