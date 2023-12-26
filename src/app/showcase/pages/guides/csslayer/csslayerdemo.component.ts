import { Component } from '@angular/core';
import { BootstrapDoc } from 'src/app/showcase/doc/guides/csslayer/bootstrapdoc';
import { NormalizeDoc } from 'src/app/showcase/doc/guides/csslayer/normalizedoc';
import { ResetDoc } from 'src/app/showcase/doc/guides/csslayer/resetdoc';
import { SpecificityDoc } from 'src/app/showcase/doc/guides/csslayer/specificitydoc';
import { TailwindDoc } from 'src/app/showcase/doc/guides/csslayer/tailwinddoc';

@Component({
    selector: 'css-layer',
    templateUrl: './csslayerdemo.component.html'
})
export class CssLayerDemoComponent {
    docs = [
        {
            id: 'css-specificity',
            label: 'CSS Specificity',
            component: SpecificityDoc
        },
        {
            id: 'reset',
            label: 'Reset',
            component: ResetDoc
        },
        {
            id: 'libraries',
            label: 'Libraries',
            description: 'Compatibility between PrimeVue and CSS libraries.',
            children: [
                {
                    id: 'tailwind',
                    label: 'Tailwind CSS',
                    component:TailwindDoc
                },
                {
                    id: 'bootstrap',
                    label: 'Bootstrap',
                    component:BootstrapDoc
                },
                {
                    id: 'normalize',
                    label: 'Normalize',
                    component:NormalizeDoc
                },
               
            ]
        }
    ];
}
