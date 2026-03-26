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
        '[attr.data-orientation]': 'dataOrientation()',
        '[attr.data-align]': 'dataAlign()',
        '[attr.data-page]': 'dataPage()',
        '[attr.data-disabled]': 'dataDisabled()',
        '[attr.data-swiping]': 'dataSwiping()',
        '[attr.disabled]': 'attrDisabled()',
        '(click)': 'onClick()'
    }
})
export class CarouselNext {
    root = inject(CAROUSEL_ROOT);

    hostClass = computed(() => this.root.cx('compositionNext'));

    dataOrientation = computed(() => this.root.orientation());

    dataAlign = computed(() => this.root.align());

    dataPage = computed(() => this.root.pageState());

    dataDisabled = computed(() => this.root.isNextDisabled());

    dataSwiping = computed(() => (this.root.swiping() ? '' : null));

    attrDisabled = computed(() => (this.root.isNextDisabled() ? true : null));

    onClick() {
        this.root.next();
    }
}
