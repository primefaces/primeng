import { Component } from '@angular/core';
import { ApiDoc } from '../../doc/locale/apidoc';
import { ImportDoc } from '../../doc/locale/importdoc';
import { NgxTranslateDoc } from '../../doc/locale/ngx-translatedoc';
import { RepositoryDoc } from '../../doc/locale/repositorydoc';
import { SetLocaleDoc } from '../../doc/locale/setlocaledoc';

@Component({
    templateUrl: './locale.component.html'
})
export class LocaleComponent {
    docs = [
        {
            id: 'import',
            label: 'Import',
            component: ImportDoc
        },
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
    ];
}
