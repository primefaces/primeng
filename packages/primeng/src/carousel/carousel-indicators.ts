import { ChangeDetectionStrategy, Component, computed, inject, ViewEncapsulation } from '@angular/core';
import { BaseComponent, PARENT_INSTANCE } from 'primeng/basecomponent';
import { Bind, BindModule } from 'primeng/bind';
import { CAROUSEL_ROOT } from './carousel-token';
import { CarouselIndicator } from './carousel-indicator';
import type { CarouselIndicatorsPassThrough } from 'primeng/types/carousel';

/**
 * CarouselIndicators renders the list of page indicators.
 * Auto-generates button indicators based on snap points.
 * @group Components
 */
@Component({
    selector: 'p-carousel-indicators',
    standalone: true,
    imports: [BindModule, CarouselIndicator],
    template: `
        @for (page of pages(); track page) {
            <button type="button" pCarouselIndicator [page]="page"></button>
        }
    `,
    providers: [{ provide: PARENT_INSTANCE, useExisting: CarouselIndicators }],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: {
        '[class]': 'hostClass()',
        '[attr.data-scope]': "'carousel'",
        '[attr.data-part]': "'indicators'",
        '[attr.data-orientation]': 'dataOrientation()',
        '[attr.data-align]': 'dataAlign()',
        '[attr.data-page]': 'dataPage()',
        '[attr.data-swiping]': 'dataSwiping()'
    },
    hostDirectives: [Bind]
})
export class CarouselIndicators extends BaseComponent<CarouselIndicatorsPassThrough> {
    componentName = 'CarouselIndicators';

    bindDirectiveInstance = inject(Bind, { self: true });

    root = inject(CAROUSEL_ROOT);

    hostClass = computed(() => this.root.cx('indicatorList'));

    dataOrientation = computed(() => this.root.orientation());

    dataAlign = computed(() => this.root.align());

    dataPage = computed(() => this.root.pageState());

    dataSwiping = computed(() => (this.root.swiping() ? '' : null));

    pages = computed(() => {
        const points = this.root.snapPoints();
        return Array.from(points).map((_, i) => i);
    });

    onAfterViewChecked() {
        this.bindDirectiveInstance.setAttrs(this.ptms(['host', 'root']));
    }
}
