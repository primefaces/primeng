import { isPlatformBrowser } from '@angular/common';
import { booleanAttribute, Directive, HostListener, inject, input } from '@angular/core';
import { findSingle } from '@primeuix/utils';
import { BaseComponent } from 'primeng/basecomponent';
import { VoidListener } from 'primeng/ts-helpers';
import { TableStyle } from './style/tablestyle';
import { TABLE_INSTANCE } from './table-service';
import type { Table } from './table';

@Directive({
    selector: '[pReorderableColumn]',
    standalone: true,
    host: {
        '[class]': "cx('reorderableColumn')"
    },
    providers: [TableStyle]
})
export class ReorderableColumn extends BaseComponent {
    pReorderableColumnDisabled = input(undefined, { transform: booleanAttribute });

    dragStartListener: VoidListener;

    dragOverListener: VoidListener;

    dragEnterListener: VoidListener;

    dragLeaveListener: VoidListener;

    mouseDownListener: VoidListener;

    _componentStyle = inject(TableStyle);

    public dataTable = inject<Table>(TABLE_INSTANCE);

    onAfterViewInit() {
        if (this.isEnabled()) {
            this.bindEvents();
        }
    }

    bindEvents() {
        if (isPlatformBrowser(this.platformId)) {
            this.mouseDownListener = this.renderer.listen(this.el.nativeElement, 'mousedown', this.onMouseDown.bind(this));

            this.dragStartListener = this.renderer.listen(this.el.nativeElement, 'dragstart', this.onDragStart.bind(this));

            this.dragOverListener = this.renderer.listen(this.el.nativeElement, 'dragover', this.onDragOver.bind(this));

            this.dragEnterListener = this.renderer.listen(this.el.nativeElement, 'dragenter', this.onDragEnter.bind(this));

            this.dragLeaveListener = this.renderer.listen(this.el.nativeElement, 'dragleave', this.onDragLeave.bind(this));
        }
    }

    unbindEvents() {
        if (this.mouseDownListener) {
            this.mouseDownListener();
            this.mouseDownListener = null;
        }

        if (this.dragStartListener) {
            this.dragStartListener();
            this.dragStartListener = null;
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

    onMouseDown(event: any) {
        if (event.target.nodeName === 'INPUT' || event.target.nodeName === 'TEXTAREA' || findSingle(event.target, '[data-pc-column-resizer="true"]')) this.el.nativeElement.draggable = false;
        else this.el.nativeElement.draggable = true;
    }

    onDragStart(event: any) {
        this.dataTable.onColumnDragStart(event, this.el.nativeElement);
    }

    onDragOver(event: any) {
        event.preventDefault();
    }

    onDragEnter(event: any) {
        this.dataTable.onColumnDragEnter(event, this.el.nativeElement);
    }

    onDragLeave(event: any) {
        this.dataTable.onColumnDragLeave(event);
    }

    @HostListener('drop', ['$event'])
    onDrop(event: any) {
        if (this.isEnabled()) {
            this.dataTable.onColumnDrop(event, this.el.nativeElement);
        }
    }

    isEnabled() {
        return this.pReorderableColumnDisabled() !== true;
    }

    onDestroy() {
        this.unbindEvents();
    }
}
