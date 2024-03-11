import { Component } from '@angular/core';
import { ImportDoc } from '../../doc/stepper/importdoc';
import { BasicDoc } from '../../doc/stepper/basicdoc';


@Component({
    templateUrl: './stepperdemo.html'
})
export class StepperDemo {
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
