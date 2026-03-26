import { computed, Directive, inject, input, numberAttribute } from '@angular/core';
import { BaseComponent, PARENT_INSTANCE } from 'primeng/basecomponent';
import { Bind } from 'primeng/bind';
import { CAROUSEL_ROOT } from './carousel-token';
import { CarouselStyle } from './style/carouselstyle';
import type { CarouselIndicatorPassThrough } from 'primeng/types/carousel';

/**
 * CarouselIndicator is a directive for an individual page indicator button.
 * @group Directives
 */
@Directive({
    selector: '[pCarouselIndicator]',
    standalone: true,
    providers: [CarouselStyle, { provide: PARENT_INSTANCE, useExisting: CarouselIndicator }],
    host: {
        '[class]': 'hostClass()',
        '[attr.data-scope]': "'carousel'",
        '[attr.data-part]': "'indicator'",
        '[attr.data-orientation]': 'dataOrientation()',
        '[attr.data-align]': 'dataAlign()',
        '[attr.data-page]': 'dataPage()',
        '[attr.data-active]': 'dataActive()',
        '[attr.data-swiping]': 'dataSwiping()',
        '(click)': 'onClick()'
    },
    hostDirectives: [Bind]
})
export class CarouselIndicator extends BaseComponent<CarouselIndicatorPassThrough> {
    componentName = 'CarouselIndicator';

    /**
     * The page index this indicator represents.
     * @group Props
     */
    page = input(0, { transform: numberAttribute });

    root = inject(CAROUSEL_ROOT);

    bindDirectiveInstance = inject(Bind, { self: true });

    _componentStyle = inject(CarouselStyle);

    isActive = computed(() => this.root.pageState() === this.page());

    hostClass = computed(() => this.root.cx('compositionIndicator', { index: this.page() }));

    dataOrientation = computed(() => this.root.orientation());

    dataAlign = computed(() => this.root.align());

    dataPage = computed(() => this.root.pageState());

    dataActive = computed(() => (this.isActive() ? '' : null));

    dataSwiping = computed(() => (this.root.swiping() ? '' : null));

    onClick() {
        this.root.scrollToPage(this.page());
    }

    onAfterViewChecked() {
        this.bindDirectiveInstance.setAttrs(this.ptms(['host', 'root']));
    }
}
