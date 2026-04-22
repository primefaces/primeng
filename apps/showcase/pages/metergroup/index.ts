import { AccessibilityDoc } from '@/doc/metergroup/accessibility-doc';
import { BasicDoc } from '@/doc/metergroup/basic-doc';
import { IconDoc } from '@/doc/metergroup/icon-doc';
import { ImportDoc } from '@/doc/metergroup/import-doc';
import { LabelDoc } from '@/doc/metergroup/label-doc';
import { MinMaxDoc } from '@/doc/metergroup/minmax-doc';
import { MultipleDoc } from '@/doc/metergroup/multiple-doc';
import { PTComponent } from '@/doc/metergroup/pt/PTComponent';
import { TemplateDoc } from '@/doc/metergroup/template-doc';
import { VerticalDoc } from '@/doc/metergroup/vertical-doc';
import { Component } from '@angular/core';
import { AppDoc } from '@/components/doc/app.doc';

@Component({
    standalone: true,
    imports: [AppDoc],
    template: ` <app-doc
        docTitle="Angular MeterGroup Component"
        header="MeterGroup"
        description="MeterGroup displays scalar measurements within a known range."
        [docs]="docs"
        [ptDocs]="ptComponent"
        [apiDocs]="['MeterGroup']"
        themeDocs="metergroup"
    ></app-doc>`
})
export class MeterGroupDemo {
    ptComponent = PTComponent;

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
