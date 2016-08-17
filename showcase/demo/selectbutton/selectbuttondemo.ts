import {Component} from '@angular/core';
import {SelectItem} from '../../../components/common/api';

@Component({
    templateUrl: 'showcase/demo/selectbutton/selectbuttondemo.html'
})
export class SelectButtonDemo {

    types: SelectItem[];

    selectedType: string;

    selectedTypes: string[] = ['Apartment','Studio'];

    constructor() {
        this.types = [];
        this.types.push({label: 'Apartment', value: 'Apartment'});
        this.types.push({label: 'House', value: 'House'});
        this.types.push({label: 'Studio', value: 'Studio'});
    }

    clear() {
        this.selectedType = null;
        this.selectedTypes = [];
    }
}