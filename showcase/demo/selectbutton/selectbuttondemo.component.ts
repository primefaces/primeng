import {Component} from 'angular2/core';
import {SelectButton} from '../../../components/selectbutton/selectbutton';
import {TabView} from '../../../components/tabview/tabview';
import {TabPanel} from '../../../components/tabview/tabpanel';
import {Button} from '../../../components/button/button';
import {SelectItem} from '../../../components/api/selectitem';
import {ROUTER_DIRECTIVES} from 'angular2/router';

@Component({
    templateUrl: 'showcase/demo/selectbutton/selectbuttondemo.component.html',
    directives: [SelectButton, TabPanel, TabView, Button, ROUTER_DIRECTIVES]
})
export class SelectbuttonDemoComponent {

    types: SelectItem[];

    selectedType: string;

    selectedTypes: string[] = ['Apartment','Studio'];

    constructor() {
        this.types = [];
        this.types.push({label: 'Apartment', value: 'Apartment'});
        this.types.push({label: 'House', value: 'House'});
        this.types.push({label: 'Studio', value: 'Studio'});
    }
}