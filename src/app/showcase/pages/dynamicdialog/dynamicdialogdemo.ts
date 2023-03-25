import { Component } from '@angular/core';
import { OpenDoc } from '../../doc/dynamicdialog/opendoc';
import { ImportDoc } from '../../doc/dynamicdialog/importdoc';
import { PropsDoc } from '../../doc/dynamicdialog/propsdoc';
import { StyleDoc } from '../../doc/dynamicdialog/styledoc';
import { BasicDoc } from '../../doc/dynamicdialog/basicdoc';
import { UsageDoc } from '../../doc/dynamicdialog/usagedoc';
import { PassingDataDoc } from '../../doc/dynamicdialog/passingdatadoc';
import { CloseDoc } from '../../doc/dynamicdialog/closedoc';
import { ProductListDemoDoc } from '../../doc/dynamicdialog/productlistdemodoc';
import { EventsDoc } from '../../doc/dynamicdialog/eventsdoc';

@Component({
    templateUrl: './dynamicdialogdemo.html'
})
export class DynamicDialogDemo {
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
            id: 'usage',
            label: 'Usage',
            component: UsageDoc
        },
        {
            id: 'open',
            label: 'Opening a Dialog',
            component: OpenDoc
        },
        {
            id: 'passingdata',
            label: 'Passing Data',
            component: PassingDataDoc
        },
        {
            id: 'close',
            label: 'Closing a Dialog',
            component: CloseDoc
        },
        {
            id: 'productlistdemo',
            label: 'ProductListDemo',
            component: ProductListDemoDoc
        },
        {
            id: 'style',
            label: 'Style',
            component: StyleDoc
        }
    ];

    apiDocs = [
        {
            id: 'props',
            label: 'Properties',
            component: PropsDoc
        },
        {
            id: 'events',
            label: 'Events',
            component: EventsDoc
        }
    ];
}
