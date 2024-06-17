import { Component } from '@angular/core';
import { Code } from '@domain/code';

@Component({
    selector: 'chip-basic-demo',
    template: `
        <app-docsectiontext>
            <p>
                A basic chip with a text is created with the <i>label</i> property. In addition when <i>removable</i> is added, a delete icon is displayed to remove a chip, the optional <i>onRemove</i> event is available to get notified when a chip
                is hidden.
            </p>
        </app-docsectiontext>
        <div class="card flex align-items-center gap-2 flex-wrap">
            <p-chip label="Action" />
            <p-chip label="Comedy" />
            <p-chip label="Mystery" />
            <p-chip label="Thriller" [removable]="true" />
        </div>
        <app-code [code]="code" selector="chip-basic-demo"></app-code>
    `
})
export class BasicDoc {
    code: Code = {
        basic: `<p-chip label="Action" />`,
        html: `<div class="card flex align-items-center gap-2 flex-wrap">
    <p-chip label="Action" />
    <p-chip label="Comedy" />
    <p-chip label="Mystery" />
    <p-chip label="Thriller" [removable]="true" />
</div>`,
        typescript: `import { Component } from '@angular/core';
import { ChipModule } from 'primeng/chip';

@Component({
    selector: 'chip-basic-demo',
    templateUrl: './chip-basic-demo.html',
    standalone: true,
    imports: [ChipModule]
})
export class ChipBasicDemo {}`
    };
}
