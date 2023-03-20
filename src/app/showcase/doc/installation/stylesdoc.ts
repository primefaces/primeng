import { Component, Input } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'styles-doc',
    template: ` <section>
        <app-docsectiontext [title]="title" [id]="id">
            <p>
                Theme, core and icons are the necessary css files of the components, visit the <a href="/theming#themes" class="">Themes</a> section for the complete list of available themes to choose from. The css dependencies are as follows, Prime
                Icons, theme of your choice and structural css of components. In <i>angular.json</i> file find the <i>styles</i> array and add the following:
            </p>
        </app-docsectiontext>
        <app-code [code]="code" [hideToggleCode]="true"></app-code>
    </section>`
})
export class StylesDoc {
    @Input() id: string;

    @Input() title: string;

    code: Code = {
        basic: `...
"styles": [
    "node_modules/primeicons/primeicons.css",
    "node_modules/primeng/resources/themes/lara-light-blue/theme.css",
    "node_modules/primeng/resources/primeng.min.css",
    ...
]`
    };
}
