import { NgTemplateOutlet } from '@angular/common';
import { booleanAttribute, Component, computed, inject, input, TemplateRef, ViewEncapsulation } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { BaseComponent } from 'primeng/basecomponent';
import { Nullable } from 'primeng/ts-helpers';
import { TREETABLE_INSTANCE } from './treetable-service';
import type { TreeTable } from './treetable';

@Component({
    selector: '[pTreeTableBody]',
    standalone: true,
    imports: [NgTemplateOutlet],
    template: `
        @for (serializedNode of serializedNodes() || tt.serializedValue; track tt.rowTrackBy()($index, serializedNode)) {
            @if (serializedNode.visible) {
                <ng-container *ngTemplateOutlet="template(); context: getBodyTemplateContext(serializedNode)"></ng-container>
            }
        }
        @if (tt.isEmpty()) {
            <ng-container *ngTemplateOutlet="tt.emptyMessageTemplate(); context: emptyMessageContext()"></ng-container>
        }
    `,
    encapsulation: ViewEncapsulation.None,
    host: {
        '[attr.data-p]': 'dataP'
    }
})
export class TTBody extends BaseComponent {
    columns = input<any[]>(undefined, { alias: 'pTreeTableBody' });

    template = input<Nullable<TemplateRef<any>>>(undefined, { alias: 'pTreeTableBodyTemplate' });

    frozen = input(undefined, { transform: booleanAttribute });

    serializedNodes = input<any>();

    scrollerOptions = input<any>();

    tt = inject<TreeTable>(TREETABLE_INSTANCE);

    emptyMessageContext = computed(() => ({ $implicit: this.columns(), frozen: this.frozen() }));

    constructor() {
        super();
        this.tt.tableService.uiUpdateSource$.pipe(takeUntilDestroyed()).subscribe(() => {
            if (this.tt.virtualScroll()) {
                this.cd.detectChanges();
            }
        });
    }

    getBodyTemplateContext(serializedNode: any) {
        return {
            $implicit: serializedNode,
            node: serializedNode.node,
            rowData: serializedNode.node.data,
            columns: this.columns()
        };
    }

    getScrollerOption(option: any, options?: any) {
        if (this.tt.virtualScroll()) {
            options = options || this.scrollerOptions();
            return options ? options[option] : null;
        }

        return null;
    }

    getRowIndex(rowIndex: number) {
        const getItemOptions = this.getScrollerOption('getItemOptions');
        return getItemOptions ? getItemOptions(rowIndex).index : rowIndex;
    }

    get dataP() {
        return this.cn({
            hoverable: this.tt.rowHover() || this.tt.selectionMode(),
            frozen: this.frozen()
        });
    }
}
