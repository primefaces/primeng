import {Component} from '@angular/core';
import {Car} from '../../components/domain/car';
import {CarService} from '../../service/carservice';
import {MessageService} from 'primeng/api';
import { AppComponent } from '../../app.component';

@Component({
    templateUrl: './deferdemo.html',
    providers: [MessageService],
    styles: [`
        :host ::ng-deep .ui-toast {
            top: 80px;
        }

        :host ::ng-deep .news-active .ui-toast {
            top: 150px;
        }

        @media screen and (max-width: 64em) {
            :host ::ng-deep .ui-toast {
                top: 110px;
            }

            :host ::ng-deep .news-active .ui-toast {
                top: 180px;
            }
        }
    `]
})
export class DeferDemo {

    cars: Car[];
    
    constructor(private carService: CarService, private messageService: MessageService, private app: AppComponent) { }
    
    initData() {
        this.messageService.add({severity:'success', summary:'Data Initialized', detail:'Render Completed'});
        this.carService.getCarsSmall().then(cars => this.cars = cars);
    }

    isNewsActive() {
        return this.app.newsActive;
    }
}
