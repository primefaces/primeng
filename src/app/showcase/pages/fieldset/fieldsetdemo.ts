import { Component } from '@angular/core';
import { ImportDoc } from '@doc/fieldset/importdoc';
import { BasicDoc } from '@doc/fieldset/basicdoc';
import { ToggleableDoc } from '@doc/fieldset/toggleabledoc';
import { TemplateDoc } from '@doc/fieldset/templatedoc';
import { StyleDoc } from '@doc/fieldset/styledoc';
import { AccessibilityDoc } from '@doc/fieldset/accessibilitydoc';

@Component({
    templateUrl: './fieldsetdemo.html'
})
export class FieldsetDemo {
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
            id: 'toggleable',
            label: 'Toggleable',
            component: ToggleableDoc
        },
        {
            id: 'template',
            label: 'Template',
            component: TemplateDoc
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
