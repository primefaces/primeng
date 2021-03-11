import {Component, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {AppConfigService} from '../../../service/appconfigservice';
import {AppConfig} from '../../../domain/appconfig';

@Component({
    templateUrl: './combochartdemo.html'
})
export class ComboChartDemo {

    data: any;

    chartOptions: any;
    
    subscription: Subscription;

    config: AppConfig;

    constructor(private configService: AppConfigService) {}

    ngOnInit() {
        this.data = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [{
                type: 'line',
                label: 'Dataset 1',
                borderColor: '#42A5F5',
                borderWidth: 2,
                fill: false,
                data: [
                    50,
                    25,
                    12,
                    48,
                    56,
                    76,
                    42
                ]
            }, {
                type: 'bar',
                label: 'Dataset 2',
                backgroundColor: '#66BB6A',
                data: [
                    21,
                    84,
                    24,
                    75,
                    37,
                    65,
                    34
                ],
                borderColor: 'white',
                borderWidth: 2
            }, {
                type: 'bar',
                label: 'Dataset 3',
                backgroundColor: '#FFA726',
                data: [
                    41,
                    52,
                    24,
                    74,
                    23,
                    21,
                    32
                ]
            }]
        };
        this.chartOptions = {
            responsive: true,
            title: {
                display: true,
                text: 'Combo Bar Line Chart'
            },
            tooltips: {
                mode: 'index',
                intersect: true
            }
        };
        
        this.config = this.configService.config;
        this.updateChartOptions();
        this.subscription = this.configService.configUpdate$.subscribe(config => {
            this.config = config;
            this.updateChartOptions();
        });
    }

    updateChartOptions() {
        if (this.config.dark) 
            this.applyDarkTheme();
        else
            this.applyLightTheme();
    }

    applyLightTheme() {
            this.chartOptions = {
                legend: {
                    labels: {
                        fontColor: '#495057'
                    }
                },
                scales: {
                    xAxes: [{
                        ticks: {
                            fontColor: '#495057'
                        }
                    }],
                    yAxes: [{
                        ticks: {
                            fontColor: '#495057'
                        }
                    }]
                }
            }
    }

    applyDarkTheme() {
        this.chartOptions = {
            legend: {
                labels: {
                    fontColor: '#ebedef'
                }
            },
            scales: {
                xAxes: [{
                    ticks: {
                        fontColor: '#ebedef'
                    },
                    gridLines: {
                        color: 'rgba(255,255,255,0.2)'
                    }
                }],
                yAxes: [{
                    ticks: {
                        fontColor: '#ebedef'
                    },
                    gridLines: {
                        color: 'rgba(255,255,255,0.2)'
                    }
                }]
            }
        };
    }
}