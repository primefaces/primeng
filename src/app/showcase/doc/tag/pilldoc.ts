import { Component, Input } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'pill-doc',
    template: ` <section class="py-3">
        <app-docsectiontext [title]="title" [id]="id">
            <p>Enabling <i>rounded</i>, displays a tag as a pill.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center gap-2">
            <p-tag value="Primary" [rounded]="true"></p-tag>
            <p-tag severity="success" value="Success" [rounded]="true"></p-tag>
            <p-tag severity="info" value="Info" [rounded]="true"></p-tag>
            <p-tag severity="warning" value="Warning" [rounded]="true"></p-tag>
            <p-tag severity="danger" value="Danger" [rounded]="true"></p-tag>
        </div>
        <app-code [code]="code" selector="tag-pill-demo"></app-code>
    </section>`
})
export class PillDoc {
    @Input() id: string;

    @Input() title: string;

    code: Code = {
        basic: `
<p-tag value="Primary" [rounded]="true"></p-tag>`,
        html: `
<div class="card flex justify-content-center gap-2">
    <p-tag value="Primary" [rounded]="true"></p-tag>
    <p-tag severity="success" value="Success" [rounded]="true"></p-tag>
    <p-tag severity="info" value="Info" [rounded]="true"></p-tag>
    <p-tag severity="warning" value="Warning" [rounded]="true"></p-tag>
    <p-tag severity="danger" value="Danger" [rounded]="true"></p-tag>
</div>`,
        typescript: `
import { Component } from '@angular/core';

@Component({
    selector: 'tag-pill-demo',
    templateUrl: './tag-pill-demo.html'
})
export class TagPillDemo {}`
    };
}
