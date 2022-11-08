import { Component } from '@angular/core';
import { ChipsSeparator } from 'primeng/api';

@Component({
    templateUrl: './chipsdemo.html'
})
export class ChipsDemo {
    values1: string[];

    values2: string[];

    chipSeparator: ChipsSeparator = { text: ',', keyboardCode: 188 };

    values3: string[];
}
