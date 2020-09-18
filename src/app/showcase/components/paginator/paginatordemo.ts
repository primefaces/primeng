import {Component} from '@angular/core';

@Component({
    templateUrl: './paginatordemo.html',
    styleUrls: ['./paginatordemo.scss']
})
export class PaginatorDemo {
    first = 0;

    totalRecords = 120;

    totalRecords2 = 12;

    onPageChange(event) {
        this.first = event.first;
    }

    refresh() {
        this.first = 0;
    }
}
