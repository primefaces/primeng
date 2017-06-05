import {Component,OnInit} from '@angular/core';
import {Message,TreeNode} from '../../../components/common/api';

@Component({
    templateUrl: './organizationchartdemo.html'
})
export class OrganizationChartDemo implements OnInit {

    data: TreeNode[];
    
    selectedNodes: TreeNode;
    
    messages: Message[];
    
    ngOnInit() {
        this.data = [{
            label: 'CEO',
            type: 'ceo',
            children: [
                {
                    label: 'CFO',
                    children:[{
                        label: 'Tax'
                    },
                    {
                        label: 'Legal'
                    }],
                },
                {
                    label: 'COO',
                    children:[{
                        label: 'Operations'
                    }]
                },
                {
                    label: 'CTO',
                    children:[{
                        label: 'Development',
                        children:[{
                            label: 'Analysis'
                        },
                        {
                            label: 'Front End'
                        },
                        {
                            label: 'Back End'
                        }]
                    },
                    {
                        label: 'QA'
                    },
                    {
                        label: 'R&D'
                    }]
                }
            ]
        }];
    }
    
    onNodeSelect(event) {
        this.messages = [{severity: 'success', summary: 'Node Selected', detail: event.node.label}];
    }
}