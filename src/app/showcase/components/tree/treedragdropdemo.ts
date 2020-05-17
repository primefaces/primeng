import {Component,OnInit} from '@angular/core';
import {NodeService} from '../../service/nodeservice';
import {TreeNode} from 'primeng/api';
import {TreeDragDropService} from 'primeng/api';
import {MessageService} from 'primeng/api';

@Component({
    templateUrl: './treedragdropdemo.html',
    providers: [TreeDragDropService,MessageService],
    styles:[`
        h4 {
            text-align: center;
            margin: 0 0 8px 0;
        }
    `]
})
export class TreeDragDropDemo implements OnInit {

    files1: TreeNode[];

    files2: TreeNode[];

    files3: TreeNode[];

    files4: TreeNode[];
    
    constructor(private nodeService: NodeService) { }

    ngOnInit() {
        this.nodeService.getFiles().then(files => this.files1 = files);
        this.nodeService.getFiles().then(files => this.files2 = files);
        this.files3 = [{
                label: "Backup",
                data: "Backup Folder",
                expandedIcon: "pi pi-folder-open",
                collapsedIcon: "pi pi-folder"
            }
        ];

        this.files4 = [{
                label: "Storage",
                data: "Storage Folder",
                expandedIcon: "pi pi-folder-open",
                collapsedIcon: "pi pi-folder"
            }
        ];
    }
}