import {Component, ViewEncapsulation} from '@angular/core';

@Component({
    templateUrl: './inputtextdemo.html',
    styleUrls: ['./inputtextdemo.scss']
})
export class InputTextDemo {

    disabled = true;

    value1: string;

    value2: string;

    value3: string;

    value4: string;

    value5 = 'Disabled';
}
