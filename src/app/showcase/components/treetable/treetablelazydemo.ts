import { Component } from '@angular/core';
import { TreeNode } from '../../../components/common/api';
import { NodeService } from '../../service/nodeservice';

@Component({
    templateUrl: './treetablelazydemo.html'
})
export class TreeTableLazyDemo {
    
    files: TreeNode[];

    cols: any[];

    totalRecords: number;

    constructor(private nodeService: NodeService) { }

    ngOnInit() {
        this.cols = [
            { field: 'name', header: 'Name' },
            { field: 'size', header: 'Size' },
            { field: 'type', header: 'Type' }
        ];

        //in a production application, retrieve the logical number of rows from a remote datasource
        this.totalRecords = 1000;
    }

    loadNodes(event) {
        this.files = [];
        for(let i = 0; i < event.rows; i++) {
            let node = {
                data:{  
                    name: 'Item ' + (event.first + i),
                    size: Math.floor(Math.random() * 1000) + 1 + 'kb',
                    type: 'Type ' + (event.first + i)
                },
                children: [
                    {
                        data: {  
                            name: 'Item ' + (event.first + i) + ' - 0',
                            size: Math.floor(Math.random() * 1000) + 1 + 'kb',
                            type: 'Type ' + (event.first + i)
                        }
                    }
                ]
            };

            this.files.push(node);
        }
    }
}