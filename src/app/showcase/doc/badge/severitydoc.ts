import { Component, Input } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'badge-severity-demo',
    template: ` <section>
        <app-docsectiontext [title]="title" [id]="id">
            <p>Severity defines the color of the badge, possible values are <i>success</i>, <i>info</i>, <i>warning</i> and <i>danger</i></p>
        </app-docsectiontext>
        <div class="card flex justify-content-center gap-2">
            <p-badge [value]="2" severity="success"></p-badge>
            <p-badge [value]="9" severity="info"></p-badge>
            <p-badge [value]="3" severity="warning"></p-badge>
            <p-badge [value]="12" severity="danger"></p-badge>
        </div>
        <app-code [code]="code" selector="badge-severity-demo"></app-code>
    </section>`
})
export class SeverityDoc {
    @Input() id: string;

    @Input() title: string;

    code: Code = {
        basic: `
<p-badge [value]="2" severity="success"></p-badge>`,
        html: `
<div class="card flex justify-content-center gap-2">
    <p-badge [value]="2" severity="success"></p-badge>
    <p-badge [value]="9" severity="info"></p-badge>
    <p-badge [value]="3" severity="warning"></p-badge>
    <p-badge [value]="12" severity="danger"></p-badge>
</div>`,
        typescript: `
import { Component } from '@angular/core';

@Component({
    selector: 'badge-severity-demo',
    templateUrl: './badge-severity-demo.html'
})
export class BadgeSeverityDemo {}`
    };
}
