import {Component} from '@angular/core';
import {MenuItem} from '../../../components/common/api';

@Component({
    templateUrl: 'showcase/demo/menu/menudemo.html'
})
export class MenuDemo {
    
    private items: MenuItem[];

    ngOnInit() {
        this.items = [{
            label: 'File',
            items: [
                {label: 'New', icon: 'fa-plus'},
                {label: 'Open', icon: 'fa-download'}
            ]
        },
        {
            label: 'Edit',
            items: [
                {label: 'Undo', icon: 'fa-refresh'},
                {label: 'Redo', icon: 'fa-repeat'}
            ]
        }];
    }
}