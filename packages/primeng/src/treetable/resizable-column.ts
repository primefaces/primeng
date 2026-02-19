import { isPlatformBrowser } from '@angular/common';
import { booleanAttribute, Directive, inject, input } from '@angular/core';
import { addClass } from '@primeuix/utils';
import { BaseComponent } from 'primeng/basecomponent';
import { VoidListener } from 'primeng/ts-helpers';
import { TREETABLE_INSTANCE } from './treetable-service';
import type { TreeTable } from './treetable';

@Directive({
    selector: '[ttResizableColumn]',
    standalone: true
})
export class TTResizableColumn extends BaseComponent {
    hostName = 'TreeTable';

    ttResizableColumnDisabled = input(undefined, { transform: booleanAttribute });

    resizer: HTMLSpanElement | undefined;

    resizerMouseDownListener: VoidListener;

    documentMouseMoveListener: VoidListener;

    documentMouseUpListener: VoidListener;

    tt = inject<TreeTable>(TREETABLE_INSTANCE);

    onAfterViewInit() {
        if (isPlatformBrowser(this.platformId)) {
            if (this.isEnabled()) {
                addClass(this.el.nativeElement, 'p-resizable-column');
                this.resizer = this.renderer.createElement('span');
                !this.$unstyled() && this.renderer.addClass(this.resizer, 'p-column-resizer');
                (this.resizer as HTMLElement).setAttribute('data-pc-section', 'columnresizer');
                this.renderer.appendChild(this.el.nativeElement, this.resizer);

                this.resizerMouseDownListener = this.renderer.listen(this.resizer, 'mousedown', this.onMouseDown.bind(this));
            }
        }
    }

    bindDocumentEvents() {
        this.documentMouseMoveListener = this.renderer.listen(this.document, 'mousemove', this.onDocumentMouseMove.bind(this));
        this.documentMouseUpListener = this.renderer.listen(this.document, 'mouseup', this.onDocumentMouseUp.bind(this));
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
    }

    onMouseDown(event: MouseEvent) {
        this.tt.onColumnResizeBegin(event);
        this.bindDocumentEvents();
    }

    onDocumentMouseMove(event: MouseEvent) {
        this.tt.onColumnResize(event);
    }

    onDocumentMouseUp(event: MouseEvent) {
        this.tt.onColumnResizeEnd(event, this.el.nativeElement);
        this.unbindDocumentEvents();
    }

    isEnabled() {
        return this.ttResizableColumnDisabled() !== true;
    }

    onDestroy() {
        if (this.resizerMouseDownListener) {
            this.resizerMouseDownListener();
            this.resizerMouseDownListener = null;
        }

        this.unbindDocumentEvents();
    }
}
