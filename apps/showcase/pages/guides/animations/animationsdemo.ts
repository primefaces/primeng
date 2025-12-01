import { IntroductionDoc } from '@/doc/guides/animations/introductiondoc';
import { AnchoredOverlaysDoc } from '@/doc/guides/animations/anchoredoverlaysdoc';
import { CollapsiblesDoc } from '@/doc/guides/animations/collapsiblesdoc';
import { DialogDoc } from '@/doc/guides/animations/dialogdoc';
import { DisableDoc } from '@/doc/guides/animations/disabledoc';
import { ReferenceDoc } from '@/doc/guides/animations/referencedoc';
import { Component } from '@angular/core';
import { AppDoc } from '@/components/doc/app.doc';

@Component({
    selector: 'animations',
    standalone: true,
    imports: [AppDoc],
    template: `<app-doc
        docTitle="Animations - PrimeNG"
        header="Animations"
        description="Various PrimeNG Components utilize native CSS animations to provide an enhanced user experience. The default animations are based on the best practices recommended by the usability experts. In case you need to customize the default animations, this documentation covers the entire set of built-in animations."
        [docs]="docs"
        docType="page"
    ></app-doc>`
})
export class AnimationsDemoComponent {
    docs = [
        {
            id: 'introduction',
            label: 'Introduction',
            component: IntroductionDoc
        },
        {
            id: 'anchoredoverlays',
            label: 'Anchored Overlays',
            component: AnchoredOverlaysDoc
        },
        {
            id: 'collapsibles',
            label: 'Collapsibles',
            component: CollapsiblesDoc
        },
        {
            id: 'dialog',
            label: 'Dialog',
            component: DialogDoc
        },
        {
            id: 'disable',
            label: 'Disable',
            component: DisableDoc
        },
        {
            id: 'reference',
            label: 'Reference',
            component: ReferenceDoc
        }
    ];
}
