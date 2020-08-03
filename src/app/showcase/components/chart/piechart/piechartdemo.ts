import {Component, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {AppConfigService} from '../../../service/appconfigservice';
import {AppConfig} from '../../../domain/appconfig';

@Component({
    templateUrl: './piechartdemo.html'
})
export class PieChartDemo implements OnInit {

    data: any;

    chartOptions: any;
    
    subscription: Subscription;

    config: AppConfig;

    constructor(private configService: AppConfigService) {}
    
    ngOnInit() {
        this.data = {
            labels: ['A','B','C'],
            datasets: [
                {
                    data: [300, 50, 100],
                    backgroundColor: [
                        "#FF6384",
                        "#36A2EB",
                        "#FFCE56"
                    ],
                    hoverBackgroundColor: [
                        "#FF6384",
                        "#36A2EB",
                        "#FFCE56"
                    ]
                }
            ]    
        };

        this.config = this.configService.config;
        this.updateChartOptions();
        this.subscription = this.configService.configUpdate$.subscribe(config => {
            this.config = config;
            this.updateChartOptions();
        });
    }

    updateChartOptions() {
        this.chartOptions = this.config && this.config.dark ? this.getDarkTheme() : this.getLightTheme();
    }

    getLightTheme() {
        return {
            legend: {
                labels: {
                    fontColor: '#495057'
                }
            }
        }
    }

    getDarkTheme() {
        return {
            legend: {
                labels: {
                    fontColor: '#ebedef'
                }
            }
        }
    }
}