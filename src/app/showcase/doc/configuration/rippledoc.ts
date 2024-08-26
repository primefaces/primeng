import { Component } from '@angular/core';
import { Code } from '@domain/code';

@Component({
    selector: 'ripple-doc',
    template: `
        <app-docsectiontext>
            <p>
                Ripple is an optional animation for the supported components such as buttons. It is disabled by default
                and needs to be enabled globally by injecting <i>PrimeNGConfig</i>.
            </p>
        </app-docsectiontext>
        <app-code [code]="code" [hideToggleCode]="true"></app-code>
    `,
})
export class RippleDoc {
    code: Code = {
        typescript: `import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

    constructor(private primengConfig: PrimeNGConfig) {}

    ngOnInit() {
        this.primengConfig.ripple.set(true);
    }
}`,
    };
}
