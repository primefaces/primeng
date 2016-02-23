import {Component,OnInit} from 'angular2/core';
import {DataTable} from '../../../components/datatable/datatable';
import {TabView} from '../../../components/tabview/tabview';
import {TabPanel} from '../../../components/tabview/tabpanel';
import {ROUTER_DIRECTIVES} from 'angular2/router';
import {Car} from '../domain/car';
import {Column} from '../../../components/api/column';
import {DataTableSubmenu} from './datatablesubmenu.component';
import {CarService} from '../service/carservice';

@Component({
    templateUrl: 'showcase/demo/datatable/datatablegroupdemo.html',
    directives: [DataTable,DataTableSubmenu,TabPanel,TabView,ROUTER_DIRECTIVES],
    providers: [CarService]
})
export class DataTableGroupDemo implements OnInit {

    sales: any[];

    cols: Column[];

    headerCols: any[];

    constructor(private carService: CarService) { }

    ngOnInit() {
        this.sales = [
            {brand: 'Apple', lastYearSale: '51%', thisYearSale: '40%', lastYearProfit: '$54,406.00', thisYearProfit: '$43,342'},
            {brand: 'Samsung', lastYearSale: '83%', thisYearSale: '96%', lastYearProfit: '$423,132', thisYearProfit: '$312,122'},
            {brand: 'Microsoft', lastYearSale: '38%', thisYearSale: '5%', lastYearProfit: '$12,321', thisYearProfit: '$8,500'},
            {brand: 'Philips', lastYearSale: '49%', thisYearSale: '22%', lastYearProfit: '$745,232', thisYearProfit: '$650,323,'},
            {brand: 'Song', lastYearSale: '17%', thisYearSale: '79%', lastYearProfit: '$643,242', thisYearProfit: '500,332'},
            {brand: 'LG', lastYearSale: '52%', thisYearSale: ' 65%', lastYearProfit: '$421,132', thisYearProfit: '$150,005'},
            {brand: 'Sharp', lastYearSale: '82%', thisYearSale: '12%', lastYearProfit: '$131,211', thisYearProfit: '$100,214'},
            {brand: 'Panasonic', lastYearSale: '44%', thisYearSale: '45%', lastYearProfit: '$66,442', thisYearProfit: '$53,322'},
            {brand: 'HTC', lastYearSale: '90%', thisYearSale: '56%', lastYearProfit: '$765,442', thisYearProfit: '$296,232'},
            {brand: 'Toshiba', lastYearSale: '75%', thisYearSale: '54%', lastYearProfit: '$21,212', thisYearProfit: '$12,533'}
        ];

        this.cols = [
            {field: 'brand'},
            {field: 'lastYearSale'},
            {field: 'thisYearSale'},
            {field: 'lastYearProfit'},
            {field: 'thisYearProfit'}
        ];

        this.headerCols = [
            {
                columns: [
                    {header: 'Brand', rowspan: 3},
                    {header: 'Sale Rate', colspan: 4}
                ]
            },
            {
                columns: [
                    {header: 'Brand', colspan: 2},
                    {header: 'Sale Rate', colspan: 2}
                ]
            },
            {
                columns: [
                    {header: 'Last Year'},
                    {header: 'This Year'},
                    {header: 'Last Year'},
                    {header: 'This Year'}
                ]
            }
        ];
    }
}
