import { isPlatformBrowser } from '@angular/common';
import { booleanAttribute, Directive, HostListener, inject, input } from '@angular/core';
import { findSingle } from '@primeuix/utils';
import { BaseComponent } from 'primeng/basecomponent';
import { VoidListener } from 'primeng/ts-helpers';
import { TREETABLE_INSTANCE } from './treetable-service';
import type { TreeTable } from './treetable';

@Directive({
    selector: '[ttReorderableColumn]',
    standalone: true
})
export class TTReorderableColumn extends BaseComponent {
    hostName = 'TreeTable';

    ttReorderableColumnDisabled = input(undefined, { transform: booleanAttribute });

    dragStartListener: VoidListener;

    dragOverListener: VoidListener;

    dragEnterListener: VoidListener;

    dragLeaveListener: VoidListener;

    mouseDownListener: VoidListener;

    tt = inject<TreeTable>(TREETABLE_INSTANCE);

    onAfterViewInit() {
        if (this.isEnabled()) {
            this.bindEvents();
        }
    }

    bindEvents() {
        if (isPlatformBrowser(this.platformId)) {
            this.mouseDownListener = this.renderer.listen(this.el.nativeElement, 'mousedown', this.onMouseDown.bind(this));
            this.dragStartListener = this.renderer.listen(this.el.nativeElement, 'dragstart', this.onDragStart.bind(this));
            this.dragOverListener = this.renderer.listen(this.el.nativeElement, 'dragover', this.onDragEnter.bind(this));
            this.dragEnterListener = this.renderer.listen(this.el.nativeElement, 'dragenter', this.onDragEnter.bind(this));
            this.dragLeaveListener = this.renderer.listen(this.el.nativeElement, 'dragleave', this.onDragLeave.bind(this));
        }
    }

    unbindEvents() {
        if (isPlatformBrowser(this.platformId)) {
            if (this.mouseDownListener) {
                this.mouseDownListener();
                this.mouseDownListener = null;
            }

            if (this.dragOverListener) {
                this.dragOverListener();
                this.dragOverListener = null;
            }

            if (this.dragEnterListener) {
                this.dragEnterListener();
                this.dragEnterListener = null;
            }

            if (this.dragLeaveListener) {
                this.dragLeaveListener();
                this.dragLeaveListener = null;
            }
        }
    }

    onMouseDown(event: any) {
        if (event.target.nodeName === 'INPUT' || event.target.nodeName === 'TEXTAREA' || findSingle(event.target, '[data-pc-section="columnresizer"]')) this.el.nativeElement.draggable = false;
        else this.el.nativeElement.draggable = true;
    }

    onDragStart(event: DragEvent) {
        this.tt.onColumnDragStart(event, this.el.nativeElement);
    }

    onDragOver(event: DragEvent) {
        event.preventDefault();
    }

    onDragEnter(event: DragEvent) {
        this.tt.onColumnDragEnter(event, this.el.nativeElement);
    }

    onDragLeave(event: DragEvent) {
        this.tt.onColumnDragLeave(event);
    }

    @HostListener('drop', ['$event'])
    onDrop(event: DragEvent) {
        if (this.isEnabled()) {
            this.tt.onColumnDrop(event, this.el.nativeElement);
        }
    }

    isEnabled() {
        return this.ttReorderableColumnDisabled() !== true;
    }

    onDestroy() {
        this.unbindEvents();
    }
}
