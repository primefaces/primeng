import { Component } from '@angular/core';

import { BasicDoc } from '../../doc/accordion/basicdoc';


@Component({
    templateUrl: './accordiondemo.html',
    styleUrls: ['./accordiondemo.scss']
})
export class AccordionDemo {
    docs = [
 
        {
            id: 'basic',
            label: 'Basic',
            component: BasicDoc
        },
    
    ];
}
