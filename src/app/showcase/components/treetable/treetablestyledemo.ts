import { Component } from '@angular/core';
import {NodeService} from '../../service/nodeservice';
import {TreeNode} from 'primeng/api';

@Component({
    templateUrl: './treetablestyledemo.html',
    styles: [`
        .kb-row {
            background-color: #1CA979 !important;
            color: #ffffff !important;
        }

        :host ::ng-deep .kb-row .ui-treetable-toggler {
            color: #ffffff !important;
        }

        .kb-cell {
            background-color: #2CA8B1 !important;
            color: #ffffff !important;
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