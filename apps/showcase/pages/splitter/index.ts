import { AccessibilityDoc } from '@/doc/splitter/accessibilitydoc';
import { HorizontalDoc } from '@/doc/splitter/horizontaldoc';
import { ImportDoc } from '@/doc/splitter/importdoc';
import { MinMaxDoc } from '@/doc/splitter/minmaxdoc';
import { NestedDoc } from '@/doc/splitter/nesteddoc';
import { SizeDoc } from '@/doc/splitter/sizedoc';
import { SplitterDocModule } from '@/doc/splitter/splitterdoc.module';
import { VerticalDoc } from '@/doc/splitter/verticaldoc';
import { Component } from '@angular/core';

@Component({
    template: `<app-doc docTitle="Angular Splitter Component" header="Splitter" description="Splitter is utilized to separate and resize panels." [docs]="docs" [apiDocs]="['Splitter']" themeDocs="splitter"></app-doc>`,
    standalone: true,
    imports: [SplitterDocModule]
})
export class SplitterDemo {
    docs = [
        {
            id: 'import',
            label: 'Import',
            component: ImportDoc
        },
        {
            id: 'horizontal',
            label: 'Horizontal',
            component: HorizontalDoc
        },
        {
            id: 'size',
            label: 'Size',
            component: SizeDoc
        },
        {
            id: 'minmax',
            label: 'Min / Max Sizes',
            component: MinMaxDoc
        },
        {
            id: 'vertical',
            label: 'Vertical',
            component: VerticalDoc
        },
        {
            id: 'nested',
            label: 'Nested',
            component: NestedDoc
        },
        {
            id: 'accessibility',
            label: 'Accessibility',
            component: AccessibilityDoc
        }
    ];
}
