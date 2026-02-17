import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, Input, ViewEncapsulation } from '@angular/core';
import { BadgeModule } from 'primeng/badge';
import { BaseComponent } from 'primeng/basecomponent';
import { SortAltIcon } from 'primeng/icons/sortalt';
import { SortAmountDownIcon } from 'primeng/icons/sortamountdown';
import { SortAmountUpAltIcon } from 'primeng/icons/sortamountupalt';
import { Subscription } from 'rxjs';
import { TableStyle } from './style/tablestyle';
import { TABLE_INSTANCE } from './table-token';
import type { Table } from './table';

@Component({
    selector: 'p-sortIcon',
    standalone: true,
    imports: [CommonModule, BadgeModule, SortAltIcon, SortAmountUpAltIcon, SortAmountDownIcon],
    template: `
        <ng-container *ngIf="!(dataTable.sortIconTemplate || dataTable._sortIconTemplate)">
            <svg data-p-icon="sort-alt" [class]="cx('sortableColumnIcon')" *ngIf="sortOrder === 0" />
            <svg data-p-icon="sort-amount-up-alt" [class]="cx('sortableColumnIcon')" *ngIf="sortOrder === 1" />
            <svg data-p-icon="sort-amount-down" [class]="cx('sortableColumnIcon')" *ngIf="sortOrder === -1" />
        </ng-container>
        <span *ngIf="dataTable.sortIconTemplate || dataTable._sortIconTemplate" [class]="cx('sortableColumnIcon')">
            <ng-template *ngTemplateOutlet="dataTable.sortIconTemplate || dataTable._sortIconTemplate; context: { $implicit: sortOrder }"></ng-template>
        </span>
        <p-badge *ngIf="isMultiSorted()" [class]="cx('sortableColumnBadge')" [value]="getBadgeValue()" size="small"></p-badge>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    providers: [TableStyle]
})
export class SortIcon extends BaseComponent {
    @Input() field: string | undefined;

    subscription: Subscription | undefined;

    sortOrder: number | undefined;

    _componentStyle = inject(TableStyle);

    public dataTable = inject<Table>(TABLE_INSTANCE);

    public cd = inject(ChangeDetectorRef);

    constructor() {
        super();
        this.subscription = this.dataTable.tableService.sortSource$.subscribe((sortMeta) => {
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
        if (this.dataTable.sortMode === 'single') {
            this.sortOrder = this.dataTable.isSorted(<string>this.field) ? this.dataTable.sortOrder : 0;
        } else if (this.dataTable.sortMode === 'multiple') {
            let sortMeta = this.dataTable.getSortMeta(<string>this.field);
            this.sortOrder = sortMeta ? sortMeta.order : 0;
        }

        this.cd.markForCheck();
    }

    getMultiSortMetaIndex() {
        let multiSortMeta = this.dataTable._multiSortMeta;
        let index = -1;

        if (multiSortMeta && this.dataTable.sortMode === 'multiple' && this.dataTable.showInitialSortBadge && multiSortMeta.length > 1) {
            for (let i = 0; i < multiSortMeta.length; i++) {
                let meta = multiSortMeta[i];
                if (meta.field === this.field || meta.field === this.field) {
                    index = i;
                    break;
                }
            }
        }

        return index;
    }

    getBadgeValue() {
        let index = this.getMultiSortMetaIndex();

        return (this.dataTable?.groupRowsBy || '') && index > -1 ? index : index + 1;
    }

    isMultiSorted() {
        return this.dataTable.sortMode === 'multiple' && this.getMultiSortMetaIndex() > -1;
    }

    onDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
