import {Component} from '@angular/core';

@Component({
    templateUrl: 'showcase/demo/terminal/terminaldemo.html'
})
export class TerminalDemo {
    
    response: string;

    onCommand(event) {
        if(event.command === 'date')
            this.response = new Date().toDateString();
        else
            this.response = 'Unknown command: ' + event.command;
    }
}