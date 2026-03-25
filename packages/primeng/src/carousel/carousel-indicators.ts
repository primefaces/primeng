import { ChangeDetectionStrategy, Component, computed, inject, ViewEncapsulation } from '@angular/core';
import { Bind, BindModule } from 'primeng/bind';
import { CAROUSEL_ROOT } from './carousel-token';
import { CarouselIndicator } from './carousel-indicator';

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
export class CarouselIndicators {
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
}
