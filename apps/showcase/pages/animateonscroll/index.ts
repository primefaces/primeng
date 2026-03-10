import { AccessibilityDoc } from '@/doc/animateonscroll/accessibility-doc';
import { BasicDoc } from '@/doc/animateonscroll/basic-doc';
import { UsageDoc } from '@/doc/animateonscroll/usage-doc';
import { AppDoc } from '@/components/doc/app.doc';
import { AppDocService } from '@/components/doc/app.doc.service';
import { Component } from '@angular/core';

@Component({
    template: ` <app-doc
        docTitle="Angular Animate On Scroll Directive"
        header="AnimateOnScroll"
        description="AnimateOnScroll is used to apply animations to elements when entering or leaving the viewport during scrolling."
        [docs]="docs"
        [heroDoc]="heroDoc"
        [apiDocs]="['AnimateOnScroll']"
    ></app-doc>`,
    standalone: true,
    imports: [AppDoc],
    providers: [AppDocService]
})
export class AnimateOnScrollDemo {
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
                {
                    id: 'basic',
                    label: 'Basic',
                    component: BasicDoc
                }
            ]
        },
        {
            id: 'accessibility',
            label: 'Accessibility',
            component: AccessibilityDoc
        }
    ];
}
