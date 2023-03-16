import { Component } from '@angular/core';
import { AnimationsDoc } from '../../doc/configuration/animationsdoc';
import { FilterModeDoc } from '../../doc/configuration/filtermodedoc';
import { ImportDoc } from '../../doc/configuration/importdoc';
import { RippleDoc } from '../../doc/configuration/rippledoc';
import { ZIndexDoc } from '../../doc/configuration/zindexdoc';

@Component({
    selector: 'configuration',
    templateUrl: './configurationdemo.component.html'
})
export class ConfigurationDemoComponent {
    docs = [
        {
            id: 'import',
            label: 'Import',
            component: ImportDoc
        },
        {
            id: 'animations',
            label: 'Animations',
            component: AnimationsDoc
        },
        {
            id: 'ripple',
            label: 'Ripple',
            component: RippleDoc
        },
        {
            id: 'zIndex',
            label: 'ZIndex',
            component: ZIndexDoc
        },
        {
            id: 'filter-mode',
            label: 'Filter Mode',
            component: FilterModeDoc
        }
    ];
}
