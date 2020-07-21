import {Component} from '@angular/core';
import {SelectItem} from 'primeng/api';

@Component({
    templateUrl: './selectbuttondemo.html'
})
export class SelectButtonDemo {

    options: SelectItem[];

    paymentOptions: any[];

    justifyOptions: any[];

    value1: string = "off";

    value2: string;

    value3: any;

    constructor() {
        this.options = [{label: 'Off', value: 'off'}, {label: 'On', value: 'on'}];

        this.paymentOptions = [
            {name: 'Option 1', value: 1},
            {name: 'Option 2', value: 2},
            {name: 'Option 3', value: 3}
        ];

        this.justifyOptions = [
            {icon: 'pi pi-align-left', value: 'left'},
            {icon: 'pi pi-align-right', value: 'Right'},
            {icon: 'pi pi-align-center', value: 'Center'},
            {icon: 'pi pi-align-justify', value: 'Justify'}
        ];
    }
}