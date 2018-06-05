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
                icon: 'fa fa-file-o',
                items: [{
                        label: 'New', 
                        icon: 'fa fa-plus',
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
                        label: 'Contents'
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
                                label: 'File'
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
            },
            {separator: true},
            {
                label: 'Quit', icon: 'fa fa-minus'
            }
        ];
        
        this.items2 = [
            {
                label: 'Next',
                icon: 'fa fa-chevron-right'
            },
            {
                label: 'Prev',
                icon: 'fa fa-chevron-left'
            }
        ];
    }
}