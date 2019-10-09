import {Component} from '@angular/core';

@Component({
    templateUrl: './buttondemo.html',
    styles: [`
        :host ::ng-deep button {
            margin-right: .5em;
        }
    `]
})
export class ButtonDemo {

    clicks: number = 0;

    count() {
        this.clicks++;
    }

    items: any = [
		{
			text: "Header 1",
			color: "red"
		},
		{
			text: "Header 2",
			color: "blue"
		},
		{
			text: "Header 3",
			color: "yellow"
		},
		{
			text: "Header 4",
			color: "green"
		},
		{
			text: "Header 5",
			color: "red"
		},
		{
			text: "Header 6",
			color: "blue"
		},
		{
			text: "Header 7",
			color: "yellow"
		},
		{
			text: "Header 8",
			color: "green"
		},
		{
			text: "Header 9",
			color: "yellow"
		},
		{
			text: "Header 0",
			color: "green"
		},
	]
}