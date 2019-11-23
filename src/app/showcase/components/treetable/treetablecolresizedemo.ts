import { Component } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { NodeService } from '../../service/nodeservice';

@Component({
    templateUrl: './treetablecolresizedemo.html'
})
export class TreeTableColResizeDemo {

    files1: TreeNode[];

    files2: TreeNode[];

    files3: TreeNode[];

    files4: TreeNode[];

    cols: any[];

    constructor(private nodeService: NodeService) { }

    ngOnInit() {
        this.nodeService.getFilesystem().then(files => this.files1 = files);
        this.nodeService.getFilesystem().then(files => this.files2 = files);
        this.nodeService.getFilesystem().then(files => this.files3 = files);
        this.nodeService.getFilesystem().then(files => this.files4 = files);

        this.cols = [
            { field: 'name', header: 'Name', width: '50%' },
            { field: 'size', header: 'Size', width: '30%' },
            { field: 'type', header: 'Type', width: '20%' }
        ];
    }
}