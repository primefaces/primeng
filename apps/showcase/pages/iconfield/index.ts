import { AccessibilityDoc } from '@/doc/iconfield/accessibilitydoc';
import { BasicDoc } from '@/doc/iconfield/basicdoc';
import { FloatLabelDoc } from '@/doc/iconfield/floatlabeldoc';
import { IconFieldDocModule } from '@/doc/iconfield/iconfielddoc.module';
import { IftaLabelDoc } from '@/doc/iconfield/iftalabeldoc';
import { ImportDoc } from '@/doc/iconfield/importdoc';
import { SizesDoc } from '@/doc/iconfield/sizesdoc';
import { TemplateDoc } from '@/doc/iconfield/templatedoc';
import { Component } from '@angular/core';

@Component({
    template: ` <app-doc docTitle="Angular IconField Component" header="IconField" description="IconField wraps an input and an icon." [docs]="docs" [apiDocs]="['IconField', 'InputIcon']" themeDocs="iconfield"></app-doc>`,
    standalone: true,
    imports: [IconFieldDocModule]
})
export class IconFieldDemo {
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
            id: 'template',
            label: 'Template',
            component: TemplateDoc
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
            id: 'accessibility',
            label: 'Accessibility',
            component: AccessibilityDoc
        }
    ];
}
