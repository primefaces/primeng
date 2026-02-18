import { isPlatformBrowser } from '@angular/common';
import { Directive, effect, inject, input } from '@angular/core';
import { BaseComponent } from 'primeng/basecomponent';
import { DomHandler } from 'primeng/dom';
import { VoidListener } from 'primeng/ts-helpers';
import { TableStyle } from './style/tablestyle';

@Directive({
    selector: '[pFrozenColumn]',
    standalone: true,
    host: {
        '[class]': 'cx("frozenColumn")'
    },
    providers: [TableStyle]
})
export class FrozenColumn extends BaseComponent {
    frozen = input<boolean>(true);

    alignFrozen = input<string>('left');

    resizeListener: VoidListener;

    private resizeObserver?: ResizeObserver;

    _componentStyle = inject(TableStyle);

    constructor() {
        super();
        effect(() => {
            const frozen = this.frozen();
            if (frozen !== undefined) {
                Promise.resolve(null).then(() => this.updateStickyPosition());
            }
        });
    }

    onAfterViewInit() {
        this.bindResizeListener();
        this.observeChanges();
    }

    bindResizeListener() {
        if (isPlatformBrowser(this.platformId)) {
            if (!this.resizeListener) {
                this.resizeListener = this.renderer.listen(this.document.defaultView, 'resize', () => {
                    this.recalculateColumns();
                });
            }
        }
    }

    unbindResizeListener() {
        if (this.resizeListener) {
            this.resizeListener();
            this.resizeListener = null;
        }
    }

    observeChanges() {
        if (isPlatformBrowser(this.platformId)) {
            const resizeObserver = new ResizeObserver(() => {
                this.recalculateColumns();
            });

            resizeObserver.observe(this.el.nativeElement);
            this.resizeObserver = resizeObserver;
        }
    }

    recalculateColumns() {
        const siblings = DomHandler.siblings(this.el.nativeElement);
        const index = DomHandler.index(this.el.nativeElement);
        const time = (siblings.length - index + 1) * 50;

        setTimeout(() => {
            this.updateStickyPosition();
        }, time);
    }

    updateStickyPosition() {
        if (this.frozen()) {
            if (this.alignFrozen() === 'right') {
                let right = 0;
                let sibling = this.el.nativeElement.nextElementSibling;
                while (sibling) {
                    right += DomHandler.getOuterWidth(sibling);
                    sibling = sibling.nextElementSibling;
                }
                this.el.nativeElement.style.right = right + 'px';
            } else {
                let left = 0;
                let sibling = this.el.nativeElement.previousElementSibling;
                while (sibling) {
                    left += DomHandler.getOuterWidth(sibling);
                    sibling = sibling.previousElementSibling;
                }
                this.el.nativeElement.style.left = left + 'px';
            }

            const filterRow = this.el.nativeElement?.parentElement?.nextElementSibling;
            if (filterRow) {
                let index = DomHandler.index(this.el.nativeElement);
                if (filterRow.children && filterRow.children[index]) {
                    filterRow.children[index].style.left = this.el.nativeElement.style.left;
                    filterRow.children[index].style.right = this.el.nativeElement.style.right;
                }
            }
        }
    }

    onDestroy() {
        this.unbindResizeListener();
        if (this.resizeObserver) {
            this.resizeObserver.disconnect();
        }
    }
}
