import {Component,ElementRef,OnInit,OnDestroy,OnChanges,Input,Output,SimpleChange,EventEmitter} from 'angular2/core';

@Component({
    selector: 'p-paginator',
    template: `
        <div class="ui-paginator ui-widget-header">
            <span #firstlink class="ui-paginator-first ui-paginator-element ui-state-default ui-corner-all" (mouseenter)="hoveredItem = $event.target" (mouseleave)="hoveredItem = null"
                        (click)="changePageToFirst()" [ngClass]="{'ui-state-disabled':isFirstPage(),'ui-state-hover':(firstlink === hoveredItem && !isFirstPage())}">
                <span class="fa fa-step-backward"></span>
            </span>
            <span #prevlink class="ui-paginator-prev ui-paginator-element ui-state-default ui-corner-all" (mouseenter)="hoveredItem = $event.target" (mouseleave)="hoveredItem = null"
                    (click)="changePageToPrev()" [ngClass]="{'ui-state-disabled':isFirstPage(),'ui-state-hover':(prevlink === hoveredItem && !isFirstPage())}">
                <span class="fa fa-backward"></span>
            </span>
            <span class="ui-paginator-pages">
                <span #plink *ngFor="#pageLink of pageLinks" class="ui-paginator-page ui-paginator-element ui-state-default ui-corner-all"
                    (mouseenter)="hoveredItem = $event.target" (mouseleave)="hoveredItem = null" (click)="changePage(pageLink - 1)"
                    [ngClass]="{'ui-state-hover':(plink === hoveredItem), 'ui-state-active': (pageLink-1 == page)}">{{pageLink}}</span>
            </span>
            <span #nextlink class="ui-paginator-next ui-paginator-element ui-state-default ui-corner-all" (mouseenter)="hoveredItem = $event.target" (mouseleave)="hoveredItem = null"
                    (click)="changePageToNext()" [ngClass]="{'ui-state-disabled':isLastPage(),'ui-state-hover':(nextlink === hoveredItem  && !isLastPage())}">
                <span class="fa fa-forward"></span>
            </span>
            <span #lastlink class="ui-paginator-last ui-paginator-element ui-state-default ui-corner-all" (mouseenter)="hoveredItem = $event.target" (mouseleave)="hoveredItem = null"
                    (click)="changePageToLast()" [ngClass]="{'ui-state-disabled':isLastPage(),'ui-state-hover':(lastlink === hoveredItem  && !isLastPage())}">
                <span class="fa fa-step-forward"></span>
            </span>
        </div>
    `
})
export class Paginator implements OnInit{

    @Input() totalRecords: number = 0;

    @Input() rows: number = 0;

    @Input() page: number = 0;

    @Input() pageLinkSize: number = 5;

    @Output() onPageChange: EventEmitter<any> = new EventEmitter();

    pageLinks: number[];

    ngOnInit() {
        this.updatePageLinks();
    }

    isFirstPage() {
        return this.page === 0;
    }

    isLastPage() {
        return this.page === this.getPageCount() - 1;
    }

    getPageCount() {
        return Math.ceil(this.totalRecords/this.rows)||1;
    }

    calculatePageLinkBoundaries() {
        let numberOfPages = this.getPageCount(),
        visiblePages = Math.min(this.pageLinkSize, numberOfPages);

        //calculate range, keep current in middle if necessary
        let start = Math.max(0, Math.ceil(this.page - ((visiblePages) / 2))),
        end = Math.min(numberOfPages - 1, start + visiblePages - 1);

        //check when approaching to last page
        var delta = this.pageLinkSize - (end - start + 1);
        start = Math.max(0, start - delta);

        return [start, end];
    }

    updatePageLinks() {
        this.pageLinks = [];
        let boundaries = this.calculatePageLinkBoundaries(),
        start = boundaries[0],
        end = boundaries[1];

        for(let i = start; i <= end; i++) {
            this.pageLinks.push(i + 1);
        }
    }

    changePage(p :number) {
        var pc = this.getPageCount();

        if(p >= 0 && p < pc) {
            var state = {
                first: this.rows * p,
                rows: this.rows,
                page: p,
                pageCount: pc
            };

            this.page = p;

            this.updatePageLinks();

            this.onPageChange.next(state);
        }

    }

    changePageToFirst() {
        this.changePage(0);
    }

    changePageToPrev() {
        this.changePage(this.page - 1);
    }

    changePageToNext() {
        this.changePage(this.page + 1);
    }

    changePageToLast() {
        this.changePage(this.getPageCount() - 1);
    }
}