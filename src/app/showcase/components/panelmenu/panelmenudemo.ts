import {Component} from '@angular/core';
import {MenuItem} from '../../../components/common/api';

@Component({
    templateUrl: './panelmenudemo.html'
})
export class PanelMenuDemo {
  
    items: MenuItem[];

    ngOnInit() {
        this.items = [
            {
                label: 'File',
                icon: 'fa fa-file-o',
                items: [{
                        label: 'New', 
                        icon: 'fa fa-plus',
                        items: [
                            {label: 'Project', icon: 'fa fa-lock'},
                            {label: 'Other', icon: 'fa fa-list'}
                        ]
                    },
                    {label: 'Open', icon: 'fa fa-external-link'},
                    {separator: true},
                    {label: 'Quit', icon: 'fa fa-close'}
                ]
            },
            {
                label: 'Edit',
                icon: 'fa fa-edit',
                items: [
                    {label: 'Undo', icon: 'fa fa-mail-forward'},
                    {label: 'Redo', icon: 'fa fa-mail-reply'}
                ]
            },
            {
                label: 'Help',
                icon: 'fa fa-question',
                items: [
                    {
                        label: 'Contents',
                        icon: 'fa fa-bars'
                    },
                    {
                        label: 'Search', 
                        icon: 'fa fa-search', 
                        items: [
                            {
                                label: 'Text', 
                                items: [
                                    {
                                        label: 'Workspace'
                                    }
                                ]
                            },
                            {
                                label: 'File',
                                icon: 'fa fa-file',
                            }
                    ]}
                ]
            },
            {
                label: 'Actions',
                icon: 'fa fa-gear',
                items: [
                    {
                        label: 'Edit',
                        icon: 'fa fa-refresh',
                        items: [
                            {label: 'Save', icon: 'fa fa-save'},
                            {label: 'Update', icon: 'fa fa-save'},
                        ]
                    },
                    {
                        label: 'Other',
                        icon: 'fa fa-phone',
                        items: [
                            {label: 'Delete', icon: 'fa fa-minus'}
                        ]
                    }
                ]
            }
        ];
    }
}