import { Component, Input } from '@angular/core';
import { Code } from '../../domain/code';

interface PageEvent {
    first: number;
    rows: number;
    page: number;
    pageCount: number;
}

@Component({
    selector: 'template-doc',
    template: ` <section class="py-3">
        <app-docsectiontext [title]="title" [id]="id">
            <p>Templating allows overriding the default content of the UI elements by defining callbacks using the element name.</p>
        </app-docsectiontext>
        <div class="card flex flex-column gap-3">
            <div class="flex align-items-center justify-content-center">
                <div>
                    <p-button icon="pi pi-star" styleClass="p-button-outlined"></p-button>
                </div>
                <div class="flex-1">
                    <p-paginator (onPageChange)="onPageChange1($event)" [first]="first1" [rows]="rows1" [totalRecords]="120" [rowsPerPageOptions]="[10, 20, 30]" [showFirstLastIcon]="false"></p-paginator>
                </div>
                <div class="justify-content-end">
                    <p-button icon="pi pi-search"></p-button>
                </div>
            </div>
            <p-divider></p-divider>
            <div class="flex align-items-center justify-content-end">
                <span class="mx-1 text-color">Items per page: </span>
                <p-dropdown [options]="options" optionLabel="label" optionValue="value" [(ngModel)]="rows2" (ngModelChange)="first2 = 0"></p-dropdown>
                <p-paginator
                    [first]="first2"
                    [rows]="rows2"
                    [totalRecords]="120"
                    (onPageChange)="onPageChange2($event)"
                    [showCurrentPageReport]="true"
                    currentPageReportTemplate="{first} - {last} of {totalRecords}"
                    [showPageLinks]="false"
                    [showFirstLastIcon]="false"
                ></p-paginator>
            </div>
            <p-divider></p-divider>
            <div class="flex align-items-center justify-content-start">
                <div class="flex justify-content-center align-items-center gap-3">
                    <span>Items per page: </span>
                    <p-slider [(ngModel)]="rows3" (ngModelChange)="first3 = 0" [style]="{ width: '10rem' }" [min]="10" [max]="120" [step]="30"></p-slider>
                </div>
                <p-paginator
                    (onPageChange)="onPageChange3($event)"
                    [first]="first3"
                    [rows]="rows3"
                    [totalRecords]="totalRecords"
                    [showFirstLastIcon]="false"
                    [showCurrentPageReport]="true"
                    currentPageReportTemplate="{first} - {last} of {totalRecords}"
                ></p-paginator>
            </div>
        </div>
        <app-code [code]="code" selector="paginator-template-demo"></app-code>
    </section>`
})
export class TemplateDoc {
    @Input() id: string;

    @Input() title: string;

    first1: number = 0;

    rows1: number = 10;

    first2: number = 0;

    rows2: number = 10;

    first3: number = 0;

    rows3: number = 10;

    totalRecords: number = 120;

    options = [
        { label: 5, value: 5 },
        { label: 10, value: 10 },
        { label: 20, value: 20 },
        { label: 120, value: 120 }
    ];

    onPageChange1(event: PageEvent) {
        this.first1 = event.first;
        this.rows1 = event.rows;
    }

    onPageChange2(event: PageEvent) {
        this.first2 = event.first;
        this.rows2 = event.rows;
    }

    onPageChange3(event: PageEvent) {
        this.first3 = event.first;
        this.rows3 = event.rows;
    }

