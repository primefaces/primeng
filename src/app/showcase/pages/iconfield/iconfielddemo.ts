import { Component } from '@angular/core';
import { BasicDoc } from '../../doc/iconfield/basicdoc';
import { ImportDoc } from '../../doc/iconfield/importdoc';

@Component({
    templateUrl: './iconfielddemo.html',
    styleUrls: ['./iconfielddemo.scss']
})
export class IconFieldDemo {
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
    
    ];
}
