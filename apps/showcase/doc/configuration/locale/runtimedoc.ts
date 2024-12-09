import { Code } from '@/domain/code';
import { Component } from '@angular/core';

@Component({
    selector: 'ngx-translate-doc',
    standalone: false,
    template: `
        <app-docsectiontext>
            <p>The translations can be changed dynamically at runtime, here is an example with ngx-translate.</p>
        </app-docsectiontext>
        <app-code [code]="code" [hideToggleCode]="true"></app-code>
    `
})
export class RuntimeDoc {
    code: Code = {
        typescript: `
import { Component, OnInit } from '@angular/core';
import { PrimeNG } from 'primeng/config';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

    constructor(private config: PrimeNG, private translateService: TranslateService) {}

    ngOnInit() {
        this.translateService.setDefaultLang('en');
    }

    translate(lang: string) {
        this.translateService.use(lang);
        this.translateService.get('primeng').subscribe(res => this.primeng.setTranslation(res));
    }
}`
    };
}
