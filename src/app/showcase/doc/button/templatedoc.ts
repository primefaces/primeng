import { Component } from '@angular/core';
import { Code } from '@domain/code';

@Component({
    selector: 'button-template-demo',
    template: `
        <app-docsectiontext>
            <p>Custom content inside a button is defined as children.</p>
        </app-docsectiontext>
        <div class="card flex justify-center">
            <p-button [outlined]="true">
                <svg width="32" height="32" class="block mx-auto" viewBox="0 0 148 158" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M73.3016 0V0V0L0.188751 25.97L11.3402 122.262L73.3016 156.446V156.446V156.446L135.263 122.262L146.415 25.97L73.3016 0Z" fill="var(--primary-color)" />
                    <mask id="mask0_1_21" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
                        <path d="M73.3016 0V0V0L0.188751 25.97L11.3402 122.262L73.3016 156.446V156.446V156.446L135.263 122.262L146.415 25.97L73.3016 0Z" fill="var(--primary-color-text)" />
                    </mask>
                    <g mask="url(#mask0_1_21)">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M73.3016 0V17.3655V17.2873V96.5271V96.5271V156.446V156.446L135.263 122.262L146.415 25.97L73.3016 0Z" fill="var(--primary-color)" />
                    </g>
                    <path d="M94.7324 74.1973L87.7187 72.6393L93.1738 80.4295V104.579L111.877 88.9988V62.5119L103.305 65.628L94.7324 74.1973Z" fill="var(--primary-color-text)" />
                    <path d="M51.0915 74.1973L58.1053 72.6393L52.6501 80.4295V104.579L33.9469 88.9988V62.5119L42.5192 65.628L51.0915 74.1973Z" fill="var(--primary-color-text)" />
                    <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M54.9115 81.8918L61.1279 72.5246L65.0131 74.8664H80.5541L84.4393 72.5246L90.6557 81.8918V117.019L85.9934 124.044L80.5541 129.508H65.0131L59.5738 124.044L54.9115 117.019V81.8918Z"
                        fill="white"
                    />
                    <path d="M93.1738 119.381L103.305 109.254V99.1262L93.1738 107.695V119.381Z" fill="var(--primary-color-text)" />
                    <path d="M52.6501 119.381L42.5192 109.254V99.1262L52.6501 107.695V119.381Z" fill="var(--primary-color-text)" />
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M62.781 27.4557L56.5466 42.2573L66.6776 71.8603H71.3534V27.4557H62.781ZM74.4706 27.4557V71.8603H79.9257L89.2773 42.2573L83.0429 27.4557H74.4706Z" fill="white" />
                    <path d="M66.6776 71.8602L33.1676 59.3958L28.4918 39.9202L57.3259 42.2572L67.4569 71.8602H66.6776Z" fill="var(--primary-color-text)" />
                    <path d="M79.9257 71.8602L113.436 59.3958L118.111 39.9202L88.498 42.2572L79.1464 71.8602H79.9257Z" fill="var(--primary-color-text)" />
                    <path d="M90.8359 39.9202L107.201 38.3621L96.291 27.4557H85.3808L90.8359 39.9202Z" fill="var(--primary-color-text)" />
                    <path d="M54.988 39.9202L38.6227 38.3621L49.5329 27.4557H60.4431L54.988 39.9202Z" fill="var(--primary-color-text)" />
                </svg>
            </p-button>
        </div>
        <app-code [code]="code" selector="button-template-demo"></app-code>
    `
})
export class TemplateDoc {
    code: Code = {
        basic: `<p-button [outlined]="true">
        <svg width="35" height="40" viewBox="0 0 33 35" fill="none" xmlns="http://www.w3.org/2000/svg" class="block mx-auto">
        <path d="M15.1934 0V0V0L0.0391235 5.38288L2.35052 25.3417L15.1934 32.427V32.427V32.427L28.0364 25.3417L30.3478 5.38288L15.1934 0Z" fill="var(--primary-color)" />
        <mask id="mask0_1_36" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="31" height="33">
            <path d="M15.1934 0V0V0L0.0391235 5.38288L2.35052 25.3417L15.1934 32.427V32.427V32.427L28.0364 25.3417L30.3478 5.38288L15.1934 0Z" fill="var(--primary-color-text)" />
        </mask>
        <g mask="url(#mask0_1_36)">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M15.1935 0V3.5994V3.58318V20.0075V20.0075V32.427V32.427L28.0364 25.3417L30.3478 5.38288L15.1935 0Z" fill="var(--primary-color)" />
        </g>
        <path d="M19.6399 15.3776L18.1861 15.0547L19.3169 16.6695V21.6755L23.1938 18.4458V12.9554L21.4169 13.6013L19.6399 15.3776Z" fill="var(--primary-color-text)" />
        <path d="M10.5936 15.3776L12.0474 15.0547L10.9166 16.6695V21.6755L7.03966 18.4458V12.9554L8.81661 13.6013L10.5936 15.3776Z" fill="var(--primary-color-text)" />
        <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M11.3853 16.9726L12.6739 15.0309L13.4793 15.5163H16.7008L17.5061 15.0309L18.7947 16.9726V24.254L17.8283 25.7103L16.7008 26.843H13.4793L12.3518 25.7103L11.3853 24.254V16.9726Z"
            fill="var(--primary-color-text)"
        />
        <path d="M19.3168 24.7437L21.4168 22.6444V20.5451L19.3168 22.3214V24.7437Z" fill="var(--primary-color-text)" />
        <path d="M10.9166 24.7437L8.81662 22.6444V20.5451L10.9166 22.3214V24.7437Z" fill="var(--primary-color-text)" />
        <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M13.0167 5.68861L11.7244 8.7568L13.8244 14.8932H14.7936V5.68861H13.0167ZM15.4397 5.68861V14.8932H16.5706L18.5091 8.7568L17.2167 5.68861H15.4397Z"
            fill="var(--primary-color-text)"
        />
        <path d="M13.8244 14.8932L6.87813 12.3094L5.90888 8.27235L11.8859 8.7568L13.9859 14.8932H13.8244Z" fill="var(--primary-color-text)" />
        <path d="M16.5706 14.8932L23.5169 12.3094L24.4861 8.27235L18.3476 8.7568L16.4091 14.8932H16.5706Z" fill="var(--primary-color-text)" />
        <path d="M18.8321 8.27235L22.2245 7.94938L19.9629 5.68861H17.7013L18.8321 8.27235Z" fill="var(--primary-color-text)" />
        <path d="M11.4013 8.27235L8.00893 7.94938L10.2705 5.68861H12.5321L11.4013 8.27235Z" fill="var(--primary-color-text)" />
    </svg>
</p-button>`,

        html: `<div class="card flex justify-center">
<p-button [outlined]="true">
<svg width="35" height="40" viewBox="0 0 33 35" fill="none" xmlns="http://www.w3.org/2000/svg" class="block mx-auto">
<path d="M15.1934 0V0V0L0.0391235 5.38288L2.35052 25.3417L15.1934 32.427V32.427V32.427L28.0364 25.3417L30.3478 5.38288L15.1934 0Z" fill="var(--primary-color)" />
<mask id="mask0_1_36" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="31" height="33">
    <path d="M15.1934 0V0V0L0.0391235 5.38288L2.35052 25.3417L15.1934 32.427V32.427V32.427L28.0364 25.3417L30.3478 5.38288L15.1934 0Z" fill="var(--primary-color-text)" />
</mask>
<g mask="url(#mask0_1_36)">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M15.1935 0V3.5994V3.58318V20.0075V20.0075V32.427V32.427L28.0364 25.3417L30.3478 5.38288L15.1935 0Z" fill="var(--primary-color)" />
</g>
<path d="M19.6399 15.3776L18.1861 15.0547L19.3169 16.6695V21.6755L23.1938 18.4458V12.9554L21.4169 13.6013L19.6399 15.3776Z" fill="var(--primary-color-text)" />
<path d="M10.5936 15.3776L12.0474 15.0547L10.9166 16.6695V21.6755L7.03966 18.4458V12.9554L8.81661 13.6013L10.5936 15.3776Z" fill="var(--primary-color-text)" />
<path
    fill-rule="evenodd"
    clip-rule="evenodd"
    d="M11.3853 16.9726L12.6739 15.0309L13.4793 15.5163H16.7008L17.5061 15.0309L18.7947 16.9726V24.254L17.8283 25.7103L16.7008 26.843H13.4793L12.3518 25.7103L11.3853 24.254V16.9726Z"
    fill="var(--primary-color-text)"
/>
<path d="M19.3168 24.7437L21.4168 22.6444V20.5451L19.3168 22.3214V24.7437Z" fill="var(--primary-color-text)" />
<path d="M10.9166 24.7437L8.81662 22.6444V20.5451L10.9166 22.3214V24.7437Z" fill="var(--primary-color-text)" />
<path
    fill-rule="evenodd"
    clip-rule="evenodd"
    d="M13.0167 5.68861L11.7244 8.7568L13.8244 14.8932H14.7936V5.68861H13.0167ZM15.4397 5.68861V14.8932H16.5706L18.5091 8.7568L17.2167 5.68861H15.4397Z"
    fill="var(--primary-color-text)"
/>
<path d="M13.8244 14.8932L6.87813 12.3094L5.90888 8.27235L11.8859 8.7568L13.9859 14.8932H13.8244Z" fill="var(--primary-color-text)" />
<path d="M16.5706 14.8932L23.5169 12.3094L24.4861 8.27235L18.3476 8.7568L16.4091 14.8932H16.5706Z" fill="var(--primary-color-text)" />
<path d="M18.8321 8.27235L22.2245 7.94938L19.9629 5.68861H17.7013L18.8321 8.27235Z" fill="var(--primary-color-text)" />
<path d="M11.4013 8.27235L8.00893 7.94938L10.2705 5.68861H12.5321L11.4013 8.27235Z" fill="var(--primary-color-text)" />
</svg>
</p-button>
</div>`,

        typescript: `import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'button-template-demo',
    templateUrl: './button-template-demo.html',
    standalone: true,
    imports: [ButtonModule]
})
export class ButtonTemplateDemo { }`
    };
}
