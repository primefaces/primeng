import {Component} from '@angular/core';
import {MenuItem} from '../../../components/common/api';

@Component({
    templateUrl: './contextmenudemo.html'
})
export class ContextMenuDemo {

    private items1: MenuItem[];
    
    private items2: MenuItem[];

    ngOnInit() {
        this.items1 = [
            {
                label: 'File',
                icon: 'fa-file-o',
                items: [{
                        label: 'New', 
                        icon: 'fa-plus',
                        items: [
                            {label: 'Project'},
                            {label: 'Other'},
                        ]
                    },
                    {label: 'Open'},
                    {label: 'Quit'}
                ]
            },
            {
                label: 'Edit',
                icon: 'fa-edit',
                items: [
                    {label: 'Undo', icon: 'fa-mail-forward'},
                    {label: 'Redo', icon: 'fa-mail-reply'}
                ]
            },
            {
                label: 'Help',
                icon: 'fa-question',
                items: [
                    {
                        label: 'Contents'
                    },
                    {
                        label: 'Search', 
                        icon: 'fa-search', 
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
                icon: 'fa-gear',
                items: [
                    {
                        label: 'Edit',
                        icon: 'fa-refresh',
                        items: [
                            {label: 'Save', icon: 'fa-save'},
                            {label: 'Update', icon: 'fa-save'},
                        ]
                    },
                    {
                        label: 'Other',
                        icon: 'fa-phone',
                        items: [
                            {label: 'Delete', icon: 'fa-minus'}
                        ]
                    }
                ]
            },
            {
                label: 'Quit', icon: 'fa-minus'
            }
        ];
        
        this.items2 = [
            {
                label: 'Next',
                icon: 'fa-chevron-right'
            },
            {
                label: 'Prev',
                icon: 'fa-chevron-left'
            }
        ];
    }
}