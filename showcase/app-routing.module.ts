import {Routes,RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {HomePageComponent} from './homepage.component';

@NgModule({
    imports: [
        RouterModule.forRoot([
            {path: '', component: HomePageComponent},
            {path: 'setup', loadChildren: () => new Promise(function (resolve) {
                (require as any).ensure([], function (require: any) {
                  resolve(require('./setup/setup.module')['SetupModule']);
                });
            })},
            {path: 'theming', loadChildren: () => new Promise(function (resolve) {
                (require as any).ensure([], function (require: any) {
                  resolve(require('./theming/theming.module')['ThemingModule']);
                });
            })},
            {path: 'accordion', loadChildren: () => new Promise(function (resolve) {
              (require as any).ensure([], function (require: any) {
                resolve(require('./demo/accordion/accordiondemo.module')['AccordionDemoModule']);
              });
            })},
            {path: 'autocomplete', loadChildren: () => new Promise(function (resolve) {
              (require as any).ensure([], function (require: any) {
                resolve(require('./demo/autocomplete/autocompletedemo.module')['AutoCompleteDemoModule']);
              });
            })},
            {path: 'blockui', loadChildren: () => new Promise(function (resolve) {
              (require as any).ensure([], function (require: any) {
                resolve(require('./demo/blockui/blockuidemo.module')['BlockUIDemoModule']);
              });
            })},
            {path: 'breadcrumb', loadChildren: () => new Promise(function (resolve) {
              (require as any).ensure([], function (require: any) {
                resolve(require('./demo/breadcrumb/breadcrumbdemo.module')['BreadcrumbDemoModule']);
              });
            })},
            {path: 'button', loadChildren: () => new Promise(function (resolve) {
              (require as any).ensure([], function (require: any) {
                resolve(require('./demo/button/buttondemo.module')['ButtonDemoModule']);
              });
            })},
            {path: 'calendar', loadChildren: () => new Promise(function (resolve) {
              (require as any).ensure([], function (require: any) {
                resolve(require('./demo/calendar/calendardemo.module')['CalendarDemoModule']);
              });
            })},
            {path: 'carousel', loadChildren: () => new Promise(function (resolve) {
              (require as any).ensure([], function (require: any) {
                resolve(require('./demo/carousel/carouseldemo.module')['CarouselDemoModule']);
              });
            })},
            {path: 'chart', loadChildren: () => new Promise(function (resolve) {
              (require as any).ensure([], function (require: any) {
                resolve(require('./demo/chart/chartdemo.module')['ChartDemoModule']);
              });
            })},
            {path: 'checkbox', loadChildren: () => new Promise(function (resolve) {
              (require as any).ensure([], function (require: any) {
                resolve(require('./demo/checkbox/checkboxdemo.module')['CheckboxDemoModule']);
              });
            })},
            {path: 'chips', loadChildren: () => new Promise(function (resolve) {
              (require as any).ensure([], function (require: any) {
                resolve(require('./demo/chips/chipsdemo.module')['ChipsDemoModule']);
              });
            })},
            {path: 'codehighlighter', loadChildren: () => new Promise(function (resolve) {
              (require as any).ensure([], function (require: any) {
                resolve(require('./demo/codehighlighter/codehighlighterdemo.module')['CodeHighlighterDemoModule']);
              });
            })},
            {path: 'confirmdialog', loadChildren: () => new Promise(function (resolve) {
              (require as any).ensure([], function (require: any) {
                resolve(require('./demo/confirmdialog/confirmdialogdemo.module')['ConfirmDialogDemoModule']);
              });
            })},
            {path: 'contextmenu', loadChildren: () => new Promise(function (resolve) {
              (require as any).ensure([], function (require: any) {
                resolve(require('./demo/contextmenu/contextmenudemo.module')['ContextMenuDemoModule']);
              });
            })},
            {path: 'datagrid', loadChildren: () => new Promise(function (resolve) {
              (require as any).ensure([], function (require: any) {
                resolve(require('./demo/datagrid/datagriddemo.module')['DataGridDemoModule']);
              });
            })},
            {path: 'datalist', loadChildren: () => new Promise(function (resolve) {
              (require as any).ensure([], function (require: any) {
                resolve(require('./demo/datalist/datalistdemo.module')['DataListDemoModule']);
              });
            })},
            {path: 'datascroller', loadChildren: () => new Promise(function (resolve) {
              (require as any).ensure([], function (require: any) {
                resolve(require('./demo/datascroller/datascrollerdemo.module')['DataScrollerDemoModule']);
              });
            })},
            {path: 'datatable', loadChildren: () => new Promise(function (resolve) {
              (require as any).ensure([], function (require: any) {
                resolve(require('./demo/datatable/datatabledemo.module')['DataTableDemoModule']);
              });
            })},
            {path: 'dialog', loadChildren: () => new Promise(function (resolve) {
              (require as any).ensure([], function (require: any) {
                resolve(require('./demo/dialog/dialogdemo.module')['DialogDemoModule']);
              });
            })},
            {path: 'dragdrop', loadChildren: () => new Promise(function (resolve) {
              (require as any).ensure([], function (require: any) {
                resolve(require('./demo/dragdrop/dragdropdemo.module')['DragDropDemoModule']);
              });
            })},
            {path: 'dropdown', loadChildren: () => new Promise(function (resolve) {
              (require as any).ensure([], function (require: any) {
                resolve(require('./demo/dropdown/dropdowndemo.module')['DropdownDemoModule']);
              });
            })},
            {path: 'editor', loadChildren: () => new Promise(function (resolve) {
              (require as any).ensure([], function (require: any) {
                resolve(require('./demo/editor/editordemo.module')['EditorDemoModule']);
              });
            })},
            {path: 'fieldset', loadChildren: () => new Promise(function (resolve) {
              (require as any).ensure([], function (require: any) {
                resolve(require('./demo/fieldset/fieldsetdemo.module')['FieldsetDemoModule']);
              });
            })},
            {path: 'fileupload', loadChildren: () => new Promise(function (resolve) {
              (require as any).ensure([], function (require: any) {
                resolve(require('./demo/fileupload/fileuploaddemo.module')['FileUploadDemoModule']);
              });
            })},
            {path: 'galleria', loadChildren: () => new Promise(function (resolve) {
              (require as any).ensure([], function (require: any) {
                resolve(require('./demo/galleria/galleriademo.module')['GalleriaDemoModule']);
              });
            })},
            {path: 'gmap', loadChildren: () => new Promise(function (resolve) {
              (require as any).ensure([], function (require: any) {
                resolve(require('./demo/gmap/gmapdemo.module')['GMapDemoModule']);
              });
            })},
            {path: 'grid', loadChildren: () => new Promise(function (resolve) {
              (require as any).ensure([], function (require: any) {
                resolve(require('./demo/grid/griddemo.module')['GridDemoModule']);
              });
            })},
            {path: 'growl', loadChildren: () => new Promise(function (resolve) {
              (require as any).ensure([], function (require: any) {
                resolve(require('./demo/growl/growldemo.module')['GrowlDemoModule']);
              });
            })},
            {path: 'inplace', loadChildren: () => new Promise(function (resolve) {
              (require as any).ensure([], function (require: any) {
                resolve(require('./demo/inplace/inplacedemo.module')['InplaceDemoModule']);
              });
            })},
            {path: 'inputmask', loadChildren: () => new Promise(function (resolve) {
              (require as any).ensure([], function (require: any) {
                resolve(require('./demo/inputmask/inputmaskdemo.module')['InputMaskDemoModule']);
              });
            })},
            {path: 'inputswitch', loadChildren: () => new Promise(function (resolve) {
              (require as any).ensure([], function (require: any) {
                resolve(require('./demo/inputswitch/inputswitchdemo.module')['InputSwitchDemoModule']);
              });
            })},
            {path: 'inputtext', loadChildren: () => new Promise(function (resolve) {
              (require as any).ensure([], function (require: any) {
                resolve(require('./demo/inputtext/inputtextdemo.module')['InputTextDemoModule']);
              });
            })},
            {path: 'inputtextarea', loadChildren: () => new Promise(function (resolve) {
              (require as any).ensure([], function (require: any) {
                resolve(require('./demo/inputtextarea/inputtextareademo.module')['InputTextareaDemoModule']);
              });
            })},
            {path: 'lightbox', loadChildren: () => new Promise(function (resolve) {
              (require as any).ensure([], function (require: any) {
                resolve(require('./demo/lightbox/lightboxdemo.module')['LightboxDemoModule']);
              });
            })},
            {path: 'listbox', loadChildren: () => new Promise(function (resolve) {
              (require as any).ensure([], function (require: any) {
                resolve(require('./demo/listbox/listboxdemo.module')['ListboxDemoModule']);
              });
            })},
            {path: 'megamenu', loadChildren: () => new Promise(function (resolve) {
              (require as any).ensure([], function (require: any) {
                resolve(require('./demo/megamenu/megamenudemo.module')['MegaMenuDemoModule']);
              });
            })},
            {path: 'menu', loadChildren: () => new Promise(function (resolve) {
              (require as any).ensure([], function (require: any) {
                resolve(require('./demo/menu/menudemo.module')['MenuDemoModule']);
              });
            })},
            {path: 'menubar', loadChildren: () => new Promise(function (resolve) {
              (require as any).ensure([], function (require: any) {
                resolve(require('./demo/menubar/menubardemo.module')['MenubarDemoModule']);
              });
            })},
            {path: 'menumodel', loadChildren: () => new Promise(function (resolve) {
              (require as any).ensure([], function (require: any) {
                resolve(require('./demo/menumodel/menumodeldemo.module')['MenuModelDemoModule']);
              });
            })},
            {path: 'messages', loadChildren: () => new Promise(function (resolve) {
              (require as any).ensure([], function (require: any) {
                resolve(require('./demo/messages/messagesdemo.module')['MessagesDemoModule']);
              });
            })},
            {path: 'multiselect', loadChildren: () => new Promise(function (resolve) {
              (require as any).ensure([], function (require: any) {
                resolve(require('./demo/multiselect/multiselectdemo.module')['MultiSelectDemoModule']);
              });
            })},
            {path: 'orderlist', loadChildren: () => new Promise(function (resolve) {
              (require as any).ensure([], function (require: any) {
                resolve(require('./demo/orderlist/orderlistdemo.module')['OrderListDemoModule']);
              });
            })},
            {path: 'overlaypanel', loadChildren: () => new Promise(function (resolve) {
              (require as any).ensure([], function (require: any) {
                resolve(require('./demo/overlaypanel/overlaypaneldemo.module')['OverlayPanelDemoModule']);
              });
            })},
            {path: 'paginator', loadChildren: () => new Promise(function (resolve) {
              (require as any).ensure([], function (require: any) {
                resolve(require('./demo/paginator/paginatordemo.module')['PaginatorDemoModule']);
              });
            })},
            {path: 'panel', loadChildren: () => new Promise(function (resolve) {
              (require as any).ensure([], function (require: any) {
                resolve(require('./demo/panel/paneldemo.module')['PanelDemoModule']);
              });
            })},
            {path: 'panelmenu', loadChildren: () => new Promise(function (resolve) {
              (require as any).ensure([], function (require: any) {
                resolve(require('./demo/panelmenu/panelmenudemo.module')['PanelMenuDemoModule']);
              });
            })},
            {path: 'password', loadChildren: () => new Promise(function (resolve) {
              (require as any).ensure([], function (require: any) {
                resolve(require('./demo/password/passworddemo.module')['PasswordDemoModule']);
              });
            })},
            {path: 'picklist', loadChildren: () => new Promise(function (resolve) {
              (require as any).ensure([], function (require: any) {
                resolve(require('./demo/picklist/picklistdemo.module')['PickListDemoModule']);
              });
            })},
            {path: 'progressbar', loadChildren: () => new Promise(function (resolve) {
              (require as any).ensure([], function (require: any) {
                resolve(require('./demo/progressbar/progressbardemo.module')['ProgressBarDemoModule']);
              });
            })},
            {path: 'radiobutton', loadChildren: () => new Promise(function (resolve) {
              (require as any).ensure([], function (require: any) {
                resolve(require('./demo/radiobutton/radiobuttondemo.module')['RadioButtonDemoModule']);
              });
            })},
            {path: 'rating', loadChildren: () => new Promise(function (resolve) {
              (require as any).ensure([], function (require: any) {
                resolve(require('./demo/rating/ratingdemo.module')['RatingDemoModule']);
              });
            })},
            {path: 'responsive', loadChildren: () => new Promise(function (resolve) {
              (require as any).ensure([], function (require: any) {
                resolve(require('./demo/responsive/responsivedemo.module')['ResponsiveDemoModule']);
              });
            })},
            {path: 'schedule', loadChildren: () => new Promise(function (resolve) {
              (require as any).ensure([], function (require: any) {
                resolve(require('./demo/schedule/scheduledemo.module')['ScheduleDemoModule']);
              });
            })},
            {path: 'selectbutton', loadChildren: () => new Promise(function (resolve) {
              (require as any).ensure([], function (require: any) {
                resolve(require('./demo/selectbutton/selectbuttondemo.module')['SelectButtonDemoModule']);
              });
            })},
            {path: 'slidemenu', loadChildren: () => new Promise(function (resolve) {
              (require as any).ensure([], function (require: any) {
                resolve(require('./demo/slidemenu/slidemenudemo.module')['SlideMenuDemoModule']);
              });
            })},
            {path: 'slider', loadChildren: () => new Promise(function (resolve) {
              (require as any).ensure([], function (require: any) {
                resolve(require('./demo/slider/sliderdemo.module')['SliderDemoModule']);
              });
            })},
            {path: 'spinner', loadChildren: () => new Promise(function (resolve) {
              (require as any).ensure([], function (require: any) {
                resolve(require('./demo/spinner/spinnerdemo.module')['SpinnerDemoModule']);
              });
            })},
            {path: 'splitbutton', loadChildren: () => new Promise(function (resolve) {
              (require as any).ensure([], function (require: any) {
                resolve(require('./demo/splitbutton/splitbuttondemo.module')['SplitButtonDemoModule']);
              });
            })},
            {path: 'steps', loadChildren: () => new Promise(function (resolve) {
              (require as any).ensure([], function (require: any) {
                resolve(require('./demo/steps/stepsdemo.module')['StepsDemoModule']);
              });
            })},
            {path: 'tabmenu', loadChildren: () => new Promise(function (resolve) {
              (require as any).ensure([], function (require: any) {
                resolve(require('./demo/tabmenu/tabmenudemo.module')['TabMenuDemoModule']);
              });
            })},
            {path: 'tabview', loadChildren: () => new Promise(function (resolve) {
              (require as any).ensure([], function (require: any) {
                resolve(require('./demo/tabview/tabviewdemo.module')['TabViewDemoModule']);
              });
            })},
            {path: 'terminal', loadChildren: () => new Promise(function (resolve) {
              (require as any).ensure([], function (require: any) {
                resolve(require('./demo/terminal/terminaldemo.module')['TerminalDemoModule']);
              });
            })},
            {path: 'tieredmenu', loadChildren: () => new Promise(function (resolve) {
              (require as any).ensure([], function (require: any) {
                resolve(require('./demo/tieredmenu/tieredmenudemo.module')['TieredMenuDemoModule']);
              });
            })},
            {path: 'togglebutton', loadChildren: () => new Promise(function (resolve) {
              (require as any).ensure([], function (require: any) {
                resolve(require('./demo/togglebutton/togglebuttondemo.module')['ToggleButtonDemoModule']);
              });
            })},
            {path: 'toolbar', loadChildren: () => new Promise(function (resolve) {
              (require as any).ensure([], function (require: any) {
                resolve(require('./demo/toolbar/toolbardemo.module')['ToolbarDemoModule']);
              });
            })},
            {path: 'tooltip', loadChildren: () => new Promise(function (resolve) {
              (require as any).ensure([], function (require: any) {
                resolve(require('./demo/tooltip/tooltipdemo.module')['TooltipDemoModule']);
              });
            })},
            {path: 'tree', loadChildren: () => new Promise(function (resolve) {
              (require as any).ensure([], function (require: any) {
                resolve(require('./demo/tree/treedemo.module')['TreeDemoModule']);
              });
            })},
            {path: 'treetable', loadChildren: () => new Promise(function (resolve) {
              (require as any).ensure([], function (require: any) {
                resolve(require('./demo/treetable/treetabledemo.module')['TreeTableDemoModule']);
              });
            })},
            {path: 'tristatecheckbox', loadChildren: () => new Promise(function (resolve) {
              (require as any).ensure([], function (require: any) {
                resolve(require('./demo/tristatecheckbox/tristatecheckboxdemo.module')['TriStateCheckboxDemoModule']);
              });
            })},
            {path: 'validation', loadChildren: () => new Promise(function (resolve) {
              (require as any).ensure([], function (require: any) {
                resolve(require('./demo/validation/validationdemo.module')['ValidationDemoModule']);
              });
            })}
        ])    
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {}
