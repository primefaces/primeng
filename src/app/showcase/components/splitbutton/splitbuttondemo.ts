import {Component,OnInit} from '@angular/core';
import {Message} from '../../../components/common/api';
import {MenuItem} from '../../../components/common/api';
import {Observable} from "rxjs/Observable";
import "rxjs/add/observable/of";
import "rxjs/add/observable/interval";
import "rxjs/add/operator/take";
import "rxjs/add/operator/timestamp";
import "rxjs/add/operator/do";
import "rxjs/add/operator/map";

@Component({
  templateUrl: './splitbuttondemo.html'
})
export class SplitButtonDemo implements OnInit {

  msgs: Message[] = [];

  items: MenuItem[];

  ngOnInit() {
    this.items = [
      {label: 'Update', icon: 'fa-refresh', command: () => {
          this.update();
        }},
      {label: 'Delete', icon: 'fa-close', command: () => {
          this.delete();
        }},
      {label: 'Angular.io', icon: 'fa-link', url: 'http://angular.io'},
      {label: 'Theming', icon: 'fa-paint-brush', routerLink: ['/theming']},
      {label: 'Visible', icon: 'fa-paint-brush', visible: true},
      {label: 'InVisible', icon: 'fa-paint-brush', visible: false},
      {label: 'AsyncVisible', icon: 'fa-paint-brush', asyncVisible: this.asyncVisible()}
    ];
  }


  asyncVisible(): Observable<boolean> {
    return Observable.interval(9000).map( res =>  true);
  }

  save() {
    this.msgs = [];
    this.msgs.push({severity:'info', summary:'Success', detail:'Data Saved'});
  }

  update() {
    this.msgs = [];
    this.msgs.push({severity:'info', summary:'Success', detail:'Data Updated'});
  }

  delete() {
    this.msgs = [];
    this.msgs.push({severity:'info', summary:'Success', detail:'Data Deleted'});
  }
}
