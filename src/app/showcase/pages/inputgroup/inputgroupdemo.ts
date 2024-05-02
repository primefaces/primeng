import { Component } from '@angular/core';
import { MultipleDoc } from '@doc/inputgroup/multipledoc';
import { BasicDoc } from '@doc/inputgroup/basicdoc';
import { ImportDoc } from '@doc/inputgroup/importdoc';
import { ButtonDoc } from '@doc/inputgroup/buttondoc';
import { CheckboxDoc } from '@doc/inputgroup/checkboxdoc';
import { AccessibilityDoc } from '@doc/inputgroup/accessibilitydoc';

@Component({
    templateUrl: './inputgroupdemo.html'
})
export class InputGroupDemo {
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
            id: 'multiple',
            label: 'Multiple',
            component: MultipleDoc
        },
        {
            id: 'button',
            label: 'Button',
            component: ButtonDoc
        },
        {
            id: 'checkbox',
            label: 'Check & Radio',
            component: CheckboxDoc
        },
        {
            id: 'accessibility',
            label: 'Accessibility',
            component: AccessibilityDoc
        }
    ];
}
