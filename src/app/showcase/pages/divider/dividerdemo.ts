import { Component } from '@angular/core';
import { AccessibilityDoc } from '@doc/divider/accessibilitydoc';
import { BasicDoc } from '@doc/divider/basicdoc';
import { ContentDoc } from '@doc/divider/contentdoc';
import { ImportDoc } from '@doc/divider/importdoc';
import { LoginDoc } from '@doc/divider/logindoc';
import { StyleDoc } from '@doc/divider/styledoc';
import { TypeDoc } from '@doc/divider/typedoc';
import { VerticalDoc } from '@doc/divider/verticaldoc';

@Component({
    templateUrl: './dividerdemo.html'
})
export class DividerDemo {
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
            id: 'type',
            label: 'Type',
            component: TypeDoc
        },
        {
            id: 'vertical',
            label: 'Vertical',
            component: VerticalDoc
        },
        {
            id: 'content',
            label: 'Content',
            component: ContentDoc
        },
        {
            id: 'login',
            label: 'Login',
            component: LoginDoc
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
