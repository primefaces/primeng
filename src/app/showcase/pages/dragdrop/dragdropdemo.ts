import { Component } from '@angular/core';
import { ImportDoc } from '../../doc/dragdrop/importdoc';
import { BasicDoc } from '../../doc/dragdrop/basicdoc';
import { DataTableDoc } from '../../doc/dragdrop/datatabledoc';
import { DropIndicatorDoc } from '../../doc/dragdrop/dropindicatordoc';
import { DragHandleDoc } from '../../doc/dragdrop/draghandledoc';

@Component({
    templateUrl: './dragdropdemo.html',
    styleUrls: ['./dragdropdemo.scss']
})
export class DragDropDemo {
    docs = [
        {
            id: 'import',
            label: 'Import',
            component: ImportDoc
        },
        {
            id: 'basic',
            label: 'Basic',
            component: BasicDoc
        },
        {
            id: 'datatable',
            label: 'DataTable',
            component: DataTableDoc
        },
        {
            id: 'dropindicator',
            label: 'Drop Indicator',
            component: DropIndicatorDoc
        },
        {
            id: 'draghandle',
            label: 'Drag Handle',
            component: DragHandleDoc
        }
    ];
}
