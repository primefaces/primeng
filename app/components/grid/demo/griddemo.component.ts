import {Component} from 'angular2/core';

@Component({
    styles:[`
        .pui-grid {
            margin-bottom: 10px;
        }

        .pui-grid .pui-grid-row div {
            background-color: #cccccc;
            text-align: center;
            border: 1px solid #dddddd;
            padding: 10px 0px;
        }
    `],
    template: `
        <div class="ContentSideSections">
        <div class="Content100 overHidden TextShadow">
            <span class="fontSize30 TextShadow orange mediumFont marginBottom20 dispBlock">Grid CSS</span>
            <span class="defaultText dispTable">Grid CSS is a lightweight (1.4KB) responsive layout utility optimized for mobile devices, tablets and desktops.</span>
        </div>
    </div>

    <div class="ContentSideSections Implementation">
        <h3 class="first">Responsive and Fluid</h3>
        <div class="pui-grid pui-grid-responsive">
            <div class="pui-grid-row">
                <div class="pui-grid-col-1">1</div>
                <div class="pui-grid-col-1">1</div>
                <div class="pui-grid-col-1">1</div>
                <div class="pui-grid-col-1">1</div>
                <div class="pui-grid-col-1">1</div>
                <div class="pui-grid-col-1">1</div>
                <div class="pui-grid-col-1">1</div>
                <div class="pui-grid-col-1">1</div>
                <div class="pui-grid-col-1">1</div>
                <div class="pui-grid-col-1">1</div>
                <div class="pui-grid-col-1">1</div>
                <div class="pui-grid-col-1">1</div>
            </div>
        </div>
        
        <div class="pui-grid pui-grid-responsive">
            <div class="pui-grid-row">
                <div class="pui-grid-col-2">2</div>
                <div class="pui-grid-col-2">2</div>
                <div class="pui-grid-col-2">2</div>
                <div class="pui-grid-col-2">2</div>
                <div class="pui-grid-col-2">2</div>
                <div class="pui-grid-col-2">2</div>
            </div>
        </div>
        
        <div class="pui-grid pui-grid-responsive">
            <div class="pui-grid-row">
                <div class="pui-grid-col-3">3</div>
                <div class="pui-grid-col-3">3</div>
                <div class="pui-grid-col-3">3</div>
                <div class="pui-grid-col-3">3</div>
            </div>
        </div>
        
        <div class="pui-grid pui-grid-responsive">
            <div class="pui-grid-row">
                <div class="pui-grid-col-4">4</div>
                <div class="pui-grid-col-4">4</div>
                <div class="pui-grid-col-4">4</div>
            </div>
        </div>
        
        <div class="pui-grid pui-grid-responsive">
            <div class="pui-grid-row">
                <div class="pui-grid-col-6">6</div>
                <div class="pui-grid-col-6">6</div>
            </div>
        </div>
        
        <div class="pui-grid pui-grid-responsive">
            <div class="pui-grid-row">
                <div class="pui-grid-col-12">12</div>
            </div>
        </div>
        
        <div class="pui-grid pui-grid-responsive">
            <div class="pui-grid-row">
                <div class="pui-grid-col-4">4</div>
                <div class="pui-grid-col-8">8</div>
            </div>
        </div>
        
        <div class="pui-grid pui-grid-responsive">
            <div class="pui-grid-row">
                <div class="pui-grid-col-3">3</div>
                <div class="pui-grid-col-9">9</div>
            </div>
        </div>
        
        <div class="pui-grid pui-grid-responsive">
            <div class="pui-grid-row">
                <div class="pui-grid-col-3">3</div>
                <div class="pui-grid-col-5">5</div>
                <div class="pui-grid-col-4">4</div>
            </div>
        </div>
        
        <div class="pui-grid pui-grid-responsive">
            <div class="pui-grid-row">
                <div class="pui-grid-col-4">4</div>
                <div class="pui-grid-col-2">2</div>
                <div class="pui-grid-col-2">2</div>
                <div class="pui-grid-col-3">3</div>
                <div class="pui-grid-col-1">1</div>
            </div>
        </div>
        
        <h3>Multiline</h3>
        <div class="pui-grid pui-grid-responsive">
            <div class="pui-grid-row">
                <div class="pui-grid-col-4">4</div>
                <div class="pui-grid-col-4">4</div>
                <div class="pui-grid-col-4">4</div>
            </div>
            <div class="pui-grid-row">
                <div class="pui-grid-col-4">4</div>
                <div class="pui-grid-col-4">4</div>
                <div class="pui-grid-col-4">4</div>
            </div>
            <div class="pui-grid-row">
                <div class="pui-grid-col-4">4</div>
                <div class="pui-grid-col-4">4</div>
                <div class="pui-grid-col-4">4</div>
            </div>
        </div>
        
        <h3>Fixed</h3>
        <div class="pui-grid pui-grid-fixed">
            <div class="pui-grid-row">
                <div class="pui-grid-col-1">1</div>
                <div class="pui-grid-col-1">1</div>
                <div class="pui-grid-col-1">1</div>
                <div class="pui-grid-col-1">1</div>
                <div class="pui-grid-col-1">1</div>
                <div class="pui-grid-col-1">1</div>
                <div class="pui-grid-col-1">1</div>
                <div class="pui-grid-col-1">1</div>
                <div class="pui-grid-col-1">1</div>
                <div class="pui-grid-col-1">1</div>
                <div class="pui-grid-col-1">1</div>
                <div class="pui-grid-col-1">1</div>
            </div>
        </div>
        
        <h3>Not Responsive</h3>
        <div class="pui-grid">
            <div class="pui-grid-row">
                <div class="pui-grid-col-6">6</div>
                <div class="pui-grid-col-6">6</div>
            </div>
        </div>
    </div>
    `
})
export class GridDemoComponent {

}