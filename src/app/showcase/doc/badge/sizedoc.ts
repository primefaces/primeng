import { Component, Input } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'badge-size-demo',
    template: ` <section>
        <app-docsectiontext [title]="title" [id]="id">
            <p>Badge sizes are adjusted with the <i>size</i> property that accepts <i>large</i> and <i>xlarge</i> as the possible alternatives to the default size. Currently sizes only apply to component mode.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <p-badge value="2"></p-badge>
            <p-badge value="4" size="large" severity="warning"></p-badge>
            <p-badge value="6" size="xlarge" severity="success"></p-badge>
        </div>
        <app-code [code]="code" selector="badge-size-demo"></app-code>
    </section>`
})
export class SizeDoc {
    @Input() id: string;

    @Input() title: string;

    code: Code = {
        basic: `
<p-badge value="4" size="large" severity="warning"></p-badge>`,
        html: `
<div class="card flex justify-content-center">
    <p-badge value="2"></p-badge>
    <p-badge value="4" size="large" severity="warning"></p-badge>
    <p-badge value="6" size="xlarge" severity="success"></p-badge>
</div>`,
        typescript: `
import { Component } from '@angular/core';

@Component({
    selector: 'badge-size-demo',
    templateUrl: './badge-size-demo.html'
})
export class BadgeSizeDemo {}`
    };
}
