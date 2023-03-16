import { Component } from '@angular/core';
import { ArchitectureDoc } from '../../doc/theming/architecturedoc';
import { CSSVariablesDoc } from '../../doc/theming/cssvariablesdoc';
import { DesignerDoc } from '../../doc/theming/designerdoc';
import { LocalStylingDoc } from '../../doc/theming/localstylingdoc';
import { PrimeFlexDoc } from '../../doc/theming/primeflexdoc';
import { ScalingDoc } from '../../doc/theming/scalingdoc';
import { ThemesDoc } from '../../doc/theming/themesdoc';
import { UtilsDoc } from '../../doc/theming/utilsdoc';
@Component({
    templateUrl: './theming.component.html',
    styleUrls: ['./theming.component.scss']
})
export class ThemingComponent {
    docs = [
        {
            id: 'architecture',
            label: 'Architecture',
            component: ArchitectureDoc
        },
        {
            id: 'themes',
            label: 'Themes',
            component: ThemesDoc
        },
        {
            id: 'designer',
            label: 'Designer',
            component: DesignerDoc
        },
        {
            id: 'local-styling',
            label: 'Local Styling',
            component: LocalStylingDoc
        },
        {
            id: 'scale',
            label: 'Scale',
            component: ScalingDoc
        },
        {
            id: 'primeflex',
            label: 'PrimeFlex',
            component: PrimeFlexDoc
        },
        {
            id: 'utils',
            label: 'Utility Classes',
            component: UtilsDoc
        },
        {
            id: 'css-variables',
            label: 'CSS Variables',
            component: CSSVariablesDoc
        }
    ];
}
