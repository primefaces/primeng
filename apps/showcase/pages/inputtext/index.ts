import { AccessibilityDoc } from '@/doc/inputtext/accessibilitydoc';
import { BasicDoc } from '@/doc/inputtext/basicdoc';
import { DisabledDoc } from '@/doc/inputtext/disableddoc';
import { FilledDoc } from '@/doc/inputtext/filleddoc';
import { FloatLabelDoc } from '@/doc/inputtext/floatlabeldoc';
import { HelpTextDoc } from '@/doc/inputtext/helptextdoc';
import { IftaLabelDoc } from '@/doc/inputtext/iftalabeldoc';
import { ImportDoc } from '@/doc/inputtext/importdoc';
import { InvalidDoc } from '@/doc/inputtext/invaliddoc';
import { ReactiveFormsDoc } from '@/doc/inputtext/reactiveformsdoc';
import { SizesDoc } from '@/doc/inputtext/sizesdoc';
import { TemplateDrivenFormsDoc } from '@/doc/inputtext/templatedrivenformsdoc';
import { FluidDoc } from '@/doc/inputtext/fluiddoc';
import { Component } from '@angular/core';
import { AppDoc } from '@/components/doc/app.doc';

@Component({
    standalone: true,
    imports: [AppDoc],
    template: `<app-doc
        docTitle="Angular InputText Component"
        header="InputText"
        description="InputText is an extension to standard input element with theming and keyfiltering."
        [apiDocs]="['InputText']"
        [docs]="docs"
        themeDocs="inputtext"
    ></app-doc> `
})
export class InputTextDemo {
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
            id: 'floatlabel',
            label: 'Float Label',
            component: FloatLabelDoc
        },
        {
            id: 'iftalabel',
            label: 'Ifta Label',
            component: IftaLabelDoc
        },
        {
            id: 'sizes',
            label: 'Sizes',
            component: SizesDoc
        },
        {
            id: 'fluid',
            label: 'Fluid',
            component: FluidDoc
        },
        {
            id: 'helptext',
            label: 'Help Text',
            component: HelpTextDoc
        },
        {
            id: 'filled',
            label: 'Filled',
            component: FilledDoc
        },
        {
            id: 'disabled',
            label: 'Disabled',
            component: DisabledDoc
        },
        {
            id: 'invalid',
            label: 'Invalid',
            component: InvalidDoc
        },
        {
            id: 'forms',
            label: 'Forms',
            children: [
                { id: 'templatedriven', label: 'Template Driven', component: TemplateDrivenFormsDoc },
                { id: 'reactive', label: 'Reactive Forms', component: ReactiveFormsDoc }
            ]
        },
        {
            id: 'accessibility',
            label: 'Accessibility',
            component: AccessibilityDoc
        }
    ];
}
