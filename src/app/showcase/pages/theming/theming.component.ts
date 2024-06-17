import { Component } from '@angular/core';
import { ArchitectureDoc } from '@doc/theming/architecturedoc';
import { BuiltInThemesDoc } from '@doc/theming/builtinthemesdoc';
import { CSSVariablesDoc } from '@doc/theming/cssvariablesdoc';
import { CustomThemeDoc } from '@doc/theming/customthemedoc';
import { PrimeFlexDoc } from '@doc/theming/primeflexdoc';
import { ScalingDoc } from '@doc/theming/scalingdoc';
import { ScopedCSSDoc } from '@doc/theming/scopedcssdoc';
import { SwitchThemesDoc } from '@doc/theming/switchthemesdoc';
import { UtilsDoc } from '@doc/theming/utilsdoc';

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
            id: 'builtinthemes',
            label: 'Built-in Themes',
            component: BuiltInThemesDoc
        },
        {
            id: 'switchthemes',
            label: 'Switch Themes',
            component: SwitchThemesDoc
        },
        {
            id: 'customtheme',
            label: 'Custom Theme',
            component: CustomThemeDoc
        },
        {
            id: 'scopedcss',
            label: 'Scoped CSS',
            component: ScopedCSSDoc
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
            label: 'Utils',
            component: UtilsDoc
        },
        {
            id: 'css-variables',
            label: 'CSS Variables',
            component: CSSVariablesDoc
        }
    ];
}
