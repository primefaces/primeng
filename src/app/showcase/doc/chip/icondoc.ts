import { Component, Input } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'chip-icon-demo',
    template: ` <section class="py-3">
        <app-docsectiontext [title]="title" [id]="id">
            <p>A font icon next to the label can be displayed with the <i>icon</i> property.</p>
        </app-docsectiontext>
        <div class="card flex align-items-center gap-2 flex-wrap">
            <p-chip label="Apple" icon="pi pi-apple"></p-chip>
            <p-chip label="Facebook" icon="pi pi-facebook"></p-chip>
            <p-chip label="Google" icon="pi pi-google"></p-chip>
            <p-chip label="Microsoft" icon="pi pi-microsoft" [removable]="true"></p-chip>
        </div>
        <app-code [code]="code" selector="chip-icon-demo"></app-code>
    </section>`
})
export class IconDoc {
    @Input() id: string;

    @Input() title: string;

    code: Code = {
        basic: `
<p-chip label="Apple" icon="pi pi-apple"></p-chip>`,
        html: `
<div class="card flex align-items-center gap-2 flex-wrap">
    <p-chip label="Apple" icon="pi pi-apple"></p-chip>
    <p-chip label="Facebook" icon="pi pi-facebook"></p-chip>
    <p-chip label="Google" icon="pi pi-google"></p-chip>
    <p-chip label="Microsoft" icon="pi pi-microsoft" [removable]="true"></p-chip>
</div>`,
        typescript: `
import { Component } from '@angular/core';

@Component({
    selector: 'chip-icon-demo',
    templateUrl: './chip-icon-demo.html'
})
export class ChipIconDemo {}`
    };
}
