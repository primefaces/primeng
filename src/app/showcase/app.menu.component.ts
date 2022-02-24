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
            <a [routerLink]="['/showcase']" class="logo">
                <img alt="logo" [src]="'assets/showcase/images/' + (config.dark ? 'primeng-logo-light.svg' : 'primeng-logo-dark.svg')" />
            </a>
            <div class="layout-sidebar-filter p-fluid p-input-filled">
                <p-autoComplete [group]="true" [(ngModel)]="selectedRoute" [minLength]="2" [suggestions]="filteredRoutes" scrollHeight="300px" (onSelect)="onSelect($event)" placeholder="Search by name..." (completeMethod)="filterGroupedRoute($event)" field="label">
                </p-autoComplete>
            </div>
            <div class="layout-menu">
                <div class="menu-category">General</div>
                <div class="menu-items">
                    <a [routerLink]=" ['/showcase/setup']" routerLinkActive="router-link-exact-active">Get Started</a>
                    <a [routerLink]=" ['/showcase/i18n']" routerLinkActive="router-link-exact-active">Locale</a>
                    <a href="https://github.com/primefaces/primeng/wiki/Migration-Guide" target="_blank">Migration Guide</a>

                </div>

                <div class="menu-category">Support</div>
                <div class="menu-items">
                    <a href="https://forum.primefaces.org/viewforum.php?f=35" target="_blank">Forum</a>
                    <a href="https://discord.gg/gzKFYnpmCY" target="_blank">Discord Chat</a>
                    <a [routerLink]="['/showcase/lts']" routerLinkActive="router-link-exact-active">Long Term Support</a>
                    <a [routerLink]="['/showcase/support']" routerLinkActive="router-link-exact-active">PRO Support</a>
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
                    <a href="https://www.primefaces.org/designer/api/primeng/13.0.0">SASS API</a>
                </div>

                <div class="menu-category">PrimeBlocks</div>
                <div class="menu-items menu-banner">
                    <a href="https://www.primefaces.org/primeblocks-ng"><img width="100%" alt="PrimeBlocks Logo" [src]="'assets/showcase/images/' + (config.dark ? 'banner-primeblocks-dark.png' : 'banner-primeblocks.png')" /></a>
                </div>

                <div class="menu-category">PrimeFlex</div>
                <div class="menu-items">
                    <a href="https://www.primefaces.org/primeflex">PrimeFlex v3</a>
                    <a href="https://github.com/primefaces/primeflex/wiki/PrimeFlex-v2">PrimeFlex v2</a>
                </div>

                <div class="menu-category">PrimeIcons</div>
                <div class="menu-items">
                    <a [routerLink]=" ['/icons']" routerLinkActive="router-link-exact-active">Icons v5</a>
                </div>

                <div class="menu-category">Form</div>
                <div class="menu-items">
                    <a [routerLink]=" ['/showcase/autocomplete']" routerLinkActive="router-link-exact-active">AutoComplete</a>
                    <a [routerLink]=" ['/showcase/calendar']" routerLinkActive="router-link-exact-active">Calendar</a>
                    <a [routerLink]=" ['/showcase/cascadeselect']" routerLinkActive="router-link-exact-active">CascadeSelect</a>
                    <a [routerLink]=" ['/showcase/checkbox']" routerLinkActive="router-link-exact-active">Checkbox</a>
                    <a [routerLink]=" ['/showcase/chips']" routerLinkActive="router-link-exact-active">Chips</a>
                    <a [routerLink]=" ['/showcase/colorpicker']" routerLinkActive="router-link-exact-active">ColorPicker</a>
                    <a [routerLink]=" ['/showcase/dropdown']" routerLinkActive="router-link-exact-active">Dropdown</a>
                    <a [routerLink]=" ['/showcase/editor']" routerLinkActive="router-link-exact-active">Editor</a>
                    <a [routerLink]=" ['/showcase/floatlabel']" routerLinkActive="router-link-exact-active">FloatLabel</a>
                    <a [routerLink]=" ['/showcase/inputgroup']" routerLinkActive="router-link-exact-active">InputGroup</a>
                    <a [routerLink]=" ['/showcase/inputmask']" routerLinkActive="router-link-exact-active">InputMask</a>
                    <a [routerLink]=" ['/showcase/inputswitch']" routerLinkActive="router-link-exact-active">InputSwitch</a>
                    <a [routerLink]=" ['/showcase/inputtext']" routerLinkActive="router-link-exact-active">InputText</a>
                    <a [routerLink]=" ['/showcase/inputtextarea']" routerLinkActive="router-link-exact-active">InputTextArea</a>
                    <a [routerLink]=" ['/showcase/inputnumber']" routerLinkActive="router-link-exact-active">InputNumber</a>
                    <a [routerLink]=" ['/showcase/invalid']" routerLinkActive="router-link-exact-active">InvalidState</a>
                    <a [routerLink]=" ['/showcase/knob']" routerLinkActive="router-link-exact-active">Knob</a>
                    <a [routerLink]=" ['/showcase/keyfilter']" routerLinkActive="router-link-exact-active">KeyFilter</a>
                    <a [routerLink]=" ['/showcase/listbox']" routerLinkActive="router-link-exact-active">Listbox</a>
                    <a [routerLink]=" ['/showcase/multiselect']" routerLinkActive="router-link-exact-active">MultiSelect</a>
                    <a [routerLink]=" ['/showcase/password']" routerLinkActive="router-link-exact-active">Password</a>
                    <a [routerLink]=" ['/showcase/radiobutton']" routerLinkActive="router-link-exact-active">RadioButton</a>
                    <a [routerLink]=" ['/showcase/rating']" routerLinkActive="router-link-exact-active">Rating</a>
                    <a [routerLink]=" ['/showcase/slider']" routerLinkActive="router-link-exact-active">Slider</a>
                    <a [routerLink]=" ['/showcase/selectbutton']" routerLinkActive="router-link-exact-active">SelectButton</a>
                    <a [routerLink]=" ['/showcase/togglebutton']" routerLinkActive="router-link-exact-active">ToggleButton</a>
                    <a [routerLink]=" ['/showcase/treeselect']" routerLinkActive="router-link-exact-active">TreeSelect <span class="p-tag">New</span></a>
                    <a [routerLink]=" ['/showcase/tristatecheckbox']" routerLinkActive="router-link-exact-active">TriCheckbox</a>
                </div>

                <div class="menu-category">Button</div>
                <div class="menu-items">
                    <a [routerLink]=" ['/showcase/button']" routerLinkActive="router-link-exact-active">Button</a>
                    <a [routerLink]=" ['/showcase/splitbutton']" routerLinkActive="router-link-exact-active">SplitButton</a>
                    <a [routerLink]=" ['/showcase/speeddial']" routerLinkActive="router-link-exact-active">SpeedDial <span class="p-tag">New</span></a>
                </div>

                <div class="menu-category">Data</div>
                <div class="menu-items">
                    <a [routerLink]=" ['/showcase/dataview']" routerLinkActive="router-link-exact-active">DataView</a>
                    <a [routerLink]=" ['/showcase/fullcalendar']" routerLinkActive="router-link-exact-active">FullCalendar</a>
                    <a [routerLink]=" ['/showcase/gmap']" routerLinkActive="router-link-exact-active">GMap</a>
                    <a [routerLink]=" ['/showcase/orderlist']" routerLinkActive="router-link-exact-active">OrderList</a>
                    <a [routerLink]=" ['/showcase/organizationchart']" routerLinkActive="router-link-exact-active">Org Chart</a>
                    <a [routerLink]=" ['/showcase/paginator']" routerLinkActive="router-link-exact-active">Paginator</a>
                    <a [routerLink]=" ['/showcase/picklist']" routerLinkActive="router-link-exact-active">PickList</a>
                    <div>
                        <a tabindex="0" (click)="toggleSubmenu($event, '/showcase/table')">Table  <span class="p-tag">New</span></a>
                        <div [@submenu]="isSubmenuActive('/showcase/table') ? 'visible': 'hidden'" (@submenu.done)="onAnimationDone()">
                            <ul>
                                <li><a [routerLink]=" ['/showcase/table']" routerLinkActive="router-link-exact-active" [routerLinkActiveOptions]="{exact:true}">Documentation</a></li>
                                <li><a [routerLink]=" ['/showcase/table/basic']" routerLinkActive="router-link-exact-active" [routerLinkActiveOptions]="{exact:true}">Basic</a></li>
                                <li><a [routerLink]=" ['/showcase/table/dynamic']" routerLinkActive="router-link-exact-active" [routerLinkActiveOptions]="{exact:true}">Dynamic</a></li>
                                <li><a [routerLink]=" ['/showcase/table/templating']" routerLinkActive="router-link-exact-active" [routerLinkActiveOptions]="{exact:true}">Templating</a></li>
                                <li><a [routerLink]=" ['/showcase/table/size']" routerLinkActive="router-link-exact-active" [routerLinkActiveOptions]="{exact:true}">Size</a></li>
                                <li><a [routerLink]=" ['/showcase/table/gridlines']" routerLinkActive="router-link-exact-active" [routerLinkActiveOptions]="{exact:true}">Gridlines</a></li>
                                <li><a [routerLink]=" ['/showcase/table/striped']" routerLinkActive="router-link-exact-active" [routerLinkActiveOptions]="{exact:true}">Striped</a></li>
                                <li><a [routerLink]=" ['/showcase/table/colgroup']" routerLinkActive="router-link-exact-active" [routerLinkActiveOptions]="{exact:true}">ColGroup</a></li>
                                <li><a [routerLink]=" ['/showcase/table/page']" routerLinkActive="router-link-exact-active" [routerLinkActiveOptions]="{exact:true}">Page</a></li>
                                <li><a [routerLink]=" ['/showcase/table/sort']" routerLinkActive="router-link-exact-active" [routerLinkActiveOptions]="{exact:true}">Sort</a></li>
                                <li><a [routerLink]=" ['/showcase/table/filter']" routerLinkActive="router-link-exact-active" [routerLinkActiveOptions]="{exact:true}">Filter </a></li>
                                <li><a [routerLink]=" ['/showcase/table/selection']" routerLinkActive="router-link-exact-active" [routerLinkActiveOptions]="{exact:true}">Selection</a></li>
                                <li><a [routerLink]=" ['/showcase/table/lazy']" routerLinkActive="router-link-exact-active" [routerLinkActiveOptions]="{exact:true}">Lazy</a></li>
                                <li><a [routerLink]=" ['/showcase/table/scroll']" routerLinkActive="router-link-exact-active" [routerLinkActiveOptions]="{exact:true}">Scroll <span class="p-tag">New</span></a></li>
                                <li><a [routerLink]=" ['/showcase/table/virtualscroll']" routerLinkActive="router-link-exact-active" [routerLinkActiveOptions]="{exact:true}">VirtualScroll</a></li>
                                <li><a [routerLink]=" ['/showcase/table/flexscroll']" target="_blank" routerLinkActive="router-link-exact-active" [routerLinkActiveOptions]="{exact:true}">FlexScroll</a></li>
                                <li><a [routerLink]=" ['/showcase/table/rowexpansion']" routerLinkActive="router-link-exact-active" [routerLinkActiveOptions]="{exact:true}">RowExpand</a></li>
                                <li><a [routerLink]=" ['/showcase/table/edit']" routerLinkActive="router-link-exact-active" [routerLinkActiveOptions]="{exact:true}">Edit</a></li>
                                <li><a [routerLink]=" ['/showcase/table/coltoggle']" routerLinkActive="router-link-exact-active" [routerLinkActiveOptions]="{exact:true}">Toggle</a></li>
                                <li><a [routerLink]=" ['/showcase/table/colresize']" routerLinkActive="router-link-exact-active" [routerLinkActiveOptions]="{exact:true}">Resize</a></li>
                                <li><a [routerLink]=" ['/showcase/table/reorder']" routerLinkActive="router-link-exact-active" [routerLinkActiveOptions]="{exact:true}">Reorder</a></li>
                                <li><a [routerLink]=" ['/showcase/table/rowgroup']" routerLinkActive="router-link-exact-active" [routerLinkActiveOptions]="{exact:true}">RowGroup</a></li>
                                <li><a [routerLink]=" ['/showcase/table/contextmenu']" routerLinkActive="router-link-exact-active" [routerLinkActiveOptions]="{exact:true}">ContextMenu</a></li>
                                <li><a [routerLink]=" ['/showcase/table/responsive']" routerLinkActive="router-link-exact-active" [routerLinkActiveOptions]="{exact:true}">Responsive</a></li>
                                <li><a [routerLink]=" ['/showcase/table/export']" routerLinkActive="router-link-exact-active" [routerLinkActiveOptions]="{exact:true}">Export</a></li>
                                <li><a [routerLink]=" ['/showcase/table/state']" routerLinkActive="router-link-exact-active" [routerLinkActiveOptions]="{exact:true}">State</a></li>
                                <li><a [routerLink]=" ['/showcase/table/style']" routerLinkActive="router-link-exact-active" [routerLinkActiveOptions]="{exact:true}">Style</a></li>
                                <li><a [routerLink]=" ['/showcase/table/sticky']" routerLinkActive="router-link-exact-active" [routerLinkActiveOptions]="{exact:true}">Sticky</a></li>
                                <li><a [routerLink]=" ['/showcase/table/crud']" routerLinkActive="router-link-exact-active" [routerLinkActiveOptions]="{exact:true}">Crud</a></li>
                            </ul>
                        </div>
                    </div>

                    <a [routerLink]=" ['/showcase/timeline']" routerLinkActive="router-link-exact-active">Timeline</a>

                    <div>
                        <a tabindex="0" (click)="toggleSubmenu($event, '/showcase/tree')">Tree</a>
                        <div [@submenu]="isSubmenuActive('/showcase/tree') ? 'visible': 'hidden'" (@submenu.done)="onAnimationDone()">
                            <ul>
                                <li><a [routerLink]=" ['/showcase/tree']" routerLinkActive="router-link-exact-active" [routerLinkActiveOptions]="{exact:true}">Documentation</a></li>
                                <li><a [routerLink]=" ['/showcase/tree/templating']" routerLinkActive="router-link-exact-active" [routerLinkActiveOptions]="{exact:true}">Templating</a></li>
                                <li><a [routerLink]=" ['/showcase/tree/selection']" routerLinkActive="router-link-exact-active" [routerLinkActiveOptions]="{exact:true}">Selection</a></li>
                                <li><a [routerLink]=" ['/showcase/tree/filter']" routerLinkActive="router-link-exact-active" [routerLinkActiveOptions]="{exact:true}">Filter</a></li>
                                <li><a [routerLink]=" ['/showcase/tree/lazy']" routerLinkActive="router-link-exact-active" [routerLinkActiveOptions]="{exact:true}">Lazy</a></li>
                                <li><a [routerLink]=" ['/showcase/tree/scroll']" routerLinkActive="router-link-exact-active" [routerLinkActiveOptions]="{exact:true}">Scroll</a></li>
                                <li><a [routerLink]=" ['/showcase/tree/contextmenu']" routerLinkActive="router-link-exact-active" [routerLinkActiveOptions]="{exact:true}">ContextMenu</a></li>
                                <li><a [routerLink]=" ['/showcase/tree/dragdrop']" routerLinkActive="router-link-exact-active" [routerLinkActiveOptions]="{exact:true}">DragDrop</a></li>
                                <li><a [routerLink]=" ['/showcase/tree/horizontal']" routerLinkActive="router-link-exact-active" [routerLinkActiveOptions]="{exact:true}">Horizontal</a></li>
                            </ul>
                        </div>
                    </div>

                    <div>
                        <a tabindex="0" (click)="toggleSubmenu($event, '/showcase/treetable')">TreeTable</a>
                        <div [@submenu]="isSubmenuActive('/showcase/treetable') ? 'visible': 'hidden'" (@submenu.done)="onAnimationDone()">
                            <ul>
                                <li><a [routerLink]=" ['/showcase/treetable']" routerLinkActive="router-link-exact-active" [routerLinkActiveOptions]="{exact:true}">Documentation</a></li>
                                <li><a [routerLink]=" ['/showcase/treetable/templating']" routerLinkActive="router-link-exact-active" [routerLinkActiveOptions]="{exact:true}">Templating</a></li>
                                <li><a [routerLink]=" ['/showcase/treetable/page']" routerLinkActive="router-link-exact-active" [routerLinkActiveOptions]="{exact:true}">Page</a></li>
                                <li><a [routerLink]=" ['/showcase/treetable/sort']" routerLinkActive="router-link-exact-active" [routerLinkActiveOptions]="{exact:true}">Sort</a></li>
                                <li><a [routerLink]=" ['/showcase/treetable/selection']" routerLinkActive="router-link-exact-active" [routerLinkActiveOptions]="{exact:true}">Selection</a></li>
                                <li><a [routerLink]=" ['/showcase/treetable/colgroup']" routerLinkActive="router-link-exact-active" [routerLinkActiveOptions]="{exact:true}">ColGroup</a></li>
                                <li><a [routerLink]=" ['/showcase/treetable/lazy']" routerLinkActive="router-link-exact-active" [routerLinkActiveOptions]="{exact:true}">Lazy</a></li>
                                <li><a [routerLink]=" ['/showcase/treetable/edit']" routerLinkActive="router-link-exact-active" [routerLinkActiveOptions]="{exact:true}">Edit</a></li>
                                <li><a [routerLink]=" ['/showcase/treetable/scroll']" routerLinkActive="router-link-exact-active" [routerLinkActiveOptions]="{exact:true}">Scroll</a></li>
                                <li><a [routerLink]=" ['/showcase/treetable/colresize']" routerLinkActive="router-link-exact-active" [routerLinkActiveOptions]="{exact:true}">Resize</a></li>
                                <li><a [routerLink]=" ['/showcase/treetable/reorder']" routerLinkActive="router-link-exact-active" [routerLinkActiveOptions]="{exact:true}">Reorder</a></li>
                                <li><a [routerLink]=" ['/showcase/treetable/coltoggle']" routerLinkActive="router-link-exact-active" [routerLinkActiveOptions]="{exact:true}">Toggle</a></li>
                                <li><a [routerLink]=" ['/showcase/treetable/style']" routerLinkActive="router-link-exact-active" [routerLinkActiveOptions]="{exact:true}">Style</a></li>
                                <li><a [routerLink]=" ['/showcase/treetable/contextmenu']" routerLinkActive="router-link-exact-active" [routerLinkActiveOptions]="{exact:true}">ContextMenu</a></li>
                                <li><a [routerLink]=" ['/showcase/treetable/responsive']" routerLinkActive="router-link-exact-active" [routerLinkActiveOptions]="{exact:true}">Responsive</a></li>
                                <li><a [routerLink]=" ['/showcase/treetable/filter']" routerLinkActive="router-link-exact-active" [routerLinkActiveOptions]="{exact:true}">Filter</a></li>
                                <li><a [routerLink]=" ['/showcase/treetable/size']" routerLinkActive="router-link-exact-active" [routerLinkActiveOptions]="{exact:true}">Size</a></li>
                            </ul>
                        </div>
                    </div>

                    <a [routerLink]=" ['/showcase/virtualscroller']" routerLinkActive="router-link-exact-active">VirtualScroller</a>
                </div>

                <div class="menu-category">Panel</div>
                <div class="menu-items">
                    <a [routerLink]=" ['/showcase/accordion']" routerLinkActive="router-link-exact-active">Accordion</a>
                    <a [routerLink]=" ['/showcase/card']" routerLinkActive="router-link-exact-active">Card</a>
                    <a [routerLink]=" ['/showcase/divider']" routerLinkActive="router-link-exact-active">Divider</a>
                    <a [routerLink]=" ['/showcase/fieldset']" routerLinkActive="router-link-exact-active">Fieldset</a>
                    <a [routerLink]=" ['/showcase/panel']" routerLinkActive="router-link-exact-active">Panel</a>
                    <a [routerLink]=" ['/showcase/splitter']" routerLinkActive="router-link-exact-active">Splitter</a>
                    <a [routerLink]=" ['/showcase/scrollpanel']" routerLinkActive="router-link-exact-active">ScrollPanel</a>
                    <a [routerLink]=" ['/showcase/tabview']" routerLinkActive="router-link-exact-active">TabView</a>
                    <a [routerLink]=" ['/showcase/toolbar']" routerLinkActive="router-link-exact-active">Toolbar</a>
                </div>

                <div class="menu-category">Overlay</div>
                <div class="menu-items">
                    <a [routerLink]=" ['/showcase/confirmdialog']" routerLinkActive="router-link-exact-active">ConfirmDialog</a>
                    <a [routerLink]=" ['/showcase/confirmpopup']" routerLinkActive="router-link-exact-active">ConfirmPopup</a>
                    <a [routerLink]=" ['/showcase/dialog']" routerLinkActive="router-link-exact-active">Dialog</a>
                    <a [routerLink]=" ['/showcase/dynamicdialog']" routerLinkActive="router-link-exact-active">DynamicDialog</a>
                    <a [routerLink]=" ['/showcase/overlaypanel']" routerLinkActive="router-link-exact-active">OverlayPanel</a>
                    <a [routerLink]=" ['/showcase/sidebar']" routerLinkActive="router-link-exact-active">Sidebar</a>
                    <a [routerLink]=" ['/showcase/tooltip']" routerLinkActive="router-link-exact-active">Tooltip</a>
                </div>

                <div class="menu-category">File</div>
                <div class="menu-items">
                    <a [routerLink]=" ['/showcase/fileupload']" routerLinkActive="router-link-exact-active">Upload</a>
                </div>

                <div class="menu-category">Menu</div>
                <div class="menu-items">
                    <a [routerLink]=" ['/showcase/menumodel']" routerLinkActive="router-link-exact-active">MenuModel</a>
                    <a [routerLink]=" ['/showcase/breadcrumb']" routerLinkActive="router-link-exact-active">Breadcrumb</a>
                    <a [routerLink]=" ['/showcase/contextmenu']" routerLinkActive="router-link-exact-active">ContextMenu</a>
                    <a [routerLink]=" ['/showcase/dock']" routerLinkActive="router-link-exact-active">Dock <span class="p-tag">New</span></a>
                    <a [routerLink]=" ['/showcase/megamenu']" routerLinkActive="router-link-exact-active">MegaMenu</a>
                    <a [routerLink]=" ['/showcase/menu']" routerLinkActive="router-link-exact-active">Menu</a>
                    <a [routerLink]=" ['/showcase/menubar']" routerLinkActive="router-link-exact-active">Menubar</a>
                    <a [routerLink]=" ['/showcase/panelmenu']" routerLinkActive="router-link-exact-active">PanelMenu</a>
                    <a [routerLink]=" ['/showcase/slidemenu']" routerLinkActive="router-link-exact-active">SlideMenu</a>
                    <a [routerLink]=" ['/showcase/steps']" routerLinkActive="router-link-exact-active">Steps</a>
                    <a [routerLink]=" ['/showcase/tabmenu']" routerLinkActive="router-link-exact-active">TabMenu</a>
                    <a [routerLink]=" ['/showcase/tieredmenu']" routerLinkActive="router-link-exact-active">TieredMenu</a>
                </div>

                <div class="menu-category">Chart</div>
                <div class="menu-items">
                    <a [routerLink]=" ['/showcase/chart']" routerLinkActive="router-link-exact-active" [routerLinkActiveOptions]="{exact:true}">ChartModel</a>
                    <a [routerLink]=" ['/showcase/chart/bar']" routerLinkActive="router-link-exact-active">Bar</a>
                    <a [routerLink]=" ['/showcase/chart/doughnut']" routerLinkActive="router-link-exact-active">Doughnut</a>
                    <a [routerLink]=" ['/showcase/chart/line']" routerLinkActive="router-link-exact-active">Line</a>
                    <a [routerLink]=" ['/showcase/chart/polararea']" routerLinkActive="router-link-exact-active">PolarArea</a>
                    <a [routerLink]=" ['/showcase/chart/pie']" routerLinkActive="router-link-exact-active">Pie</a>
                    <a [routerLink]=" ['/showcase/chart/radar']" routerLinkActive="router-link-exact-active">Radar</a>
                    <a [routerLink]=" ['/showcase/chart/combo']" routerLinkActive="router-link-exact-active">Combo</a>
                </div>

                <div class="menu-category">Messages</div>
                <div class="menu-items">
                    <a [routerLink]=" ['/showcase/messages']" routerLinkActive="router-link-exact-active">Messages</a>
                    <a [routerLink]=" ['/showcase/toast']" routerLinkActive="router-link-exact-active">Toast</a>
                </div>

                <div class="menu-category">Media</div>
                <div class="menu-items">
                    <a [routerLink]=" ['/carousel']" routerLinkActive="router-link-exact-active">Carousel</a>
                    <div>
                        <a tabindex="0" (click)="toggleSubmenu($event, '/showcase/galleria')">Galleria</a>
                        <div [@submenu]="isSubmenuActive('/showcase/galleria') ? 'visible': 'hidden'" (@submenu.done)="onAnimationDone()">
                            <ul>
                                <li><a [routerLink]=" ['/showcase/galleria']" routerLinkActive="router-link-exact-active" [routerLinkActiveOptions]="{exact:true}">Documentation</a></li>
                                <li><a [routerLink]=" ['/showcase/galleria/programmatic']" routerLinkActive="router-link-exact-active" [routerLinkActiveOptions]="{exact:true}">Programmatic</a></li>
                                <li><a [routerLink]=" ['/showcase/galleria/indicator']" routerLinkActive="router-link-exact-active" [routerLinkActiveOptions]="{exact:true}">Indicator</a></li>
                                <li><a [routerLink]=" ['/showcase/galleria/thumbnail']" routerLinkActive="router-link-exact-active" [routerLinkActiveOptions]="{exact:true}">Thumbnail</a></li>
                                <li><a [routerLink]=" ['/showcase/galleria/navigator']" routerLinkActive="router-link-exact-active" [routerLinkActiveOptions]="{exact:true}">Navigator</a></li>
                                <li><a [routerLink]=" ['/showcase/galleria/responsive']" routerLinkActive="router-link-exact-active" [routerLinkActiveOptions]="{exact:true}">Responsive</a></li>
                                <li><a [routerLink]=" ['/showcase/galleria/fullscreen']" routerLinkActive="router-link-exact-active" [routerLinkActiveOptions]="{exact:true}">Fullscreen</a></li>
                                <li><a [routerLink]=" ['/showcase/galleria/autoplay']" routerLinkActive="router-link-exact-active" [routerLinkActiveOptions]="{exact:true}">AutoPlay</a></li>
                                <li><a [routerLink]=" ['/showcase/galleria/caption']" routerLinkActive="router-link-exact-active" [routerLinkActiveOptions]="{exact:true}">Caption</a></li>
                                <li><a [routerLink]=" ['/showcase/galleria/advanced']" routerLinkActive="router-link-exact-active" [routerLinkActiveOptions]="{exact:true}">Advanced</a></li>
                            </ul>
                        </div>
                    </div>
                    <a [routerLink]=" ['/showcase/image']" routerLinkActive="router-link-exact-active">Image <span class="p-tag">New</span></a>
                </div>

                <div class="menu-category">DragDrop</div>
                <div class="menu-items">
                    <a [routerLink]=" ['/showcase/dragdrop']" routerLinkActive="router-link-exact-active">Drag&amp;Drop</a>
                </div>

                <div class="menu-category">Misc</div>
                <div class="menu-items">
                    <a [routerLink]=" ['/showcase/avatar']" routerLinkActive="router-link-exact-active">Avatar</a>
                    <a [routerLink]=" ['/showcase/badge']" routerLinkActive="router-link-exact-active">Badge</a>
                    <a [routerLink]=" ['/showcase/blockui']" routerLinkActive="router-link-exact-active">BlockUI</a>
                    <a [routerLink]=" ['/showcase/captcha']" routerLinkActive="router-link-exact-active">Captcha</a>
                    <a [routerLink]=" ['/showcase/chip']" routerLinkActive="router-link-exact-active">Chip</a>
                    <a [routerLink]=" ['/showcase/inplace']" routerLinkActive="router-link-exact-active">Inplace</a>
                    <a [routerLink]=" ['/showcase/progressbar']" routerLinkActive="router-link-exact-active">ProgressBar</a>
                    <a [routerLink]=" ['/showcase/progressspinner']" routerLinkActive="router-link-exact-active">ProgressSpinner</a>
                    <a [routerLink]=" ['/showcase/scrolltop']" routerLinkActive="router-link-exact-active">ScrollTop</a>
                    <a [routerLink]=" ['/showcase/skeleton']" routerLinkActive="router-link-exact-active">Skeleton</a>
                    <a [routerLink]=" ['/showcase/tag']" routerLinkActive="router-link-exact-active">Tag <span class="p-tag">Tag</span></a>
                    <a [routerLink]=" ['/showcase/terminal']" routerLinkActive="router-link-exact-active">Terminal</a>
                </div>

                <div class="menu-category">Directives</div>
                <div class="menu-items">
                    <a [routerLink]=" ['/showcase/defer']" routerLinkActive="router-link-exact-active">Defer</a>
                    <a [routerLink]=" ['/showcase/focustrap']" routerLinkActive="router-link-exact-active">FocusTrap</a>
                    <a [routerLink]=" ['/showcase/styleclass']" routerLinkActive="router-link-exact-active">StyleClass <span class="p-tag">New</span></a>
                    <a [routerLink]=" ['/showcase/ripple']" routerLinkActive="router-link-exact-active">Ripple</a>
                </div>

                <div class="menu-category">Utilities</div>
                <div class="menu-items">
                    <a [routerLink]=" ['/showcase/filterservice']" routerLinkActive="router-link-exact-active">FilterService</a>
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
                {label: 'Icons v5', value: '/icons'}
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
