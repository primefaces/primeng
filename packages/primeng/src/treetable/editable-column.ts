import { booleanAttribute, Directive, HostListener, inject, input } from '@angular/core';
import { addClass, findSingle, invokeElementMethod, removeClass } from '@primeuix/utils';
import { BaseComponent } from 'primeng/basecomponent';
import { TREETABLE_INSTANCE } from './treetable-service';
import type { TreeTable } from './treetable';

@Directive({
    selector: '[ttEditableColumn]',
    standalone: true
})
export class TTEditableColumn extends BaseComponent {
    data = input<any>(undefined, { alias: 'ttEditableColumn' });

    field = input<any>(undefined, { alias: 'ttEditableColumnField' });

    ttEditableColumnDisabled = input(undefined, { transform: booleanAttribute });

    tt = inject<TreeTable>(TREETABLE_INSTANCE);

    onAfterViewInit() {
        if (this.isEnabled()) {
            !this.$unstyled() && addClass(this.el.nativeElement, 'p-editable-column');
            this.el?.nativeElement.setAttribute('data-p-editable-column', 'true');
        }
    }

    @HostListener('click', ['$event'])
    onClick(event: MouseEvent) {
        if (this.isEnabled()) {
            this.tt.editingCellClick = true;

            if (this.tt.editingCell) {
                if (this.tt.editingCell !== this.el.nativeElement) {
                    if (!this.tt.isEditingCellValid()) {
                        return;
                    }

                    if (this.tt.editingCell) !this.$unstyled() && removeClass(this.tt.editingCell, 'p-cell-editing');
                    this.openCell();
                }
            } else {
                this.openCell();
            }
        }
    }

    openCell() {
        this.tt.updateEditingCell(this.el.nativeElement, this.data(), this.field());
        !this.$unstyled() && addClass(this.el.nativeElement, 'p-cell-editing');
        this.el?.nativeElement.setAttribute('data-p-cell-editing', 'true');
        this.tt.onEditInit.emit({ field: this.field(), data: this.data() });
        this.tt.editingCellClick = true;
        setTimeout(() => {
            let focusable = <any>findSingle(this.el.nativeElement, 'input, textarea');
            if (focusable) {
                focusable.focus();
            }
        }, 50);
    }

    closeEditingCell() {
        if (this.tt.editingCell) !this.$unstyled() && removeClass(this.tt.editingCell, 'p-checkbox-icon');
        this.tt.editingCell = null;
        this.tt.unbindDocumentEditListener();
    }

    @HostListener('keydown', ['$event'])
    onKeyDown(event: KeyboardEvent) {
        if (this.isEnabled()) {
            //enter
            if (event.keyCode == 13 && !event.shiftKey) {
                if (this.tt.isEditingCellValid()) {
                    if (this.tt.editingCell) {
                        !this.$unstyled() && removeClass(this.tt.editingCell, 'p-cell-editing');
                        this.el?.nativeElement.setAttribute('data-p-cell-editing', 'false');
                    }
                    this.closeEditingCell();
                    this.tt.onEditComplete.emit({ field: this.field(), data: this.data() });
                }

                event.preventDefault();
            }

            //escape
            else if (event.keyCode == 27) {
                if (this.tt.isEditingCellValid()) {
                    if (this.tt.editingCell) {
                        !this.$unstyled() && removeClass(this.tt.editingCell, 'p-cell-editing');
                        this.el?.nativeElement.setAttribute('data-p-cell-editing', 'false');
                    }
                    this.closeEditingCell();
                    this.tt.onEditCancel.emit({ field: this.field(), data: this.data() });
                }

                event.preventDefault();
            }

            //tab
            else if (event.keyCode == 9) {
                this.tt.onEditComplete.emit({ field: this.field(), data: this.data() });

                if (event.shiftKey) this.moveToPreviousCell(event);
                else this.moveToNextCell(event);
            }
        }
    }

    findCell(element: any) {
        if (element) {
            let cell = element;
            while (cell && !findSingle(cell, '[data-p-cell-editing="true"]')) {
                cell = cell.parentElement;
            }

            return cell;
        } else {
            return null;
        }
    }

    moveToPreviousCell(event: KeyboardEvent) {
        let currentCell = this.findCell(event.target);
        let targetCell = this.findPreviousEditableColumn(currentCell);

        if (targetCell) {
            // @ts-ignore
            invokeElementMethod(targetCell as HTMLElement, 'click', undefined);
            event.preventDefault();
        }
    }

    moveToNextCell(event: KeyboardEvent) {
        let currentCell = this.findCell(event.target);
        let targetCell = this.findNextEditableColumn(currentCell);

        if (targetCell) {
            // @ts-ignore
            invokeElementMethod(targetCell, 'click', undefined);
            event.preventDefault();
        }
    }

    findPreviousEditableColumn(cell: any): Element | null {
        let prevCell = cell.previousElementSibling;

        if (!prevCell) {
            let previousRow = cell.parentElement ? cell.parentElement.previousElementSibling : null;
            if (previousRow) {
                prevCell = previousRow.lastElementChild;
            }
        }

        if (prevCell) {
            if (findSingle(prevCell, '[data-p-editable-column="true"]')) return prevCell;
            else return this.findPreviousEditableColumn(prevCell);
        } else {
            return null;
        }
    }

    findNextEditableColumn(cell: Element): Element | null {
        let nextCell = cell.nextElementSibling;

        if (!nextCell) {
            let nextRow = cell.parentElement ? cell.parentElement.nextElementSibling : null;
            if (nextRow) {
                nextCell = nextRow.firstElementChild;
            }
        }

        if (nextCell) {
            if (findSingle(nextCell, '[data-p-editable-column="true"]')) return nextCell;
            else return this.findNextEditableColumn(nextCell);
        } else {
            return null;
        }
    }

    isEnabled() {
        return this.ttEditableColumnDisabled() !== true;
    }
}
