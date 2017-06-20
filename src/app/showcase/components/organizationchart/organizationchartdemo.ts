import {Component,OnInit,ViewEncapsulation} from '@angular/core';
import {Message,TreeNode} from '../../../components/common/api';

@Component({
    templateUrl: './organizationchartdemo.html',
    styles: [`
        .company.ui-organizationchart .ui-organizationchart-node-content.ui-person {
            padding: 0;
            border: 0 none;
        }
        
        .node-header,.node-content {
            padding: .5em .7em;
        }
        
        .node-header {
            background-color: #495ebb;
            color: #ffffff;
        }
        
        .node-content {
            text-align: center;
            border: 1px solid #495ebb;
        }
        
        .node-content img {
            border-radius: 50%;
        }
        
        .ui-organizationchart-node-content.department-cfo {
            background-color: #7247bc;
            color: #ffffff;
        }
        
        .ui-organizationchart-node-content.department-coo {
            background-color: #a534b6;
            color: #ffffff;
        }
        
        .ui-organizationchart-node-content.department-cto {
            background-color: #e9286f;
            color: #ffffff;
        }
        
        .ui-person .ui-node-toggler {
            color: #495ebb !important;
        }
        
        .department-cto .ui-node-toggler {
            color: #8a0a39 !important;
        }
    `],
    encapsulation: ViewEncapsulation.None
})
export class OrganizationChartDemo implements OnInit {

    data1: TreeNode[];
    
    data2: TreeNode[];
    
    selectedNode: TreeNode;
    
    messages: Message[];
    
    ngOnInit() {
        this.data1 = [{
            label: 'CEO',
            type: 'person',
            styleClass: 'ui-person',
            expanded: true,
            data: {name:'Walter White', 'avatar': 'walter.jpg'},
            children: [
                {
                    label: 'CFO',
                    type: 'person',
                    styleClass: 'ui-person',
                    expanded: true,
                    data: {name:'Saul Goodman', 'avatar': 'saul.jpg'},
                    children:[{
                        label: 'Tax',
                        styleClass: 'department-cfo'
                    },
                    {
                        label: 'Legal',
                        styleClass: 'department-cfo'
                    }],
                },
                {
                    label: 'COO',
                    type: 'person',
                    styleClass: 'ui-person',
                    expanded: true,
                    data: {name:'Mike E.', 'avatar': 'mike.jpg'},
                    children:[{
                        label: 'Operations',
                        styleClass: 'department-coo'
                    }]
                },
                {
                    label: 'CTO',
                    type: 'person',
                    styleClass: 'ui-person',
                    expanded: true,
                    data: {name:'Jesse Pinkman', 'avatar': 'jesse.jpg'},
                    children:[{
                        label: 'Development',
                        styleClass: 'department-cto',
                        expanded: true,
                        children:[{
                            label: 'Analysis',
                            styleClass: 'department-cto'
                        },
                        {
                            label: 'Front End',
                            styleClass: 'department-cto'
                        },
                        {
                            label: 'Back End',
                            styleClass: 'department-cto'
                        }]
                    },
                    {
                        label: 'QA',
                        styleClass: 'department-cto'
                    },
                    {
                        label: 'R&D',
                        styleClass: 'department-cto'
                    }]
                }
            ]
        }];
        
        this.data2 = [{
            label: 'F.C Barcelona',
            expanded: true,
            children: [
                {
                    label: 'F.C Barcelona',
                    expanded: true,
                    children: [
                        {
                            label: 'Chelsea FC'
                        },
                        {
                            label: 'F.C. Barcelona'
                        }
                    ]
                },
                {
                    label: 'Real Madrid',
                    expanded: true,
                    children: [
                        {
                            label: 'Bayern Munich'
                        },
                        {
                            label: 'Real Madrid'
                        }
                    ]
                }
            ]
        }];
    }
    
    onNodeSelect(event) {
        this.messages = [{severity: 'success', summary: 'Node Selected', detail: event.node.label}];
    }
}