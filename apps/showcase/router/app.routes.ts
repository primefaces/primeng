import { AppMainComponent } from '@/components/layout/app.main.component';
import { LandingComponent } from '@/pages/landing/landing.component';
import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', component: LandingComponent, pathMatch: 'full' },
    {
        path: '',
        component: AppMainComponent,
        children: [
            { path: '', redirectTo: 'installation', pathMatch: 'full' },
            { path: 'accessibility', redirectTo: 'guides/accessibility', pathMatch: 'full' },
            { path: 'autocomplete', loadChildren: () => import('@/pages/autocomplete/routes') },
            {
                path: 'installation',
                loadChildren: () => import('@/pages/installation/routes')
            },
            {
                path: 'configuration',
                loadChildren: () => import('@/pages/configuration/routes')
            },
            { path: 'playground', loadChildren: () => import('@/pages/playground/routes') },
            { path: 'roadmap', loadChildren: () => import('@/pages/roadmap/routes') },
            { path: 'team', loadChildren: () => import('@/pages/team/routes') },
            { path: 'partners', loadChildren: () => import('@/pages/partners/routes') },
            {
                path: 'theming',
                loadChildren: () => import('@/pages/theming/routes')
            },
            { path: 'icons', loadChildren: () => import('@/pages/icons/routes') },
            {
                path: 'customicons',
                loadChildren: () => import('@/pages/customicons/routes')
            },
            { path: 'accordion', loadChildren: () => import('@/pages/accordion/routes') },
            { path: 'avatar', loadChildren: () => import('@/pages/avatar/routes') },
            { path: 'blockui', loadChildren: () => import('@/pages/blockui/routes') },
            { path: 'badge', loadChildren: () => import('@/pages/badge/routes') },
            { path: 'breadcrumb', loadChildren: () => import('@/pages/breadcrumb/routes') },
            { path: 'button', loadChildren: () => import('@/pages/button/routes') },
            {
                path: 'datepicker',
                loadChildren: () => import('@/pages/datepicker/routes')
            },
            { path: 'card', loadChildren: () => import('@/pages/card/routes') },
            {
                path: 'cascadeselect',
                loadChildren: () => import('@/pages/cascadeselect/routes')
            },
            { path: 'carousel', loadChildren: () => import('@/pages/carousel/routes') },
            { path: 'chart', loadChildren: () => import('@/pages/chart/routes') },
            { path: 'checkbox', loadChildren: () => import('@/pages/checkbox/routes') },
            { path: 'chip', loadChildren: () => import('@/pages/chip/routes') },
            {
                path: 'colorpicker',
                loadChildren: () => import('@/pages/colorpicker/routes')
            },
            { path: 'colors', loadChildren: () => import('@/pages/colors/routes') },
            {
                path: 'confirmdialog',
                loadChildren: () => import('@/pages/confirmdialog/routes')
            },
            {
                path: 'confirmpopup',
                loadChildren: () => import('@/pages/confirmpopup/routes')
            },
            {
                path: 'contextmenu',
                loadChildren: () => import('@/pages/contextmenu/routes')
            },
            {
                path: 'dataview',
                loadChildren: () => import('@/pages/dataview/routes')
            },
            { path: 'defer', loadChildren: () => import('@/pages/defer/routes') },
            { path: 'dialog', loadChildren: () => import('@/pages/dialog/routes') },
            { path: 'dock', loadChildren: () => import('@/pages/dock/routes') },
            { path: 'divider', loadChildren: () => import('@/pages/divider/routes') },
            {
                path: 'dynamicdialog',
                loadChildren: () => import('@/pages/dynamicdialog/routes')
            },
            {
                path: 'dragdrop',
                loadChildren: () => import('@/pages/dragdrop/routes')
            },
            { path: 'select', loadChildren: () => import('@/pages/select/routes') },
            {
                path: 'iconfield',
                loadChildren: () => import('@/pages/iconfield/routes')
            },
            {
                path: 'iftalabel',
                loadChildren: () => import('@/pages/iftalabel/routes')
            },
            { path: 'editor', loadChildren: () => import('@/pages/editor/routes') },
            {
                path: 'floatlabel',
                loadChildren: () => import('@/pages/floatlabel/routes')
            },
            {
                path: 'fieldset',
                loadChildren: () => import('@/pages/fieldset/routes')
            },
            {
                path: 'fileupload',
                loadChildren: () => import('@/pages/fileupload/routes')
            },
            {
                path: 'filterservice',
                loadChildren: () => import('@/pages/filterservice/routes')
            },
            {
                path: 'focustrap',
                loadChildren: () => import('@/pages/focustrap/routes')
            },
            {
                path: 'galleria',
                loadChildren: () => import('@/pages/galleria/routes')
            },
            { path: 'image', loadChildren: () => import('@/pages/image/routes') },
            { path: 'inplace', loadChildren: () => import('@/pages/inplace/routes') },
            { path: 'fluid', loadChildren: () => import('@/pages/fluid/routes') },
            {
                path: 'metergroup',
                loadChildren: () => import('@/pages/metergroup/routes')
            },
            {
                path: 'inputmask',
                loadChildren: () => import('@/pages/inputmask/routes')
            },
            {
                path: 'inputnumber',
                loadChildren: () => import('@/pages/inputnumber/routes')
            },
            {
                path: 'inputotp',
                loadChildren: () => import('@/pages/inputotp/routes')
            },
            {
                path: 'toggleswitch',
                loadChildren: () => import('@/pages/toggleswitch/routes')
            },
            {
                path: 'inputtext',
                loadChildren: () => import('@/pages/inputtext/routes')
            },
            {
                path: 'inputgroup',
                loadChildren: () => import('@/pages/inputgroup/routes')
            },
            {
                path: 'textarea',
                loadChildren: () => import('@/pages/textarea/routes')
            },
            { path: 'knob', loadChildren: () => import('@/pages/knob/routes') },
            {
                path: 'keyfilter',
                loadChildren: () => import('@/pages/keyfilter/routes')
            },
            { path: 'listbox', loadChildren: () => import('@/pages/listbox/routes') },
            { path: 'lts', loadChildren: () => import('@/pages/lts/routes') },
            {
                path: 'megamenu',
                loadChildren: () => import('@/pages/megamenu/routes')
            },
            { path: 'menu', loadChildren: () => import('@/pages/menu/routes') },
            { path: 'menubar', loadChildren: () => import('@/pages/menubar/routes') },
            { path: 'message', loadChildren: () => import('@/pages/message/routes') },
            {
                path: 'multiselect',
                loadChildren: () => import('@/pages/multiselect/routes')
            },
            {
                path: 'orderlist',
                loadChildren: () => import('@/pages/orderlist/routes')
            },
            {
                path: 'organizationchart',
                loadChildren: () => import('@/pages/organizationchart/routes')
            },
            { path: 'popover', loadChildren: () => import('@/pages/popover/routes') },
            {
                path: 'paginator',
                loadChildren: () => import('@/pages/paginator/routes')
            },
            { path: 'panel', loadChildren: () => import('@/pages/panel/routes') },
            {
                path: 'panelmenu',
                loadChildren: () => import('@/pages/panelmenu/routes')
            },
            {
                path: 'password',
                loadChildren: () => import('@/pages/password/routes')
            },
            {
                path: 'picklist',
                loadChildren: () => import('@/pages/picklist/routes')
            },
            {
                path: 'progressbar',
                loadChildren: () => import('@/pages/progressbar/routes')
            },
            {
                path: 'progressspinner',
                loadChildren: () => import('@/pages/progressspinner/routes')
            },
            {
                path: 'radiobutton',
                loadChildren: () => import('@/pages/radiobutton/routes')
            },
            { path: 'rating', loadChildren: () => import('@/pages/rating/routes') },
            { path: 'ripple', loadChildren: () => import('@/pages/ripple/routes') },
            {
                path: 'scrollpanel',
                loadChildren: () => import('@/pages/scrollpanel/routes')
            },
            {
                path: 'scrolltop',
                loadChildren: () => import('@/pages/scrolltop/routes')
            },
            {
                path: 'selectbutton',
                loadChildren: () => import('@/pages/selectbutton/routes')
            },
            { path: 'drawer', loadChildren: () => import('@/pages/drawer/routes') },
            {
                path: 'skeleton',
                loadChildren: () => import('@/pages/skeleton/routes')
            },
            { path: 'slider', loadChildren: () => import('@/pages/slider/routes') },
            {
                path: 'speeddial',
                loadChildren: () => import('@/pages/speeddial/routes')
            },
            {
                path: 'splitbutton',
                loadChildren: () => import('@/pages/splitbutton/routes')
            },
            {
                path: 'splitter',
                loadChildren: () => import('@/pages/splitter/routes')
            },
            { path: 'stepper', loadChildren: () => import('@/pages/stepper/routes') },
            { path: 'steps', loadChildren: () => import('@/pages/steps/routes') },
            { path: 'support', loadChildren: () => import('@/pages/support/routes') },
            {
                path: 'styleclass',
                loadChildren: () => import('@/pages/styleclass/routes')
            },
            { path: 'tag', loadChildren: () => import('@/pages/tag/routes') },
            { path: 'table', loadChildren: () => import('@/pages/table/routes') },
            { path: 'tabs', loadChildren: () => import('@/pages/tabs/routes') },
            {
                path: 'tailwind',
                loadChildren: () => import('@/pages/tailwind/routes')
            },
            {
                path: 'terminal',
                loadChildren: () => import('@/pages/terminal/routes')
            },
            {
                path: 'tieredmenu',
                loadChildren: () => import('@/pages/tieredmenu/routes')
            },
            {
                path: 'timeline',
                loadChildren: () => import('@/pages/timeline/routes')
            },
            { path: 'toast', loadChildren: () => import('@/pages/toast/routes') },
            {
                path: 'togglebutton',
                loadChildren: () => import('@/pages/togglebutton/routes')
            },
            { path: 'toolbar', loadChildren: () => import('@/pages/toolbar/routes') },
            { path: 'tooltip', loadChildren: () => import('@/pages/tooltip/routes') },
            { path: 'tree', loadChildren: () => import('@/pages/tree/routes') },
            {
                path: 'treeselect',
                loadChildren: () => import('@/pages/treeselect/routes')
            },
            {
                path: 'treetable',
                loadChildren: () => import('@/pages/treetable/routes')
            },
            {
                path: 'virtualscroller',
                loadChildren: () => import('@/pages/scroller/routes')
            },
            { path: 'uikit', loadChildren: () => import('@/pages/uikit/routes') },
            { path: 'autofocus', loadChildren: () => import('@/pages/autofocus/routes') },
            { path: 'overlay', loadChildren: () => import('@/pages/overlay/routes') },
            {
                path: 'animateonscroll',
                loadChildren: () => import('@/pages/animateonscroll/routes')
            },
            { path: 'templates', loadChildren: () => import('@/pages/templates/templates.module').then((m) => m.TemplatesModule) },
            { path: 'guides', loadChildren: () => import('@/pages/guides/guides.module').then((m) => m.GuidesModule) }
        ]
    },
    { path: 'notfound', loadChildren: () => import('@/pages/notfound/routes') },
    { path: '**', redirectTo: '/notfound' }
];
