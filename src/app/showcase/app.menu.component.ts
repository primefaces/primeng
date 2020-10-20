import { Component, Input } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Router } from '@angular/router';

declare let gtag: Function;

@Component({
    selector: 'app-menu',
    template: `
        <div class="layout-sidebar" [ngClass]="{'active': active}">
            <div class="layout-menu">
                <div class="menu-category">General</div>
                <div class="menu-items">
                    <a [routerLink]=" ['/setup']" routerLinkActive="router-link-exact-active">Get Started</a>
                    <a href="https://github.com/primefaces/primeng/wiki/Migration-Guide" target="_blank">Migration Guide</a>
                    <a href="https://github.com/primefaces/primeng" target="_blank">Source Code</a>
                    <a href="https://www.primefaces.org/store">Store</a>
                </div>

                <div class="menu-category">Support</div>
                <div class="menu-items">
                    <a href="https://forum.primefaces.org/viewforum.php?f=35" target="_blank">Community Forum</a>
                    <a [routerLink]=" ['/lts']" routerLinkActive="router-link-exact-active">Long Term Support</a>
                    <a [routerLink]=" ['/support']" routerLinkActive="router-link-exact-active">PRO Support</a>
                </div>

                <div class="menu-category">Theming</div>
                <div class="menu-items">
                    <a [routerLink]=" ['/theming']" routerLinkActive="router-link-exact-active">Guide</a>
                    <a href="https://www.primefaces.org/designer/primeng">Theme Designer</a>
                    <a href="https://www.primefaces.org/designer-ng">Visual Editor</a>
                    <a href="https://www.primefaces.org/designer/api/primeng/10.0.0">SASS API</a>
                </div>

                <div class="menu-category">PrimeFlex</div>
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
                    <a [routerLink]=" ['/icons']" routerLinkActive="router-link-exact-active">Icons v4.0</a>
                </div>

                <div class="menu-category">Form</div>
                <div class="menu-items">
                    <a [routerLink]=" ['/autocomplete']" routerLinkActive="router-link-exact-active">AutoComplete</a>
                    <a [routerLink]=" ['/calendar']" routerLinkActive="router-link-exact-active">Calendar</a>
                    <a [routerLink]=" ['/checkbox']" routerLinkActive="router-link-exact-active">Checkbox</a>
                    <a [routerLink]=" ['/chips']" routerLinkActive="router-link-exact-active">Chips</a>
                    <a [routerLink]=" ['/colorpicker']" routerLinkActive="router-link-exact-active">ColorPicker</a>
                    <a [routerLink]=" ['/dropdown']" routerLinkActive="router-link-exact-active">Dropdown</a>
                    <a [routerLink]=" ['/editor']" routerLinkActive="router-link-exact-active">Editor</a>
                    <a [routerLink]=" ['/inputgroup']" routerLinkActive="router-link-exact-active">InputGroup</a>
                    <a [routerLink]=" ['/inputmask']" routerLinkActive="router-link-exact-active">InputMask</a>
                    <a [routerLink]=" ['/inputswitch']" routerLinkActive="router-link-exact-active">InputSwitch</a>
                    <a [routerLink]=" ['/inputtext']" routerLinkActive="router-link-exact-active">InputText</a>
                    <a [routerLink]=" ['/inputtextarea']" routerLinkActive="router-link-exact-active">InputTextArea</a>
                    <a [routerLink]=" ['/inputnumber']" routerLinkActive="router-link-exact-active">InputNumber</a>
                    <a [routerLink]=" ['/floatlabel']" routerLinkActive="router-link-exact-active">FloatLabel</a>
                    <a [routerLink]=" ['/keyfilter']" routerLinkActive="router-link-exact-active">KeyFilter</a>
                    <a [routerLink]=" ['/listbox']" routerLinkActive="router-link-exact-active">Listbox</a>
                    <a [routerLink]=" ['/multiselect']" routerLinkActive="router-link-exact-active">MultiSelect</a>
                    <a [routerLink]=" ['/password']" routerLinkActive="router-link-exact-active">Password</a>
                    <a [routerLink]=" ['/radiobutton']" routerLinkActive="router-link-exact-active">RadioButton</a>
                    <a [routerLink]=" ['/rating']" routerLinkActive="router-link-exact-active">Rating</a>
                    <a [routerLink]=" ['/slider']" routerLinkActive="router-link-exact-active">Slider</a>
                    <a [routerLink]=" ['/selectbutton']" routerLinkActive="router-link-exact-active">SelectButton</a>
                    <a [routerLink]=" ['/togglebutton']" routerLinkActive="router-link-exact-active">ToggleButton</a>
                    <a [routerLink]=" ['/tristatecheckbox']" routerLinkActive="router-link-exact-active">TriCheckbox</a>
                </div>

                <div class="menu-category">Button</div>
                <div class="menu-items">
                    <a [routerLink]=" ['/button']" routerLinkActive="router-link-exact-active">Button</a>
                    <a [routerLink]=" ['/splitbutton']" routerLinkActive="router-link-exact-active">SplitButton</a>
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
                        <a tabindex="0" (click)="toggleSubmenu($event, '/table')">Table <span class="p-tag">New</span></a>
                        <div [@submenu]="isSubmenuActive('/table') ? 'visible': 'hidden'">
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
                                <li><a [routerLink]=" ['/table/filter']" routerLinkActive="router-link-exact-active" [routerLinkActiveOptions]="{exact:true}">Filter  <span class="p-tag">New</span></a></li>
                                <li><a [routerLink]=" ['/table/selection']" routerLinkActive="router-link-exact-active" [routerLinkActiveOptions]="{exact:true}">Selection</a></li>
                                <li><a [routerLink]=" ['/table/lazy']" routerLinkActive="router-link-exact-active" [routerLinkActiveOptions]="{exact:true}">Lazy</a></li>
                                <li><a [routerLink]=" ['/table/scroll']" routerLinkActive="router-link-exact-active" [routerLinkActiveOptions]="{exact:true}">Scroll</a></li>
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

                    <div>
                        <a tabindex="0" (click)="toggleSubmenu($event, '/tree')">Tree</a>
                        <div [@submenu]="isSubmenuActive('/tree') ? 'visible': 'hidden'">
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
                        <div [@submenu]="isSubmenuActive('/treetable') ? 'visible': 'hidden'">
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
                    <a [routerLink]=" ['/fieldset']" routerLinkActive="router-link-exact-active">Fieldset</a>
                    <a [routerLink]=" ['/panel']" routerLinkActive="router-link-exact-active">Panel</a>
                    <a [routerLink]=" ['/scrollpanel']" routerLinkActive="router-link-exact-active">ScrollPanel</a>
                    <a [routerLink]=" ['/tabview']" routerLinkActive="router-link-exact-active">TabView</a>
                    <a [routerLink]=" ['/toolbar']" routerLinkActive="router-link-exact-active">Toolbar</a>
                </div>

                <div class="menu-category">Overlay</div>
                <div class="menu-items">
                    <a [routerLink]=" ['/confirmdialog']" routerLinkActive="router-link-exact-active">ConfirmDialog</a>
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
                        <div [@submenu]="isSubmenuActive('/galleria') ? 'visible': 'hidden'">
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
                </div>

                <div class="menu-category">DragDrop</div>
                <div class="menu-items">
                    <a [routerLink]=" ['/dragdrop']" routerLinkActive="router-link-exact-active">Drag&amp;Drop</a>
                </div>
                
                <div class="menu-category">Misc</div>
                <div class="menu-items">
                    <a [routerLink]=" ['/blockui']" routerLinkActive="router-link-exact-active">BlockUI</a>
                    <a [routerLink]=" ['/badge']" routerLinkActive="router-link-exact-active">Badge</a>
                    <a [routerLink]=" ['/captcha']" routerLinkActive="router-link-exact-active">Captcha</a>
                    <a [routerLink]=" ['/defer']" routerLinkActive="router-link-exact-active">Defer</a>
                    <a [routerLink]=" ['/filterutils']" routerLinkActive="router-link-exact-active">FilterUtils</a>
                    <a [routerLink]=" ['/focustrap']" routerLinkActive="router-link-exact-active">FocusTrap</a>
                    <a [routerLink]=" ['/inplace']" routerLinkActive="router-link-exact-active">Inplace</a>
                    <a [routerLink]=" ['/progressbar']" routerLinkActive="router-link-exact-active">ProgressBar</a>
                    <a [routerLink]=" ['/progressspinner']" routerLinkActive="router-link-exact-active">ProgressSpinner</a>
                    <a [routerLink]=" ['/ripple']" routerLinkActive="router-link-exact-active">Ripple</a>
                    <a [routerLink]=" ['/terminal']" routerLinkActive="router-link-exact-active">Terminal</a>
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

    constructor(private router: Router) {}

    toggleSubmenu(event: Event, name: string) {
        this.activeSubmenus[name] = this.activeSubmenus[name] ? false: true;
        event.preventDefault();
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