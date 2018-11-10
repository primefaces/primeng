import { Component, OnInit } from '@angular/core';
import {trigger,state,style,transition,animate} from '@angular/animations';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
      trigger('overlayState', [
          state('hidden', style({
              opacity: 0
          })),
          state('visible', style({
              opacity: 1
          })),
          transition('visible => hidden', animate('400ms ease-in')),
          transition('hidden => visible', animate('400ms ease-out'))
      ]),

      trigger('notificationTopbar', [
        state('hidden', style({
          height: '0',
          opacity: 0
        })),
        state('visible', style({
          height: '*',
          opacity: 1
        })),
        transition('visible => hidden', animate('400ms ease-in')),
        transition('hidden => visible', animate('400ms ease-out'))
      ])
  ],
})
export class AppComponent implements OnInit{

    menuActive: boolean;

    activeMenuId: string;

    notification: boolean = false;

    darkDemoStyle: HTMLStyleElement;

    routes: Array<string> = [];

    filteredRoutes: Array<string> = [];

    searchText:string;

    constructor(private router:Router){}

    getRoutes() {
        let routes = this.router.config;
        for (let route of routes) {
            if (route.path && route.path !== "datatable" && route.path !== "datagrid" && route.path !== "datalist" && route.path !== "growl")
                this.routes.push(route.path.charAt(0).toUpperCase() + route.path.substr(1));
        }
    }

    selectRoute(routeName) {
        this.router.navigate(['/'+routeName.toLowerCase()]);
        this.filteredRoutes = [];
        this.searchText = "";
    }

    filterRoutes(event) {
        let query = event.query;
        this.filteredRoutes = this.routes.filter(route => {
            return route.toLowerCase().includes(query.toLowerCase());
        });
    }

    ngOnInit() {
        setTimeout(()=>this.notification = true , 1000);
        this.getRoutes();
    }

    changeTheme(event: Event, theme: string, dark: boolean) {
        let themeLink: HTMLLinkElement = <HTMLLinkElement> document.getElementById('theme-css');
        themeLink.href = 'assets/components/themes/' + theme + '/theme.css';

        if (dark) {
            if (!this.darkDemoStyle) {
                this.darkDemoStyle = document.createElement('style');
                this.darkDemoStyle.type = 'text/css';
                this.darkDemoStyle.innerHTML = '.implementation { background-color: #3f3f3f; color: #dedede} .implementation > h3, .implementation > h4{ color: #dedede}';
                document.body.appendChild(this.darkDemoStyle);
            }
        }
        else if(this.darkDemoStyle) {
            document.body.removeChild(this.darkDemoStyle);
            this.darkDemoStyle = null;
        }
        
        event.preventDefault();
    }

    onMenuButtonClick(event: Event) {
        this.menuActive = !this.menuActive;
        event.preventDefault();
    }

    closeNotification(event) {
      this.notification = false;
      event.preventDefault();
    }
}
