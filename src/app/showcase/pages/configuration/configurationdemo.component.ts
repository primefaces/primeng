import { Component } from '@angular/core';
import { FilterModeDoc } from '@doc/configuration/filtermodedoc';
import { ImportDoc } from '@doc/configuration/importdoc';
import { ApiDoc } from '@doc/configuration/locale/apidoc';
import { NgxTranslateDoc } from '@doc/configuration/locale/ngx-translatedoc';
import { RepositoryDoc } from '@doc/configuration/locale/repositorydoc';
import { SetLocaleDoc } from '@doc/configuration/locale/setlocaledoc';
import { RippleDoc } from '@doc/configuration/rippledoc';
import { ZIndexDoc } from '@doc/configuration/zindexdoc';

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
        },
        {
            id: 'locale',
            label: 'Locale',
            children: [
                {
                    id: 'set-locale',
                    label: 'Set Locale',
                    component: SetLocaleDoc
                },
                {
                    id: 'ngx-translate',
                    label: 'ngx-translate',
                    component: NgxTranslateDoc
                },
                {
                    id: 'repository',
                    label: 'Repository',
                    component: RepositoryDoc
                },
                {
                    id: 'api',
                    label: 'API',
                    component: ApiDoc
                }
            ]
        }
    ];
}
