import { computed, Directive, inject } from '@angular/core';
import { BaseComponent, PARENT_INSTANCE } from 'primeng/basecomponent';
import { Bind } from 'primeng/bind';
import { CAROUSEL_ROOT } from './carousel-token';
import { CarouselStyle } from './style/carouselstyle';
import type { CarouselPrevPassThrough } from 'primeng/types/carousel';

/**
 * CarouselPrev is a directive for the previous navigation button.
 * @group Directives
 */
@Directive({
    selector: '[pCarouselPrev]',
    standalone: true,
    providers: [CarouselStyle, { provide: PARENT_INSTANCE, useExisting: CarouselPrev }],
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
    },
    hostDirectives: [Bind]
})
export class CarouselPrev extends BaseComponent<CarouselPrevPassThrough> {
    componentName = 'CarouselPrev';

    root = inject(CAROUSEL_ROOT);

    bindDirectiveInstance = inject(Bind, { self: true });

    _componentStyle = inject(CarouselStyle);

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

    onAfterViewChecked() {
        this.bindDirectiveInstance.setAttrs(this.ptms(['host', 'root']));
    }
}
