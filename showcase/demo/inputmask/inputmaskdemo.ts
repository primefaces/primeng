import {Component} from '@angular/core';
import {InputMask} from '../../../components/inputmask/inputmask';
import {InputText} from '../../../components/inputtext/inputtext';
import {CodeHighlighter} from '../../../components/codehighlighter/codehighlighter';
import {Button} from '../../../components/button/button';
import {TabView} from '../../../components/tabview/tabview';
import {TabPanel} from '../../../components/tabview/tabpanel';
import {ROUTER_DIRECTIVES} from '@angular/router';

@Component({
    templateUrl: 'showcase/demo/inputmask/inputmaskdemo.html',
    directives: [InputMask,InputText,Button,TabView,TabPanel,CodeHighlighter,ROUTER_DIRECTIVES]
})
export class InputMaskDemo {

    val1: string = '23-315121';

    val2: string;

    val3: string;

    val4: string;

    val5: string;
    
    val6: string;
}