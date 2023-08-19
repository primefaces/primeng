import { Component } from '@angular/core';
import { BasicDoc } from '../../doc/virtualscroller/basicdoc';
import { LazyLoadDoc } from '../../doc/virtualscroller/lazyloaddoc';
import { ImportDoc } from '../../doc/virtualscroller/importdoc';
import { StyleDoc } from '../../doc/virtualscroller/styledoc';
import { ProgrammaticScrollDoc } from '../../doc/virtualscroller/programmaticscrolldoc';
import { TemplateDoc } from '../../doc/virtualscroller/templatedoc';
import { AccessibilityDoc } from '../../doc/virtualscroller/accessibilitydoc';

@Component({
    templateUrl: './virtualscrollerdemo.html',
    styleUrls: ['./virtualscrollerdemo.scss']
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
            id: 'template',
            label: 'Template',
            component: TemplateDoc
        },
        {
            id: 'lazyload',
            label: 'Lazy Load',
            component: LazyLoadDoc
        },
        {
            id: 'programmatic',
            label: 'Programmatic Scroll',
            component: ProgrammaticScrollDoc
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
