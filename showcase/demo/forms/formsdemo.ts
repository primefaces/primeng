import {Component} from 'angular2/core';
import {InputText} from '../../../components/inputtext/inputtext';
import {Dropdown} from '../../../components/dropdown/dropdown';
import {Calendar} from '../../../components/calendar/calendar';
import {Rating} from '../../../components/rating/rating';
import {CodeHighlighter} from '../../../components/codehighlighter/codehighlighter';
import {Button} from '../../../components/button/button';
import {TabView} from '../../../components/tabview/tabview';
import {TabPanel} from '../../../components/tabview/tabpanel';
import {ROUTER_DIRECTIVES} from 'angular2/router';
import {SelectItem} from '../../../components/api/selectitem';
import {FORM_DIRECTIVES,ControlGroup,Control,FormBuilder} from 'angular2/common';

@Component({
    templateUrl: 'showcase/demo/forms/formsdemo.html',
    directives: [InputText,Calendar,Rating,Button,Dropdown,TabView,TabPanel,CodeHighlighter,ROUTER_DIRECTIVES,FORM_DIRECTIVES]
})
export class FormsDemo {
    
    myForm: ControlGroup;
    
    brands: SelectItem[] = [
        {label: 'Audi', value: 'Audi'},
        {label: 'BMW', value: 'BMW'},
        {label: 'Renault', value: 'Renault'},
        {label: 'Ford', value: 'Ford'},
        {label: 'Honda', value: 'Honda'},
        {label: 'Volvo', value: 'Volvo'},
        {label: 'VW', value: 'VW'}
    ];
        
    constructor(fb: FormBuilder) {
        this.myForm = fb.group({
            'vin': [''],
            'rtng': [null]
        });
    }
    
    onSubmit(form) {
        console.log(form);
    }
}