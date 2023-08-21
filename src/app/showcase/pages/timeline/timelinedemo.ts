import { Component } from '@angular/core';
import { TemplateDoc } from '../../doc/timeline/templatedoc';
import { AlignmentDoc } from '../../doc/timeline/alignmentdoc';
import { BasicDoc } from '../../doc/timeline/basicdoc';
import { ImportDoc } from '../../doc/timeline/importdoc';
import { OppositeDoc } from '../../doc/timeline/oppositedoc';
import { HorizontalDoc } from '../../doc/timeline/horizontaldoc';
import { StyleDoc } from '../../doc/timeline/styledoc';
import { AccessibilityDoc } from '../../doc/timeline/accessibilitydoc';

@Component({
    templateUrl: './timelinedemo.html'
})
export class TimelineDemo {
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
            id: 'alignment',
            label: 'Alignment',
            component: AlignmentDoc
        },
        {
            id: 'opposite',
            label: 'Opposite',
            component: OppositeDoc
        },
        {
            id: 'template',
            label: 'Template',
            component: TemplateDoc
        },
        {
            id: 'horizontal',
            label: 'Horizontal',
            component: HorizontalDoc
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
