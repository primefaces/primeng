import { Component, Input } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'template-doc',
    template: ` <section>
        <app-docsectiontext [title]="title" [id]="id">
            <p>Templating allows overriding the default content of the UI elements by defining callbacks using the element name.</p>
        </app-docsectiontext>
        <div class="card flex flex-column gap-3">
            <div class="flex align-items-center justify-content-center">
                <div>
                    <p-button icon="pi pi-star" styleClass="p-button-outlined"></p-button>
                </div>
                <div class="flex-1">
                    <p-paginator (onPageChange)="onPageChange($event)" [first]="first" [rows]="rows" [totalRecords]="120" [rowsPerPageOptions]="[10, 20, 30]"></p-paginator>
                </div>
                <div class="justify-content-end">
                    <p-button icon="pi pi-search"></p-button>
                </div>
            </div>
            <p-divider></p-divider>
            <div class="flex align-items-center justify-content-start">
                <div class="flex justify-content-center align-items-center gap-3">
                    <span>Items per page: </span>
                    <p-slider [(ngModel)]="first" [style]="{ width: '10rem' }" [min]="10" [max]="120" [step]="30"></p-slider>
                </div>
                <p-paginator (onPageChange)="onPageChange($event)" [first]="first" [rows]="rows" [totalRecords]="totalRecords" [rowsPerPageOptions]="[10, 20, 30]"></p-paginator>
                <span class="text-color text-center" style="userSelect: none; width: 120px"> {{ first }} - {{ rows + first }} of {{ totalRecords }} </span>
            </div>
        </div>
        <app-code [code]="code" selector="paginator-template-demo"></app-code>
    </section>`
})
export class TemplateDoc {
    @Input() id: string;

    @Input() title: string;

    first: number = 0;

    rows: number = 10;

    totalRecords: number = 120;

    onPageChange(event) {
        this.first = event.first;
        this.rows = event.rows;
    }

    code: Code = {
        basic: `
<div class="flex align-items-center justify-content-center">
    <div>
        <p-button icon="pi pi-star" styleClass="p-button-outlined"></p-button>
    </div>
    <div class="flex-1">
        <p-paginator (onPageChange)="onPageChange($event)" [first]="first" [rows]="rows" [totalRecords]="120" [rowsPerPageOptions]="[10, 20, 30]"></p-paginator>
    </div>
    <div class="justify-content-end">
        <p-button icon="pi pi-search"></p-button>
    </div>
</div>

<div class="flex align-items-center justify-content-start">
    <div class="flex justify-content-center align-items-center gap-3">
        <span>Items per page: </span>
        <p-slider [(ngModel)]="first" style="width: 10rem" [min]="10" [max]="120" [step]="30"></p-slider>
    </div>
    <p-paginator (onPageChange)="onPageChange($event)" [first]="first" [rows]="rows" [totalRecords]="totalRecords" [rowsPerPageOptions]="[10, 20, 30]"></p-paginator>
    <span class="text-color text-center" style="userSelect: none; width: 120px"> {{ first }} - {{ rows + first }} of {{ totalRecords }} </span>
</div>
    `,

        html: `
<div class="card flex flex-column gap-3">
    <div class="flex align-items-center justify-content-center">
        <div>
            <p-button icon="pi pi-star" styleClass="p-button-outlined"></p-button>
        </div>
        <div class="flex-1">
            <p-paginator (onPageChange)="onPageChange($event)" [first]="first" [rows]="rows" [totalRecords]="120" [rowsPerPageOptions]="[10, 20, 30]"></p-paginator>
        </div>
        <div class="justify-content-end">
            <p-button icon="pi pi-search"></p-button>
        </div>
    </div>
    <p-divider></p-divider>
    <div class="flex align-items-center justify-content-start">
        <div class="flex justify-content-center align-items-center gap-3">
            <span>Items per page: </span>
            <p-slider [(ngModel)]="first" style="width: 10rem" [min]="10" [max]="120" [step]="30"></p-slider>
        </div>
        <p-paginator (onPageChange)="onPageChange($event)" [first]="first" [rows]="rows" [totalRecords]="totalRecords" [rowsPerPageOptions]="[10, 20, 30]"></p-paginator>
        <span class="text-color text-center" style="userSelect: none; width: 120px"> {{ first }} - {{ rows + first }} of {{ totalRecords }} </span>
    </div>
</div>`,

        typescript: `
import { Component } from '@angular/core';

@Component({
    selector: 'paginator-template-demo',
    templateUrl: './paginator-template-demo.html'
})
export class PaginatorTemplateDemo {
    first: number = 0;

    rows: number = 10;

    totalRecords: number = 120;

    onPageChange(event) {
        this.first = event.first;
        this.rows = event.rows;
    }
}`
    };
}
