import { afterNextRender, ChangeDetectionStrategy, Component, ElementRef, inject, ViewEncapsulation } from '@angular/core';
import { Bind, BindModule } from 'primeng/bind';
import { CAROUSEL_ROOT } from './carousel-token';

/**
 * CarouselContent is the scrollable track element that contains carousel items.
 * @group Components
 */
@Component({
    selector: 'p-carousel-content',
    standalone: true,
    imports: [BindModule],
    template: `<ng-content></ng-content>`,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: {
        '[attr.data-scope]': "'carousel'",
        '[attr.data-part]': "'content'",
        '[attr.data-orientation]': 'root.orientation()',
        '[attr.data-align]': 'root.align()',
        '[attr.data-page]': 'root.pageState()',
        '[attr.data-autosize]': "root.autoSize() ? '' : null",
        '[attr.data-swiping]': "root.swiping() ? '' : null",
        '[style.display]': "'flex'",
        '[style.flex-direction]': "root.orientation() === 'vertical' ? 'column' : 'row'",
        '[style.overflow-x]': "root.orientation() === 'horizontal' ? 'scroll' : null",
        '[style.overflow-y]': "root.orientation() === 'vertical' ? 'scroll' : null",
        '[style.overscroll-behavior-x]': "root.orientation() === 'horizontal' ? 'contain' : null",
        '[style.overscroll-behavior-y]': "root.orientation() === 'vertical' ? 'contain' : null",
        '[style.gap]': "'var(--spacing-items)'",
        '[style.scroll-snap-type]': "'var(--scroll-snap-type)'",
        '[style.scrollbar-width]': "'none'",
        '[style.position]': "'relative'",
        '[style.--slides-per-page]': 'root.slidesPerPage()',
        '[style.--spacing-items]': "root.spacing() + 'px'",
        '[style.--scroll-snap-type]': 'root.resolveSnapType()',
        '(pointerdown)': 'root.onContentPointerDown($event)',
        '(pointermove)': 'root.onContentPointerMove($event)',
        '(pointerup)': 'root.onContentPointerUp($event)',
        '(wheel)': 'root.onContentWheel($event)'
    },
    hostDirectives: [Bind]
})
export class CarouselContent {
    root = inject(CAROUSEL_ROOT);

    private _el = inject(ElementRef);

    constructor() {
        afterNextRender(() => {
            this.root.setContentEl(this._el.nativeElement);
            this.root.setupObservers();
        });
    }
}
