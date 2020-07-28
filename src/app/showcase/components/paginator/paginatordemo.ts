import {Component} from '@angular/core';

@Component({
    templateUrl: './paginatordemo.html',
    styleUrls: ['./paginatordemo.scss']
})
export class PaginatorDemo {
    first: number = 0;

    totalRecords: number = 120;

    totalRecords2: number = 12;

    onPageChange(event) {
        this.first = event.first;
    }

    refresh() {
        this.first = 0;
    }
}