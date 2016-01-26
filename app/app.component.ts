import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';
import * as DEMOS from './componentdemos';

@Component({
    selector: 'my-app',
    templateUrl: 'app/app.component.html',
    directives: [ROUTER_DIRECTIVES]
})
@RouteConfig([
    { path: '/', name: 'HomePage', component: DEMOS.HomePageComponent},
    {path: '/theming', name: 'Theming', component: DEMOS.ThemingComponent},
    {path: '/inputtext', name: 'InputTextDemo', component: DEMOS.InputTextDemoComponent},
    {path: '/button', name: 'ButtonDemo', component: DEMOS.ButtonDemoComponent},
    {path: '/spinner', name: 'SpinnerDemo', component: DEMOS.SpinnerDemoComponent},
    {path: '/panel', name: 'PanelDemo', component: DEMOS.PanelDemoComponent},
    {path: '/fieldset', name: 'FieldsetDemo', component: DEMOS.FieldsetDemoComponent},
    {path: '/rating', name: 'RatingDemo', component: DEMOS.RatingDemoComponent},
    {path: '/password', name: 'PasswordDemo', component: DEMOS.PasswordDemoComponent},
    {path: '/dialog', name: 'DialogDemo', component: DEMOS.DialogDemoComponent},
    {path: '/togglebutton', name: 'ToggleButtonDemo', component: DEMOS.ToggleButtonDemoComponent},
    {path: '/grid', name: 'GridDemo', component: DEMOS.GridDemoComponent},
    {path: '/tabview', name: 'TabViewDemo', component: DEMOS.TabViewDemoComponent},
    {path: '/radiobutton', name: 'RadioButtonDemo', component: DEMOS.RadioButtonDemoComponent},
    {path: '/accordion', name: 'AccordionDemo', component: DEMOS.AccordionDemoComponent},
    {path: '/inputtextarea', name: 'InputTextareaDemo', component: DEMOS.InputTextareaDemoComponent},
    {path: '/galleria', name: 'GalleriaDemo', component: DEMOS.GalleriaDemoComponent},
    {path: '/checkbox', name: 'CheckboxDemo', component: DEMOS.CheckboxDemoComponent}
])
export class AppComponent {

    activeMenuId: string;

    themesVisible: boolean = false;
}