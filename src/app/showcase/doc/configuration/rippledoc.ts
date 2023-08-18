import { Component, Input } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'ripple-doc',
    template: ` <section>
        <app-docsectiontext [title]="title" [id]="id">
            <p>Ripple is an optional animation for the supported components such as buttons. It is disabled by default and needs to be enabled globally by injecting <i>PrimeNGConfig</i>.</p>
        </app-docsectiontext>
        <app-code [code]="code" [hideToggleCode]="true"></app-code>
    </section>`
})
export class RippleDoc {
    @Input() id: string;

    @Input() title: string;

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
        this.primengConfig.ripple = true;
    }
}`
    };
}
