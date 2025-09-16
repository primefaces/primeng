import { Code } from '@/domain/code';
import { Component } from '@angular/core';
import { PaginatorState, PaginatorModule } from 'primeng/paginator';
import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';

@Component({
    selector: 'basic-doc',
    standalone: true,
    imports: [PaginatorModule, AppCode, AppDocSectionText],
    template: `
        <app-docsectiontext>
            <p>
                Paginator is used as a controlled component with <i>first</i>, <i>rows</i> and <i>onPageChange</i> properties to manage the first index and number of records to display per page. Total number of records need to be with
                <i>totalRecords</i> property. Default template includes a dropdown to change the <i>rows</i> so <i>rowsPerPageOptions</i> is also necessary for the dropdown options.
            </p>
        </app-docsectiontext>
        <div class="card flex justify-center">
            <p-paginator (onPageChange)="onPageChange($event)" [first]="first" [rows]="rows" [totalRecords]="120" [rowsPerPageOptions]="[10, 20, 30]" />
        </div>
        <app-code [code]="code" selector="paginator-basic-demo"></app-code>
    `
})
export class BasicDoc {
    first: number = 0;

    rows: number = 10;

    onPageChange(event: PaginatorState) {
        this.first = event.first ?? 0;
        this.rows = event.rows ?? 10;
    }

    code: Code = {
        basic: `<p-paginator (onPageChange)="onPageChange($event)" [first]="first" [rows]="rows" [totalRecords]="120" [rowsPerPageOptions]="[10, 20, 30]" />`,

        html: `<div class="card flex justify-center">
    <p-paginator (onPageChange)="onPageChange($event)" [first]="first" [rows]="rows" [totalRecords]="120" [rowsPerPageOptions]="[10, 20, 30]" />
</div>`,

        typescript: `import { Component } from '@angular/core';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';

@Component({
    selector: 'paginator-basic-demo',
    templateUrl: './paginator-basic-demo.html',
    standalone: true,
    imports: [PaginatorModule]
})
export class PaginatorBasicDemo {
    first: number = 0;

    rows: number = 10;

    onPageChange(event: PaginatorState) {
        this.first = event.first ?? 0;
        this.rows = event.rows ?? 10;
    }
}`
    };
}
