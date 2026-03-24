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
        class: 'p-carousel-indicator-list',
        '[attr.data-scope]': "'carousel'",
        '[attr.data-part]': "'indicators'",
        '[attr.data-orientation]': 'root.orientation()',
        '[attr.data-align]': 'root.align()',
        '[attr.data-page]': 'root.pageState()',
        '[attr.data-swiping]': "root.swiping() ? '' : null"
    },
    hostDirectives: [Bind]
})
export class CarouselIndicators {
    root = inject(CAROUSEL_ROOT);

    pages = computed(() => {
        const points = this.root.snapPoints();
        return Array.from(points).map((_, i) => i);
    });
}
