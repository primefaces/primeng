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
        '[attr.data-orientation]': 'dataOrientation()',
        '[attr.data-align]': 'dataAlign()',
        '[attr.data-page]': 'dataPage()',
        '[attr.data-disabled]': 'dataDisabled()',
        '[attr.data-swiping]': 'dataSwiping()',
        '[attr.disabled]': 'attrDisabled()',
        '(click)': 'onClick()'
    }
})
export class CarouselPrev {
    root = inject(CAROUSEL_ROOT);

    hostClass = computed(() => this.root.cx('compositionPrev'));

    dataOrientation = computed(() => this.root.orientation());

    dataAlign = computed(() => this.root.align());

    dataPage = computed(() => this.root.pageState());

    dataDisabled = computed(() => this.root.isPrevDisabled());

    dataSwiping = computed(() => (this.root.swiping() ? '' : null));

    attrDisabled = computed(() => (this.root.isPrevDisabled() ? true : null));

    onClick() {
        this.root.prev();
    }
}
