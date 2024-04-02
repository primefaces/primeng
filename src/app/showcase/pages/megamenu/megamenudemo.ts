import { Component } from '@angular/core';
import { ImportDoc } from '@doc/megamenu/importdoc';
import { BasicDoc } from '@doc/megamenu/basicdoc';
import { StyleDoc } from '@doc/megamenu/styledoc';
import { TemplateDoc } from '@doc/megamenu/templatedoc';
import { VerticalDoc } from '@doc/megamenu/verticaldoc';
import { AccessibilityDoc } from '@doc/megamenu/accessibilitydoc';

@Component({
    templateUrl: './megamenudemo.html',
    styles: [
        `
            :host ::ng-deep {
                .p-megamenu-panel {
                    z-index: 3;
                }
            }
        `
    ]
})
export class MegaMenuDemo {
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
            id: 'vertical',
            label: 'Vertical',
            component: VerticalDoc
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
