import { Component } from '@angular/core';
import { Code } from '../../domain/code';

interface PageEvent {
    first: number;
    rows: number;
    page: number;
    pageCount: number;
}

@Component({
    selector: 'images-doc',
    template: `
        <app-docsectiontext>
            <p>Sample image gallery implementation using paginator.</p>
        </app-docsectiontext>
        <div class="card flex flex-column gap-3 justify-content-center align-items-center">
            <p-paginator [first]="first" [rows]="1" [totalRecords]="120" (onPageChange)="onPageChange($event)" [showJumpToPageDropdown]="true" [showPageLinks]="false"></p-paginator>
            <img src="https://primefaces.org/cdn/primeng/images/demo/nature/nature{{ first + 1 }}.jpg" class="max-w-full" />
        </div>
        <app-code [code]="code" selector="paginator-images-demo"></app-code>
    `
})
export class ImagesDoc {
    first: number = 0;

    rows: number = 10;

    onPageChange(event: PageEvent) {
        this.first = event.first;
        this.rows = event.rows;
    }

    code: Code = {
        basic: `
<p-paginator [first]="first" [rows]="1" [totalRecords]="120" (onPageChange)="onPageChange($event)" [showJumpToPageDropdown]="true" [showPageLinks]="false"></p-paginator>
<img src="https://primefaces.org/cdn/primeng/images/demo/nature/nature{{ first + 1 }}.jpg" class="max-w-full"/>`,

        html: `
<div class="card flex flex-column gap-3 justify-content-center align-items-center">
    <p-paginator [first]="first" [rows]="1" [totalRecords]="120" (onPageChange)="onPageChange($event)" [showJumpToPageDropdown]="true" [showPageLinks]="false"></p-paginator>
    <img src="https://primefaces.org/cdn/primeng/images/demo/nature/nature{{ first + 1 }}.jpg" class="max-w-full"/>
</div>`,

        typescript: `
import { Component } from '@angular/core';

interface PageEvent {
    first: number;
    rows: number;
    page: number;
    pageCount: number;
}

@Component({
    selector: 'paginator-images-demo',
    templateUrl: './paginator-images-demo.html'
})
export class PaginatorImagesDemo {
    first: number = 0;

    rows: number = 10;

    onPageChange(event: PageEvent) {
        this.first = event.first;
        this.rows = event.rows;
    }
}`
    };
}
