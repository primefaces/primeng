import {Component} from '@angular/core';

@Component({
    templateUrl: './checkboxdemo.html'
})
export class CheckboxDemo {

    selectedCities: string[] = [];

    selectedCategories: any[] = ['Technology', 'Sports'];
    
    categories: any[] = [{name: 'Accounting', key: 'A'}, {name: 'Marketing', key: 'M'}, {name: 'Production', key: 'P'}, {name: 'Research', key: 'R'}];

    checked: boolean = false;

    ngOnInit() {
        this.selectedCategories = this.categories.slice(1,3);
    }
}