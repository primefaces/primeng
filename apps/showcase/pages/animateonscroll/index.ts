import { AccessibilityDoc } from '@/doc/animateonscroll/accessibilitydoc';
import { BasicDoc } from '@/doc/animateonscroll/basicdoc';
import { ImportDoc } from '@/doc/animateonscroll/importdoc';
import { AppDoc } from '@/components/doc/app.doc';
import { AppDocService } from '@/components/doc/app.doc.service';
import { Component } from '@angular/core';

@Component({
    template: ` <app-doc
        docTitle="Angular Animate On Scroll Directive"
        header="AnimateOnScroll"
        description="AnimateOnScroll AnimateOnScroll is used to apply animations to elements when entering or leaving the viewport during scrolling."
        [docs]="docs"
        [apiDocs]="['AnimateOnScroll']"
    ></app-doc>`,
    standalone: true,
    imports: [AppDoc],
    providers: [AppDocService]
})
export class AnimateOnScrollDemo {
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
            id: 'accessibility',
            label: 'Accessibility',
            component: AccessibilityDoc
        }
    ];
}
