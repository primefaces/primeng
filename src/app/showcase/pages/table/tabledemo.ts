import { Component } from '@angular/core';
import { ContextMenuDoc } from '@doc/table/contextmenudoc';
import { BasicDoc } from '@doc/table/basicdoc';
import { CellEditDoc } from '@doc/table/celleditdoc';
import { CheckboxSelectionDoc } from '@doc/table/checkboxselectiondoc';
import { ColumnGroupDoc } from '@doc/table/columngroupdoc';
import { ColumnResizeExpandModeDoc } from '@doc/table/columnresizeexpandmodedoc';
import { ColumnResizeScrollableModeDoc } from '@doc/table/columnresizescrollablemodedoc';
import { ColumnSelectionDoc } from '@doc/table/columnselectiondoc';
import { ColumnToggleDoc } from '@doc/table/columntoggledoc';
import { CustomersDoc } from '@doc/table/customersdoc';
import { DynamicDoc } from '@doc/table/dynamicdoc';
import { ExpandableRowGroupDoc } from '@doc/table/expandablerowgroupdoc';
import { ExportDoc } from '@doc/table/exportdoc';
import { FilterBasicDoc } from '@doc/table/filterbasic';
import { FlexibleScrollDoc } from '@doc/table/flexiblescrolldoc';
import { FrozenColumnsDoc } from '@doc/table/frozencolumnsdoc';
import { FrozenRowsDoc } from '@doc/table/frozenrowsdoc';
import { GridlinesDoc } from '@doc/table/gridlinesdoc';
import { ImportDoc } from '@doc/table/importdoc';
import { HorizontalScrollDoc } from '@doc/table/horizontalscrolldoc';
import { LazyLoadDoc } from '@doc/table/lazyloaddoc';
import { MultipleSelectionDoc } from '@doc/table/multipleselectiondoc';
import { PaginatorBasicDoc } from '@doc/table/paginatorbasicdoc';
import { PaginatorProgrammaticDoc } from '@doc/table/paginatorprogrammaticdoc';
import { ProductsDoc } from '@doc/table/productsdoc';
import { RadioButtonSelectionDoc } from '@doc/table/radiobuttonselectiondoc';
import { ReorderDoc } from '@doc/table/reorderdoc';
import { ResponsiveScrollDoc } from '@doc/table/responsivescrolldoc';
import { ResponsiveStackDoc } from '@doc/table/responsivestackdoc';
import { RowEditDoc } from '@doc/table/roweditdoc';
import { RowExpansionDoc } from '@doc/table/rowexpansiondoc';
import { RowspanGroupingDoc } from '@doc/table/rowspangroupingdoc';
import { SingleColumnSortDoc } from '@doc/table/singlecolumnsortdoc';
import { MultipleColumnsSortDoc } from '@doc/table/multiplecolumnssortdoc';
import { SingleSelectionDoc } from '@doc/table/singleselectiondoc';
import { SizeDoc } from '@doc/table/sizedoc';
import { StatefulDoc } from '@doc/table/statefuldoc';
import { StripedDoc } from '@doc/table/stripeddoc';
import { StyleDoc } from '@doc/table/styledoc';
import { SubheaderGroupingDoc } from '@doc/table/subheadergroupingdoc';
import { TemplateDoc } from '@doc/table/templatedoc';
import { VerticalScrollDoc } from '@doc/table/verticalscrolldoc';
import { VirtualScrollDoc } from '@doc/table/virtualscrolldoc';
import { VirtualScrollLazyDoc } from '@doc/table/virtualscrolllazydoc';
import { ColumnResizeFitModeDoc } from '@doc/table/columnresizefitmodedoc';
import { SelectionEventsDoc } from '@doc/table/selectioneventsdoc';
import { StylingDoc } from '@doc/table/stylingdoc';
import { AccessibilityDoc } from '@doc/table/accessibilitydoc';
import { PreSortDoc } from '@doc/table/presortdoc';
import { FilterSortEditDoc } from '@doc/table/filtersorteditdoc';
import { RemovableSortDoc } from '@doc/table/removablesortdoc';
import { FilterAdvancedDoc } from '@doc/table/filteradvanceddoc';

@Component({
    templateUrl: './tabledemo.html',
    styleUrls: ['./tabledemo.scss']
})
export class TableDemo {
    docs = [
    
        {
            id: 'column-toggle',
            label: 'Column Toggle',
            component: ColumnToggleDoc
        },
      
    ];
}
