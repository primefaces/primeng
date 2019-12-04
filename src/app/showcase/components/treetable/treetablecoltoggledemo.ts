import { Component } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { NodeService } from '../../service/nodeservice';

@Component({
    templateUrl: './treetablecoltoggledemo.html'
})
export class TreeTableColToggleDemo {
    
    files: TreeNode[];

    cols: any[];

    selectedColumns: any[];

    constructor(private nodeService: NodeService) { }

    ngOnInit() {
        this.nodeService.getFilesystem().then(files => this.files = files);

        this.cols = [
            { field: 'name', header: 'Name' },
            { field: 'size', header: 'Size' },
            { field: 'type', header: 'Type' }
        ];

        this.selectedColumns = this.cols;
    }
}