import { Component, Input } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'chip-basic-demo',
    template: ` <section>
        <app-docsectiontext [title]="title" [id]="id">
            <p>
                A basic chip with a text is created with the <i>label</i> property. In addition when <i>removable</i> is added, a delete icon is displayed to remove a chip, the optional <i>onRemove</i> event is available to get notified when a chip
                is hidden.
            </p>
        </app-docsectiontext>
        <div class="card flex align-items-center gap-2 flex-wrap">
            <p-chip label="Action"></p-chip>
            <p-chip label="Comedy"></p-chip>
            <p-chip label="Mystery"></p-chip>
            <p-chip label="Thriller" [removable]="true"></p-chip>
        </div>
        <app-code [code]="code" selector="chip-basic-demo"></app-code>
    </section>`
})
export class BasicDoc {
    @Input() id: string;

    @Input() title: string;

    code: Code = {
        basic: `
<p-chip label="Action"></p-chip>`,
        html: `
<div class="card flex align-items-center gap-2 flex-wrap">
    <p-chip label="Action"></p-chip>
    <p-chip label="Comedy"></p-chip>
    <p-chip label="Mystery"></p-chip>
    <p-chip label="Thriller" [removable]="true"></p-chip>
</div>`,
        typescript: `
import { Component } from '@angular/core';

@Component({
    selector: 'chip-basic-demo',
    templateUrl: './chip-basic-demo.html'
})
export class ChipBasicDemo {}`
    };
}
