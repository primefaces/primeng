import {Component,OnInit} from '@angular/core';
import {NodeService} from '../../service/nodeservice';
import {TreeNode} from 'primeng/api';
import {MessageService} from 'primeng/api';

@Component({
    templateUrl: './treelazydemo.html',
    providers: [MessageService]
})
export class TreeLazyDemo implements OnInit {

    files: TreeNode[];

    loading: boolean;
    
    constructor(private nodeService: NodeService, private messageService: MessageService) { }

    ngOnInit() {
        this.loading = true;
        setTimeout(() => {
            this.nodeService.getLazyFiles().then(files => this.files = files);
            this.loading = false;
        }, 1000);
    }

    nodeExpand(event) {
        if (event.node) {
            //in a real application, make a call to a remote url to load children of the current node and add the new nodes as children
            this.nodeService.getLazyFiles().then(nodes => {
                event.node.children = nodes
                this.messageService.add({severity: 'info', summary: 'Children Loaded', detail: event.node.label});
            });
        }
    }
}