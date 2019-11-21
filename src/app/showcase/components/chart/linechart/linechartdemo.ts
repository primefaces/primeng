import {Component} from '@angular/core';
import {MessageService} from '../../../../components/common/messageservice';

@Component({
    templateUrl: './linechartdemo.html',
    providers: [MessageService]
})
export class LineChartDemo {

    data: any;

    constructor(private messageService: MessageService) {
        this.data = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [
                {
                    label: 'First Dataset',
                    data: [65, 59, 80, 81, 56, 55, 40],
                    fill: false,
                    borderColor: '#4bc0c0'
                },
                {
                    label: 'Second Dataset',
                    data: [28, 48, 40, 19, 86, 27, 90],
                    fill: false,
                    borderColor: '#565656'
                }
            ]
        }
    }

    selectData(event) {
        this.messageService.add({severity: 'info', summary: 'Data Selected', 'detail': this.data.datasets[event.element._datasetIndex].data[event.element._index]});
    }
}
