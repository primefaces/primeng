import { AccessibilityDoc } from '@/doc/metergroup/accessibilitydoc';
import { BasicDoc } from '@/doc/metergroup/basicdoc';
import { IconDoc } from '@/doc/metergroup/icondoc';
import { ImportDoc } from '@/doc/metergroup/importdoc';
import { LabelDoc } from '@/doc/metergroup/labeldoc';
import { MeterGroupDocModule } from '@/doc/metergroup/metergroupdoc.module';
import { MinMaxDoc } from '@/doc/metergroup/minmaxdoc';
import { MultipleDoc } from '@/doc/metergroup/multipledoc';
import { TemplateDoc } from '@/doc/metergroup/templatedoc';
import { VerticalDoc } from '@/doc/metergroup/verticaldoc';
import { Component } from '@angular/core';

@Component({
    standalone: true,
    imports: [MeterGroupDocModule],
    template: ` <app-doc docTitle="Angular MeterGroup Component" header="MeterGroup" description="MeterGroup displays scalar measurements within a known range." [docs]="docs" [apiDocs]="['MeterGroup']" themeDocs="metergroup"></app-doc>`
})
export class MeterGroupDemo {
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
            id: 'icon',
            label: 'Icon',
            component: IconDoc
        },
        {
            id: 'label',
            label: 'Label',
            component: LabelDoc
        },
        {
            id: 'vertical',
            label: 'Vertical',
            component: VerticalDoc
        },
        {
            id: 'minmax',
            label: 'Min Max',
            component: MinMaxDoc
        },
        {
            id: 'template',
            label: 'Template',
            component: TemplateDoc
        },

        {
            id: 'accessibility',
            label: 'Accessibility',
            component: AccessibilityDoc
        }
    ];
}
