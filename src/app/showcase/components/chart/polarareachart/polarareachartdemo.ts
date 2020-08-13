import {Component, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {AppConfigService} from '../../../service/appconfigservice';
import {AppConfig} from '../../../domain/appconfig';

@Component({
    templateUrl: './polarareachartdemo.html'
})
export class PolarAreaChartDemo {

    data: any;

    chartOptions: any;
    
    subscription: Subscription;

    config: AppConfig;

    constructor(private configService: AppConfigService) {}

    ngOnInit() {
        this.data = {
            datasets: [{
                data: [
                    11,
                    16,
                    7,
                    3,
                    14
                ],
                backgroundColor: [
                    "#FF6384",
                    "#4BC0C0",
                    "#FFCE56",
                    "#E7E9ED",
                    "#36A2EB"
                ],
                label: 'My dataset'
            }],
            labels: [
                "Red",
                "Green",
                "Yellow",
                "Grey",
                "Blue"
            ]
        }

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
            },
            scale: {
                gridLines: {
                    color: '#ebedef'
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
            },
            scale: {
                gridLines: {
                    color: 'rgba(255,255,255,0.2)'
                }
            }
        }
    }
}