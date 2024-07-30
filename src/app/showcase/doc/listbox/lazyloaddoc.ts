import { ChangeDetectorRef, Component } from '@angular/core';
import { Code } from '@domain/code';

interface LazyEvent {
    first: number;
    last: number;
}

@Component({
    selector: 'lazy-load-doc',
    template: `
        <app-docsectiontext>
            <p>
                Lazy mode is handy to deal with large datasets where instead of loading the entire data, small chunks of data are loaded on demand by invoking onLazyLoad callback everytime scrolling requires a new chunk. To implement lazy loading,
                enable <i>lazy</i> attribute, initialize your data as a placeholder with a length and finally implement a method callback using <i>onLazyLoad</i> that actually loads a chunk from a datasource. onLazyLoad gets an event object that
                contains information about the chunk of data to load such as the index and number of items to load.
            </p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <p-listbox
                [options]="items"
                [(ngModel)]="selectedItems"
                optionLabel="label"
                [style]="{ width: '15rem' }"
                [virtualScroll]="true"
                [virtualScrollItemSize]="38"
                [multiple]="true"
                scrollHeight="250px"
                [loading]="lazyLoading"
                [lazy]="true" 
                (onLazyLoad)="onLazyLoad($event)"
            />
        </div>
        <app-code [code]="code" selector="listbox-lazy-load-demo"></app-code>
    `
})
export class LazyLoadDoc {

    selectedItems!: any[];

    items!: {label: string, value: number}[];

    lazyLoading: boolean = true;

    loadLazyTimeout: any;

    constructor(private cd: ChangeDetectorRef) {}

    ngOnInit() {
        this.items = Array.from({ length: 1000 }, (_, i) => ({ label: '', value: null }));
    }

    onLazyLoad(event: LazyEvent) {
        this.lazyLoading = true;

        if (this.loadLazyTimeout) {
            clearTimeout(this.loadLazyTimeout);
        }

        //imitate delay of a backend call
        this.loadLazyTimeout = setTimeout(() => {
            const { first, last } = event;
            const lazyItems = [...this.items];

            for (let i = first; i < last; i++) {
                lazyItems[i] = {label: `Item #${i}`, value: i};
            }

            this.items = lazyItems;
            this.lazyLoading = false;
            this.cd.markForCheck();
        }, Math.random() * 1000 + 250);
    }

    code: Code = {
        basic: `<p-listbox
    [options]="items"
    [(ngModel)]="selectedItems"
    optionLabel="label"
    [style]="{ width: '15rem' }"
    [virtualScroll]="true"
    [virtualScrollItemSize]="38"
    [multiple]="true"
    scrollHeight="250px"
    [loading]="lazyLoading"
    [lazy]="true" 
    (onLazyLoad)="onLazyLoad($event)"
/>`,

        html: `<div class="card flex justify-content-center">
    <p-listbox
        [options]="items"
        [(ngModel)]="selectedItems"
        optionLabel="label"
        [style]="{ width: '15rem' }"
        [virtualScroll]="true"
        [virtualScrollItemSize]="38"
        [multiple]="true"
        scrollHeight="250px"
        [loading]="lazyLoading"
        [lazy]="true" 
        (onLazyLoad)="onLazyLoad($event)"
    />
</div>`,

        typescript: `import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ListboxModule } from 'primeng/listbox';

interface LazyEvent {
    first: number;
    last: number;
}

@Component({
    selector: 'listbox-lazy-load-demo',
    templateUrl: './listbox-lazy-load-demo.html',
    standalone: true,
    imports: [FormsModule, ListboxModule]
})
export class ListboxLazyLoadDemo {
    selectedItems!: any[];

    items!: {label: string, value: number}[];

    lazyLoading: boolean = true;

    loadLazyTimeout: any;

    constructor(private cd: ChangeDetectorRef) {}

    ngOnInit() {
        this.items = Array.from({ length: 1000 }, (_, i) => ({ label: '', value: null }));
    }

    onLazyLoad(event: LazyEvent) {
        this.lazyLoading = true;

        if (this.loadLazyTimeout) {
            clearTimeout(this.loadLazyTimeout);
        }

        //imitate delay of a backend call
        this.loadLazyTimeout = setTimeout(() => {
            const { first, last } = event;
            const lazyItems = [...this.items];

            for (let i = first; i < last; i++) {
                lazyItems[i] = {label: \`Item #\${i}\`, value: i};
            }

            this.items = lazyItems;
            this.lazyLoading = false;
            this.cd.markForCheck();
        }, Math.random() * 1000 + 250);
    }

}`
    };
}
