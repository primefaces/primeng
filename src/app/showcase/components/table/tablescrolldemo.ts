import { Component, OnInit } from '@angular/core';
import { Car } from '../../components/domain/car';
import { CarService } from '../../service/carservice';
import { LazyLoadEvent } from 'primeng/api';

@Component({
    templateUrl: './tablescrolldemo.html',
    styles: [`
        .loading-text {
            display: block;
            background-color: #f1f1f1;
            min-height: 19px;
            animation: pulse 1s infinite ease-in-out;
            text-indent: -99999px;
            overflow: hidden;
        }
    `]
})
export class TableScrollDemo implements OnInit {

    cars1: Car[];

    cars2: Car[];

    cars3: Car[];
    
    cars4: Car[];

    cars5: Car[];

    virtualCars: Car[];

    totalRecords: number;

    cols: any[];

    frozenCars: Car[];

    frozenCols: any[];

    scrollableCols: any[];

    sales: any[];

    loading: boolean;

    inmemoryData: Car[];

    constructor(private carService: CarService) {}

    ngOnInit() {
        this.carService.getCarsMedium().then(cars => this.cars1 = cars);
        this.carService.getCarsSmall().then(cars => this.cars2 = cars);
        this.carService.getCarsMedium().then(cars => this.cars3 = cars);
        this.carService.getCarsMedium().then(cars => this.cars4 = cars);
        this.carService.getCarsMedium().then(cars => this.cars5 = cars);

        this.cols = [
            { field: 'vin', header: 'Vin' },
            { field: 'year', header: 'Year' },
            { field: 'brand', header: 'Brand' },
            { field: 'color', header: 'Color' }
        ];

        this.scrollableCols = [
            { field: 'year', header: 'Year' },
            { field: 'brand', header: 'Brand' },
            { field: 'color', header: 'Color' },
            { field: 'year', header: 'Year' },
            { field: 'brand', header: 'Brand' },
            { field: 'color', header: 'Color' }
        ];

        this.frozenCols = [
            { field: 'vin', header: 'Vin' }
        ];

        this.frozenCars = [
            { "brand": "BMW", "year": 2013, "color": "Grey", "vin": "fh2uf23" },
            { "brand": "Chevrolet", "year": 2011, "color": "Black", "vin": "4525g23" }
        ];

        this.sales = [
            { brand: 'Apple', lastYearSale: '51%', thisYearSale: '40%', lastYearProfit: '$54,406.00', thisYearProfit: '$43,342' },
            { brand: 'Samsung', lastYearSale: '83%', thisYearSale: '96%', lastYearProfit: '$423,132', thisYearProfit: '$312,122' },
            { brand: 'Microsoft', lastYearSale: '38%', thisYearSale: '5%', lastYearProfit: '$12,321', thisYearProfit: '$8,500' },
            { brand: 'Philips', lastYearSale: '49%', thisYearSale: '22%', lastYearProfit: '$745,232', thisYearProfit: '$650,323,' },
            { brand: 'Song', lastYearSale: '17%', thisYearSale: '79%', lastYearProfit: '$643,242', thisYearProfit: '500,332' },
            { brand: 'LG', lastYearSale: '52%', thisYearSale: ' 65%', lastYearProfit: '$421,132', thisYearProfit: '$150,005' },
            { brand: 'Sharp', lastYearSale: '82%', thisYearSale: '12%', lastYearProfit: '$131,211', thisYearProfit: '$100,214' },
            { brand: 'Panasonic', lastYearSale: '44%', thisYearSale: '45%', lastYearProfit: '$66,442', thisYearProfit: '$53,322' },
            { brand: 'HTC', lastYearSale: '90%', thisYearSale: '56%', lastYearProfit: '$765,442', thisYearProfit: '$296,232' },
            { brand: 'Toshiba', lastYearSale: '75%', thisYearSale: '54%', lastYearProfit: '$21,212', thisYearProfit: '$12,533' }
        ];

        this.totalRecords = 250000;
        this.loading = true;

        this.inmemoryData = [
            {"brand": "VW", "year": 2012, "color": "Orange"},
            {"brand": "Audi", "year": 2011, "color": "Black"},
            {"brand": "Renault", "year": 2005, "color": "Gray"},
            {"brand": "BMW", "year": 2003, "color": "Blue"},
            {"brand": "Mercedes", "year": 1995, "color": "Orange"},
            {"brand": "Volvo", "year": 2005, "color": "Black"},
            {"brand": "Honda", "year": 2012, "color": "Yellow"},
            {"brand": "Jaguar", "year": 2013, "color": "Orange"},
            {"brand": "Ford", "year": 2000, "color": "Black"},
            {"brand": "Fiat", "year": 2013, "color": "Red"},
            {"brand": "VW", "year": 2012, "color": "Orange"},
            {"brand": "Audi", "year": 2011, "color": "Black"},
            {"brand": "Renault", "year": 2005, "color": "Gray"},
            {"brand": "BMW", "year": 2003, "color": "Blue"},
            {"brand": "Mercedes", "year": 1995, "color": "Orange"},
            {"brand": "Volvo", "year": 2005, "color": "Black"},
            {"brand": "Honda", "year": 2012, "color": "Yellow"},
            {"brand": "Jaguar", "year": 2013, "color": "Orange"},
            {"brand": "Ford", "year": 2000, "color": "Black"},
            {"brand": "Fiat", "year": 2013, "color": "Red"},
            {"brand": "VW", "year": 2012, "color": "Orange"},
            {"brand": "Audi", "year": 2011, "color": "Black"},
            {"brand": "Renault", "year": 2005, "color": "Gray"},
            {"brand": "BMW", "year": 2003, "color": "Blue"},
            {"brand": "Mercedes", "year": 1995, "color": "Orange"},
            {"brand": "Volvo", "year": 2005, "color": "Black"},
            {"brand": "Honda", "year": 2012, "color": "Yellow"},
            {"brand": "Jaguar", "year": 2013, "color": "Orange"},
            {"brand": "Ford", "year": 2000, "color": "Black"},
            {"brand": "Fiat", "year": 2013, "color": "Red"},
            {"brand": "VW", "year": 2012, "color": "Orange"},
            {"brand": "Audi", "year": 2011, "color": "Black"},
            {"brand": "Renault", "year": 2005, "color": "Gray"},
            {"brand": "BMW", "year": 2003, "color": "Blue"},
            {"brand": "Mercedes", "year": 1995, "color": "Orange"},
            {"brand": "Volvo", "year": 2005, "color": "Black"},
            {"brand": "Honda", "year": 2012, "color": "Yellow"},
            {"brand": "Jaguar", "year": 2013, "color": "Orange"},
            {"brand": "Ford", "year": 2000, "color": "Black"},
            {"brand": "Fiat", "year": 2013, "color": "Red"}
        ];
    }

    loadDataOnScroll(event: LazyLoadEvent) {      
        this.loading = true;   

        //for demo purposes keep loading the same dataset 
        //in a real production application, this data should come from server by building the query with LazyLoadEvent options 
        setTimeout(() => {
            //last chunk
            if (event.first === 249980)
                this.virtualCars = this.loadChunk(event.first, 20);
            else
                this.virtualCars = this.loadChunk(event.first, event.rows);        
            
            this.loading = false;  
        }, 250);   
    }

    loadChunk(index, length): Car[] {
        let chunk: Car[] = [];
        for (let i = 0; i < length; i++) {
            chunk[i] = {...this.inmemoryData[i], ...{vin: (index + i)}};
        } 

        return chunk;
    }
}