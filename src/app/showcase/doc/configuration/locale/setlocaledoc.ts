import { Component, Input, ViewChild } from '@angular/core';
import { AppDocSectionTextComponent } from 'src/app/showcase/layout/doc/docsectiontext/app.docsectiontext.component';
import { Code } from '../../../domain/code';

@Component({
    selector: 'set-locale-doc',
    template: ` <section>
        <app-docsectiontext [title]="title" [id]="id" [level]="3" #docsectiontext>
            <p>
                A translation is applied using the PrimeNGConfig instance so begin with injecting it. A common location is the application root to initialize the default language used by the components. English is the default language and
                <i>setTranslation</i> function is used to change the values by passing a <i>Translation</i> object.
            </p>
        </app-docsectiontext>
        <app-code [code]="code" [hideToggleCode]="true"></app-code>
    </section>`
})
export class SetLocaleDoc {
    @Input() id: string;

    @Input() title: string;

    @ViewChild('docsectiontext', { static: true }) docsectiontext: AppDocSectionTextComponent;

    code: Code = {
        typescript: `
import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit, OnDestroy {

    constructor(private config: PrimeNGConfig) {}

    ngOnInit() {
        this.config.setTranslation({
            accept: 'Accept',
            reject: 'Cancel',
            //translations
        });
    }
}`
    };
}
