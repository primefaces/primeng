import {Component,OnInit} from 'angular2/core';
import {CodeHighlighter} from '../../../components/codehighlighter/codehighlighter';
import {TabView} from '../../../components/tabview/tabview';
import {TabPanel} from '../../../components/tabview/tabpanel';
import {ROUTER_DIRECTIVES} from 'angular2/router';
import {InputText} from '../../../components/inputtext/inputtext';
import {InputTextarea} from '../../../components/inputtextarea/inputtextarea';
import {Button} from '../../../components/button/button';
import {Dropdown} from '../../../components/dropdown/dropdown';
import {SelectItem} from '../../../components/api/selectitem';
import {Listbox} from '../../../components/listbox/listbox';
import {Dialog} from '../../../components/dialog/dialog';
import {Panel} from '../../../components/panel/panel';
import {DataTable} from '../../../components/datatable/datatable';
import {DataGrid} from '../../../components/datagrid/datagrid';
import {Header} from '../../../components/common/header';
import {Column} from '../../../components/column/column';
import {Car} from '../domain/car';
import {CarService} from '../service/carservice';
import {HTTP_PROVIDERS}    from 'angular2/http';

@Component({
    templateUrl: 'showcase/demo/responsive/responsivedemo.html',
    directives: [Header,DataGrid,TabPanel,TabView,CodeHighlighter,ROUTER_DIRECTIVES,InputText,InputTextarea,Button,Dropdown,Listbox,Dialog,Panel,DataTable,Column],
    providers: [HTTP_PROVIDERS,CarService]
})
export class ResponsiveDemo implements OnInit {

    cities: SelectItem[];

    selectedCity: string;

    options: SelectItem[];

    selectedOption: string;

    display: boolean = false;

    cars: Car[];

    showDialog() {
        this.display = true;
    }

    constructor(private carService: CarService) {
        this.cities = [];
        this.cities.push({label:'Select Cities', value:'Select Cities'});
        this.cities.push({label:'New York', value:'New York'});
        this.cities.push({label:'Rome', value:'Rome'});
        this.cities.push({label:'London', value:'London'});
        this.cities.push({label:'Istanbul', value:'Istanbul'});
        this.cities.push({label:'Paris', value:'Paris'});

        this.options = [];
        this.options.push({label:'Option 1', value:'Option 1'});
        this.options.push({label:'Option 2', value:'Option 2'});
        this.options.push({label:'Option 3', value:'Option 3'});
        this.options.push({label:'Option 4', value:'Option 4'});
        this.options.push({label:'Option 5', value:'Option 5'});
    }

    ngOnInit() {
        this.carService.getCarsMedium().then(cars => this.cars = cars);
    }
}
