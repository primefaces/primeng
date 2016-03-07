import {Component,OnInit} from 'angular2/core';
import {ROUTER_DIRECTIVES} from 'angular2/router';
import {HTTP_PROVIDERS}    from 'angular2/http';
import {DataGrid} from '../../../components/datagrid/datagrid';
import {Header} from '../../../components/common/header';
import {Footer} from '../../../components/common/footer';
import {Panel} from '../../../components/panel/panel';
import {Button} from '../../../components/button/button';
import {CodeHighlighter} from '../../../components/codehighlighter/codehighlighter';
import {TabView} from '../../../components/tabview/tabview';
import {TabPanel} from '../../../components/tabview/tabpanel';
import {Car} from '../domain/car';
import {CarService} from '../service/carservice';

@Component({
    templateUrl: 'showcase/demo/datagrid/datagriddemo.html',
    directives: [DataGrid,Header,Footer,Panel,Button,TabPanel,TabView,CodeHighlighter,ROUTER_DIRECTIVES],
    providers: [HTTP_PROVIDERS,CarService]
})
export class DataGridDemo implements OnInit {

    cars: Car[];

    constructor(private carService: CarService) { }

    ngOnInit() {
        this.carService.getCarsLarge().then(cars => this.cars = cars);
    }
}