import { AccessibilityDoc } from '@/doc/scroller/accessibility-doc';
import { BasicDoc } from '@/doc/scroller/basic-doc';
import { DelayDoc } from '@/doc/scroller/delay-doc';
import { GridDoc } from '@/doc/scroller/grid-doc';
import { HorizontalDoc } from '@/doc/scroller/horizontal-doc';
import { ImportDoc } from '@/doc/scroller/import-doc';
import { LazyLoadDoc } from '@/doc/scroller/lazyload-doc';
import { LoaderDoc } from '@/doc/scroller/loader-doc';
import { PTComponent } from '@/doc/scroller/pt/PTComponent';
import { ProgrammaticDoc } from '@/doc/scroller/programmatic-doc';
import { ScrollOptionsDoc } from '@/doc/scroller/scrolloptions-doc';
import { TemplateDoc } from '@/doc/scroller/template-doc';
import { Component } from '@angular/core';
import { AppDoc } from '@/components/doc/app.doc';

@Component({
    template: `<app-doc
        docTitle="Angular Virtual Scroller Component"
        header="Scroller"
        description="VirtualScroller is a performance-approach to handle huge data efficiently."
        [docs]="docs"
        [apiDocs]="['Scroller']"
        [ptDocs]="ptComponent"
        themeDocs="scroller"
    ></app-doc>`,
    standalone: true,
    imports: [AppDoc],
    styleUrl: './scrollerdemo.scss'
})
export class VirtualScrollerDemo {
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
            id: 'template',
            label: 'Template',
            component: TemplateDoc
        },
        {
            id: 'scrolloptions',
            label: 'Scroll Options',
            component: ScrollOptionsDoc
        },
        {
            id: 'accessibility',
            label: 'Accessibility',
            component: AccessibilityDoc
        }
    ];
}
