import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, input, signal, ViewEncapsulation } from '@angular/core';
import { BadgeModule } from 'primeng/badge';
import { BaseComponent } from 'primeng/basecomponent';
import { SortAlt } from '@primeicons/angular/sort-alt';
import { SortAmountDown } from '@primeicons/angular/sort-amount-down';
import { SortAmountUpAlt } from '@primeicons/angular/sort-amount-up-alt';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TableStyle } from './style/tablestyle';
import { TABLE_INSTANCE } from './table-service';
import type { Table } from './table';

@Component({
    selector: 'p-sort-icon, p-sorticon',
    standalone: true,
    imports: [NgTemplateOutlet, BadgeModule, SortAlt, SortAmountUpAlt, SortAmountDown],
    template: `
        @if (!dataTable.sortIconTemplate()) {
            @if (sortOrder() === 0) {
                <svg data-p-icon="sort-alt" [class]="cx('sortableColumnIcon')" />
            }
            @if (sortOrder() === 1) {
                <svg data-p-icon="sort-amount-up-alt" [class]="cx('sortableColumnIcon')" />
            }
            @if (sortOrder() === -1) {
                <svg data-p-icon="sort-amount-down" [class]="cx('sortableColumnIcon')" />
            }
        }
        @if (dataTable.sortIconTemplate()) {
            <span [class]="cx('sortableColumnIcon')">
                <ng-template *ngTemplateOutlet="dataTable.sortIconTemplate(); context: { $implicit: sortOrder() }"></ng-template>
            </span>
        }
        @if (isMultiSorted()) {
            <p-badge [class]="cx('sortableColumnBadge')" [value]="getBadgeValue()" size="small" />
        }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    providers: [TableStyle]
})
export class SortIcon extends BaseComponent {
    field = input<string | undefined>();

    sortOrder = signal<number>(0);

    _componentStyle = inject(TableStyle);

    public dataTable = inject<Table>(TABLE_INSTANCE);

    constructor() {
        super();
        this.dataTable.tableService.sortSource$.pipe(takeUntilDestroyed()).subscribe(() => {
            this.updateSortState();
        });
    }

    onInit() {
        this.updateSortState();
    }

    onClick(event: Event) {
        event.preventDefault();
    }

    updateSortState() {
        if (this.dataTable.sortMode() === 'single') {
            this.sortOrder.set(this.dataTable.isSorted(<string>this.field()) ? this.dataTable.sortOrder : 0);
        } else if (this.dataTable.sortMode() === 'multiple') {
            let sortMeta = this.dataTable.getSortMeta(<string>this.field());
            this.sortOrder.set(sortMeta ? sortMeta.order : 0);
        }
    }

    getMultiSortMetaIndex() {
        let multiSortMeta = this.dataTable.multiSortMeta;
        let index = -1;

        if (multiSortMeta && this.dataTable.sortMode() === 'multiple' && this.dataTable.showInitialSortBadge() && multiSortMeta.length > 1) {
            for (let i = 0; i < multiSortMeta.length; i++) {
                let meta = multiSortMeta[i];
                if (meta.field === this.field() || meta.field === this.field()) {
                    index = i;
                    break;
                }
            }
        }

        return index;
    }

    getBadgeValue() {
        let index = this.getMultiSortMetaIndex();

        return (this.dataTable?.groupRowsBy() || '') && index > -1 ? index : index + 1;
    }

    isMultiSorted() {
        return this.dataTable.sortMode() === 'multiple' && this.getMultiSortMetaIndex() > -1;
    }
}
