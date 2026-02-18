import { booleanAttribute, Directive, HostListener, inject, input } from '@angular/core';
import { BaseComponent } from 'primeng/basecomponent';
import { Bind } from 'primeng/bind';
import { VoidListener } from 'primeng/ts-helpers';
import { TABLE_INSTANCE } from './table-service';
import type { Table } from './table';

@Directive({
    selector: '[pReorderableRow]',
    standalone: true,
    hostDirectives: [Bind]
})
export class ReorderableRow extends BaseComponent {
    hostName = 'Table';

    bindDirectiveInstance = inject(Bind, { self: true });

    onAfterViewChecked(): void {
        this.bindDirectiveInstance.setAttrs(this.ptm('reorderableRow'));
    }

    index = input<number | undefined>(undefined, { alias: 'pReorderableRow' });

    pReorderableRowDisabled = input(undefined, { transform: booleanAttribute });

    mouseDownListener: VoidListener;

    dragStartListener: VoidListener;

    dragEndListener: VoidListener;

    dragOverListener: VoidListener;

    dragLeaveListener: VoidListener;

    dropListener: VoidListener;

    public dataTable = inject<Table>(TABLE_INSTANCE);

    onAfterViewInit() {
        if (this.isEnabled()) {
            this.el.nativeElement.droppable = true;
            this.bindEvents();
        }
    }

    bindEvents() {
        this.mouseDownListener = this.renderer.listen(this.el.nativeElement, 'mousedown', this.onMouseDown.bind(this));

        this.dragStartListener = this.renderer.listen(this.el.nativeElement, 'dragstart', this.onDragStart.bind(this));

        this.dragEndListener = this.renderer.listen(this.el.nativeElement, 'dragend', this.onDragEnd.bind(this));

        this.dragOverListener = this.renderer.listen(this.el.nativeElement, 'dragover', this.onDragOver.bind(this));

        this.dragLeaveListener = this.renderer.listen(this.el.nativeElement, 'dragleave', this.onDragLeave.bind(this));
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

        if (this.dragEndListener) {
            this.dragEndListener();
            this.dragEndListener = null;
        }

        if (this.dragOverListener) {
            this.dragOverListener();
            this.dragOverListener = null;
        }

        if (this.dragLeaveListener) {
            this.dragLeaveListener();
            this.dragLeaveListener = null;
        }
    }

    onMouseDown(event: Event) {
        const targetElement = event.target as HTMLElement;
        const isHandleClicked = this.isHandleElement(targetElement);
        this.el.nativeElement.draggable = isHandleClicked;
    }

    isHandleElement(element: HTMLElement): boolean {
        if (element?.classList.contains('p-datatable-reorderable-row-handle')) {
            return true;
        }

        if (element?.parentElement && !['TD', 'TR'].includes(element?.parentElement?.tagName)) {
            return this.isHandleElement(element?.parentElement);
        }

        return false;
    }

    onDragStart(event: DragEvent) {
        this.dataTable.onRowDragStart(event, <number>this.index());
    }

    onDragEnd(event: DragEvent) {
        this.dataTable.onRowDragEnd(event);
        this.el.nativeElement.draggable = false;
    }

    onDragOver(event: DragEvent) {
        this.dataTable.onRowDragOver(event, <number>this.index(), this.el.nativeElement);
        event.preventDefault();
    }

    onDragLeave(event: DragEvent) {
        this.dataTable.onRowDragLeave(event, this.el.nativeElement);
    }

    isEnabled() {
        return this.pReorderableRowDisabled() !== true;
    }

    @HostListener('drop', ['$event'])
    onDrop(event: DragEvent) {
        if (this.isEnabled() && this.dataTable.rowDragging) {
            this.dataTable.onRowDrop(event, this.el.nativeElement);
        }

        event.preventDefault();
    }

    onDestroy() {
        this.unbindEvents();
    }
}
