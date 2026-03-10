import { AnimationDoc } from '@/doc/styleclass/animation-doc';
import { HideOnResizeDoc } from '@/doc/styleclass/hideonresize-doc';
import { ToggleClassDoc } from '@/doc/styleclass/toggleclass-doc';
import { UsageDoc } from '@/doc/styleclass/usage-doc';
import { Component } from '@angular/core';
import { AppDoc } from '@/components/doc/app.doc';

@Component({
    template: `<app-doc
        docTitle="Angular StyleClass Component"
        header="StyleClass"
        description="StyleClass manages css classes declaratively to during enter/leave animations or just to toggle classes on an element."
        [docs]="docs"
        [heroDoc]="heroDoc"
        [apiDocs]="['StyleClass']"
    ></app-doc>`,
    standalone: true,
    imports: [AppDoc]
})
export class StyleClassDemo {
    heroDoc = ToggleClassDoc;

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
                    id: 'toggleclass',
                    label: 'Toggle Class',
                    component: ToggleClassDoc
                },
                {
                    id: 'animation',
                    label: 'Animation',
                    component: AnimationDoc
                },
                {
                    id: 'hideonresize',
                    label: 'Hide On Resize',
                    component: HideOnResizeDoc
                }
            ]
        }
    ];
}
