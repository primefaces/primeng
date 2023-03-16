import { Component } from '@angular/core';
import { DialogBasicDemo } from '../../doc/dialog/basicdoc';
import { EventsDoc } from '../../doc/dialog/eventsdoc';
import { ImportDoc } from '../../doc/dialog/importdoc';
import { DialogLongContentDemo } from '../../doc/dialog/longcontentdoc';
import { PropsDoc } from '../../doc/dialog/propsdoc';
import { StyleDoc } from '../../doc/dialog/styledoc';
import { DialogResponsiveDemo } from '../../doc/dialog/responsivedoc';
import { DialogPositionDemo } from '../../doc/dialog/positiondoc';
import { DialogMaximizableDemo } from '../../doc/dialog/maximizabledoc';
import { DialogTemplateDemo } from '../../doc/dialog/templatedoc';
import { DialogOverlaysInsideDemo } from '../../doc/dialog/overlaysinsidedoc';
import { DialogModalDemo } from '../../doc/dialog/modaldoc';

@Component({
    templateUrl: './dialogdemo.html'
})
export class DialogDemo {
    docs = [
        {
            id: 'import',
            label: 'Import',
            component: ImportDoc
        },
        {
            id: 'basic',
            label: 'Basic',
            component: DialogBasicDemo
        },
        {
            id: 'longcontent',
            label: 'Long Content',
            component: DialogLongContentDemo
        },
        {
            id: 'modal',
            label: 'Modal',
            component: DialogModalDemo
        },
        {
            id: 'responsive',
            label: 'Responsive',
            component: DialogResponsiveDemo
        },
        {
            id: 'position',
            label: 'Position',
            component: DialogPositionDemo
        },
        {
            id: 'maximizable',
            label: 'Maximizable',
            component: DialogMaximizableDemo
        },
        {
            id: 'custom',
            label: 'Custom Content',
            component: DialogTemplateDemo
        },
        {
            id: 'overlaysinside',
            label: 'Overlays Inside',
            component: DialogOverlaysInsideDemo
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

    // displayModal: boolean;

    // displayBasic: boolean;

    // displayBasic2: boolean;

    // displayMaximizable: boolean;

    // displayResponsive: boolean;

    // displayPosition: boolean;

    // position: string;

    // showModalDialog() {
    //     this.displayModal = true;
    // }

    // showBasicDialog() {
    //     this.displayBasic = true;
    // }

    // showBasicDialog2() {
    //     this.displayBasic2 = true;
    // }

    // showMaximizableDialog() {
    //     this.displayMaximizable = true;
    // }

    // showPositionDialog(position: string) {
    //     this.position = position;
    //     this.displayPosition = true;
    // }

    // showResponsiveDialog() {
    //     this.displayResponsive = true;
    // }
}
