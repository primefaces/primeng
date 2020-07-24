import {Component,OnInit} from '@angular/core';
import {MenuItem} from 'primeng/api';

@Component({
    templateUrl: './toolbardemo.html'
})
export class ToolbarDemo implements OnInit {

    items: MenuItem[];
    
    ngOnInit() {
        this.items = [
            {
                label: 'Update',
                icon: 'pi pi-refresh'
            },
            {
                label: 'Delete',
                icon: 'pi pi-times'
            },
            {
                label: 'Angular Website',
                icon: 'pi pi-external-link',
                url: 'http://angular.io'
            },
            {
                label: 'Router',
                icon: 'pi pi-upload',
                routerLink: '/fileupload'
            }
        ];
    }
}
