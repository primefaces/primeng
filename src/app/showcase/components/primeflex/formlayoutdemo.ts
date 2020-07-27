import {Component} from '@angular/core';

@Component({
    templateUrl: './formlayoutdemo.html',
    styleUrls: ['./formlayoutdemo.scss']
})
export class FormLayoutDemo {
    
    selectedState: any = null;

    states: any[] = [
        {name: 'Arizona', code: 'Arizona'},
        {name: 'California', value: 'California'},
        {name: 'Florida', code: 'Florida'},
        {name: 'Ohio', code: 'Ohio'},
        {name: 'Washington', code: 'Washington'}
    ];

    cities1: any[] = [];
    
    cities2: any[] = [];
    
    city1:any = null;

    city2:any = null;
    
}