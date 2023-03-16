import { Component } from '@angular/core';
import { DisabledDoc } from 'src/app/showcase/doc/inputtext/disableddoc';
import { FloatLabelDoc } from 'src/app/showcase/doc/inputtext/floatlabeldoc';
import { HelpTextDoc } from 'src/app/showcase/doc/inputtext/helptextdoc';
import { IconsDoc } from 'src/app/showcase/doc/inputtext/iconsdoc';
import { ImportDoc } from 'src/app/showcase/doc/inputtext/importdoc';
import { InvalidDoc } from 'src/app/showcase/doc/inputtext/invaliddoc';
import { SizesDoc } from 'src/app/showcase/doc/inputtext/sizesdoc';
import { BasicDoc } from '../../doc/inputtext/basicdoc';
import { KeyFilterDoc } from '../../doc/inputtext/keyfilterdoc';
import { PropsDoc } from '../../doc/inputtext/propsdoc';
import { StyleDoc } from '../../doc/inputtext/styledoc';

@Component({
    templateUrl: './inputtextdemo.html',
    styleUrls: ['./inputtextdemo.scss']
})
export class InputTextDemo {
    disabled: boolean = true;

    value1: string;

    value2: string;

    value3: string;

    value4: string;

    value5: string = 'Disabled';

    value6: string;

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
            id: 'icons',
            label: 'Icons',
            component: IconsDoc
        },
        {
            id: 'keyfilter',
            label: 'Key Filter',
            component: KeyFilterDoc
        },
        {
            id: 'sizes',
            label: 'Sizes',
            component: SizesDoc
        },
        {
            id: 'helptext',
            label: 'Help Text',
            component: HelpTextDoc
        },
        {
            id: 'floatlabel',
            label: 'Float Label',
            component: FloatLabelDoc
        },
        {
            id: 'invalid',
            label: 'Invalid',
            component: InvalidDoc
        },
        {
            id: 'disabled',
            label: 'Disabled',
            component: DisabledDoc
        },
        {
            id: 'style',
            label: 'Style',
            component: StyleDoc
        }
    ];

    apiDocs = [
        {
            id: 'properties',
            label: 'Properties',
            component: PropsDoc
        }
    ];
}
