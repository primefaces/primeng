import { Component } from '@angular/core';
import { FilterDoc } from '@doc/picklist/filterdoc';
import { BasicDoc } from '@doc/picklist/basicdoc';
import { ImportDoc } from '@doc/picklist/importdoc';
import { StyleDoc } from '@doc/picklist/styledoc';
import { AccessibilityDoc } from '@doc/picklist/accessibilitydoc';
import { DragDropDoc } from "@doc/picklist/dragdropdoc";
import {SelectableDoc} from "@doc/picklist/selectabledoc";

@Component({
    templateUrl: './picklistdemo.html',
    styleUrls: ['./picklistdemo.scss']
})
export class PickListDemo {
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
            id: 'filter',
            label: 'Filter',
            component: FilterDoc
        },
        {
            id: 'dragdrop',
            label: 'Drag & Drop',
            component: DragDropDoc
        },
        {
            id: 'selectable',
            label: 'Selectable',
            component: SelectableDoc
        },
        {
            id: 'style',
            label: 'Style',
            component: StyleDoc
        },
        {
            id: 'accessibility',
            label: 'Accessibility',
            component: AccessibilityDoc
        }
    ];
}
