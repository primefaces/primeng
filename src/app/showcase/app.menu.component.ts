import { Component, ElementRef, Input } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { FilterService } from 'primeng/api';
import { DomHandler } from 'primeng/dom';
import { AppConfigService } from './service/appconfigservice';
import { Subscription } from 'rxjs';
import { AppConfig } from './domain/appconfig';

declare let gtag: Function;

@Component({
    selector: 'app-menu',
    template: `
        <div class="layout-sidebar" [ngClass]="{'active': active}">
            <a [routerLink]="['/']" class="logo">
                <img alt="logo" [src]="'assets/showcase/images/' + (config.dark ? 'primeng-logo-light.svg' : 'primeng-logo-dark.svg')" />
            </a>
            <div class="layout-sidebar-filter p-fluid p-input-filled">
                <p-autoComplete [group]="true" [(ngModel)]="selectedRoute" [minLength]="2" [suggestions]="filteredRoutes" scrollHeight="300px" (onSelect)="onSelect($event)" placeholder="Search by name..." (completeMethod)="filterGroupedRoute($event)" field="label">
                </p-autoComplete>
            </div>
            <div class="layout-menu">
                <div class="menu-category">General</div>
                <div class="menu-items">
                    <a [routerLink]=" ['/setup']" routerLinkActive="router-link-exact-active">Get Started</a>
                    <a [routerLink]=" ['/i18n']" routerLinkActive="router-link-exact-active">Locale</a>
                    <a href="https://github.com/primefaces/primeng/wiki/Migration-Guide" target="_blank">Migration Guide</a>

                </div>

                <div class="menu-category">Support</div>
                <div class="menu-items">
                    <a href="https://forum.primefaces.org/viewforum.php?f=35" target="_blank">Forum</a>
                    <a href="https://discord.gg/gzKFYnpmCY" target="_blank">Discord Chat</a>
                    <a [routerLink]="['/lts']" routerLinkActive="router-link-exact-active">Long Term Support</a>
                    <a [routerLink]="['/support']" routerLinkActive="router-link-exact-active">PRO Support</a>
                </div>

                <div class="menu-category">Resources</div>
                <div class="menu-items">
                    <a href="https://www.youtube.com/channel/UCTgmp69aBOlLnPEqlUyetWw" target="_blank">PrimeTV</a>
                    <a href="https://github.com/primefaces/primeng" target="_blank">Source Code</a>
                    <a href="https://www.primefaces.org/store">Store</a>
                    <a href="https://twitter.com/prime_ng?lang=en">Twitter</a>
                </div>

                <div class="menu-category">Theming</div>
                <div class="menu-items">
                    <a [routerLink]=" ['/theming']" routerLinkActive="router-link-exact-active">Guide</a>
                    <a href="https://www.primefaces.org/designer/primeng">Theme Designer</a>
                    <a href="https://www.primefaces.org/designer-ng">Visual Editor</a>
                    <a [routerLink]="['/colors']" routerLinkActive="router-link-exact-active">Colors</a>
                    <a href="https://www.primefaces.org/designer/api/primeng/12.1.0">SASS API</a>
                </div>

                <div class="menu-category">PrimeBlocks</div>
                <div class="menu-items menu-banner">
                    <a href="https://www.primefaces.org/primeblocks-ng"><img width="100%" alt="PrimeBlocks Logo" [src]="'assets/showcase/images/' + (config.dark ? 'banner-primeblocks-dark.png' : 'banner-primeblocks.png')" /></a>
                </div>

                <div class="menu-category">PrimeFlex v3.0.0</div>
                <div class="menu-items menu-banner">
                    <a href="https://www.primefaces.org/primeflex"><img width="100%" alt="PrimeFlex Logo" [src]="'assets/showcase/images/' + (config.dark ? 'banner-primeflex-dark.svg' : 'banner-primeflex.svg')" /></a>
                </div>

                <div class="menu-category">PrimeFlex v2.0.0</div>
                <div class="menu-items">
                    <a [routerLink]=" ['/primeflex']" routerLinkActive="router-link-exact-active" [routerLinkActiveOptions]="{exact:true}">Setup</a>
                    <a [routerLink]=" ['/primeflex/display']" routerLinkActive="router-link-exact-active" [routerLinkActiveOptions]="{exact:true}">Display</a>
                    <a [routerLink]=" ['/primeflex/elevation']" routerLinkActive="router-link-exact-active" [routerLinkActiveOptions]="{exact:true}">Elevation</a>
                    <a [routerLink]=" ['/primeflex/flexbox']" routerLinkActive="router-link-exact-active" [routerLinkActiveOptions]="{exact:true}">FlexBox</a>
                    <a [routerLink]=" ['/primeflex/formlayout']" routerLinkActive="router-link-exact-active" [routerLinkActiveOptions]="{exact:true}">Form Layout</a>
                    <a [routerLink]=" ['/primeflex/grid']" routerLinkActive="router-link-exact-active" [routerLinkActiveOptions]="{exact:true}">Grid System</a>
                    <a [routerLink]=" ['/primeflex/spacing']" routerLinkActive="router-link-exact-active" [routerLinkActiveOptions]="{exact:true}">Spacing</a>
                    <a [routerLink]=" ['/primeflex/text']" routerLinkActive="router-link-exact-active" [routerLinkActiveOptions]="{exact:true}">Text</a>
                </div>

                <div class="menu-category">PrimeIcons</div>
                <div class="menu-items">
                    <a [routerLink]=" ['/icons']" routerLinkActive="router-link-exact-active">Icons v4.1</a>
                </div>

                <div class="menu-category">Form</div>
                <div class="menu-items">
                    <a [routerLink]=" ['/autocomplete']" routerLinkActive="router-link-exact-active">AutoComplete</a>
                    <a [routerLink]=" ['/calendar']" routerLinkActive="router-link-exact-active">Calendar</a>
                    <a [routerLink]=" ['/cascadeselect']" routerLinkActive="router-link-exact-active">CascadeSelect</a>
                    <a [routerLink]=" ['/checkbox']" routerLinkActive="router-link-exact-active">Checkbox</a>
                    <a [routerLink]=" ['/chips']" routerLinkActive="router-link-exact-active">Chips</a>
                    <a [routerLink]=" ['/colorpicker']" routerLinkActive="router-link-exact-active">ColorPicker</a>
                    <a [routerLink]=" ['/dropdown']" routerLinkActive="router-link-exact-active">Dropdown</a>
                    <a [routerLink]=" ['/editor']" routerLinkActive="router-link-exact-active">Editor</a>
                    <a [routerLink]=" ['/floatlabel']" routerLinkActive="router-link-exact-active">FloatLabel</a>
                    <a [routerLink]=" ['/inputgroup']" routerLinkActive="router-link-exact-active">InputGroup</a>
                    <a [routerLink]=" ['/inputmask']" routerLinkActive="router-link-exact-active">InputMask</a>
                    <a [routerLink]=" ['/inputswitch']" routerLinkActive="router-link-exact-active">InputSwitch</a>
                    <a [routerLink]=" ['/inputtext']" routerLinkActive="router-link-exact-active">InputText</a>
                    <a [routerLink]=" ['/inputtextarea']" routerLinkActive="router-link-exact-active">InputTextArea</a>
                    <a [routerLink]=" ['/inputnumber']" routerLinkActive="router-link-exact-active">InputNumber</a>
                    <a [routerLink]=" ['/invalid']" routerLinkActive="router-link-exact-active">InvalidState</a>
                    <a [routerLink]=" ['/knob']" routerLinkActive="router-link-exact-active">Knob</a>
                    <a [routerLink]=" ['/keyfilter']" routerLinkActive="router-link-exact-active">KeyFilter</a>
                    <a [routerLink]=" ['/listbox']" routerLinkActive="router-link-exact-active">Listbox</a>
                    <a [routerLink]=" ['/multiselect']" routerLinkActive="router-link-exact-active">MultiSelect</a>
                    <a [routerLink]=" ['/password']" routerLinkActive="router-link-exact-active">Password</a>
                    <a [routerLink]=" ['/radiobutton']" routerLinkActive="router-link-exact-active">RadioButton</a>
                    <a [routerLink]=" ['/rating']" routerLinkActive="router-link-exact-active">Rating</a>
                    <a [routerLink]=" ['/slider']" routerLinkActive="router-link-exact-active">Slider</a>
                    <a [routerLink]=" ['/selectbutton']" routerLinkActive="router-link-exact-active">SelectButton</a>
                    <a [routerLink]=" ['/togglebutton']" routerLinkActive="router-link-exact-active">ToggleButton</a>
                    <a [routerLink]=" ['/treeselect']" routerLinkActive="router-link-exact-active">TreeSelect <span class="p-tag">New</span></a>
                    <a [routerLink]=" ['/tristatecheckbox']" routerLinkActive="router-link-exact-active">TriCheckbox</a>
                </div>

                <div class="menu-category">Button</div>
                <div class="menu-items">
                    <a [routerLink]=" ['/button']" routerLinkActive="router-link-exact-active">Button</a>
                    <a [routerLink]=" ['/splitbutton']" routerLinkActive="router-link-exact-active">SplitButton</a>
                    <a [routerLink]=" ['/speeddial']" routerLinkActive="router-link-exact-active">SpeedDial <span class="p-tag">New</span></a>
                </div>

                <div class="menu-category">Data</div>
                <div class="menu-items">
                    <a [routerLink]=" ['/dataview']" routerLinkActive="router-link-exact-active">DataView</a>
                    <a [routerLink]=" ['/fullcalendar']" routerLinkActive="router-link-exact-active">FullCalendar</a>
                    <a [routerLink]=" ['/gmap']" routerLinkActive="router-link-exact-active">GMap</a>
                    <a [routerLink]=" ['/orderlist']" routerLinkActive="router-link-exact-active">OrderList</a>
                    <a [routerLink]=" ['/organizationchart']" routerLinkActive="router-link-exact-active">Org Chart</a>
                    <a [routerLink]=" ['/paginator']" routerLinkActive="router-link-exact-active">Paginator</a>
                    <a [routerLink]=" ['/picklist']" routerLinkActive="router-link-exact-active">PickList</a>
                    <div>
                        <a tabindex="0" (click)="toggleSubmenu($event, '/table')">Table  <span class="p-tag">New</span></a>
                        <div [@submenu]="isSubmenuActive('/table') ? 'visible': 'hidden'" (@submenu.done)="onAnimationDone()">
                            <ul>
                                <li><a [routerLink]=" ['/table']" routerLinkActive="router-link-exact-active" [routerLinkActiveOptions]="{exact:true}">Documentation</a></li>
                                <li><a [routerLink]=" ['/table/basic']" routerLinkActive="router-link-exact-active" [routerLinkActiveOptions]="{exact:true}">Basic</a></li>
                                <li><a [routerLink]=" ['/table/dynamic']" routerLinkActive="router-link-exact-active" [routerLinkActiveOptions]="{exact:true}">Dynamic</a></li>
                                <li><a [routerLink]=" ['/table/templating']" routerLinkActive="router-link-exact-active" [routerLinkActiveOptions]="{exact:true}">Templating</a></li>
                                <li><a [routerLink]=" ['/table/size']" routerLinkActive="router-link-exact-active" [routerLinkActiveOptions]="{exact:true}">Size</a></li>
                                <li><a [routerLink]=" ['/table/gridlines']" routerLinkActive="router-link-exact-active" [routerLinkActiveOptions]="{exact:true}">Gridlines</a></li>
                                <li><a [routerLink]=" ['/table/striped']" routerLinkActive="router-link-exact-active" [routerLinkActiveOptions]="{exact:true}">Striped</a></li>
                                <li><a [routerLink]=" ['/table/colgroup']" routerLinkActive="router-link-exact-active" [routerLinkActiveOptions]="{exact:true}">ColGroup</a></li>
                                <li><a [routerLink]=" ['/table/page']" routerLinkActive="router-link-exact-active" [routerLinkActiveOptions]="{exact:true}">Page</a></li>
                                <li><a [routerLink]=" ['/table/sort']" routerLinkActive="router-link-exact-active" [routerLinkActiveOptions]="{exact:true}">Sort</a></li>
                                <li><a [routerLink]=" ['/table/filter']" routerLinkActive="router-link-exact-active" [routerLinkActiveOptions]="{exact:true}">Filter </a></li>
                                <li><a [routerLink]=" ['/table/selection']" routerLinkActive="router-link-exact-active" [routerLinkActiveOptions]="{exact:true}">Selection</a></li>
                                <li><a [routerLink]=" ['/table/lazy']" routerLinkActive="router-link-exact-active" [routerLinkActiveOptions]="{exact:true}">Lazy</a></li>
                                <li><a [routerLink]=" ['/table/scroll']" routerLinkActive="router-link-exact-active" [routerLinkActiveOptions]="{exact:true}">Scroll <span class="p-tag">New</span></a></li>
                                <li><a [routerLink]=" ['/table/virtualscroll']" routerLinkActive="router-link-exact-active" [routerLinkActiveOptions]="{exact:true}">VirtualScroll</a></li>
                                <li><a [routerLink]=" ['/table/flexscroll']" target="_blank" routerLinkActive="router-link-exact-active" [routerLinkActiveOptions]="{exact:true}">FlexScroll</a></li>
                                <li><a [routerLink]=" ['/table/rowexpansion']" routerLinkActive="router-link-exact-active" [routerLinkActiveOptions]="{exact:true}">RowExpand</a></li>
                                <li><a [routerLink]=" ['/table/edit']" routerLinkActive="router-link-exact-active" [routerLinkActiveOptions]="{exact:true}">Edit</a></li>
                                <li><a [routerLink]=" ['/table/coltoggle']" routerLinkActive="router-link-exact-active" [routerLinkActiveOptions]="{exact:true}">Toggle</a></li>
                                <li><a [routerLink]=" ['/table/colresize']" routerLinkActive="router-link-exact-active" [routerLinkActiveOptions]="{exact:true}">Resize</a></li>
                                <li><a [routerLink]=" ['/table/reorder']" routerLinkActive="router-link-exact-active" [routerLinkActiveOptions]="{exact:true}">Reorder</a></li>
                                <li><a [routerLink]=" ['/table/rowgroup']" routerLinkActive="router-link-exact-active" [routerLinkActiveOptions]="{exact:true}">RowGroup</a></li>
                                <li><a [routerLink]=" ['/table/contextmenu']" routerLinkActive="router-link-exact-active" [routerLinkActiveOptions]="{exact:true}">ContextMenu</a></li>
                                <li><a [routerLink]=" ['/table/responsive']" routerLinkActive="router-link-exact-active" [routerLinkActiveOptions]="{exact:true}">Responsive</a></li>
                                <li><a [routerLink]=" ['/table/export']" routerLinkActive="router-link-exact-active" [routerLinkActiveOptions]="{exact:true}">Export</a></li>
                                <li><a [routerLink]=" ['/table/state']" routerLinkActive="router-link-exact-active" [routerLinkActiveOptions]="{exact:true}">State</a></li>
                                <li><a [routerLink]=" ['/table/style']" routerLinkActive="router-link-exact-active" [routerLinkActiveOptions]="{exact:true}">Style</a></li>
                                <li><a [routerLink]=" ['/table/sticky']" routerLinkActive="router-link-exact-active" [routerLinkActiveOptions]="{exact:true}">Sticky</a></li>
                                <li><a [routerLink]=" ['/table/crud']" routerLinkActive="router-link-exact-active" [routerLinkActiveOptions]="{exact:true}">Crud</a></li>
                            </ul>
                        </div>
                    </div>

                    <a [routerLink]=" ['/timeline']" routerLinkActive="router-link-exact-active">Timeline</a>

                    <div>
                        <a tabindex="0" (click)="toggleSubmenu($event, '/tree')">Tree</a>
                        <div [@submenu]="isSubmenuActive('/tree') ? 'visible': 'hidden'" (@submenu.done)="onAnimationDone()">
                            <ul>
                                <li><a [routerLink]=" ['/tree']" routerLinkActive="router-link-exact-active" [routerLinkActiveOptions]="{exact:true}">Documentation</a></li>
                                <li><a [routerLink]=" ['/tree/templating']" routerLinkActive="router-link-exact-active" [routerLinkActiveOptions]="{exact:true}">Templating</a></li>
                                <li><a [routerLink]=" ['/tree/selection']" routerLinkActive="router-link-exact-active" [routerLinkActiveOptions]="{exact:true}">Selection</a></li>
                                <li><a [routerLink]=" ['/tree/filter']" routerLinkActive="router-link-exact-active" [routerLinkActiveOptions]="{exact:true}">Filter</a></li>
                                <li><a [routerLink]=" ['/tree/lazy']" routerLinkActive="router-link-exact-active" [routerLinkActiveOptions]="{exact:true}">Lazy</a></li>
                                <li><a [routerLink]=" ['/tree/scroll']" routerLinkActive="router-link-exact-active" [routerLinkActiveOptions]="{exact:true}">Scroll</a></li>
                                <li><a [routerLink]=" ['/tree/contextmenu']" routerLinkActive="router-link-exact-active" [routerLinkActiveOptions]="{exact:true}">ContextMenu</a></li>
                                <li><a [routerLink]=" ['/tree/dragdrop']" routerLinkActive="router-link-exact-active" [routerLinkActiveOptions]="{exact:true}">DragDrop</a></li>
                                <li><a [routerLink]=" ['/tree/horizontal']" routerLinkActive="router-link-exact-active" [routerLinkActiveOptions]="{exact:true}">Horizontal</a></li>
                            </ul>
                        </div>
                    </div>

                    <div>
                        <a tabindex="0" (click)="toggleSubmenu($event, '/treetable')">TreeTable</a>
                        <div [@submenu]="isSubmenuActive('/treetable') ? 'visible': 'hidden'" (@submenu.done)="onAnimationDone()">
                            <ul>
                                <li><a [routerLink]=" ['/treetable']" routerLinkActive="router-link-exact-active" [routerLinkActiveOptions]="{exact:true}">Documentation</a></li>
                                <li><a [routerLink]=" ['/treetable/templating']" routerLinkActive="router-link-exact-active" [routerLinkActiveOptions]="{exact:true}">Templating</a></li>
                                <li><a [routerLink]=" ['/treetable/page']" routerLinkActive="router-link-exact-active" [routerLinkActiveOptions]="{exact:true}">Page</a></li>
                                <li><a [routerLink]=" ['/treetable/sort']" routerLinkActive="router-link-exact-active" [routerLinkActiveOptions]="{exact:true}">Sort</a></li>
                                <li><a [routerLink]=" ['/treetable/selection']" routerLinkActive="router-link-exact-active" [routerLinkActiveOptions]="{exact:true}">Selection</a></li>
                                <li><a [routerLink]=" ['/treetable/colgroup']" routerLinkActive="router-link-exact-active" [routerLinkActiveOptions]="{exact:true}">ColGroup</a></li>
                                <li><a [routerLink]=" ['/treetable/lazy']" routerLinkActive="router-link-exact-active" [routerLinkActiveOptions]="{exact:true}">Lazy</a></li>
                                <li><a [routerLink]=" ['/treetable/edit']" routerLinkActive="router-link-exact-active" [routerLinkActiveOptions]="{exact:true}">Edit</a></li>
                                <li><a [routerLink]=" ['/treetable/scroll']" routerLinkActive="router-link-exact-active" [routerLinkActiveOptions]="{exact:true}">Scroll</a></li>
                                <li><a [routerLink]=" ['/treetable/colresize']" routerLinkActive="router-link-exact-active" [routerLinkActiveOptions]="{exact:true}">Resize</a></li>
                                <li><a [routerLink]=" ['/treetable/reorder']" routerLinkActive="router-link-exact-active" [routerLinkActiveOptions]="{exact:true}">Reorder</a></li>
                                <li><a [routerLink]=" ['/treetable/coltoggle']" routerLinkActive="router-link-exact-active" [routerLinkActiveOptions]="{exact:true}">Toggle</a></li>
                                <li><a [routerLink]=" ['/treetable/style']" routerLinkActive="router-link-exact-active" [routerLinkActiveOptions]="{exact:true}">Style</a></li>
                                <li><a [routerLink]=" ['/treetable/contextmenu']" routerLinkActive="router-link-exact-active" [routerLinkActiveOptions]="{exact:true}">ContextMenu</a></li>
                                <li><a [routerLink]=" ['/treetable/responsive']" routerLinkActive="router-link-exact-active" [routerLinkActiveOptions]="{exact:true}">Responsive</a></li>
                                <li><a [routerLink]=" ['/treetable/filter']" routerLinkActive="router-link-exact-active" [routerLinkActiveOptions]="{exact:true}">Filter</a></li>
                                <li><a [routerLink]=" ['/treetable/size']" routerLinkActive="router-link-exact-active" [routerLinkActiveOptions]="{exact:true}">Size</a></li>
                            </ul>
                        </div>
                    </div>

                    <a [routerLink]=" ['/virtualscroller']" routerLinkActive="router-link-exact-active">VirtualScroller</a>
                </div>

                <div class="menu-category">Panel</div>
                <div class="menu-items">
                    <a [routerLink]=" ['/accordion']" routerLinkActive="router-link-exact-active">Accordion</a>
                    <a [routerLink]=" ['/card']" routerLinkActive="router-link-exact-active">Card</a>
                    <a [routerLink]=" ['/divider']" routerLinkActive="router-link-exact-active">Divider</a>
                    <a [routerLink]=" ['/fieldset']" routerLinkActive="router-link-exact-active">Fieldset</a>
                    <a [routerLink]=" ['/panel']" routerLinkActive="router-link-exact-active">Panel</a>
                    <a [routerLink]=" ['/splitter']" routerLinkActive="router-link-exact-active">Splitter</a>
                    <a [routerLink]=" ['/scrollpanel']" routerLinkActive="router-link-exact-active">ScrollPanel</a>
                    <a [routerLink]=" ['/tabview']" routerLinkActive="router-link-exact-active">TabView</a>
                    <a [routerLink]=" ['/toolbar']" routerLinkActive="router-link-exact-active">Toolbar</a>
                </div>

                <div class="menu-category">Overlay</div>
                <div class="menu-items">
                    <a [routerLink]=" ['/confirmdialog']" routerLinkActive="router-link-exact-active">ConfirmDialog</a>
                    <a [routerLink]=" ['/confirmpopup']" routerLinkActive="router-link-exact-active">ConfirmPopup</a>
                    <a [routerLink]=" ['/dialog']" routerLinkActive="router-link-exact-active">Dialog</a>
                    <a [routerLink]=" ['/dynamicdialog']" routerLinkActive="router-link-exact-active">DynamicDialog</a>
                    <a [routerLink]=" ['/overlaypanel']" routerLinkActive="router-link-exact-active">OverlayPanel</a>
                    <a [routerLink]=" ['/sidebar']" routerLinkActive="router-link-exact-active">Sidebar</a>
                    <a [routerLink]=" ['/tooltip']" routerLinkActive="router-link-exact-active">Tooltip</a>
                </div>

                <div class="menu-category">File</div>
                <div class="menu-items">
                    <a [routerLink]=" ['/fileupload']" routerLinkActive="router-link-exact-active">Upload</a>
                </div>

                <div class="menu-category">Menu</div>
                <div class="menu-items">
                    <a [routerLink]=" ['/menumodel']" routerLinkActive="router-link-exact-active">MenuModel</a>
                    <a [routerLink]=" ['/breadcrumb']" routerLinkActive="router-link-exact-active">Breadcrumb</a>
                    <a [routerLink]=" ['/contextmenu']" routerLinkActive="router-link-exact-active">ContextMenu</a>
                    <a [routerLink]=" ['/dock']" routerLinkActive="router-link-exact-active">Dock <span class="p-tag">New</span></a>
                    <a [routerLink]=" ['/megamenu']" routerLinkActive="router-link-exact-active">MegaMenu</a>
                    <a [routerLink]=" ['/menu']" routerLinkActive="router-link-exact-active">Menu</a>
                    <a [routerLink]=" ['/menubar']" routerLinkActive="router-link-exact-active">Menubar</a>
                    <a [routerLink]=" ['/panelmenu']" routerLinkActive="router-link-exact-active">PanelMenu</a>
                    <a [routerLink]=" ['/slidemenu']" routerLinkActive="router-link-exact-active">SlideMenu</a>
                    <a [routerLink]=" ['/steps']" routerLinkActive="router-link-exact-active">Steps</a>
                    <a [routerLink]=" ['/tabmenu']" routerLinkActive="router-link-exact-active">TabMenu</a>
                    <a [routerLink]=" ['/tieredmenu']" routerLinkActive="router-link-exact-active">TieredMenu</a>
                </div>

                <div class="menu-category">Chart</div>
                <div class="menu-items">
                    <a [routerLink]=" ['/chart']" routerLinkActive="router-link-exact-active" [routerLinkActiveOptions]="{exact:true}">ChartModel</a>
                    <a [routerLink]=" ['/chart/bar']" routerLinkActive="router-link-exact-active">Bar</a>
                    <a [routerLink]=" ['/chart/doughnut']" routerLinkActive="router-link-exact-active">Doughnut</a>
                    <a [routerLink]=" ['/chart/line']" routerLinkActive="router-link-exact-active">Line</a>
                    <a [routerLink]=" ['/chart/polararea']" routerLinkActive="router-link-exact-active">PolarArea</a>
                    <a [routerLink]=" ['/chart/pie']" routerLinkActive="router-link-exact-active">Pie</a>
                    <a [routerLink]=" ['/chart/radar']" routerLinkActive="router-link-exact-active">Radar</a>
                    <a [routerLink]=" ['/chart/combo']" routerLinkActive="router-link-exact-active">Combo</a>
                </div>

                <div class="menu-category">Messages</div>
                <div class="menu-items">
                    <a [routerLink]=" ['/messages']" routerLinkActive="router-link-exact-active">Messages</a>
                    <a [routerLink]=" ['/toast']" routerLinkActive="router-link-exact-active">Toast</a>
                </div>

                <div class="menu-category">Media</div>
                <div class="menu-items">
                    <a [routerLink]=" ['/carousel']" routerLinkActive="router-link-exact-active">Carousel</a>
                    <div>
                        <a tabindex="0" (click)="toggleSubmenu($event, '/galleria')">Galleria</a>
                        <div [@submenu]="isSubmenuActive('/galleria') ? 'visible': 'hidden'" (@submenu.done)="onAnimationDone()">
                            <ul>
                                <li><a [routerLink]=" ['/galleria']" routerLinkActive="router-link-exact-active" [routerLinkActiveOptions]="{exact:true}">Documentation</a></li>
                                <li><a [routerLink]=" ['/galleria/programmatic']" routerLinkActive="router-link-exact-active" [routerLinkActiveOptions]="{exact:true}">Programmatic</a></li>
                                <li><a [routerLink]=" ['/galleria/indicator']" routerLinkActive="router-link-exact-active" [routerLinkActiveOptions]="{exact:true}">Indicator</a></li>
                                <li><a [routerLink]=" ['/galleria/thumbnail']" routerLinkActive="router-link-exact-active" [routerLinkActiveOptions]="{exact:true}">Thumbnail</a></li>
                                <li><a [routerLink]=" ['/galleria/navigator']" routerLinkActive="router-link-exact-active" [routerLinkActiveOptions]="{exact:true}">Navigator</a></li>
                                <li><a [routerLink]=" ['/galleria/responsive']" routerLinkActive="router-link-exact-active" [routerLinkActiveOptions]="{exact:true}">Responsive</a></li>
                                <li><a [routerLink]=" ['/galleria/fullscreen']" routerLinkActive="router-link-exact-active" [routerLinkActiveOptions]="{exact:true}">Fullscreen</a></li>
                                <li><a [routerLink]=" ['/galleria/autoplay']" routerLinkActive="router-link-exact-active" [routerLinkActiveOptions]="{exact:true}">AutoPlay</a></li>
                                <li><a [routerLink]=" ['/galleria/caption']" routerLinkActive="router-link-exact-active" [routerLinkActiveOptions]="{exact:true}">Caption</a></li>
                                <li><a [routerLink]=" ['/galleria/advanced']" routerLinkActive="router-link-exact-active" [routerLinkActiveOptions]="{exact:true}">Advanced</a></li>
                            </ul>
                        </div>
                    </div>
                    <a [routerLink]=" ['/image']" routerLinkActive="router-link-exact-active">Image <span class="p-tag">New</span></a>
                </div>

                <div class="menu-category">DragDrop</div>
                <div class="menu-items">
                    <a [routerLink]=" ['/dragdrop']" routerLinkActive="router-link-exact-active">Drag&amp;Drop</a>
                </div>

                <div class="menu-category">Misc</div>
                <div class="menu-items">
                    <a [routerLink]=" ['/avatar']" routerLinkActive="router-link-exact-active">Avatar</a>
                    <a [routerLink]=" ['/badge']" routerLinkActive="router-link-exact-active">Badge</a>
                    <a [routerLink]=" ['/blockui']" routerLinkActive="router-link-exact-active">BlockUI</a>
                    <a [routerLink]=" ['/captcha']" routerLinkActive="router-link-exact-active">Captcha</a>
                    <a [routerLink]=" ['/chip']" routerLinkActive="router-link-exact-active">Chip</a>
                    <a [routerLink]=" ['/inplace']" routerLinkActive="router-link-exact-active">Inplace</a>
                    <a [routerLink]=" ['/progressbar']" routerLinkActive="router-link-exact-active">ProgressBar</a>
                    <a [routerLink]=" ['/progressspinner']" routerLinkActive="router-link-exact-active">ProgressSpinner</a>
                    <a [routerLink]=" ['/scrolltop']" routerLinkActive="router-link-exact-active">ScrollTop</a>
                    <a [routerLink]=" ['/skeleton']" routerLinkActive="router-link-exact-active">Skeleton</a>
                    <a [routerLink]=" ['/tag']" routerLinkActive="router-link-exact-active">Tag <span class="p-tag">Tag</span></a>
                    <a [routerLink]=" ['/terminal']" routerLinkActive="router-link-exact-active">Terminal</a>
                </div>

                <div class="menu-category">Directives</div>
                <div class="menu-items">
                    <a [routerLink]=" ['/defer']" routerLinkActive="router-link-exact-active">Defer</a>
                    <a [routerLink]=" ['/focustrap']" routerLinkActive="router-link-exact-active">FocusTrap</a>
                    <a [routerLink]=" ['/styleclass']" routerLinkActive="router-link-exact-active">StyleClass <span class="p-tag">New</span></a>
                    <a [routerLink]=" ['/ripple']" routerLinkActive="router-link-exact-active">Ripple</a>
                </div>

                <div class="menu-category">Utilities</div>
                <div class="menu-items">
                    <a [routerLink]=" ['/filterservice']" routerLinkActive="router-link-exact-active">FilterService</a>
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

    filteredRoutes: any[];

    selectedRoute: any;

    submenuRouting: boolean;

    routes = [
        {
            label: 'General', value: 'general',
            items: [
                {label: 'Setup', value: '/setup'},
                {label: 'Locale', value: '/i18n'}
            ]
        },
        {
            label: 'Support', value: 'support',
            items: [
                {label: 'Long Term Support', value: '/lts'},
                {label: 'PRO Support', value: '/support'}
            ]
        },
        {
            label: 'Theming', value: 'theming',
            items: [
                {label: 'Guide', value: '/theming'},
                {label: 'Colors', value: '/colors'}
            ]
        },
        {
            label: 'PrimeIcons', value: 'primeicons',
            items: [
                {label: 'Icons v4.1', value: '/icons'}
            ]
        },
        {
            label: 'Form', value: 'form',
            items: [
                {label: 'AutoComplete', value: '/autocomplete'},
                {label: 'Calendar', value: '/calendar'},
                {label: 'CascadeSelect', value: '/cascadeselect'},
                {label: 'Checkbox', value: '/checkbox'},
                {label: 'Chips', value: '/chips'},
                {label: 'ColorPicker', value: '/colorpicker'},
                {label: 'Dropdown', value: '/dropdown'},
                {label: 'Editor', value: '/editor'},
                {label: 'FloatLabel', value: '/floatlabel'},
                {label: 'InputGroup', value: '/inputgroup'},
                {label: 'InputMask', value: '/inputmask'},
                {label: 'InputNumber', value: '/inputnumber'},
                {label: 'InputSwitch', value: '/inputswitch'},
                {label: 'InputText', value: '/inputtext'},
                {label: 'InputTextArea', value: '/inputtextarea'},
                {label: 'InvalidState', value: '/invalid'},
                {label: 'Knob', value: '/knob'},
                {label: 'KeyFilter', value: '/keyfilter'},
                {label: 'Listbox', value: '/listbox'},
                {label: 'MultiSelect', value: '/multiselect'},
                {label: 'Password', value: '/password'},
                {label: 'RadioButton', value: '/radiobutton'},
                {label: 'Rating', value: '/rating'},
                {label: 'Slider', value: '/slider'},
                {label: 'SelectButton', value: '/selectbutton'},
                {label: 'ToggleButton', value: '/togglebutton'},
                {label: 'TreeSelect', value: '/treeselect'},
                {label: 'TriCheckbox', value: '/tristatecheckbox'}
            ]
        },
        {
            label: 'Button', value: 'button',
            items: [
                {label: 'Button', value: '/button'},
                {label: 'SpeedDial', value: '/speeddial'},
                {label: 'SplitButton', value: '/splitbutton'}
            ]
        },
        {
            label: 'Data', value: 'data',
            items: [
                {label: 'DataView', value: '/dataview'},
                {label: 'FullCalendar', value: '/fullcalendar'},
                {label: 'GMap', value: '/gmap'},
                {label: 'OrderList', value: '/orderlist'},
                {label: 'Org Chart', value: '/organizationchart'},
                {label: 'Paginator', value: '/paginator'},
                {label: 'PickList', value: '/picklist'},
                {label: 'Timeline', value: '/timeline'},
                {label: 'VirtualScroller', value: '/virtualscroller'},
            ]
        },

        {
            label: 'Table', value: 'table',
            items: [
                {label: 'Documentation', value: '/table'},
                {label: 'Basic', value: '/table/basic'},
                {label: 'Dynamic', value: '/table/dynamic'},
                {label: 'Templating', value: '/table/templating'},
                {label: 'Size', value: '/table/size'},
                {label: 'Gridlines', value: '/table/gridlines'},
                {label: 'Striped', value: '/table/striped'},
                {label: 'ColGroup', value: '/table/colgroup'},
                {label: 'Page', value: '/table/page'},
                {label: 'Sort', value: '/table/sort'},
                {label: 'Filter', value: '/table/filter'},
                {label: 'Selection', value: '/table/selection'},
                {label: 'Scroll', value: '/table/scroll'},
                {label: 'VirtualScroll', value: '/table/virtualscroll'},
                {label: 'FlexScroll', value: '/table/flexscroll'},
                {label: 'RowExpand', value: '/table/rowexpansion'},
                {label: 'Lazy', value: '/table/lazy'},
                {label: 'Edit', value: '/table/edit'},
                {label: 'Toggle', value: '/table/coltoggle'},
                {label: 'Resize', value: '/table/colresize'},
                {label: 'Reorder', value: '/table/reorder'},
                {label: 'RowGroup', value: '/table/rowgroup'},
                {label: 'ContextMenu', value: '/table/contextmenu'},
                {label: 'Responsive', value: '/table/responsive'},
                {label: 'Export', value: '/table/export'},
                {label: 'State', value: '/table/state'},
                {label: 'Style', value: '/table/style'},
                {label: 'Sticky', value: '/table/sticky'},
                {label: 'Crud', value: '/table/crud'},
            ]
        },
        {
            label: 'Tree', value: 'tree',
            items: [
                {label: 'Documentation', value: '/tree'},
                {label: 'Templating', value: '/tree/templating'},
                {label: 'Selection', value: '/tree/selection'},
                {label: 'Filter', value: '/tree/filter'},
                {label: 'Lazy', value: '/tree/lazy'},
                {label: 'Scroll', value: '/tree/scroll'},
                {label: 'ContextMenu', value: '/tree/contextmenu'},
                {label: 'DragDrop', value: '/tree/dragdrop'},
                {label: 'Horizontal', value: '/tree/horizontal'}
            ]
        },
        {
            label: 'TreeTable', value: 'treetable',
            items: [
                {label: 'Documentation', value: '/treetable'},
                {label: 'Templating', value: '/treetable/templating'},
                {label: 'Page', value: '/treetable/page'},
                {label: 'Sort', value: '/treetable/sort'},
                {label: 'Selection', value: '/treetable/selection'},
                {label: 'ColGroup', value: '/treetable/colgroup'},
                {label: 'Lazy', value: '/treetable/lazy'},
                {label: 'Edit', value: '/treetable/edit'},
                {label: 'Scroll', value: '/treetable/scroll'},
                {label: 'Resize', value: '/treetable/colresize'},
                {label: 'Reorder', value: '/treetable/reorder'},
                {label: 'Toggle', value: '/treetable/coltoggle'},
                {label: 'Style', value: '/treetable/style'},
                {label: 'ContextMenu', value: '/treetable/contextmenu'},
                {label: 'Responsive', value: '/treetable/responsive'},
                {label: 'Filter', value: '/treetable/filter'},
                {label: 'Size', value: '/treetable/size'}
            ]
        },
        {
            label: 'Panel', value: 'panel',
            items: [
                {label: 'Accordion', value: '/accordion'},
                {label: 'Card', value: '/card'},
                {label: 'Divider', value: '/divider'},
                {label: 'Fieldset', value: '/fieldset'},
                {label: 'Panel', value: '/panel'},
                {label: 'Splitter', value: '/splitter'},
                {label: 'ScrollPanel', value: '/scrollpanel'},
                {label: 'TabView', value: '/tabview'},
                {label: 'Toolbar', value: '/toolbar'}
            ]
        },
        {
            label: 'Overlay', value: 'overlay',
            items: [
                {label: 'ConfirmDialog', value: '/confirmdialog'},
                {label: 'ConfirmPopup', value: '/confirmpopup'},
                {label: 'Dialog', value: '/dialog'},
                {label: 'DynamicDialog', value: '/dynamicdialog'},
                {label: 'OverlayPanel', value: '/overlaypanel'},
                {label: 'Sidebar', value: '/sidebar'},
                {label: 'Tooltip', value: '/tooltip'}
            ]
        },
        {
            label: 'File', value: 'fileupload',
            items: [
                {label: 'Upload', value: '/fileupload'}
            ]
        },
        {
            label: 'Menu', value: 'menu',
            items: [
                {label: 'MenuModel', value: '/menumodel'},
                {label: 'Breadcrumb', value: '/breadcrumb'},
                {label: 'ContextMenu', value: '/contextmenu'},
                {label: 'Dock', value: '/dock'},
                {label: 'MegaMenu', value: '/megamenu'},
                {label: 'Menu', value: '/menu'},
                {label: 'Menubar', value: '/menubar'},
                {label: 'PanelMenu', value: '/panelmenu'},
                {label: 'SlideMenu', value: '/slidemenu'},
                {label: 'Steps', value: '/steps'},
                {label: 'TabMenu', value: '/tabmenu'},
                {label: 'TieredMenu', value: '/tieredmenu'}
            ]
        },
        {
            label: 'Chart', value: 'chart',
            items: [
                {label: 'ChartModel', value: '/chart'},
                {label: 'Bar', value: '/chart/bar'},
                {label: 'Doughnut', value: '/chart/doughnut'},
                {label: 'Line', value: '/chart/line'},
                {label: 'PolarArea', value: '/chart/polararea'},
                {label: 'Pie', value: '/chart/pie'},
                {label: 'Radar', value: '/chart/radar'},
                {label: 'Combo', value: '/chart/combo'}
            ]
        },
        {
            label: 'Messages', value: 'messages',
            items: [
                {label: 'Messages', value: '/messages'},
                {label: 'Toast', value: '/toast'}
            ]
        },
        {
            label: 'Media', value: 'media',
            items: [
                {label: 'Carousel', value: '/carousel'},
                {label: 'Image', value: '/image'}
            ]
        },
        {
            label: 'Galleria', value: 'galleria',
            items: [
                {label: 'Documentation', value: '/galleria'},
                {label: 'Programmatic', value: '/galleria/programmatic'},
                {label: 'Indicator', value: '/galleria/indicator'},
                {label: 'Thumbnail', value: '/galleria/thumbnail'},
                {label: 'Navigator', value: '/galleria/navigator'},
                {label: 'Responsive', value: '/galleria/responsive'},
                {label: 'Fullscreen', value: '/galleria/fullscreen'},
                {label: 'AutoPlay', value: '/galleria/autoplay'},
                {label: 'Caption', value: '/galleria/caption'},
                {label: 'Advanced', value: '/galleria/advanced'}
            ]
        },
        {
            label: 'DragDrop', value: 'dragdrop',
            items: [
                {label: 'DragDrop', value: '/dragdrop'}
            ]
        },
        {
            label: 'Misc', value: 'misc',
            items: [
                {label: 'Avatar', value: '/avatar'},
                {label: 'Badge', value: '/badge'},
                {label: 'BlockUI', value: '/blockui'},
                {label: 'Captcha', value: '/captcha'},
                {label: 'Chip', value: '/chip'},
                {label: 'Inplace', value: '/inplace'},
                {label: 'ProgressBar', value: '/progressbar'},
                {label: 'ProgressSpinner', value: '/progressspinner'},
                {label: 'ScrollTop', value: '/scrolltop'},
                {label: 'Skeleton', value: '/skeleton'},
                {label: 'Tag', value: '/tag'},
                {label: 'Terminal', value: '/terminal'}
            ]
        },
        {
            label: 'Directives', value: 'directives',
            items: [
                {label: 'Defer', value: '/defer'},
                {label: 'FocusTrap', value: '/focustrap'},
                {label: 'StyleClass', value: '/styleclass'},
                {label: 'Ripple', value: '/ripple'}
            ]
        },
        {
            label: 'Utilities', value: 'utilities',
            items: [
                {label: 'FilterService', value: '/filterservice'}
            ]
        },
    ];

    scrollable = true;

    config: AppConfig;

    subscription: Subscription;

    constructor(private el: ElementRef,private router: Router, private filterService: FilterService, private configService: AppConfigService) {
        this.config = this.configService.config;
        this.subscription = this.configService.configUpdate$.subscribe(config => this.config = config);
        router.events.subscribe((routerEvent) => {
                if (routerEvent instanceof NavigationStart && (routerEvent.navigationTrigger ==="popstate" || this.scrollable)){
                    let routeUrl = routerEvent.url;

                    if (this.isSubmenu(routeUrl) && !this.isSubmenuActive('/'+routeUrl.split('/')[1])){
                        this.submenuRouting = true;
                    }

                    if (routerEvent.navigationTrigger ==="popstate") {
                        this.scrollable = true;
                    }
                }

                if (routerEvent instanceof NavigationEnd && !this.submenuRouting && this.scrollable){
                    setTimeout(() => {
                        this.scrollToSelectedRoute();
                    },1);
                }
        });
    }

    filterGroupedRoute(event) {
        let query = event.query;
        let filteredGroups = [];

        for (let optgroup of this.routes) {
            let filteredSubOptions = this.filterService.filter(optgroup.items, ['value'], query, "contains");
            if (filteredSubOptions && filteredSubOptions.length) {
                filteredGroups.push({
                    label: optgroup.label,
                    value: optgroup.value,
                    items: filteredSubOptions
                });
            }
        }

        this.filteredRoutes = filteredGroups;
    }

    onSelect(event) {
        if (this.router.url !== event.value) {
            this.scrollable = true;
            this.router.navigate([event.value]);
        }

        this.selectedRoute = null;
    }

    onAnimationDone() {
        if (this.submenuRouting) {
            this.scrollToSelectedRoute();
            this.submenuRouting = false;
        }
    }

    scrollToSelectedRoute() {
        let routeEl = DomHandler.findSingle(this.el.nativeElement, '.router-link-exact-active');

        if (routeEl)
            routeEl.scrollIntoView({inline: 'start'});

        this.scrollable = false;
    }

    toggleSubmenu(event: Event, name: string) {
        this.activeSubmenus[name] = this.activeSubmenus[name] ? false: true;
        event.preventDefault();
    }

    isSubmenu(route) {
        return route.includes('table') || route.includes('treetable') || route.includes('tree') || route.includes('galleria');
    }

    isSubmenuActive(name: string) {
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
