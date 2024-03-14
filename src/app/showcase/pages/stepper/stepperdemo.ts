import { Component } from '@angular/core';
import { ImportDoc } from '../../doc/stepper/importdoc';
import { BasicDoc } from '../../doc/stepper/basicdoc';
import { VerticalDoc } from '../../doc/stepper/verticaldoc';
import { LinearDoc } from '../../doc/stepper/lineardoc';
import { TemplateDoc } from '../../doc/stepper/templatedoc';
@Component({
    templateUrl: './stepperdemo.html'
})
export class StepperDemo {
    docs = [
       
        {
            id: 'template',
            label: 'Template',
            component: TemplateDoc
        }
    ];
}
