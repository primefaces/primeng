import { Component } from '@angular/core';
import { AccessibilityDoc } from '@doc/cascadeselect/accessibilitydoc';
import { BasicDoc } from '@doc/cascadeselect/basicdoc';
import { ImportDoc } from '@doc/cascadeselect/importdoc';
import { ReactiveFormsDoc } from '@doc/cascadeselect/reactiveformsdoc';
import { InvalidDoc } from '@doc/cascadeselect/invaliddoc';
import { FloatLabelDoc } from '@doc/cascadeselect/floatlabeldoc';
import { TemplateDoc } from '@doc/cascadeselect/templatedoc';
import { DisabledDoc } from '@doc/cascadeselect/disableddoc';
import { FilledDoc } from '@doc/cascadeselect/filleddoc';
import { LoadingDoc } from '@doc/cascadeselect/loadingdoc';
import { CascadeSelectDocModule } from '@doc/cascadeselect/cascasdeselectdoc.module';
import { IftaLabelDoc } from '@doc/cascadeselect/iftalabeldoc';
import { SizesDoc } from '@doc/cascadeselect/sizesdoc';

@Component({
    standalone: true,
    imports: [CascadeSelectDocModule],
    template: ` <app-doc docTitle="Angular CascadeSelect Component" header="CascadeSelect" description="CascadeSelect displays a nested structure of options." [docs]="docs" [apiDocs]="['CascadeSelect']" themeDocs="CascadeSelect"></app-doc> `
})
export class CascadeSelectDemo {
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
            id: 'reactive-forms',
            label: 'Reactive Forms',
            component: ReactiveFormsDoc
        },
        {
            id: 'template',
            label: 'Template',
            component: TemplateDoc
        },
        {
            id: 'loading',
            label: 'Loading State',
            component: LoadingDoc
        },
        {
            id: 'float-label',
            label: 'Float Label',
            component: FloatLabelDoc
        },
        {
            id: 'ifta-label',
            label: 'Ifta Label',
            component: IftaLabelDoc
        },
        {
            id: 'sizes',
            label: 'Sizes',
            component: SizesDoc
        },
        {
            id: 'filled',
            label: 'Filled',
            component: FilledDoc
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
            id: 'accessibility',
            label: 'Accessibility',
            component: AccessibilityDoc
        }
    ];
}
