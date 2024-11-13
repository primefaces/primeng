import { AccessibilityDoc } from '@/doc/inputtext/accessibilitydoc';
import { BasicDoc } from '@/doc/inputtext/basicdoc';
import { DisabledDoc } from '@/doc/inputtext/disableddoc';
import { FilledDoc } from '@/doc/inputtext/filleddoc';
import { FloatLabelDoc } from '@/doc/inputtext/floatlabeldoc';
import { HelpTextDoc } from '@/doc/inputtext/helptextdoc';
import { IftaLabelDoc } from '@/doc/inputtext/iftalabeldoc';
import { ImportDoc } from '@/doc/inputtext/importdoc';
import { InputtextDocModule } from '@/doc/inputtext/inputtextdoc.module';
import { InvalidDoc } from '@/doc/inputtext/invaliddoc';
import { ReactiveFormsDoc } from '@/doc/inputtext/reactiveformsdoc';
import { SizesDoc } from '@/doc/inputtext/sizesdoc';
import { Component } from '@angular/core';

@Component({
    standalone: true,
    imports: [InputtextDocModule],
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
            id: 'reactive-forms',
            label: 'Reactive Forms',
            component: ReactiveFormsDoc
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
