import { computed, Directive, inject } from '@angular/core';
import { BaseComponent, PARENT_INSTANCE } from 'primeng/basecomponent';
import { Bind } from 'primeng/bind';
import { CAROUSEL_ROOT } from './carousel-token';
import { CarouselStyle } from './style/carouselstyle';
import type { CarouselNextPassThrough } from 'primeng/types/carousel';

/**
 * CarouselNext is a directive for the next navigation button.
 * @group Directives
 */
@Directive({
    selector: '[pCarouselNext]',
    standalone: true,
    providers: [CarouselStyle, { provide: PARENT_INSTANCE, useExisting: CarouselNext }],
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
    },
    hostDirectives: [Bind]
})
export class CarouselNext extends BaseComponent<CarouselNextPassThrough> {
    componentName = 'CarouselNext';

    root = inject(CAROUSEL_ROOT);

    bindDirectiveInstance = inject(Bind, { self: true });

    _componentStyle = inject(CarouselStyle);

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

    onAfterViewChecked() {
        this.bindDirectiveInstance.setAttrs(this.ptms(['host', 'root']));
    }
}
