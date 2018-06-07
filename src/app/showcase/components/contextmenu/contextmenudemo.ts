import {Component} from '@angular/core';
import {MenuItem} from '../../../components/common/api';

@Component({
    templateUrl: './contextmenudemo.html'
})
export class ContextMenuDemo {

    items1: MenuItem[];
    
    items2: MenuItem[];

    ngOnInit() {
        this.items1 = [
            {
                label: 'File',
                icon: 'fa fa-fw fa-file-o',
                items: [{
                        label: 'New', 
                        icon: 'fa fa-fw fa-plus',
                        items: [
                            {label: 'Project'},
                            {label: 'Other'},
                        ]
                    },
                    {label: 'Open'},
                    {separator: true},
                    {label: 'Quit'}
                ]
            },
            {
                label: 'Edit',
                icon: 'fa fa-fw fa-edit',
                items: [
                    {label: 'Undo', icon: 'fa fa-fw fa-mail-forward'},
                    {label: 'Redo', icon: 'fa fa-fw fa-mail-reply'}
                ]
            },
            {
                label: 'Help',
                icon: 'fa fa-fw fa-question',
                items: [
                    {
                        label: 'Contents'
                    },
                    {
                        label: 'Search', 
                        icon: 'fa fa-fw fa-search', 
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
                                label: 'File'
                            }
                    ]}
                ]
            },
            {
                label: 'Actions',
                icon: 'fa fa-fw fa-gear',
                items: [
                    {
                        label: 'Edit',
                        icon: 'fa fa-fw fa-refresh',
                        items: [
                            {label: 'Save', icon: 'fa fa-fw fa-save'},
                            {label: 'Update', icon: 'fa fa-fw fa-save'},
                        ]
                    },
                    {
                        label: 'Other',
                        icon: 'fa fa-fw fa-phone',
                        items: [
                            {label: 'Delete', icon: 'fa fa-fw fa-minus'}
                        ]
                    }
                ]
            },
            {separator: true},
            {
                label: 'Quit', icon: 'fa fa-fw fa-minus'
            }
        ];
        
        this.items2 = [
            {
                label: 'Next',
                icon: 'fa fa-fw fa-chevron-right'
            },
            {
                label: 'Prev',
                icon: 'fa fa-fw fa-chevron-left'
            }
        ];
    }
}