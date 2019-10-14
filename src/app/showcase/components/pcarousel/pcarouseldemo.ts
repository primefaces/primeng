import {Component} from '@angular/core';

@Component({
    templateUrl: './pcarouseldemo.html',
    styles: [`
        :host ::ng-deep button {
            margin-right: .5em;
        }
    `]
})
export class PCarouselDemo {

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

	responsive = [
		{
			breakpoint: '1024px',
			numVisible: 3,
			numScroll: 3
		},
		{
			breakpoint: '600px',
			numVisible: 2,
			numScroll: 2
		},
		{
			breakpoint: '480px',
			numVisible: 1,
			numScroll: 1
		}
	];
}