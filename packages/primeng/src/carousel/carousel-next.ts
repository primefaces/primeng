import { computed, Directive, inject } from '@angular/core';
import { CAROUSEL_ROOT } from './carousel-token';

/**
 * CarouselNext is a directive for the next navigation button.
 * @group Directives
 */
@Directive({
    selector: '[pCarouselNext]',
    standalone: true,
    host: {
        '[class]': 'hostClass()',
        '[attr.data-scope]': "'carousel'",
        '[attr.data-part]': "'next'",
        '[attr.data-orientation]': 'root.orientation()',
        '[attr.data-align]': 'root.align()',
        '[attr.data-page]': 'root.pageState()',
        '[attr.data-disabled]': 'root.isNextDisabled()',
        '[attr.data-swiping]': "root.swiping() ? '' : null",
        '[attr.disabled]': 'root.isNextDisabled() ? true : null',
        '(click)': 'root.next()'
    }
})
export class CarouselNext {
    root = inject(CAROUSEL_ROOT);

    hostClass = computed(() => this.root.cx('compositionNext'));
}
