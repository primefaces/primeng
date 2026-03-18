import { Directive, HostListener, inject, input } from '@angular/core';
import { find, findSingle, focus, getAttribute, getIndex, isNotEmpty } from '@primeuix/utils';
import { BaseComponent } from 'primeng/basecomponent';
import { Bind } from 'primeng/bind';
import { TreeTableStyle } from './style/treetablestyle';
import { TREETABLE_INSTANCE } from './treetable-service';
import type { TreeTable } from './treetable';

@Directive({
    selector: '[ttRow]',
    standalone: true,
    host: {
        '[class]': 'hostClass',
        '[tabindex]': "'0'",
        '[attr.aria-expanded]': 'expanded',
        '[attr.aria-level]': 'level',
        role: 'row'
    },
    providers: [TreeTableStyle],
    hostDirectives: [Bind]
})
export class TTRow extends BaseComponent {
    hostName = 'TreeTable';

    bindDirectiveInstance = inject(Bind, { self: true });

    tt = inject<TreeTable>(TREETABLE_INSTANCE);

    onAfterViewChecked(): void {
        this.bindDirectiveInstance.setAttrs(this.ptm('row', this.ptmOptions()));
    }

    get level() {
        return this.rowNode()?.['level'] + 1;
    }

    get hostClass() {
        return this.cn('p-element', this.rowNode()?.node['styleClass']);
    }

    get expanded() {
        return this.rowNode()?.node['expanded'];
    }

    rowNode = input<any>(undefined, { alias: 'ttRow' });

    _componentStyle = inject(TreeTableStyle);

    @HostListener('keydown', ['$event'])
    onKeyDown(event: KeyboardEvent) {
        switch (event.code) {
            case 'ArrowDown':
                this.onArrowDownKey(event);
                break;

            case 'ArrowUp':
                this.onArrowUpKey(event);
                break;

            case 'ArrowRight':
                this.onArrowRightKey(event);
                break;

            case 'ArrowLeft':
                this.onArrowLeftKey(event);
                break;

            case 'Tab':
                this.onTabKey(event);
                break;

            case 'Home':
                this.onHomeKey(event);
                break;

            case 'End':
                this.onEndKey(event);
                break;

            default:
                break;
        }
    }

    onArrowDownKey(event: KeyboardEvent) {
        let nextRow = this.el?.nativeElement?.nextElementSibling;
        if (nextRow) {
            this.focusRowChange(<HTMLElement>event.currentTarget, nextRow);
        }

        event.preventDefault();
    }

    onArrowUpKey(event: KeyboardEvent) {
        let prevRow = this.el?.nativeElement?.previousElementSibling;
        if (prevRow) {
            this.focusRowChange(<HTMLElement>event.currentTarget, prevRow);
        }

        event.preventDefault();
    }

    onArrowRightKey(event: KeyboardEvent) {
        const currentTarget = <HTMLElement>event.currentTarget;
        const isHiddenIcon = (findSingle(currentTarget, 'button') as any).style.visibility === 'hidden';

        if (!isHiddenIcon && !this.expanded && this.rowNode()?.node['children']) {
            this.expand(event);

            currentTarget.tabIndex = -1;
        }
        event.preventDefault();
    }

    onArrowLeftKey(event: KeyboardEvent) {
        const container = this.tt.el?.nativeElement;
        const expandedRows = find(container, '[aria-expanded="true"]');
        const lastExpandedRow = expandedRows[expandedRows.length - 1];

        if (this.expanded) {
            this.collapse(event);
        }
        if (lastExpandedRow) {
            this.tt.toggleRowIndex = getIndex(lastExpandedRow as any);
        }
        this.restoreFocus();
        event.preventDefault();
    }

    onHomeKey(event: KeyboardEvent) {
        const firstElement = <any>findSingle(this.tt.el?.nativeElement, `tr[aria-level="${this.level}"]`);
        firstElement && focus(firstElement);
        event.preventDefault();
    }

    onEndKey(event: KeyboardEvent) {
        const nodes = <any>find(this.tt.el?.nativeElement, `tr[aria-level="${this.level}"]`);
        const lastElement = nodes[nodes.length - 1];
        focus(lastElement);
        event.preventDefault();
    }

    onTabKey(event: KeyboardEvent) {
        const rows = this.el.nativeElement ? [...find(this.el.nativeElement.parentNode, 'tr')] : undefined;

        if (rows && isNotEmpty(rows)) {
            const hasSelectedRow = rows.some((row) => getAttribute(row, 'data-p-highlight') || row.getAttribute('aria-selected') === 'true');
            rows.forEach((row: any) => {
                row.tabIndex = -1;
            });

            if (hasSelectedRow) {
                const selectedNodes = rows.filter((node) => getAttribute(node, 'data-p-highlight') || node.getAttribute('aria-selected') === 'true');
                (selectedNodes[0] as any).tabIndex = 0;

                return;
            }

            (rows[0] as any).tabIndex = 0;
        }
    }

    expand(event: Event) {
        this.tt.toggleRowIndex = getIndex(this.el.nativeElement);
        this.rowNode().node['expanded'] = true;

        this.tt.updateSerializedValue();
        this.tt.tableService.onUIUpdate(this.tt.value);
        this.rowNode().node['children'] ? this.restoreFocus(this.tt.toggleRowIndex + 1) : this.restoreFocus();

        this.tt.onNodeExpand.emit({
            originalEvent: event,
            node: this.rowNode().node
        });
    }

    collapse(event: Event) {
        this.rowNode().node['expanded'] = false;

        this.tt.updateSerializedValue();
        this.tt.tableService.onUIUpdate(this.tt.value);

        this.tt.onNodeCollapse.emit({ originalEvent: event, node: this.rowNode().node });
    }

    focusRowChange(firstFocusableRow, currentFocusedRow, lastVisibleDescendant?) {
        firstFocusableRow.tabIndex = '-1';
        currentFocusedRow.tabIndex = '0';

        focus(currentFocusedRow);
    }

    restoreFocus(index?) {
        setTimeout(() => {
            const container = this.tt.el?.nativeElement;
            const tbody = findSingle(container, '[data-pc-section="tbody"]');
            const row = tbody?.children?.[<number>index || this.tt.toggleRowIndex || 0];
            const rows = [...find(container, 'tr')];

            rows &&
                rows.forEach((r: any) => {
                    if (row && !row.isSameNode(r)) {
                        r.tabIndex = -1;
                    }
                });

            if (row) {
                (row as HTMLElement).tabIndex = 0;
                (row as HTMLElement).focus();
            }
        }, 25);
    }

    ptmOptions() {
        return {
            context: {
                selectable: this.tt?.rowHover() || !!this.tt.selectionMode(),
                selected: this.tt.isSelected((<any>this.rowNode())?.node),
                scrollable: this.tt?.scrollable(),
                rowNode: this.rowNode()
            }
        };
    }
}
