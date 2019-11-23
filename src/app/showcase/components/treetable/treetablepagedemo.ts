import { Component, OnInit } from '@angular/core';
import { NodeService } from '../../service/nodeservice';
import { TreeNode } from 'primeng/api';

@Component({
    templateUrl: './treetablepagedemo.html'
})
export class TreeTablePageDemo implements OnInit {

    files: TreeNode[];

    cols: any[];

    constructor(private nodeService: NodeService) { }

    ngOnInit() {
        this.files = [];
        for(let i = 0; i < 50; i++) {
            let node = {
                data:{  
                    name: 'Item ' + i,
                    size: Math.floor(Math.random() * 1000) + 1 + 'kb',
                    type: 'Type ' + i
                },
                children: [
                    {
                        data: {  
                            name: 'Item ' + i + ' - 0',
                            size: Math.floor(Math.random() * 1000) + 1 + 'kb',
                            type: 'Type ' + i
                        }
                    }
                ]
            };

            this.files.push(node);
        }

        this.cols = [
            { field: 'name', header: 'Name' },
            { field: 'size', header: 'Size' },
            { field: 'type', header: 'Type' }
        ];
    }
}