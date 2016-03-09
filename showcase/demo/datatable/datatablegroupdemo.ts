import {Component,OnInit} from 'angular2/core';
import {ROUTER_DIRECTIVES} from 'angular2/router';
import {DataTable} from '../../../components/datatable/datatable';
import {CodeHighlighter} from '../../../components/codehighlighter/codehighlighter';
import {TabView} from '../../../components/tabview/tabview';
import {TabPanel} from '../../../components/tabview/tabpanel';
import {Column} from '../../../components/column/column';
import {DataTableSubmenu} from './datatablesubmenu.component';

@Component({
    templateUrl: 'showcase/demo/datatable/datatablegroupdemo.html',
    directives: [DataTable,Column,DataTableSubmenu,TabPanel,TabView,CodeHighlighter,ROUTER_DIRECTIVES]
})
export class DataTableGroupDemo implements OnInit {

    headerRows: any[];
    
    footerRows: any[];

    ngOnInit() {
        this.headerRows = [
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
        
        this.footerRows = [
            {
                columns: [
                    {footer: 'Totals:', colspan: 3},
                    {footer: '$506,202'},
                    {footer: '$531,020'}
                ]
            }
        ];
    }
}
