import { Component } from '@angular/core';
import { DisabledDoc } from '../../doc/rating/disableddoc';
import { BasicDoc } from '../../doc/rating/basicdoc';
import { ImportDoc } from '../../doc/rating/importdoc';
import { NumberOfStarsDoc } from '../../doc/rating/numberofstarsdoc';
import { ReadOnlyDoc } from '../../doc/rating/readonlydoc';
import { TemplateDoc } from '../../doc/rating/templatedoc';
import { WithoutCancelDoc } from '../../doc/rating/withoutcanceldoc';
import { StyleDoc } from '../../doc/rating/styledoc';
import { AccessibilityDoc } from '../../doc/rating/accessibilitydoc';
import { ReactiveFormsDoc } from '../../doc/rating/reactiveformsdoc';

@Component({
    templateUrl: './ratingdemo.html'
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
            id: 'withoutcancel',
            label: 'Without Cancel',
            component: WithoutCancelDoc
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
            id: 'style',
            label: 'Style',
            component: StyleDoc
        },
        {
            id: 'accessibility',
            label: 'Accessibility',
            component: AccessibilityDoc
        }
    ];
}
