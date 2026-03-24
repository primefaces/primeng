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
        '[attr.data-orientation]': 'root.orientation()',
        '[attr.data-align]': 'root.align()',
        '[attr.data-page]': 'root.pageState()',
        '[attr.data-active]': "isActive() ? '' : null",
        '[attr.data-swiping]': "root.swiping() ? '' : null",
        '(click)': 'root.scrollToPage(page())'
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
}
