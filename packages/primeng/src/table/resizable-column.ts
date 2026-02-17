import { isPlatformBrowser } from '@angular/common';
import { booleanAttribute, Directive, inject, Input, NgZone } from '@angular/core';
import { setAttribute } from '@primeuix/utils';
import { BaseComponent } from 'primeng/basecomponent';
import { DomHandler } from 'primeng/dom';
import { VoidListener } from 'primeng/ts-helpers';
import { TableStyle } from './style/tablestyle';
import { TABLE_INSTANCE } from './table-token';
import type { Table } from './table';

@Directive({
    selector: '[pResizableColumn]',
    standalone: true,
    host: {
        '[class]': "cx('resizableColumn')"
    },
    providers: [TableStyle]
})
export class ResizableColumn extends BaseComponent {
    @Input({ transform: booleanAttribute }) pResizableColumnDisabled: boolean | undefined;

    resizer: HTMLSpanElement | undefined;

    resizerMouseDownListener: VoidListener;

    resizerTouchStartListener: VoidListener;

    resizerTouchMoveListener: VoidListener;

    resizerTouchEndListener: VoidListener;

    documentMouseMoveListener: VoidListener;

    documentMouseUpListener: VoidListener;

    _componentStyle = inject(TableStyle);

    public dataTable = inject<Table>(TABLE_INSTANCE);

    public zone = inject(NgZone);

    onAfterViewInit() {
        if (isPlatformBrowser(this.platformId)) {
            if (this.isEnabled()) {
                this.resizer = this.renderer.createElement('span');
                setAttribute(this.resizer as HTMLElement, 'data-pc-column-resizer', 'true');
                !this.$unstyled() && this.renderer.addClass(this.resizer, 'p-datatable-column-resizer');
                this.renderer.appendChild(this.el.nativeElement, this.resizer);

                this.zone.runOutsideAngular(() => {
                    this.resizerMouseDownListener = this.renderer.listen(this.resizer, 'mousedown', this.onMouseDown.bind(this));
                    this.resizerTouchStartListener = this.renderer.listen(this.resizer, 'touchstart', this.onTouchStart.bind(this));
                });
            }
        }
    }

    bindDocumentEvents() {
        this.zone.runOutsideAngular(() => {
            this.documentMouseMoveListener = this.renderer.listen(this.document, 'mousemove', this.onDocumentMouseMove.bind(this));
            this.documentMouseUpListener = this.renderer.listen(this.document, 'mouseup', this.onDocumentMouseUp.bind(this));
            this.resizerTouchMoveListener = this.renderer.listen(this.resizer, 'touchmove', this.onTouchMove.bind(this));
            this.resizerTouchEndListener = this.renderer.listen(this.resizer, 'touchend', this.onTouchEnd.bind(this));
        });
    }

    unbindDocumentEvents() {
        if (this.documentMouseMoveListener) {
            this.documentMouseMoveListener();
            this.documentMouseMoveListener = null;
        }

        if (this.documentMouseUpListener) {
            this.documentMouseUpListener();
            this.documentMouseUpListener = null;
        }
        if (this.resizerTouchMoveListener) {
            this.resizerTouchMoveListener();
            this.resizerTouchMoveListener = null;
        }

        if (this.resizerTouchEndListener) {
            this.resizerTouchEndListener();
            this.resizerTouchEndListener = null;
        }
    }

    onMouseDown(event: MouseEvent) {
        this.dataTable.onColumnResizeBegin(event);
        this.bindDocumentEvents();
    }

    onTouchStart(event: TouchEvent) {
        this.dataTable.onColumnResizeBegin(event);
        this.bindDocumentEvents();
    }

    onTouchMove(event: TouchEvent) {
        this.dataTable.onColumnResize(event);
    }
    onDocumentMouseMove(event: MouseEvent) {
        this.dataTable.onColumnResize(event);
    }

    onDocumentMouseUp(event: MouseEvent) {
        this.dataTable.onColumnResizeEnd();
        this.unbindDocumentEvents();
    }

    onTouchEnd(event: TouchEvent) {
        this.dataTable.onColumnResizeEnd();
        this.unbindDocumentEvents();
    }

    isEnabled() {
        return this.pResizableColumnDisabled !== true;
    }

    onDestroy() {
        if (this.resizerMouseDownListener) {
            this.resizerMouseDownListener();
            this.resizerMouseDownListener = null;
        }

        this.unbindDocumentEvents();
    }
}
