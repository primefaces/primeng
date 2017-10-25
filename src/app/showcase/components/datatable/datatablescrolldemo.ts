import {Component,OnInit} from '@angular/core';
import {Car} from '../../components/domain/car';
import {CarService} from '../../service/carservice';
import {LazyLoadEvent} from '../../../components/common/api';
import {FilterMetadata} from '../../../components/common/api';

@Component({
    templateUrl: './datatablescrolldemo.html',
})
export class DataTableScrollDemo implements OnInit {

    cars: Car[];
    
    frozenCars: Car[];
    
    carsLarge: Car[];
    
    totalRecords: number;
    colsCount: number = 700;

    sales: any[];

    public testdata: any[];
    public testdataLazy: any[];
    public testfields: any[];

    constructor(private carService: CarService) {
      this.totalRecords = 250000;

      this.fillFields();
    }

    fillFields() {
      this.testfields = [];
      let tmp = [];
      for(let i = 0; i< this.colsCount; i++) {
        tmp.push({header: "Field " + i, field: "field" + i, width: 200});
      }
      this.testfields = tmp;
    }

    ngOnInit() {
        this.carService.getCarsMedium().then(cars => this.cars = cars);
        this.frozenCars = [
            {"brand": "BMW", "year": 2013, "color": "Grey", "vin": "fh2uf23"},
            {"brand": "Chevrolet", "year": 2011, "color": "Black", "vin": "4525g23"}
        ];
        
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
        
        this.totalRecords = 250000;
    }

    setColCount() {
      this.fillFields();
    }

    loadBig(event: LazyLoadEvent) {
      let tmpRows = [];
      for(let j = 0; j < event.rows; j++) {
        let row = {columnsList: []};
        for(let i = 0; i < this.colsCount; i++) {
          row["field" + i] = 'data' + (event.first + j) + '-' + i;
        }
        tmpRows.push(row);
      }
      this.testdataLazy = tmpRows;
    }

    loadCarsLazy(event: LazyLoadEvent) {
        //for demo purposes keep loading the same dataset 
        //in a real production application, this data should come from server by building the query with LazyLoadEvent options 
        setTimeout(() => {
            this.carsLarge = [
                {"brand": event.first + " - VW", "year": 2012, "color": "Orange", "vin": "dsad231ff"},
                {"brand": event.first + " - Audi", "year": 2011, "color": "Black", "vin": "gwregre345"},
                {"brand": event.first + " - Renault", "year": 2005, "color": "Gray", "vin": "h354htr"},
                {"brand": event.first + " - BMW", "year": 2003, "color": "Blue", "vin": "j6w54qgh"},
                {"brand": event.first + " - Mercedes", "year": 1995, "color": "Orange", "vin": "hrtwy34"},
                {"brand": event.first + " - Volvo", "year": 2005, "color": "Black", "vin": "jejtyj"},
                {"brand": event.first + " - Honda", "year": 2012, "color": "Yellow", "vin": "g43gr"},
                {"brand": event.first + " - Jaguar", "year": 2013, "color": "Orange", "vin": "greg34"},
                {"brand": event.first + " - Ford", "year": 2000, "color": "Black", "vin": "h54hw5"},
                {"brand": event.first + " - Fiat", "year": 2013, "color": "Red", "vin": "245t2s"},
                {"brand": event.first + " - VW", "year": 2012, "color": "Orange", "vin": "dsad231ff"},
                {"brand": event.first + " - Audi", "year": 2011, "color": "Black", "vin": "gwregre345"},
                {"brand": event.first + " - Renault", "year": 2005, "color": "Gray", "vin": "h354htr"},
                {"brand": event.first + " - BMW", "year": 2003, "color": "Blue", "vin": "j6w54qgh"},
                {"brand": event.first + " - Mercedes", "year": 1995, "color": "Orange", "vin": "hrtwy34"},
                {"brand": event.first + " - Volvo", "year": 2005, "color": "Black", "vin": "jejtyj"},
                {"brand": event.first + " - Honda", "year": 2012, "color": "Yellow", "vin": "g43gr"},
                {"brand": event.first + " - Jaguar", "year": 2013, "color": "Orange", "vin": "greg34"},
                {"brand": event.first + " - Ford", "year": 2000, "color": "Black", "vin": "h54hw5"},
                {"brand": event.first + " - Fiat", "year": 2013, "color": "Red", "vin": "245t2s"},
                {"brand": event.first + " - VW", "year": 2012, "color": "Orange", "vin": "dsad231ff"},
                {"brand": event.first + " - Audi", "year": 2011, "color": "Black", "vin": "gwregre345"},
                {"brand": event.first + " - Renault", "year": 2005, "color": "Gray", "vin": "h354htr"},
                {"brand": event.first + " - BMW", "year": 2003, "color": "Blue", "vin": "j6w54qgh"},
                {"brand": event.first + " - Mercedes", "year": 1995, "color": "Orange", "vin": "hrtwy34"},
                {"brand": event.first + " - Volvo", "year": 2005, "color": "Black", "vin": "jejtyj"},
                {"brand": event.first + " - Honda", "year": 2012, "color": "Yellow", "vin": "g43gr"},
                {"brand": event.first + " - Jaguar", "year": 2013, "color": "Orange", "vin": "greg34"},
                {"brand": event.first + " - Ford", "year": 2000, "color": "Black", "vin": "h54hw5"},
                {"brand": event.first + " - Fiat", "year": 2013, "color": "Red", "vin": "245t2s"},
                {"brand": event.first + " - VW", "year": 2012, "color": "Orange", "vin": "dsad231ff"},
                {"brand": event.first + " - Audi", "year": 2011, "color": "Black", "vin": "gwregre345"},
                {"brand": event.first + " - Renault", "year": 2005, "color": "Gray", "vin": "h354htr"},
                {"brand": event.first + " - BMW", "year": 2003, "color": "Blue", "vin": "j6w54qgh"},
                {"brand": event.first + " - Mercedes", "year": 1995, "color": "Orange", "vin": "hrtwy34"},
                {"brand": event.first + " - Volvo", "year": 2005, "color": "Black", "vin": "jejtyj"},
                {"brand": event.first + " - Honda", "year": 2012, "color": "Yellow", "vin": "g43gr"},
                {"brand": event.first + " - Jaguar", "year": 2013, "color": "Orange", "vin": "greg34"},
                {"brand": event.first + " - Ford", "year": 2000, "color": "Black", "vin": "h54hw5"},
                {"brand": event.first + " - Fiat", "year": 2013, "color": "Red", "vin": "245t2s"}
            ];
        }, 250);
            
    }
}