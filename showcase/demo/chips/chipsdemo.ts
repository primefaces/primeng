import {Component} from '@angular/core';

@Component({
    templateUrl: 'showcase/demo/chips/chipsdemo.html'
})
export class ChipsDemo {

    values1: string[];    
    values2: string[];
    values3: string[];
    values4: string[];
    values5: string[];
    values6: string[];

    validationPatter: RegExp = /\w*/;
}