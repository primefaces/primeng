import { Component } from '@angular/core';
import { OpenDoc } from '../../doc/dynamicdialog/opendoc';
import { ImportDoc } from '../../doc/dynamicdialog/importdoc';
import { StyleDoc } from '../../doc/dynamicdialog/styledoc';
import { ExampleDoc } from '../../doc/dynamicdialog/exampledoc';
import { UsageDoc } from '../../doc/dynamicdialog/usagedoc';
import { PassingDataDoc } from '../../doc/dynamicdialog/passingdatadoc';
import { CloseDoc } from '../../doc/dynamicdialog/closedoc';
import { ProductListDemoDoc } from '../../doc/dynamicdialog/productlistdemodoc';
import { CustomizationDoc } from '../../doc/dynamicdialog/customizationdoc';

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
            id: 'customization',
            label: 'Customization',
            component: CustomizationDoc
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
        // {
        //     id: 'productlistdemo',
        //     label: 'ProductListDemo',
        //     component: ProductListDemoDoc
        // },
        {
            id: 'example',
            label: 'Example',
            component: ExampleDoc
        },
        {
            id: 'style',
            label: 'Style',
            component: StyleDoc
        }
    ];
}
