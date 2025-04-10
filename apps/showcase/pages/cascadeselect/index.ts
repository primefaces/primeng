import { AccessibilityDoc } from '@/doc/cascadeselect/accessibilitydoc';
import { BasicDoc } from '@/doc/cascadeselect/basicdoc';
import { CascadeSelectDocModule } from '@/doc/cascadeselect/cascasdeselectdoc.module';
import { DisabledDoc } from '@/doc/cascadeselect/disableddoc';
import { FilledDoc } from '@/doc/cascadeselect/filleddoc';
import { FloatLabelDoc } from '@/doc/cascadeselect/floatlabeldoc';
import { IftaLabelDoc } from '@/doc/cascadeselect/iftalabeldoc';
import { ImportDoc } from '@/doc/cascadeselect/importdoc';
import { InvalidDoc } from '@/doc/cascadeselect/invaliddoc';
import { LoadingDoc } from '@/doc/cascadeselect/loadingdoc';
import { ReactiveFormsDoc } from '@/doc/cascadeselect/reactiveformsdoc';
import { SizesDoc } from '@/doc/cascadeselect/sizesdoc';
import { TemplateDoc } from '@/doc/cascadeselect/templatedoc';
import { Component } from '@angular/core';

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
