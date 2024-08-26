import { Component } from '@angular/core';
import { Code } from '@domain/code';

@Component({
    selector: 'custom-doc',
    template: `
        <app-docsectiontext>
            <p>Styling Demo Content.</p>
        </app-docsectiontext>
        <div class="card card-container flex justify-center items-center">
            <div pRipple class="card styled-box-green shadow">Green</div>
            <div pRipple class="card styled-box-orange shadow">Orange</div>
            <div pRipple class="card styled-box-purple shadow">Purple</div>
        </div>
        <app-code [code]="code" selector="ripple-custom-demo"></app-code>
    `
})
export class CustomDoc {
    code: Code = {
        basic: `<div pRipple class="card styled-box-green shadow">
    Green
</div>`,
        html: `<div class="card card-container flex justify-center items-center">
    <div pRipple class="card styled-box-green shadow">
        Green
    </div>
    <div pRipple class="card styled-box-orange shadow">
        Orange
    </div>
    <div pRipple class="card styled-box-purple shadow">
        Purple
    </div>
</div>`,
        typescript: `import { Component } from '@angular/core';
import { RippleModule } from 'primeng/ripple';

@Component({
    selector: 'ripple-custom-demo',
    templateUrl: './ripple-custom-demo.html',
    standalone: true,
    imports: [RippleModule],
    styles: [
        \`:host ::ng-deep .card-container {
            .card {
                width: 75px;
                height: 75px;
                display: flex;
                align-items: center;
                justify-content: center;
                margin-right: 1rem;
                user-select: none;
                padding: 0;
        
                &.primary-box {
                    background-color: var(--primary-color);
                    padding: 0;
                    color: var(--primary-color-text);
                }
        
                &.styled-box-green {
                    .p-ink {
                        background: rgba(#4baf50, 0.3);
                    }
                }
        
                &.styled-box-orange {
                    .p-ink {
                        background: rgba(#ffc106, 0.3);
                    }
                }
        
                &.styled-box-purple {
                    .p-ink {
                        background: rgba(#9c27b0, 0.3);
                    }
                }
        
                &:last-child {
                    margin-right: 0;
                }
            }
        }\`
    ],
})
export class RippleCustomDemo {
}`,
        scss: `:host ::ng-deep .card-container {
    .card {
        width: 75px;
        height: 75px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 1rem;
        user-select: none;
        padding: 0;

        &.primary-box {
            background-color: var(--primary-color);
            padding: 0;
            color: var(--primary-color-text);
        }

        &.styled-box-green {
            .p-ink {
                background: rgba(#4baf50, 0.3);
            }
        }

        &.styled-box-orange {
            .p-ink {
                background: rgba(#ffc106, 0.3);
            }
        }

        &.styled-box-purple {
            .p-ink {
                background: rgba(#9c27b0, 0.3);
            }
        }

        &:last-child {
            margin-right: 0;
        }
    }
}`
    };
}