    code: Code = {
        basic: `
<div class="flex align-items-center justify-content-center">
    <div>
        <p-button icon="pi pi-star" styleClass="p-button-outlined"></p-button>
    </div>
    <div class="flex-1">
        <p-paginator (onPageChange)="onPageChange1($event)" [first]="first1" [rows]="rows1" [totalRecords]="120" [rowsPerPageOptions]="[10, 20, 30]" [showFirstLastIcon]="false"></p-paginator>
    </div>
    <div class="justify-content-end">
        <p-button icon="pi pi-search"></p-button>
    </div>
</div>

<div class="flex align-items-center justify-content-end">
    <span class="mx-1 text-color">Items per page: </span>
    <p-dropdown [options]="options" optionLabel="label" optionValue="value" [(ngModel)]="rows2" (ngModelChange)="first2 = 0"></p-dropdown>
    <p-paginator [first]="first2" [rows]="rows2" [totalRecords]="120" (onPageChange)="onPageChange2($event)" [showCurrentPageReport]="true"
        currentPageReportTemplate="{first} - {last} of {totalRecords}" [showPageLinks]="false" [showFirstLastIcon]="false" ></p-paginator>
</div>

<div class="flex align-items-center justify-content-start">
    <div class="flex justify-content-center align-items-center gap-3">
        <span>Items per page: </span>
        <p-slider [(ngModel)]="rows3" (ngModelChange)="first3 = 0" [style]="{ width: '10rem' }" [min]="10" [max]="120" [step]="30"></p-slider>
    </div>
    <p-paginator (onPageChange)="onPageChange3($event)" [first]="first3" [rows]="rows3" [totalRecords]="totalRecords" [showFirstLastIcon]="false" 
        [showCurrentPageReport]="true" currentPageReportTemplate="{first} - {last} of {totalRecords}" ></p-paginator>
</div>`,

        html: `
<div class="card flex flex-column gap-3">
    <div class="flex align-items-center justify-content-center">
        <div>
            <p-button icon="pi pi-star" styleClass="p-button-outlined"></p-button>
        </div>
        <div class="flex-1">
            <p-paginator (onPageChange)="onPageChange1($event)" [first]="first1" [rows]="rows1" [totalRecords]="120" [rowsPerPageOptions]="[10, 20, 30]" [showFirstLastIcon]="false"></p-paginator>
        </div>
        <div class="justify-content-end">
            <p-button icon="pi pi-search"></p-button>
        </div>
    </div>
    <p-divider></p-divider>
    <div class="flex align-items-center justify-content-end">
        <span class="mx-1 text-color">Items per page: </span>
        <p-dropdown [options]="options" optionLabel="label" optionValue="value" [(ngModel)]="rows2" (ngModelChange)="first2 = 0"></p-dropdown>
        <p-paginator [first]="first2" [rows]="rows2" [totalRecords]="120" (onPageChange)="onPageChange2($event)" [showCurrentPageReport]="true" 
            currentPageReportTemplate="{first} - {last} of {totalRecords}" [showPageLinks]="false" [showFirstLastIcon]="false"></p-paginator>
    </div>
    <p-divider></p-divider>
    <div class="flex align-items-center justify-content-start">
        <div class="flex justify-content-center align-items-center gap-3">
            <span>Items per page: </span>
            <p-slider [(ngModel)]="rows3" (ngModelChange)="first3 = 0" [style]="{ width: '10rem' }" [min]="10" [max]="120" [step]="30"></p-slider>
        </div>
        <p-paginator (onPageChange)="onPageChange3($event)" [first]="first3" [rows]="rows3" [totalRecords]="totalRecords"
            [showFirstLastIcon]="false" [showCurrentPageReport]="true" currentPageReportTemplate="{first} - {last} of {totalRecords}"></p-paginator>
    </div>
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
    selector: 'paginator-template-demo',
    templateUrl: './paginator-template-demo.html'
})
export class PaginatorTemplateDemo {
    first1: number = 0;

    rows1: number = 10;

    first2: number = 0;

    rows2: number = 10;

    first3: number = 0;

    rows3: number = 10;

    totalRecords: number = 120;

    options = [
        { label: 5, value: 5 },
        { label: 10, value: 10 },
        { label: 20, value: 20 },
        { label: 120, value: 120 }
    ];

    onPageChange1(event: PageEvent) {
        this.first1 = event.first;
        this.rows1 = event.rows;
    }

    onPageChange2(event: PageEvent) {
        this.first2 = event.first;
        this.rows2 = event.rows;
    }

    onPageChange3(event: PageEvent) {
        this.first3 = event.first;
        this.rows3 = event.rows;
    }
}`
    };
}
