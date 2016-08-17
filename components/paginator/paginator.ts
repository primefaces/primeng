import {NgModule,Component,ElementRef,Input,Output,SimpleChange,EventEmitter} from '@angular/core';
import {CommonModule} from '@angular/common';

@Component({
    selector: 'p-paginator',
    template: `
        <div [class]="styleClass" [ngStyle]="style" [ngClass]="{'ui-paginator ui-widget-header ui-unselectable-text':true}">
            <span #firstlink class="ui-paginator-first ui-paginator-element ui-state-default ui-corner-all" (mouseenter)="hoveredItem = $event.target" (mouseleave)="hoveredItem = null"
                        (click)="changePageToFirst()" [ngClass]="{'ui-state-disabled':isFirstPage(),'ui-state-hover':(firstlink === hoveredItem && !isFirstPage())}">
                <span class="fa fa-step-backward"></span>
            </span>
            <span #prevlink class="ui-paginator-prev ui-paginator-element ui-state-default ui-corner-all" (mouseenter)="hoveredItem = $event.target" (mouseleave)="hoveredItem = null"
                    (click)="changePageToPrev()" [ngClass]="{'ui-state-disabled':isFirstPage(),'ui-state-hover':(prevlink === hoveredItem && !isFirstPage())}">
                <span class="fa fa-backward"></span>
            </span>
            <span class="ui-paginator-pages">
                <span #plink *ngFor="let pageLink of pageLinks" class="ui-paginator-page ui-paginator-element ui-state-default ui-corner-all"
                    (mouseenter)="hoveredItem = $event.target" (mouseleave)="hoveredItem = null" (click)="changePage(pageLink - 1)"
                    [ngClass]="{'ui-state-hover':(plink === hoveredItem), 'ui-state-active': (pageLink-1 == getPage())}">{{pageLink}}</span>
            </span>
            <span #nextlink class="ui-paginator-next ui-paginator-element ui-state-default ui-corner-all" (mouseenter)="hoveredItem = $event.target" (mouseleave)="hoveredItem = null"
                    (click)="changePageToNext()" [ngClass]="{'ui-state-disabled':isLastPage(),'ui-state-hover':(nextlink === hoveredItem  && !isLastPage())}">
                <span class="fa fa-forward"></span>
            </span>
            <span #lastlink class="ui-paginator-last ui-paginator-element ui-state-default ui-corner-all" (mouseenter)="hoveredItem = $event.target" (mouseleave)="hoveredItem = null"
                    (click)="changePageToLast()" [ngClass]="{'ui-state-disabled':isLastPage(),'ui-state-hover':(lastlink === hoveredItem  && !isLastPage())}">
                <span class="fa fa-step-forward"></span>
            </span>
            <select class="ui-paginator-rpp-options ui-widget ui-state-default" *ngIf="rowsPerPageOptions" (change)="onRppChange($event)">
                <option *ngFor="let opt of rowsPerPageOptions" [value]="opt" [selected]="rows == opt">{{opt}}</option>
            </select>
        </div>
    `
})
export class Paginator {

    @Input() rows: number = 0;

    @Input() pageLinkSize: number = 5;

    @Output() onPageChange: EventEmitter<any> = new EventEmitter();

    @Input() style: any;

    @Input() styleClass: string;
    
    @Input() rowsPerPageOptions: number[];

    pageLinks: number[];

    _totalRecords: number = 0;
    
    _first: number = 0;

    @Input() get totalRecords(): number {
        return this._totalRecords;
    }

    set totalRecords(val:number) {
        this._totalRecords = val;
        this.updatePageLinks();
    }
    
    @Input() get first(): number {
        return this._first;
    }

    set first(val:number) {
        this._first = val;
        this.updatePageLinks();
    }

    isFirstPage() {
        return this.getPage() === 0;
    }

    isLastPage() {
        return this.getPage() === this.getPageCount() - 1;
    }

    getPageCount() {
        return Math.ceil(this.totalRecords/this.rows)||1;
    }

    calculatePageLinkBoundaries() {
        let numberOfPages = this.getPageCount(),
        visiblePages = Math.min(this.pageLinkSize, numberOfPages);

        //calculate range, keep current in middle if necessary
        let start = Math.max(0, Math.ceil(this.getPage() - ((visiblePages) / 2))),
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
            this.first = this.rows * p;
            var state = {
                page: p,
                first: this.first,
                rows: this.rows,
                pageCount: pc
            };
            this.updatePageLinks();

            this.onPageChange.emit(state);
        }

    }
    
    getPage(): number {
        return Math.floor(this.first / this.rows);
    }

    changePageToFirst() {
        this.changePage(0);
    }

    changePageToPrev() {
        this.changePage(this.getPage() - 1);
    }

    changePageToNext() {
        this.changePage(this.getPage()  + 1);
    }

    changePageToLast() {
        this.changePage(this.getPageCount() - 1);
    }
    
    onRppChange(event) {
        this.rows = this.rowsPerPageOptions[event.target.selectedIndex];
        this.changePageToFirst();
    }
}

@NgModule({
    imports: [CommonModule],
    exports: [Paginator],
    declarations: [Paginator]
})
export class PaginatorModule { }
