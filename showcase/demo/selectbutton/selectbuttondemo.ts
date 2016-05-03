import {Component} from '@angular/core';
import {SelectButton} from '../../../components/selectbutton/selectbutton';
import {CodeHighlighter} from '../../../components/codehighlighter/codehighlighter';
import {TabView} from '../../../components/tabview/tabview';
import {TabPanel} from '../../../components/tabview/tabpanel';
import {Button} from '../../../components/button/button';
import {SelectItem} from '../../../components/api/selectitem';
import {ROUTER_DIRECTIVES} from '@angular/router-deprecated';

@Component({
    templateUrl: 'showcase/demo/selectbutton/selectbuttondemo.html',
    directives: [SelectButton, TabPanel, TabView, Button,CodeHighlighter, ROUTER_DIRECTIVES]
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