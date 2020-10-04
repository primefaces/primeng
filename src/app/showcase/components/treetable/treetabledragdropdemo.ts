import { Component } from '@angular/core';
import { TreeNode, MessageService, TreeDragDropService } from 'primeng/api';
import { NodeService } from '../../service/nodeservice';

@Component({
    templateUrl: './treetabledragdropdemo.html',
    providers: [TreeDragDropService, MessageService]
})
export class TreeTableDragDropDemo {

    files: TreeNode[];

    cols: any[];

    enableRowMove: boolean = true;

    enableDrag: boolean = true;

    enableDrop: boolean = true;

    draggableScope: string = "TreeTableID";

	droppableScope: string = "TreeTableID";

    constructor(private nodeService: NodeService, private messageService: MessageService) { }

    ngOnInit() {
        this.nodeService.getFilesystem().then(files => this.files = files);

        this.cols = [
            { field: 'name', header: 'Name' },
            { field: 'size', header: 'Size' },
            { field: 'type', header: 'Type' }
        ];
    }

    onNodeDrop(event) {
        this.messageService.add({severity: 'info', summary: 'Drag and Drop handled', detail: 'Dropped'});
		var dragNode: TreeNode = event.dragNode;
		var dropNode: TreeNode = event.dropNode;
		var index = event.index;
		//in a real application, make a call to a remote url to handle the change of the parent node
		if (!dropNode.leaf) {
            this.messageService.add({severity: 'info', summary: 'Drag and Drop handled', detail: `Dropped ${dragNode.label} on ${dropNode.label}`});
            //if the drop operation is valid and you have set the property 'validateDrop' to 'true', you will need to call this method, to accept the drop operation
            event.accept();
        }
	}
}
