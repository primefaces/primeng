import { Code } from '@/domain/code';
import { Component } from '@angular/core';

@Component({
    selector: 'dynamic-doc',
    standalone: false,
    template: `
        <app-docsectiontext>
            <p>Inject the <i>PrimeNG</i> to your application to update the initial configuration at runtime.</p>
        </app-docsectiontext>
        <app-code [code]="code" [hideToggleCode]="true"></app-code>
    `
})
export class DynamicDoc {
    code: Code = {
        typescript: `import { Component, OnInit } from '@angular/core';
import { PrimeNG } from 'primeng/config';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

    constructor(private primeng: PrimeNG) {}

    ngOnInit() {
        this.primeng.ripple.set(true);
    }
}`
    };
}
