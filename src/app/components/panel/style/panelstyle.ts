import { BaseStyle } from 'primeng/base';

const theme = ({ dt }) => `
    .p-panel {
        border: 1px solid ${dt('panel.border.color')};
        border-radius: ${dt('panel.border.radius')};
        background: ${dt('panel.background')};
        color: ${dt('panel.color')};
    }
    
    .p-panel-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: ${dt('panel.header.padding')};
        // background: ${dt('panel.header.background')};
        background: red;
        color: ${dt('panel.header.color')};
        border-style: solid;
        border-width: ${dt('panel.header.border.width')};
        border-color: ${dt('panel.header.border.color')};
        border-radius: ${dt('panel.header.border.radius')};
    }
    
    .p-panel-toggleable .p-panel-header {
        padding: ${dt('panel.toggleable.header.padding')};
    }
    
    .p-panel-title {
        line-height: 1;
        font-weight: ${dt('panel.title.font.weight')};
    }
    
    .p-panel-content {
        padding: ${dt('panel.content.padding')};
    }
    
    .p-panel-footer {
        padding: ${dt('panel.footer.padding')};
    }
    `;

export default BaseStyle.extend({
    name: 'panel',
    theme
});
