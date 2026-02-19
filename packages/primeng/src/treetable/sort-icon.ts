import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, input, signal, ViewEncapsulation } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { BadgeModule } from 'primeng/badge';
import { BaseComponent } from 'primeng/basecomponent';
import { Bind } from 'primeng/bind';
import { SortAltIcon, SortAmountDownIcon, SortAmountUpAltIcon } from 'primeng/icons';
import { TreeTableStyle } from './style/treetablestyle';
import { TREETABLE_INSTANCE } from './treetable-service';
import type { TreeTable } from './treetable';

@Component({
    selector: 'p-treetable-sort-icon, p-tree-table-sort-icon',
    standalone: true,
    imports: [NgTemplateOutlet, Bind, BadgeModule, SortAltIcon, SortAmountUpAltIcon, SortAmountDownIcon],
    template: `
        @if (!tt.sortIconTemplate()) {
            @if (sortOrder() === 0) {
                <svg data-p-icon="sort-alt" [class]="cx('sortableColumnIcon')" [pBind]="ptm('sortableColumnIcon')" />
            }
            @if (sortOrder() === 1) {
                <svg data-p-icon="sort-amount-up-alt" [class]="cx('sortableColumnIcon')" [pBind]="ptm('sortableColumnIcon')" />
            }
            @if (sortOrder() === -1) {
                <svg data-p-icon="sort-amount-down" [class]="cx('sortableColumnIcon')" [pBind]="ptm('sortableColumnIcon')" />
            }
        }
        @if (tt.sortIconTemplate()) {
            <span [class]="cx('sortableColumnIcon')" [pBind]="ptm('sortableColumnIcon')">
                <ng-template *ngTemplateOutlet="tt.sortIconTemplate(); context: { $implicit: sortOrder() }"></ng-template>
            </span>
        }
        @if (isMultiSorted()) {
            <p-badge [class]="cx('sortableColumnBadge')" [value]="getBadgeValue()" size="small" [pt]="ptm('pcSortableColumnBadge')" [unstyled]="unstyled()" />
        }
    `,
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [TreeTableStyle]
})
export class TTSortIcon extends BaseComponent {
    hostName = 'TreeTable';

    field = input<string>();

    ariaLabelDesc = input<string>();

    ariaLabelAsc = input<string>();

    sortOrder = signal<number | undefined>(undefined);

    _componentStyle = inject(TreeTableStyle);

    tt = inject<TreeTable>(TREETABLE_INSTANCE);

    constructor() {
        super();
        this.tt.tableService.sortSource$.pipe(takeUntilDestroyed()).subscribe(() => {
            this.updateSortState();
        });
    }

    onInit() {
        this.updateSortState();
    }

    onClick(event: Event) {
        event.preventDefault();
    }

    getMultiSortMetaIndex() {
        let multiSortMeta = this.tt._multiSortMeta;
        let index = -1;

        if (multiSortMeta && this.tt.sortMode() === 'multiple' && multiSortMeta.length > 1) {
            for (let i = 0; i < multiSortMeta.length; i++) {
                let meta = multiSortMeta[i];
                if (meta.field === this.field()) {
                    index = i;
                    break;
                }
            }
        }

        return index;
    }

    updateSortState() {
        if (this.tt.sortMode() === 'single') {
            this.sortOrder.set(this.tt.isSorted(<string>this.field()) ? this.tt._sortOrder : 0);
        } else if (this.tt.sortMode() === 'multiple') {
            let sortMeta = this.tt.getSortMeta(<string>this.field());
            this.sortOrder.set(sortMeta ? sortMeta.order : 0);
        }
    }

    getBadgeValue() {
        return this.getMultiSortMetaIndex() + 1;
    }

    isMultiSorted() {
        return this.tt.sortMode() === 'multiple' && this.getMultiSortMetaIndex() > -1;
    }
}
