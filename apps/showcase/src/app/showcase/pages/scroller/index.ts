import { Component } from '@angular/core';
import { BasicDoc } from '@doc/scroller/basicdoc';
import { DelayDoc } from '@doc/scroller/delaydoc';
import { HorizontalDoc } from '@doc/scroller/horizontaldoc';
import { GridDoc } from '@doc/scroller/griddoc';
import { ImportDoc } from '@doc/scroller/importdoc';
import { LazyLoadDoc } from '@doc/scroller/lazyloaddoc';
import { LoaderDoc } from '@doc/scroller/loaderdoc';
import { ProgrammaticDoc } from '@doc/scroller/programmaticdoc';
import { AccessibilityDoc } from '@doc/scroller/accessibilitydoc';
import { VirtualScrollerDocModule } from '@doc/scroller/scrollerdoc.module';

@Component({
    template: `<app-doc docTitle="Angular Virtual Scroller Component" header="Scroller" description="VirtualScroller is a performance-approach to handle huge data efficiently." [docs]="docs" [apiDocs]="['Scroller']" themeDocs="scroller"></app-doc>`,
    standalone: true,
    imports: [VirtualScrollerDocModule],
    styleUrl: './scrollerdemo.scss'
})
export class VirtualScrollerDemo {
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
            id: 'horizontal',
            label: 'Horizontal',
            component: HorizontalDoc
        },
        {
            id: 'grid',
            label: 'Grid',
            component: GridDoc
        },
        {
            id: 'delay',
            label: 'Delay',
            component: DelayDoc
        },
        {
            id: 'loading',
            label: 'Loading',
            component: LoaderDoc
        },
        {
            id: 'lazy',
            label: 'Lazy',
            component: LazyLoadDoc
        },
        {
            id: 'programmatic',
            label: 'Programmatic',
            component: ProgrammaticDoc
        },
        {
            id: 'accessibility',
            label: 'Accessibility',
            component: AccessibilityDoc
        }
    ];
}
