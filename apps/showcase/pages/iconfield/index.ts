import { AccessibilityDoc } from '@/doc/iconfield/accessibility-doc';
import { BasicDoc } from '@/doc/iconfield/basic-doc';
import { FloatLabelDoc } from '@/doc/iconfield/floatlabel-doc';
import { IftaLabelDoc } from '@/doc/iconfield/iftalabel-doc';
import { UsageDoc } from '@/doc/iconfield/usage-doc';
import { SizesDoc } from '@/doc/iconfield/sizes-doc';
import { TemplateDoc } from '@/doc/iconfield/template-doc';
import { PTComponent } from '@/doc/iconfield/pt/PTComponent';
import { Component } from '@angular/core';
import { AppDoc } from '@/components/doc/app.doc';

@Component({
    template: `
        <app-doc
            docTitle="Angular IconField Component"
            header="IconField"
            description="IconField wraps an input and an icon."
            [docs]="docs"
            [heroDoc]="heroDoc"
            [ptDocs]="ptComponent"
            [apiDocs]="['IconField', 'InputIcon']"
            themeDocs="iconfield"
        ></app-doc>
    `,
    standalone: true,
    imports: [AppDoc]
})
export class IconFieldDemo {
    ptComponent = PTComponent;
    heroDoc = BasicDoc;

    docs = [
        {
            id: 'usage',
            label: 'Usage',
            component: UsageDoc
        },
        {
            id: 'examples',
            label: 'Examples',
            children: [
                { id: 'basic', label: 'Basic', component: BasicDoc },
                { id: 'template', label: 'Template', component: TemplateDoc },
                { id: 'float-label', label: 'Float Label', component: FloatLabelDoc },
                { id: 'ifta-label', label: 'Ifta Label', component: IftaLabelDoc },
                { id: 'sizes', label: 'Sizes', component: SizesDoc }
            ]
        },
        {
            id: 'accessibility',
            label: 'Accessibility',
            component: AccessibilityDoc
        }
    ];
}
