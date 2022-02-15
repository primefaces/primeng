import {Component} from '@angular/core';
import {MenuItem} from 'primeng/api';

@Component({
    templateUrl: './tabmenudemo.html'
})
export class TabMenuDemo {
    
    items: MenuItem[];

    scrollableItems: MenuItem[];

    activeItem: MenuItem;

    activeItem2: MenuItem;

    ngOnInit() {
        this.items = [
            {label: 'Home', icon: 'pi pi-fw pi-home'},
            {label: 'Calendar', icon: 'pi pi-fw pi-calendar'},
            {label: 'Edit', icon: 'pi pi-fw pi-pencil'},
            {label: 'Documentation', icon: 'pi pi-fw pi-file'},
            {label: 'Settings', icon: 'pi pi-fw pi-cog'}
        ];

        this.scrollableItems = Array.from({ length: 50 }, (_, i) => ({label: `Tab ${i + 1}`}));

        this.activeItem = this.items[0];

        this.activeItem2 = this.scrollableItems[0];
    }
}