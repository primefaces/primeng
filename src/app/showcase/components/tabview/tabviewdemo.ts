import {Component} from '@angular/core';;

@Component({
    templateUrl: './tabviewdemo.html',
    styleUrls: ['./tabviewdemo.scss']
})
export class TabViewDemo {
    activeIndex1: number = 0;

    activeIndex2: number = 0;

    scrollableTabs: any[] = Array.from({ length: 50 }, (_, i) => ({ title: `Tab ${i + 1}`, content: `Tab ${i + 1} Content` }));
}
