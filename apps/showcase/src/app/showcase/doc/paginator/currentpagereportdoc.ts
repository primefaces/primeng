import { Component } from '@angular/core';
import { Code } from '@domain/code';

interface PageEvent {
    first: number;
    rows: number;
    page: number;
    pageCount: number;
}

@Component({
    selector: 'current-page-report-doc',
    template: `
        <app-docsectiontext>
            <p>Current page report item in the template displays information about the pagination state. Default value is ({{ '{' }}currentPage{{ '}' }} of {{ '{' }}totalPages{{ '}' }}) whereas available placeholders are the following;</p>
            <ul class="mb-6 leading-loose">
                <li>{{ '{' }}currentPage{{ '}' }}</li>
                <li>{{ '{' }}totalPages{{ '}' }}</li>
                <li>{{ '{' }}rows{{ '}' }}</li>
                <li>{{ '{' }}first{{ '}' }}</li>
                <li>{{ '{' }}last{{ '}' }}</li>
                <li>{{ '{' }}totalRecords{{ '}' }}</li>
            </ul>
        </app-docsectiontext>
        <div class="card flex justify-center">
            <p-paginator
                (onPageChange)="onPageChange($event)"
                [first]="first"
                [rows]="rows"
                [totalRecords]="120"
                [showCurrentPageReport]="true"
                [showPageLinks]="false"
                [showJumpToPageDropdown]="false"
                currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
            />
        </div>
        <app-code [code]="code" selector="paginator-current-page-report-demo"></app-code>
    `
})
export class CurrentPageReportDoc {
    first: number = 0;

    rows: number = 10;

    onPageChange(event: PageEvent) {
        this.first = event.first;
        this.rows = event.rows;
    }

    code: Code = {
        basic: `<p-paginator
    (onPageChange)="onPageChange($event)"
    [first]="first"
    [rows]="rows"
    [totalRecords]="120"
    [showCurrentPageReport]="true"
    [showPageLinks]="false"
    [showJumpToPageDropdown]="false"
    currentPageReportTemplate="Showing {first} to {last} of {totalRecords}" />`,

        html: `<div class="card flex justify-center">
    <p-paginator
        (onPageChange)="onPageChange($event)"
        [first]="first"
        [rows]="rows"
        [totalRecords]="120"
        [showCurrentPageReport]="true"
        [showPageLinks]="false"
        [showJumpToPageDropdown]="false"
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords}" />
</div>`,

        typescript: `import { Component } from '@angular/core';
import { PaginatorModule } from 'primeng/paginator';

interface PageEvent {
    first: number;
    rows: number;
    page: number;
    pageCount: number;
}

@Component({
    selector: 'paginator-current-page-report-demo',
    templateUrl: './paginator-current-page-report-demo.html',
    standalone: true,
    imports: [PaginatorModule]
})
export class PaginatorCurrentPageReportDemo {
    first: number = 0;

    rows: number = 10;

    onPageChange(event: PageEvent) {
        this.first = event.first;
        this.rows = event.rows;
    }
}`
    };
}
