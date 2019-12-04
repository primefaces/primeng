import {Component} from '@angular/core';

@Component({
    templateUrl: './editordemo.html'
})
export class EditorDemo {

    text1: string = '<div>Hello World!</div><div>PrimeNG <b>Editor</b> Rocks</div><div><br></div>';
    
    text2: string;
}