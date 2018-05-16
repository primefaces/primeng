import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import {trigger,state,style,transition,animate} from '@angular/animations';

declare var $;

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

    searchText: string;
    allComponentCategories: any; 
    allComponents:any;

    @ViewChild('sidebarmenu') _sidebarmenu;

    constructor(private elemRef: ElementRef){

    }
    
    ngOnInit() {
      setTimeout(()=>this.notification = true , 1000)
    }

    ngAfterViewInit() {
        console.log(this._sidebarmenu);
        if($){
            this.allComponentCategories = $(this._sidebarmenu.nativeElement).find(">a");
            this.allComponents = $(this._sidebarmenu.nativeElement).find("div.submenuhide");
        }
        
    }
    
    changeTheme(event: Event, theme: string) {
        let themeLink: HTMLLinkElement = <HTMLLinkElement> document.getElementById('theme-css');
        themeLink.href = 'assets/components/themes/' + theme + '/theme.css';
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

    filterMenu() {
        if (this.searchText) {
            this.allComponentCategories.each((index, category)=>{
                let categorySpan = $(category).find('>span');
                if(categorySpan && categorySpan.text().toLowerCase().indexOf(this.searchText) !== -1){
                    //matches category, make all components visible for this category
                    $(this.allComponents[index]).find('>a').each((index, component)=>{
                        $(component).removeClass("hidden");
                    });
                    $(category).removeClass('hidden');
                }else {
                    //look into components
                    //if all components don't match, hide the category as well
                    let allHidden = this.filterComponents(index);
                    if(allHidden){
                        $(category).addClass('hidden');
                    }else {
                        $(category).removeClass('hidden');
                    }
                }
            })
        }else {
            this.allComponentCategories.each((index, category)=>{
                $(category).removeClass('hidden');
            });
            this.allComponents.each((index, category)=>{
                let subComponents = $(category).find('>a');
                subComponents.each((index, component)=>{
                    $(component).removeClass("hidden");
                })
            });
        }
      
      }

      filterComponents(index:number):boolean {
        let allComponentsHidden = false;

        let selectedCategory = this.allComponents[index];

        let subComponents = $(selectedCategory).find('>a');

        subComponents.each((index, component)=>{
            let componentName = $(component).text().substr(2, $(component).text().length);
            if(componentName.toLowerCase().indexOf(this.searchText) !== -1){
                //matches component, remove hidden calss if applied
                $(component).removeClass("hidden");
            }else {
                //doesn't match, hide the component
                $(component).addClass("hidden");
            }
        });

        
        if($(selectedCategory).find('.hidden').length === subComponents.length){
            allComponentsHidden = true;
        }

        return allComponentsHidden;

    }
}
