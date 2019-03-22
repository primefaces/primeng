import { Component } from '@angular/core';
import { TreeNode } from '../../../components/common/api';
import { NodeService } from '../../service/nodeservice';

@Component({
    templateUrl: './treetablescrolldemo.html'
})
export class TreeTableScrollDemo {
    
    files1: TreeNode[];

    files2: TreeNode[];

    files3: TreeNode[];

    files4: TreeNode[];

    virtualFiles: TreeNode[];

    cols: any[];

    frozenCols: any[];

    scrollableCols: any[];

    totalRecords: number;

    loading: boolean;

    constructor(private nodeService: NodeService) { }

    ngOnInit() {
        this.nodeService.getFilesystem().then(files => this.files1 = files);
        this.nodeService.getFilesystem().then(files => this.files2 = files);
        this.nodeService.getFilesystem().then(files => this.files3 = files);
        this.nodeService.getFilesystem().then(files => this.files4 = files);

        this.cols = [
            { field: 'name', header: 'Name' },
            { field: 'size', header: 'Size' },
            { field: 'type', header: 'Type' }
        ];

        this.scrollableCols = [
            { field: 'size', header: 'Size' },
            { field: 'type', header: 'Type' },
            { field: 'size', header: 'Size' },
            { field: 'type', header: 'Type' },
            { field: 'size', header: 'Size' },
            { field: 'type', header: 'Type' }
        ];

        this.frozenCols = [
            { field: 'name', header: 'Name' }
        ];

        //in a production application, retrieve the logical number of rows from a remote datasource
        this.totalRecords = 250000;

        this.loading = true;
    }

    loadNodes(event) {
        this.loading = true;

        //in a production application, make a remote request to load data using state metadata from event
        //event.first = First row offset
        //event.rows = Number of rows per page
        //event.sortField = Field name to sort with
        //event.sortOrder = Sort order as number, 1 for asc and -1 for dec
        //filters: FilterMetadata object having field as key and filter value, filter matchMode as value

        //imitate db connection over a network
        setTimeout(() => {
            this.virtualFiles = [];

            //last chunk
            if (event.first === 249980)
                this.createLazyNodes(event.first, 20);
            else
                this.createLazyNodes(event.first, event.rows);

            this.loading = false;
        }, 250);
    }

    createLazyNodes(index, length) {
        for(let i = 0; i < length; i++) {
            let node = {
                data: {  
                    name: 'Item ' + (index + i),
                    size: Math.floor(Math.random() * 1000) + 1 + 'kb',
                    type: 'Type ' + (index + i)
                },
                leaf: false
            };

            this.virtualFiles.push(node);
        }
    }

    onNodeExpand(event) {
        this.loading = true;

        setTimeout(() => {
            this.loading = false;
            const node = event.node;

            node.children = [
                {
                    data: {  
                        name: node.data.name + ' - 0',
                        size: Math.floor(Math.random() * 1000) + 1 + 'kb',
                        type: 'File'
                    },
                },
                {
                    data: {  
                        name: node.data.name + ' - 1',
                        size: Math.floor(Math.random() * 1000) + 1 + 'kb',
                        type: 'File'
                    }
                }
            ];

            this.virtualFiles = [...this.virtualFiles];
        }, 250);
        
    }
}