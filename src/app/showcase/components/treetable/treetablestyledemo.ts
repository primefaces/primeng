import { Component } from '@angular/core';
import {NodeService} from '../../service/nodeservice';
import {TreeNode} from 'primeng/api';

@Component({
    templateUrl: './treetablestyledemo.html',
    styles: [`
        .kb-row {
            background-color: rgba(0,0,0,.15) !important;
        }

        .kb-cell {
            font-weight: 700;
            color: #FF5252;
            text-decoration: line-through;
        }
    `]
})
export class TreeTableStyleDemo {

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