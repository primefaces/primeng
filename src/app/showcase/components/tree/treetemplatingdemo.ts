import {Component,OnInit} from '@angular/core';
import {NodeService} from '../../service/nodeservice';
import {TreeNode} from 'primeng/api';

@Component({
    templateUrl: './treetemplatingdemo.html',
    styles:[`
        .ui-inputtext {
            padding-top: 0;
            padding-bottom: 0;
            font-size: 12px;
        }
    `]
})
export class TreeTemplatingDemo implements OnInit {

    files: TreeNode[];
    
    constructor(private nodeService: NodeService) { }

    ngOnInit() {
        this.nodeService.getFiles().then(files => this.files = files);
    }
}