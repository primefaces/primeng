import { Component, Input } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'styles-doc',
    template: ` <section class="py-3">
        <app-docsectiontext [title]="title" [id]="id">
            <p>
                Theme and Core styles are the necessary css files of the components, visit the <a href="/theming#themes" class="">Themes</a> section for the complete list of available themes to choose from. Styles can either be imported at
                <i>angular.json</i> or <i>src/styles.css</i> file.
            </p>
            <h3>angular.json</h3>
            <app-code [code]="code1" [hideToggleCode]="true"></app-code>

            <h3>styles.css</h3>
            <app-code [code]="code2" [hideToggleCode]="true"></app-code>
        </app-docsectiontext>
    </section>`
})
export class StylesDoc {
    @Input() id: string;

    @Input() title: string;

    code1: Code = {
        typescript: `...
"styles": [
    "node_modules/primeng/resources/themes/lara-light-blue/theme.css",
    "node_modules/primeng/resources/primeng.min.css",
    ...
]`
    };

    code2: Code = {
        scss: `@import "primeng/resources/themes/lara-light-blue/theme.css";
@import "primeng/resources/primeng.css";`
    };
}
