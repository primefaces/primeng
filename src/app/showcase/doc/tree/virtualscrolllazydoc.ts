import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { Code } from '@domain/code';
import { NodeService } from '@service/nodeservice';

@Component({
    selector: 'lazy-virtual-scroll-doc',
    template: `
        <app-docsectiontext>
            <p>VirtualScroller is a performance-approach to handle huge data efficiently. Setting <i>virtualScroll</i> property as true and providing a <i>virtualScrollItemSize</i> in pixels would be enough to enable this functionality.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <p-tree class="w-full md:w-30rem" scrollHeight="250px" [virtualScroll]="true" [lazy]="true" [virtualScrollItemSize]="46" [value]="files" (onNodeExpand)="nodeExpand($event)" [loading]="loading" />
        </div>
        <app-code [code]="code" selector="tree-virtual-scroll-lazy-demo"></app-code>
    `
})
export class LazyVirtualScrollDoc implements OnInit {
    loading: boolean = false;

    files!: TreeNode[];

    virtualFiles!: TreeNode[];

    constructor(private nodeService: NodeService, private cd: ChangeDetectorRef) {}

    ngOnInit() {
        this.loading = true;
        setTimeout(() => {
            this.nodeService.getLazyFiles().then((files) => (this.files = this.duplicateData(files, 50)));
            this.loading = false;
            this.cd.markForCheck();
        }, 1000);
    }

    duplicateData(data: TreeNode[], count: number): TreeNode[] {
        let duplicatedData: TreeNode[] = [];
        for (let i = 0; i < count; i++) {
            duplicatedData = [...duplicatedData, ...data.map((item) => ({ ...item }))];
        }
        return duplicatedData;
    }

    nodeExpand(event: any) {
        if (event.node) {
            this.loading = true;
            setTimeout(() => {
                this.nodeService.getLazyFiles().then((nodes) => {
                    event.node.children = nodes;
                    this.files = [...this.files, event.node.children];
                });
                this.loading = false;
                this.cd.markForCheck();
            }, 200);
        }
    }

    code: Code = {
        basic: `<p-tree 
    class="w-full md:w-30rem" 
    scrollHeight="250px" 
    [virtualScroll]="true" 
    [lazy]="true" 
    [virtualScrollItemSize]="46" 
    [value]="files" 
    (onNodeExpand)="nodeExpand($event)" 
    [loading]="loading" />`,

        html: `<div class="card flex justify-content-center">
    <p-tree 
        class="w-full md:w-30rem" 
        scrollHeight="250px" 
        [virtualScroll]="true" 
        [lazy]="true" 
        [virtualScrollItemSize]="46" 
        [value]="files" 
        (onNodeExpand)="nodeExpand($event)" 
        [loading]="loading" />
</div>`,

        typescript: `import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { NodeService } from '@service/nodeservice';
import { TreeModule } from 'primeng/tree';

@Component({
    selector: 'tree-virtual-scroll-lazy-demo',
    templateUrl: './tree-virtual-scroll-lazy-demo.html',
    standalone: true,
    imports: [TreeModule],
    providers: [NodeService]
})
export class TreeVirtualScrollLazyDemo implements OnInit {
    loading: boolean = false;

    files!: TreeNode[];

    virtualFiles!: TreeNode[];

    constructor(private nodeService: NodeService, private cd: ChangeDetectorRef) {}

    ngOnInit() {
        this.loading = true;
        setTimeout(() => {
            this.nodeService.getLazyFiles().then((files) => (this.files = this.duplicateData(files, 50)));
            this.loading = false;
            this.cd.markForCheck();
        }, 1000);
    }

    duplicateData(data: TreeNode[], count: number): TreeNode[] {
        let duplicatedData: TreeNode[] = [];
        for (let i = 0; i < count; i++) {
            duplicatedData = [...duplicatedData, ...data.map((item) => ({ ...item }))];
        }
        return duplicatedData;
    }

    nodeExpand(event: any) {
        if (event.node) {
            this.loading = true;
            setTimeout(() => {
                this.nodeService.getLazyFiles().then((nodes) => {
                    event.node.children = nodes;
                    this.files = [...this.files, event.node.children];
                });
                this.loading = false;
                this.cd.markForCheck();
            }, 200);
        }
    }
}`,
        service: ['NodeService'],

        data: `
    /* NodeService */
{
    key: '0',
    label: 'Documents',
    data: 'Documents Folder',
    icon: 'pi pi-fw pi-inbox',
    children: [
        {
            key: '0-0',
            label: 'Work',
            data: 'Work Folder',
            icon: 'pi pi-fw pi-cog',
            children: [
                { key: '0-0-0', label: 'Expenses.doc', icon: 'pi pi-fw pi-file', data: 'Expenses Document' },
                { key: '0-0-1', label: 'Resume.doc', icon: 'pi pi-fw pi-file', data: 'Resume Document' }
            ]
        },
        {
            key: '0-1',
            label: 'Home',
            data: 'Home Folder',
            icon: 'pi pi-fw pi-home',
            children: [{ key: '0-1-0', label: 'Invoices.txt', icon: 'pi pi-fw pi-file', data: 'Invoices for this month' }]
        }
    ]
},
...`
    };
}
