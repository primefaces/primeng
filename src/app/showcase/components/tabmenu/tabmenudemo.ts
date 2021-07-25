import {Component} from '@angular/core';
import {MenuItem} from 'primeng/api';

@Component({
    templateUrl: './tabmenudemo.html'
})
export class TabMenuDemo {
    
    routedItems: MenuItem[];
    
    items: MenuItem[];
    
    activeItem: MenuItem;

    ngOnInit() {
        this.routedItems = [
            {label: 'Home', icon: 'pi pi-fw pi-home', routerLink: ['home']},
            {label: 'Calendar', icon: 'pi pi-fw pi-calendar', routerLink: ['calendar']},
            {label: 'Edit', icon: 'pi pi-fw pi-pencil', routerLink: ['edit']},
            {label: 'Documentation', icon: 'pi pi-fw pi-file', routerLink: ['documentation']},
            {label: 'Settings', icon: 'pi pi-fw pi-cog', routerLink: ['settings']}
        ];

        this.items = [
            {label: 'Home', icon: 'pi pi-fw pi-home'},
            {label: 'Calendar', icon: 'pi pi-fw pi-calendar'},
            {label: 'Edit', icon: 'pi pi-fw pi-pencil'},
            {label: 'Documentation', icon: 'pi pi-fw pi-file'},
            {label: 'Settings', icon: 'pi pi-fw pi-cog'}
        ];

        this.activeItem = this.items[0];
    }
}