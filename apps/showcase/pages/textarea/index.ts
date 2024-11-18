import { AccessibilityDoc } from '@/doc/textarea/accessibilitydoc';
import { AutoResizeDoc } from '@/doc/textarea/autoresizedoc';
import { BasicDoc } from '@/doc/textarea/basicdoc';
import { DisabledDoc } from '@/doc/textarea/disableddoc';
import { FilledDoc } from '@/doc/textarea/filleddoc';
import { FloatlabelDoc } from '@/doc/textarea/floatlabeldoc';
import { IftaLabelDoc } from '@/doc/textarea/iftalabeldoc';
import { ImportDoc } from '@/doc/textarea/importdoc';
import { InvalidDoc } from '@/doc/textarea/invaliddoc';
import { ReactiveFormsDoc } from '@/doc/textarea/reactiveformsdoc';
import { SizesDoc } from '@/doc/textarea/sizesdoc';
import { TextareaDocModule } from '@/doc/textarea/texteareadoc.module';
import { Component } from '@angular/core';

@Component({
    standalone: true,
    imports: [TextareaDocModule],
    template: `<app-doc docTitle="Angular Textarea Component" header="Textarea" description="Textarea adds styling and autoResize functionality to standard textarea element." [docs]="docs" [apiDocs]="['Textarea']" themeDocs="textearea"></app-doc>`
})
export class TextareaDemo {
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
            id: 'autoresize',
            label: 'AutoResize',
            component: AutoResizeDoc
        },
        {
            id: 'floatlabel',
            label: 'Float Label',
            component: FloatlabelDoc
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
