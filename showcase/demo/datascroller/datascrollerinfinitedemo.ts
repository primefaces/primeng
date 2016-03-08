import {Component,OnInit} from 'angular2/core';
import {ROUTER_DIRECTIVES} from 'angular2/router';
import {HTTP_PROVIDERS}    from 'angular2/http';
import {DataScroller} from '../../../components/datascroller/datascroller';
import {Header} from '../../../components/common/header';
import {Footer} from '../../../components/common/footer';
import {Growl} from '../../../components/growl/growl';
import {Button} from '../../../components/button/button';
import {Dialog} from '../../../components/dialog/dialog';
import {CodeHighlighter} from '../../../components/codehighlighter/codehighlighter';
import {TabView} from '../../../components/tabview/tabview';
import {TabPanel} from '../../../components/tabview/tabpanel';
import {Car} from '../domain/car';
import {CarService} from '../service/carservice';
import {DataScrollerSubMenu} from './datascrollersubmenu';
import {Message} from '../../../components/api/message';

@Component({
    templateUrl: 'showcase/demo/datascroller/datascrollerinfinitedemo.html',
    directives: [DataScroller,Header,Footer,Dialog,Growl,DataScrollerSubMenu,Button,TabPanel,TabView,CodeHighlighter,ROUTER_DIRECTIVES],
    providers: [HTTP_PROVIDERS,CarService],
    styles: [`
        .ui-grid-row > div {
            padding: 4px 10px;
            font-size: 20px;
        }
        
        .ui-grid-row .ui-grid-row > div:last-child {
            font-weight: bold;
        }
    `]
})
export class DataScrollerInfiniteDemo {

    cars: Car[];
    
    msgs: Message[] = [];
    
    constructor(private carService: CarService) { }
    
    loadData(event) {
        //initialize
        if(!this.cars) {
            this.carService.getCarsSmall().then(cars => this.cars = cars);
        }
        //in real application, newArray should be loaded from a remote datasource
        else {
            let newArray = this.cars.slice(0);
            for(let i = 0; i < newArray.length; i++) {
                this.cars.push(newArray[i]);
            }
            this.msgs = [];
            this.msgs.push({severity:'info', summary:'Data Loaded', detail:'Between ' + event.first + ' and ' + (event.first + event.rows)});
        }        
    }
}