import { AppCode } from '@/components/doc/app.code';
import { AppDemoWrapper } from '@/components/doc/app.demowrapper';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';

@Component({
    selector: 'images-doc',
    standalone: true,
    imports: [PaginatorModule, AppCode, AppDemoWrapper, AppDocSectionText],
    template: `
        <app-docsectiontext>
            <p>Sample image gallery implementation using paginator.</p>
        </app-docsectiontext>
        <app-demo-wrapper>
            <div class="flex flex-col gap-4 justify-center items-center">
                <p-paginator [first]="first" [rows]="1" [totalRecords]="12" (onPageChange)="onPageChange($event)" [showJumpToPageDropdown]="true" [showPageLinks]="false"></p-paginator>
                <img [src]="'https://primefaces.org/cdn/primeng/images/demo/nature/nature' + (first + 1) + '.jpg'" class="max-w-full rounded-xl" />
            </div>
            <app-code></app-code>
        </app-demo-wrapper>
    `
})
export class ImagesDoc {
    first: number = 0;

    rows: number = 10;

    onPageChange(event: PaginatorState) {
        this.first = event.first ?? 0;
        this.rows = event.rows ?? 10;
    }
}
