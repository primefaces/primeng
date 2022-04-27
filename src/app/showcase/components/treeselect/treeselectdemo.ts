import {Component} from '@angular/core';
import { NodeService } from '../../service/nodeservice';

@Component({
    templateUrl: './treeselectdemo.html',
    styles: [`
        :host ::ng-deep .p-treeselect {
            width:20rem;
            display: inline-flex;
        }
    `]
})
export class TreeSelectDemo {
    nodes1: any[];

    nodes2: any[];

    nodes3: any[];
    
    nodes4: any[];

    selectedNodes1: any[] = [];

    selectedNodes2: any[] = [];

    selectedNodes3: any[] = [];

    selectedNode: any;

    constructor(public nodeService: NodeService) { }

    ngOnInit() {
        this.nodeService.getFiles().then(files => this.nodes1 = files);
        this.nodeService.getFiles().then(files => this.nodes2 = files);
        this.nodeService.getFiles().then(files => this.nodes3 = files);
        this.nodeService.getFiles().then(files => this.nodes4 = files);
    }

    logVal(event) {
        console.log(event)
    }
}
