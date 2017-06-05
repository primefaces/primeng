import {Component,OnInit} from '@angular/core';
import {TreeNode} from '../../../components/common/api';

@Component({
    templateUrl: './organizationchartdemo.html'
})
export class OrganizationChartDemo implements OnInit {

    data: TreeNode[];
    
    ngOnInit() {
        this.data = [{
            label: 'CEO',
            children: [{
                    label: 'CHRO'
                },
                {
                    label: 'CFO'
                },
                {
                    label: 'CTO'
                },
                {
                    label: 'CMO'
                }
            ]
        }];
    }
}