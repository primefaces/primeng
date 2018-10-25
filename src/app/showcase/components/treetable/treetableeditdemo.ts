import { Component } from '@angular/core';
import { TreeNode } from '../../../components/common/api';
import { NodeService } from '../../service/nodeservice';

@Component({
    templateUrl: './treetableeditdemo.html',
    styles: [`
        :host ::ng-deep .ui-editing-cell {
            padding: 0 !important;
        }

        :host ::ng-deep .ui-toggler-column.ui-editing-cell {
            padding-left: 0.857em !important;
        }
    `]
})
export class TreeTableEditDemo {
    
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