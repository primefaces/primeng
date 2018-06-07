import { Component } from '@angular/core';
import { TreeNode } from '../../../components/common/api';
import { NodeService } from '../../service/nodeservice';

@Component({
    templateUrl: './treetablereorderdemo.html'
})
export class TreeTableReorderDemo {

    files: TreeNode[];

    cols: any[];

    constructor(private nodeService: NodeService) { }

    ngOnInit() {
        this.nodeService.getFilesystem().then(files => this.files = files);

        this.cols = [
            { field: 'name', header: 'Name' },
            { field: 'size', header: 'Size' },
            { field: 'type', header: 'Type' }
        ];
    }
}