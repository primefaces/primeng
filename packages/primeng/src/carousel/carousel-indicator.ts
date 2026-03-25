import { computed, Directive, inject, input, numberAttribute } from '@angular/core';
import { CAROUSEL_ROOT } from './carousel-token';

/**
 * CarouselIndicator is a directive for an individual page indicator button.
 * @group Directives
 */
@Directive({
    selector: '[pCarouselIndicator]',
    standalone: true,
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
    }
})
export class CarouselIndicator {
    /**
     * The page index this indicator represents.
     * @group Props
     */
    page = input(0, { transform: numberAttribute });

    root = inject(CAROUSEL_ROOT);

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
}
