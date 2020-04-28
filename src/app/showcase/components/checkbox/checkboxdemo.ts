import {Component} from '@angular/core';

@Component({
    templateUrl: './checkboxdemo.html'
})
export class CheckboxDemo {

    selectedCities: string[] = [];

    selectedCategories: string[] = ['Technology', 'Sports'];
    
    checked: boolean = false;
}