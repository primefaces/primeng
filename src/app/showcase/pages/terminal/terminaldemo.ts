import { Component } from '@angular/core';
import { BasicDoc } from '../../doc/terminal/basicdoc';
import { PropsDoc } from '../../doc/terminal/propsdoc';
import { StyleDoc } from '../../doc/terminal/styledoc';
import { ImportDoc } from '../../doc/terminal/importdoc';

@Component({
    templateUrl: './terminaldemo.html'
})
export class TerminalDemo {
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
        }
    ];
}
