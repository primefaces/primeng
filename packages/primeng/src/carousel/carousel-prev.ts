import { computed, Directive, inject } from '@angular/core';
import { CAROUSEL_ROOT } from './carousel-token';

/**
 * CarouselPrev is a directive for the previous navigation button.
 * @group Directives
 */
@Directive({
    selector: '[pCarouselPrev]',
    standalone: true,
    host: {
        '[class]': 'hostClass()',
        '[attr.data-scope]': "'carousel'",
        '[attr.data-part]': "'prev'",
        '[attr.data-orientation]': 'root.orientation()',
        '[attr.data-align]': 'root.align()',
        '[attr.data-page]': 'root.pageState()',
        '[attr.data-disabled]': 'root.isPrevDisabled()',
        '[attr.data-swiping]': "root.swiping() ? '' : null",
        '[attr.disabled]': 'root.isPrevDisabled() ? true : null',
        '(click)': 'root.prev()'
    }
})
export class CarouselPrev {
    root = inject(CAROUSEL_ROOT);

    hostClass = computed(() => this.root.cx('compositionPrev'));
}
