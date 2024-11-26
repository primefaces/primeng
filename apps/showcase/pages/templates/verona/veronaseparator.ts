import { TemplateSeparatorModule } from '@/components/template/templateseparator';
import { AppConfigService } from '@/service/appconfigservice';
import { Component, inject } from '@angular/core';

@Component({
    standalone: true,
    selector: 'verona-separator',
    imports: [TemplateSeparatorModule],
    template: `
        <template-separator>
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="49" viewBox="0 0 48 49" fill="none">
                <g clipPath="url(#clip0_987_15401)">
                    <path d="M33.5642 18.0857H14.8584V18.2232H33.5642V18.0857Z" [attr.fill]="fillColor" fillOpacity="0.5" />
                    <path d="M35.077 21.7993H12.9326V21.9369H35.077V21.7993Z" [attr.fill]="fillColor" fillOpacity="0.5" />
                    <path d="M34.9394 25.5129H13.3452V25.6505H34.9394V25.5129Z" [attr.fill]="fillColor" />
                    <path d="M33.9768 29.2266H14.4458V29.3641H33.9768V29.2266Z" [attr.fill]="fillColor" />
                    <path d="M22.9547 12.4471L22.834 12.375L14.0757 28.5054L14.1964 28.5775L22.9547 12.4471Z" [attr.fill]="fillColor" fillOpacity="0.5" />
                    <path d="M26.8757 12.8025L26.7551 12.7302L16.4265 31.7024L16.5214 31.7932L26.8757 12.8025Z" [attr.fill]="fillColor" />
                    <path d="M30.1539 14.3382L30.0337 14.2654L19.3041 33.7536L19.4244 33.8264L30.1539 14.3382Z" [attr.fill]="fillColor" />
                    <path d="M32.6656 17.4603L32.5459 17.3865L22.8027 34.7793L22.9225 34.8531L32.6656 17.4603Z" [attr.fill]="fillColor" />
                    <path d="M34.541 21.3825L34.4209 21.3094L27.2179 34.3463L27.338 34.4193L34.541 21.3825Z" [attr.fill]="fillColor" />
                    <path d="M28.4863 25.8294L32.9655 17.778L34.3133 20.6083L28.0059 32.0445L18.5141 14.5333L20.9781 13.2376L27.6071 25.8194L28.0375 26.6363L28.4863 25.8294Z" [attr.fill]="fillColor" stroke="var(--p-surface-900)" />
                    <path
                        d="M28.0018 33.1409L27.9796 33.1001L17.7893 14.2999L21.9377 14.2281L21.9451 14.2421L28.0495 25.5322L32.2144 18.0938L34.252 21.8213L34.2446 21.8347L28.0018 33.1409ZM17.877 14.3524L28.0023 33.0324L34.1927 21.821L32.2141 18.2015L28.0488 25.6402L28.0269 25.5994L21.9079 14.2826L17.877 14.3524Z"
                        [attr.fill]="fillColor"
                    />
                    <g filter="url(#filter1_dd_987_15401)">
                        <mask id="path-15-inside-1_987_15401" fill="white">
                            <path
                                d="M36 24C36 30.6274 30.6274 36 24 36C17.3726 36 12 30.6274 12 24C12 17.3726 17.3726 12 24 12C30.6274 12 36 17.3726 36 24ZM13.2 24C13.2 29.9647 18.0353 34.8 24 34.8C29.9647 34.8 34.8 29.9647 34.8 24C34.8 18.0353 29.9647 13.2 24 13.2C18.0353 13.2 13.2 18.0353 13.2 24Z"
                            />
                        </mask>
                        <path
                            d="M36 24C36 30.6274 30.6274 36 24 36C17.3726 36 12 30.6274 12 24C12 17.3726 17.3726 12 24 12C30.6274 12 36 17.3726 36 24ZM13.2 24C13.2 29.9647 18.0353 34.8 24 34.8C29.9647 34.8 34.8 29.9647 34.8 24C34.8 18.0353 29.9647 13.2 24 13.2C18.0353 13.2 13.2 18.0353 13.2 24Z"
                            stroke="var(--p-surface-900)"
                            strokeWidth="2"
                            mask="url(#path-15-inside-1_987_15401)"
                        />
                    </g>
                </g>
            </svg>
        </template-separator>
    `
})
export class VeronaSeparator {
    configService = inject(AppConfigService);

    get fillColor() {
        return this.configService.appState().darkTheme ? 'var(--p-surface-0)' : 'var(--p-surface-900)';
    }
}
