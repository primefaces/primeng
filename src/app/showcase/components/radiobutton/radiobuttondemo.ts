import {Component} from '@angular/core';

@Component({
    templateUrl: './radiobuttondemo.html'
})
export class RadioButtonDemo {

    city: string;

    selectedCategory: any = null;

    categories: any[] = [{name: 'Accounting', key: 'A'}, {name: 'Marketing', key: 'M'}, {name: 'Production', key: 'P'}, {name: 'Research', key: 'R'}];

    ngOnInit() {
        this.selectedCategory = this.categories[1];
    }
}