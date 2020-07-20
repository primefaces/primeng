import { Component, Input } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { trigger, state, style, transition, animate } from '@angular/animations';

declare let gtag: Function;

@Component({
    selector: 'app-menu',
    template: `
        <div class="layout-sidebar" [ngClass]="{'active': active}">
            <div class="layout-menu">
                <div class="menu-category">General</div>
                <div class="menu-items">
                    <a [routerLink]="['/setup']" routerLinkActive="router-link-active">Get Started</a>
                    <a href="https://forum.primefaces.org/viewforum.php?f=35" target="_blank">Community Forum</a>
                    <a href="https://github.com/primefaces/primevue" target="_blank">Source Code</a>
                    <a [routerLink]="['/support']" routerLinkActive="router-link-active">Support</a>
                </div>

                <div class="menu-category">Theming</div>
                <div class="menu-items">
                    <a href="https://www.primefaces.org/designer/primeng">Theme Designer</a>
                    <a href="https://www.primefaces.org/designer-ng">Visual Editor</a>
                    <a href="https://www.primefaces.org/designer/api/primeng/10.0.0">SASS API</a>
                </div>

                <div class="menu-category">PrimeFlex</div>
                <div class="menu-items">
                    <a [routerLink]="['/display']" routerLinkActive="router-link-active">Display</a>
                    <a [routerLink]="['/elevation']" routerLinkActive="router-link-active">Elevation</a>
                    <a [routerLink]="['/flexbox']" routerLinkActive="router-link-active">FlexBox</a>
                    <a [routerLink]="['/formlayout']" routerLinkActive="router-link-active">FormLayout</a>
                    <a [routerLink]="['/grid']" routerLinkActive="router-link-active">Grid System</a>
                    <a [routerLink]="['/spacing']" routerLinkActive="router-link-active">Spacing</a>
                    <a [routerLink]="['/text']" routerLinkActive="router-link-active">Text</a>
                </div>

                <div class="menu-category">PrimeIcons</div>
                <div class="menu-items">
                    <a [routerLink]="['/icons']" routerLinkActive="router-link-active">Icons v4.0</a>
                </div>

                <div class="menu-category">Form</div>
                <div class="menu-items">
                    <a [routerLink]="['/autocomplete']" routerLinkActive="router-link-active">AutoComplete</a>
                    <a [routerLink]="['/calendar']" routerLinkActive="router-link-active">Calendar</a>
                    <a [routerLink]="['/checkbox']" routerLinkActive="router-link-active">Checkbox</a>
                    <a [routerLink]="['/chips']" routerLinkActive="router-link-active">Chips</a>
                    <a [routerLink]="['/colorpicker']" routerLinkActive="router-link-active">ColorPicker</a>
                    <a [routerLink]="['/dropdown']" routerLinkActive="router-link-active">Dropdown</a>
                    <a [routerLink]="['/editor']" routerLinkActive="router-link-active">Editor</a>
                    <a [routerLink]="['/inputgroup']" routerLinkActive="router-link-active">InputGroup</a>
                    <a [routerLink]="['/inputmask']" routerLinkActive="router-link-active">InputMask</a>
                    <a [routerLink]="['/inputswitch']" routerLinkActive="router-link-active">InputSwitch</a>
                    <a [routerLink]="['/inputtext']" routerLinkActive="router-link-active">InputText</a>
                    <a [routerLink]="['/inputtextarea']" routerLinkActive="router-link-active">InputTextArea</a>
                    <a [routerLink]="['/inputnumber']" routerLinkActive="router-link-active">InputNumber</a>
                    <a [routerLink]="['/keyfilter']" routerLinkActive="router-link-active">KeyFilter</a>
                    <a [routerLink]="['/listbox']" routerLinkActive="router-link-active">Listbox</a>
                    <a [routerLink]="['/multiselect']" routerLinkActive="router-link-active">MultiSelect</a>
                    <a [routerLink]="['/password']" routerLinkActive="router-link-active">Password</a>
                    <a [routerLink]="['/radiobutton']" routerLinkActive="router-link-active">RadioButton</a>
                    <a [routerLink]="['/rating']" routerLinkActive="router-link-active">Rating</a>
                    <a [routerLink]="['/slider']" routerLinkActive="router-link-active">Slider</a>
                    <a [routerLink]="['/selectbutton']" routerLinkActive="router-link-active">SelectButton</a>
                    <a [routerLink]="['/togglebutton']" routerLinkActive="router-link-active">ToggleButton</a>
                    <a [routerLink]="['/tristatecheckbox']" routerLinkActive="router-link-active">TriCheckbox</a>
                </div>

                <div class="menu-category">Button</div>
                <div class="menu-items">
                    <a [routerLink]="['/button']" routerLinkActive="router-link-active">Button</a>
                    <a [routerLink]="['/splitbutton']" routerLinkActive="router-link-active">SplitButton</a>
                </div>

                <div class="menu-category">Data</div>
                <div class="menu-items">
                    <a [routerLink]="['/dataview']" routerLinkActive="router-link-active">DataView</a>
                    <a [routerLink]="['/fullcalendar']" routerLinkActive="router-link-active">FullCalendar</a>
                    <a [routerLink]="['/gmap']" routerLinkActive="router-link-active">GMap</a>
                    <a [routerLink]="['/orderlist']" routerLinkActive="router-link-active">OrderList</a>
                    <a [routerLink]="['/organizationchart']" routerLinkActive="router-link-active">Org Chart</a>
                    <a [routerLink]="['/paginator']" routerLinkActive="router-link-active">Paginator</a>
                    <a [routerLink]="['/picklist']" routerLinkActive="router-link-active">PickList</a>
                    <div>
                        <a tabindex="0" (click)="toggleSubmenu($event, '/table')">Table</a>
                        <div [@submenu]="isSubmenuActive('/table') ? 'visible': 'hidden'">
                            <ul>
                                <li><a [routerLink]="['/table']" routerLinkActive="router-link-active"[routerLinkActiveOptions]="{exact:true}">Documentation</a></li>
                                <li><a [routerLink]="['/table/basic']" routerLinkActive="router-link-active"[routerLinkActiveOptions]="{exact:true}">Basic</a></li>
                                <li><a [routerLink]="['/table/dynamic']" routerLinkActive="router-link-active"[routerLinkActiveOptions]="{exact:true}">Dynamic</a></li>
                                <li><a [routerLink]="['/table/sections']" routerLinkActive="router-link-active"[routerLinkActiveOptions]="{exact:true}">Sections</a></li>
                                <li><a [routerLink]="['/table/page']" routerLinkActive="router-link-active"[routerLinkActiveOptions]="{exact:true}">Page</a></li>
                                <li><a [routerLink]="['/table/sort']" routerLinkActive="router-link-active"[routerLinkActiveOptions]="{exact:true}">Sort</a></li>
                                <li><a [routerLink]="['/table/selection']" routerLinkActive="router-link-active"[routerLinkActiveOptions]="{exact:true}">Selection</a></li>
                                <li><a [routerLink]="['/table/filter']" routerLinkActive="router-link-active"[routerLinkActiveOptions]="{exact:true}">Filter</a></li>
                                <li><a [routerLink]="['/table/colgroup']" routerLinkActive="router-link-active"[routerLinkActiveOptions]="{exact:true}">ColGroup</a></li>
                                <li><a [routerLink]="['/table/lazy']" routerLinkActive="router-link-active"[routerLinkActiveOptions]="{exact:true}">Lazy</a></li>
                                <li><a [routerLink]="['/table/edit']" routerLinkActive="router-link-active"[routerLinkActiveOptions]="{exact:true}">Edit</a></li>
                                <li><a [routerLink]="['/table/scroll']" routerLinkActive="router-link-active"[routerLinkActiveOptions]="{exact:true}">Scroll</a></li>
                                <li><a [routerLink]="['/table/virtualscroll']" routerLinkActive="router-link-active"[routerLinkActiveOptions]="{exact:true}">VirtualScroll</a></li>
                                <li><a [routerLink]="['/table/flexscroll']" target="_blank" routerLinkActive="router-link-active"[routerLinkActiveOptions]="{exact:true}">FlexScroll</a></li>
                                <li><a [routerLink]="['/table/rowexpansion']" routerLinkActive="router-link-active"[routerLinkActiveOptions]="{exact:true}">RowExpand</a></li>
                                <li><a [routerLink]="['/table/rowgroup']" routerLinkActive="router-link-active"[routerLinkActiveOptions]="{exact:true}">RowGroup</a></li>
                                <li><a [routerLink]="['/table/colresize']" routerLinkActive="router-link-active"[routerLinkActiveOptions]="{exact:true}">Resize</a></li>
                                <li><a [routerLink]="['/table/reorder']" routerLinkActive="router-link-active"[routerLinkActiveOptions]="{exact:true}">Reorder</a></li>
                                <li><a [routerLink]="['/table/coltoggle']" routerLinkActive="router-link-active"[routerLinkActiveOptions]="{exact:true}">Toggle</a></li>
                                <li><a [routerLink]="['/table/style']" routerLinkActive="router-link-active"[routerLinkActiveOptions]="{exact:true}">Style</a></li>
                                <li><a [routerLink]="['/table/export']" routerLinkActive="router-link-active"[routerLinkActiveOptions]="{exact:true}">Export</a></li>
                                <li><a [routerLink]="['/table/contextmenu']" routerLinkActive="router-link-active"[routerLinkActiveOptions]="{exact:true}">ContextMenu</a></li>
                                <li><a [routerLink]="['/table/responsive']" routerLinkActive="router-link-active"[routerLinkActiveOptions]="{exact:true}">Responsive</a></li>
                                <li><a [routerLink]="['/table/crud']" routerLinkActive="router-link-active"[routerLinkActiveOptions]="{exact:true}">Crud</a></li>
                                <li><a [routerLink]="['/table/state']" routerLinkActive="router-link-active"[routerLinkActiveOptions]="{exact:true}">State</a></li>
                                <li><a [routerLink]="['/table/sticky']" routerLinkActive="router-link-active"[routerLinkActiveOptions]="{exact:true}">Sticky</a></li>
                            </ul>
                        </div>
                    </div>

                    <div>
                        <a tabindex="0" (click)="toggleSubmenu($event, '/tree')">Tree</a>
                        <div [@submenu]="isSubmenuActive('/tree') ? 'visible': 'hidden'">
                            <ul>
                                <li><a [routerLink]="['/tree']" routerLinkActive="router-link-active"[routerLinkActiveOptions]="{exact:true}">Documentation</a></li>
                                <li><a [routerLink]="['/tree/templating']" routerLinkActive="router-link-active"[routerLinkActiveOptions]="{exact:true}">Templating</a></li>
                                <li><a [routerLink]="['/tree/selection']" routerLinkActive="router-link-active"[routerLinkActiveOptions]="{exact:true}">Selection</a></li>
                                <li><a [routerLink]="['/tree/filter']" routerLinkActive="router-link-active"[routerLinkActiveOptions]="{exact:true}">Filter</a></li>
                                <li><a [routerLink]="['/tree/lazy']" routerLinkActive="router-link-active"[routerLinkActiveOptions]="{exact:true}">Lazy</a></li>
                                <li><a [routerLink]="['/tree/scroll']" routerLinkActive="router-link-active"[routerLinkActiveOptions]="{exact:true}">Scroll</a></li>
                                <li><a [routerLink]="['/tree/contextmenu']" routerLinkActive="router-link-active"[routerLinkActiveOptions]="{exact:true}">ContextMenu</a></li>
                                <li><a [routerLink]="['/tree/dragdrop']" routerLinkActive="router-link-active"[routerLinkActiveOptions]="{exact:true}">DragDrop</a></li>
                                <li><a [routerLink]="['/tree/horizontal']" routerLinkActive="router-link-active"[routerLinkActiveOptions]="{exact:true}">Horizontal</a></li>
                            </ul>
                        </div>
                    </div>

                    <div>
                        <a tabindex="0" (click)="toggleSubmenu($event, '/treetable')">TreeTable</a>
                        <div [@submenu]="isSubmenuActive('/treetable') ? 'visible': 'hidden'">
                            <ul>
                                <li><a [routerLink]="['/treetable']" routerLinkActive="router-link-active"[routerLinkActiveOptions]="{exact:true}">Documentation</a></li>
                                <li><a [routerLink]="['/treetable/sections']" routerLinkActive="router-link-active"[routerLinkActiveOptions]="{exact:true}">Sections</a></li>
                                <li><a [routerLink]="['/treetable/page']" routerLinkActive="router-link-active"[routerLinkActiveOptions]="{exact:true}">Page</a></li>
                                <li><a [routerLink]="['/treetable/sort']" routerLinkActive="router-link-active"[routerLinkActiveOptions]="{exact:true}">Sort</a></li>
                                <li><a [routerLink]="['/treetable/selection']" routerLinkActive="router-link-active"[routerLinkActiveOptions]="{exact:true}">Selection</a></li>
                                <li><a [routerLink]="['/treetable/colgroup']" routerLinkActive="router-link-active"[routerLinkActiveOptions]="{exact:true}">ColGroup</a></li>
                                <li><a [routerLink]="['/treetable/lazy']" routerLinkActive="router-link-active"[routerLinkActiveOptions]="{exact:true}">Lazy</a></li>
                                <li><a [routerLink]="['/treetable/edit']" routerLinkActive="router-link-active"[routerLinkActiveOptions]="{exact:true}">Edit</a></li>
                                <li><a [routerLink]="['/treetable/scroll']" routerLinkActive="router-link-active"[routerLinkActiveOptions]="{exact:true}">Scroll</a></li>
                                <li><a [routerLink]="['/treetable/colresize']" routerLinkActive="router-link-active"[routerLinkActiveOptions]="{exact:true}">Resize</a></li>
                                <li><a [routerLink]="['/treetable/reorder']" routerLinkActive="router-link-active"[routerLinkActiveOptions]="{exact:true}">Reorder</a></li>
                                <li><a [routerLink]="['/treetable/coltoggle']" routerLinkActive="router-link-active"[routerLinkActiveOptions]="{exact:true}">Toggle</a></li>
                                <li><a [routerLink]="['/treetable/style']" routerLinkActive="router-link-active"[routerLinkActiveOptions]="{exact:true}">Style</a></li>
                                <li><a [routerLink]="['/treetable/contextmenu']" routerLinkActive="router-link-active"[routerLinkActiveOptions]="{exact:true}">ContextMenu</a></li>
                                <li><a [routerLink]="['/treetable/responsive']" routerLinkActive="router-link-active"[routerLinkActiveOptions]="{exact:true}">Responsive</a></li>
                                <li><a [routerLink]="['/treetable/filter']" routerLinkActive="router-link-active"[routerLinkActiveOptions]="{exact:true}">Filter</a></li>
                            </ul>
                        </div>
                    </div>

                    <a [routerLink]="['/virtualscroller']" routerLinkActive="router-link-active">VirtualScroller</a>
                </div>

                <div class="menu-category">Panel</div>
                <div class="menu-items">
                    <a [routerLink]="['/accordion']" routerLinkActive="router-link-active">Accordion</a>
                    <a [routerLink]="['/card']" routerLinkActive="router-link-active">Card</a>
                    <a [routerLink]="['/fieldset']" routerLinkActive="router-link-active">Fieldset</a>
                    <a [routerLink]="['/panel']" routerLinkActive="router-link-active">Panel</a>
                    <a [routerLink]="['/scrollpanel']" routerLinkActive="router-link-active">ScrollPanel</a>
                    <a [routerLink]="['/tabview']" routerLinkActive="router-link-active">TabView</a>
                    <a [routerLink]="['/toolbar']" routerLinkActive="router-link-active">Toolbar</a>
                </div>

                <div class="menu-category">Overlay</div>
                <div class="menu-items">
                    <a [routerLink]="['/confirmdialog']" routerLinkActive="router-link-active">ConfirmDialog</a>
                    <a [routerLink]="['/dialog']" routerLinkActive="router-link-active">Dialog</a>
                    <a [routerLink]="['/dynamicdialog']" routerLinkActive="router-link-active">DynamicDialog</a>
                    <a [routerLink]="['/overlaypanel']" routerLinkActive="router-link-active">OverlayPanel</a>
                    <a [routerLink]="['/sidebar']" routerLinkActive="router-link-active">Sidebar</a>
                    <a [routerLink]="['/tooltip']" routerLinkActive="router-link-active">Tooltip</a>
                </div>

                <div class="menu-category">File</div>
                <div class="menu-items">
                    <a [routerLink]="['/fileupload']" routerLinkActive="router-link-active">Upload</a>
                </div>

                <div class="menu-category">Menu</div>
                <div class="menu-items">
                    <a [routerLink]="['/menumodel']" routerLinkActive="router-link-active">MenuModel</a>
                    <a [routerLink]="['/breadcrumb']" routerLinkActive="router-link-active">Breadcrumb</a>
                    <a [routerLink]="['/contextmenu']" routerLinkActive="router-link-active">ContextMenu</a>
                    <a [routerLink]="['/megamenu']" routerLinkActive="router-link-active">MegaMenu</a>
                    <a [routerLink]="['/menu']" routerLinkActive="router-link-active">Menu</a>
                    <a [routerLink]="['/menubar']" routerLinkActive="router-link-active">Menubar</a>
                    <a [routerLink]="['/panelmenu']" routerLinkActive="router-link-active">PanelMenu</a>
                    <a [routerLink]="['/slidemenu']" routerLinkActive="router-link-active">SlideMenu</a>
                    <a [routerLink]="['/steps']" routerLinkActive="router-link-active">Steps</a>
                    <a [routerLink]="['/tabmenu']" routerLinkActive="router-link-active">TabMenu</a>
                    <a [routerLink]="['/tieredmenu']" routerLinkActive="router-link-active">TieredMenu</a>
                </div>

                <div class="menu-category">Chart</div>
                <div class="menu-items">
                    <a [routerLink]="['/chart']" routerLinkActive="router-link-active" [routerLinkActiveOptions]="{exact:true}">ChartModel</a>
                    <a [routerLink]="['/chart/bar']" routerLinkActive="router-link-active">Bar</a>
                    <a [routerLink]="['/chart/doughnut']" routerLinkActive="router-link-active">Doughnut</a>
                    <a [routerLink]="['/chart/line']" routerLinkActive="router-link-active">Line</a>
                    <a [routerLink]="['/chart/polararea']" routerLinkActive="router-link-active">PolarArea</a>
                    <a [routerLink]="['/chart/pie']" routerLinkActive="router-link-active">Pie</a>
                    <a [routerLink]="['/chart/radar']" routerLinkActive="router-link-active">Radar</a>
                </div>

                <div class="menu-category">Messages</div>
                <div class="menu-items">
                    <a [routerLink]="['/messages']" routerLinkActive="router-link-active">Messages</a>
                    <a [routerLink]="['/toast']" routerLinkActive="router-link-active">Toast</a>
                </div>

                <div class="menu-category">Media</div>
                <div class="menu-items">
                    <a [routerLink]="['/carousel']" routerLinkActive="router-link-active">Carousel</a>
                    <div>
                        <a tabindex="0" (click)="toggleSubmenu($event, '/galleria')">Galleria</a>
                        <div [@submenu]="isSubmenuActive('/galleria') ? 'visible': 'hidden'">
                            <ul>
                                <li><a [routerLink]="['/galleria']" routerLinkActive="router-link-active" [routerLinkActiveOptions]="{exact:true}">Documentation</a></li>
                                <li><a [routerLink]="['/galleria/programmatic']" routerLinkActive="router-link-active" [routerLinkActiveOptions]="{exact:true}">Programmatic</a></li>
                                <li><a [routerLink]="['/galleria/indicator']" routerLinkActive="router-link-active" [routerLinkActiveOptions]="{exact:true}">Indicator</a></li>
                                <li><a [routerLink]="['/galleria/thumbnail']" routerLinkActive="router-link-active" [routerLinkActiveOptions]="{exact:true}">Thumbnail</a></li>
                                <li><a [routerLink]="['/galleria/navigator']" routerLinkActive="router-link-active" [routerLinkActiveOptions]="{exact:true}">Navigator</a></li>
                                <li><a [routerLink]="['/galleria/responsive']" routerLinkActive="router-link-active" [routerLinkActiveOptions]="{exact:true}">Responsive</a></li>
                                <li><a [routerLink]="['/galleria/fullscreen']" routerLinkActive="router-link-active" [routerLinkActiveOptions]="{exact:true}">Fullscreen</a></li>
                                <li><a [routerLink]="['/galleria/autoplay']" routerLinkActive="router-link-active" [routerLinkActiveOptions]="{exact:true}">AutoPlay</a></li>
                                <li><a [routerLink]="['/galleria/caption']" routerLinkActive="router-link-active" [routerLinkActiveOptions]="{exact:true}">Caption</a></li>
                                <li><a [routerLink]="['/galleria/advanced']" routerLinkActive="router-link-active" [routerLinkActiveOptions]="{exact:true}">Advanced</a></li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div class="menu-category">DragDrop</div>
                <div class="menu-items">
                    <a [routerLink]="['/dragdrop']" routerLinkActive="router-link-active">Drag&amp;Drop</a>
                </div>
                
                <div class="menu-category">Misc</div>
                <div class="menu-items">
                    <a [routerLink]="['/blockui']" routerLinkActive="router-link-active">BlockUI</a>
                    <a [routerLink]="['/captcha']" routerLinkActive="router-link-active">Captcha</a>
                    <a [routerLink]="['/codehighlighter']" routerLinkActive="router-link-active">CodeHighlighter</a>
                    <a [routerLink]="['/defer']" routerLinkActive="router-link-active">Defer</a>
                    <a [routerLink]="['/filterutils']" routerLinkActive="router-link-active">FilterUtils</a>
                    <a [routerLink]="['/focustrap']" routerLinkActive="router-link-active">FocusTrap</a>
                    <a [routerLink]="['/inplace']" routerLinkActive="router-link-active">Inplace</a>
                    <a [routerLink]="['/progressbar']" routerLinkActive="router-link-active">ProgressBar</a>
                    <a [routerLink]="['/progressspinner']" routerLinkActive="router-link-active">ProgressSpinner</a>
                    <a [routerLink]="['/responsive']" routerLinkActive="router-link-active">Responsive</a>
                    <a [routerLink]="['/rtl']" routerLinkActive="router-link-active">RTL</a>
                    <a [routerLink]="['/validation']" routerLinkActive="router-link-active">Validation</a>
                    <a [routerLink]="['/terminal']" routerLinkActive="router-link-active">Terminal</a>
                </div>
            </div>
        </div>
    `,
    animations: [
        trigger('submenu', [
            state('hidden', style({
                height: '0',
                overflow: 'hidden',
                opacity: 0,
            })),
            state('visible', style({
                height: '*',
                opacity: 1
            })),
            transition('* <=> *', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)')),
        ])
    ]
})
export class AppMenuComponent {

    @Input() active: boolean;

    activeSubmenus: {[key: string]: boolean} = {};

    constructor(private router: Router) {
        this.router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                gtag('config', 'UA-93461466-1', 
                      {
                        'page_path': '/primeng' + event.urlAfterRedirects
                      }
                );

                //this.activeTopbarSubmenu = null;
                //this.menuActive = false;
             }
        });
    }

    toggleSubmenu(event, name) {
        this.activeSubmenus[name] = this.activeSubmenus[name] ? false: true;
        event.preventDefault();
    }

    isSubmenuActive(name) {
        if (this.activeSubmenus.hasOwnProperty(name)) {
            return this.activeSubmenus[name];
        }
        else if (this.router.isActive(name, false)) {
            this.activeSubmenus[name] = true;
            return true;
        }

        return false;
    }
}