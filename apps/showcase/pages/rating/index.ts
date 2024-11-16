import { AccessibilityDoc } from '@/doc/rating/accessibilitydoc';
import { BasicDoc } from '@/doc/rating/basicdoc';
import { DisabledDoc } from '@/doc/rating/disableddoc';
import { ImportDoc } from '@/doc/rating/importdoc';
import { NumberOfStarsDoc } from '@/doc/rating/numberofstarsdoc';
import { RatingDocModule } from '@/doc/rating/ratingdoc.module';
import { ReactiveFormsDoc } from '@/doc/rating/reactiveformsdoc';
import { ReadOnlyDoc } from '@/doc/rating/readonlydoc';
import { TemplateDoc } from '@/doc/rating/templatedoc';
import { Component } from '@angular/core';

@Component({
    template: `<app-doc docTitle="Angular Rating Component" header="Rating" description="Rating component is a star based selection input." [docs]="docs" [apiDocs]="['Rating']" themeDocs="rating"></app-doc>`,
    standalone: true,
    imports: [RatingDocModule]
})
export class RatingDemo {
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
            id: 'numberofstars',
            label: 'Number of Stars',
            component: NumberOfStarsDoc
        },
        {
            id: 'template',
            label: 'Template',
            component: TemplateDoc
        },
        {
            id: 'readonly',
            label: 'ReadOnly',
            component: ReadOnlyDoc
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
