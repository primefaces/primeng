import { computed, inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { $dt, usePreset } from '@primeuix/styled';
import { MessageService } from 'primeng/api';
import Aura from '@primeng/themes/aura/index';
import { environment } from '@/environments/environment';

export interface Theme {
    key: string;
    name: string;
    preset: any;
    config: any;
}

export interface Designer {
    verified: boolean;
    csrfToken: string;
    themeLimit: number;
    active: boolean;
    activeView: string;
    activeTab: number;
    theme: Theme;
    ticket: any;
    acTokens: any;
    themes: any;
}
@Injectable()
export class DesignerService {
    baseUrl = environment.baseUrl;

    http: HttpClient = inject(HttpClient);

    messageService: MessageService = inject(MessageService);

    designer = signal<Designer>({
        verified: false,
        csrfToken: null,
        themeLimit: 0,
        active: false,
        activeView: 'dashboard',
        ticket: null,
        activeTab: 0,
        theme: {
            key: null,
            name: null,
            preset: null,
            config: null
        },
        acTokens: [],
        themes: []
    });

    preset = signal({ primitive: null, semantic: null });

    acTokens = computed(() => this.designer().acTokens);

    missingTokens = signal<any[]>([]);

    status = signal<'preview' | 'updated' | null>(null);

    licenseKey = signal<string | undefined>(undefined);

    otp = signal<string | undefined>(undefined);

    loading = signal<boolean>(false);

    currentTheme = signal<any>(null);

    themeName = signal<string | undefined>(undefined);

    basePreset = signal<any>(null);

    newPreset = signal<any>(null);

    figmaData = signal<any>(null);

    openDashboard() {
        this.designer.update((prev) => ({ ...prev, activeView: 'dashboard' }));
    }

    resolveColor(token) {
        if (token.startsWith('{') && token.endsWith('}')) {
            let cssVariable = $dt(token).variable.slice(4, -1);
            return getComputedStyle(document.documentElement).getPropertyValue(cssVariable);
        } else {
            return token;
        }
    }

    refreshACTokens() {
        this.designer.update((prev) => ({ ...prev, acTokens: [] }));
        this.generateACTokens(null, this.designer().theme.preset);
    }

    generateACTokens(parentPath: any, obj: any) {
        for (let key in obj) {
            if (key === 'dark' || key === 'components' || key === 'directives') {
                continue;
            }

            if (key === 'primitive' || key === 'semantic' || key === 'colorScheme' || key === 'light' || key === 'extend') {
                this.generateACTokens(null, obj[key]);
            } else {
                if (typeof obj[key] === 'object') {
                    this.generateACTokens(parentPath ? parentPath + '.' + key : key, obj[key]);
                } else {
                    const regex = /\.\d+$/;

                    const tokenName = this.camelCaseToDotCase(parentPath ? parentPath + '.' + key : key);
                    const tokenValue = obj[key];
                    const isColor =
                        tokenName.includes('color') || tokenName.includes('background') || regex.test(tokenName) || tokenValue.startsWith('#') || tokenValue.startsWith('rgb') || tokenValue.startsWith('hsl') || tokenValue.startsWith('oklch');

                    this.designer.update((prev) => ({ ...prev, acTokens: [...prev.acTokens, { name: tokenName, label: '{' + tokenName + '}', variable: $dt(tokenName).variable, value: tokenValue, isColor: isColor }] }));
                }
            }
        }
    }

    camelCaseToDotCase(name: string) {
        return name.replace(/([a-z])([A-Z])/g, '$1.$2').toLowerCase();
    }

    async signIn() {
        const url = `${this.baseUrl}/license/signin/${this.licenseKey()}`;
        const options = {
            withCredentials: true,
            params: { passkey: this.otp() }
        };
        this.http.get(url, options).subscribe({
            next: (res: any) => {
                const data = res.data;
                if (data.valid) {
                    this.designer.update((prev) => ({ ...prev, verified: true, csrfToken: data.csrfToken, themeLimit: data.themeLimit }));
                    this.loadThemes();

                    this.messageService.add({ key: 'designer', severity: 'success', summary: 'Signed In', detail: 'License is activated.', life: 3000 });
                } else {
                    this.messageService.add({ key: 'designer', severity: 'error', summary: 'Invalid key.', detail: data.message, life: 3000 });
                    this.designer.update((prev) => ({ ...prev, themes: [] }));
                }
            },
            error: (err: any) => {
                this.messageService.add({ key: 'designer', severity: 'error', summary: 'An Error Occurred', detail: err.message, life: 3000 });
            }
        });
    }

    async signOut() {
        this.http.get(`${this.baseUrl}/license/signout`, { withCredentials: true }).subscribe({
            next: (res: any) => {
                const data = res.data;
                if (data.signout) {
                    this.designer.set({
                        verified: false,
                        ticket: null,
                        themeLimit: null,
                        csrfToken: null,
                        active: true,
                        activeView: 'dashboard',
                        activeTab: 0,
                        theme: {
                            key: null,
                            name: null,
                            preset: null,
                            config: null
                        },
                        acTokens: [],
                        themes: []
                    });

                    this.licenseKey.set(null);
                    this.otp.set(null);
                    this.currentTheme.set(null);

                    usePreset(Aura);
                }
            }
        });
    }

    async loadThemes() {
        this.loading.set(true);

        this.http.get(`${this.baseUrl}/theme/list`, { withCredentials: true, headers: { 'X-CSRF-Token': this.designer().csrfToken } }).subscribe({
            next: (res: any) => {
                const data = res.data;
                this.designer.update((prev) => ({ ...prev, themes: data }));
                this.loading.set(false);
            },
            error: (err: any) => {
                this.loading.set(false);
                this.messageService.add({ key: 'designer', severity: 'error', summary: 'An Error Occurred', detail: err.message, life: 3000 });
            }
        });
    }

    async saveTheme(theme: any) {
        if (this.designer().verified) {
            const url = `${this.baseUrl}/theme/update`;

            const body = {
                key: theme.key,
                preset: theme.preset,
                config: theme.config
            };

            const options = {
                withCredentials: true,
                headers: { 'X-CSRF-Token': this.designer().csrfToken }
            };

            this.http.patch(url, body, options).subscribe({
                error: (err: any) => {
                    this.messageService.add({ key: 'designer', severity: 'error', summary: 'An Error Occurred', detail: err.message, life: 3000 });
                }
            });
        }
    }

    async deleteTheme(theme: any) {
        this.http.delete(`${this.baseUrl}/theme/delete/${theme.t_key}`, { withCredentials: true, headers: { 'X-CSRF-Token': this.designer().csrfToken } }).subscribe({
            next: (res: any) => {
                if (res.error) {
                    this.messageService.add({ key: 'designer', severity: 'error', summary: 'An Error Occurred', detail: res.error.message, life: 3000 });
                }
                this.loadThemes();
            },
            error: (err: any) => {
                this.messageService.add({ key: 'designer', severity: 'error', summary: 'An Error Occurred', detail: err.message, life: 3000 });
            }
        });
    }

    async duplicateTheme(theme: any) {
        this.http.post(`${this.baseUrl}/theme/duplicate/${theme.t_key}`, null, { withCredentials: true, headers: { 'X-CSRF-Token': this.designer().csrfToken } }).subscribe({
            next: (res: any) => {
                if (res.error) {
                    this.messageService.add({ key: 'designer', severity: 'error', summary: 'An Error Occurred', detail: res.error.message, life: 3000 });
                }
                this.loadThemes();
            },
            error: (err: any) => {
                this.messageService.add({ key: 'designer', severity: 'error', summary: 'An Error Occurred', detail: err.message, life: 3000 });
            }
        });
    }

    async downloadTheme(theme: any) {
        if (!this.designer().verified) {
            this.messageService.add({ key: 'designer', severity: 'error', summary: 'Not Available', detail: 'A license is required for download.', life: 3000 });
        } else {
            this.http.get(`${this.baseUrl}/theme/download/${theme.t_key}`, { withCredentials: true, responseType: 'blob', headers: { 'X-CSRF-Token': this.designer().csrfToken }, params: { library: 'primeng' } }).subscribe({
                next: (res: any) => {
                    const blobUrl = window.URL.createObjectURL(res);
                    const link = document.createElement('a');

                    link.setAttribute('href', blobUrl);
                    link.setAttribute('download', `${theme.t_name}.zip`);
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                    window.URL.revokeObjectURL(blobUrl);
                },
                error: (err: any) => {
                    this.messageService.add({ key: 'designer', severity: 'error', summary: 'An Error Occurred', detail: 'Failed to download file', life: 3000 });
                }
            });
        }
    }

    async restore() {
        this.http.get(this.baseUrl + '/license/restore', { withCredentials: true }).subscribe({
            next: (res: any) => {
                const data = res.data;

                if (data.valid) {
                    this.designer.update((prev) => ({ ...prev, verified: data.valid, csrfToken: data.csrfToken, themeLimit: data.themeLimit }));
                }
            },
            error: (err: any) => {
                this.messageService.add({ key: 'designer', severity: 'error', summary: 'An Error Occurred', detail: err.message, life: 3000 });
            }
        });
    }

    async applyFont(fontFamily: string) {
        if (fontFamily !== 'Inter var') {
            await this.loadFont(fontFamily, 400);
            await this.loadFont(fontFamily, 500);
            await this.loadFont(fontFamily, 600);
            await this.loadFont(fontFamily, 700);
        } else {
            document.body.style.fontFamily = `"Inter var", sans-serif`;
        }
    }

    async loadFont(fontFamily: string, weight: number) {
        try {
            const fontFamilyPath = fontFamily.toLowerCase().replace(/\s+/g, '-');
            const fontUrl = `https://fonts.bunny.net/${fontFamilyPath}/files/${fontFamilyPath}-latin-${weight}-normal.woff2`;
            const font = new FontFace(fontFamily, `url(${fontUrl})`, {
                weight: weight.toString(),
                style: 'normal'
            });

            const loadedFont = await font.load();

            document.fonts.add(loadedFont);
            document.body.style.fontFamily = `"${fontFamily}", sans-serif`;

            return loadedFont;
        } catch (error) {
            // silent fail as some fonts may have not all the font weights
        }
    }

    async applyTheme(theme: any) {
        if (this.designer().verified) {
            await this.saveTheme(theme);
            this.refreshACTokens();
        }

        usePreset(theme.preset);
        this.messageService.add({ key: 'designer', severity: 'success', summary: 'Success', detail: 'Theme saved.', life: 3000 });
    }

    async preview() {
        this.http.patch(`${this.baseUrl}/theme/migrate/preview/${this.designer().theme.key}`, null, { withCredentials: true, headers: { 'X-CSRF-Token': this.designer().csrfToken } }).subscribe({
            next: (res: any) => {
                if (res.data) {
                    this.status.set('preview');
                    this.missingTokens.set(res.data);
                }
                if (res.error) {
                    this.messageService.add({ key: 'designer', severity: 'error', summary: 'An Error Occurred', detail: res.error.message, life: 3000 });
                }
            },
            error: (err: any) => {
                this.messageService.add({ key: 'designer', severity: 'error', summary: 'An Error Occurred', detail: err.message, life: 3000 });
            }
        });
    }

    async migrate() {
        this.http.patch(`${this.baseUrl}/theme/migrate/execute/${this.designer().theme.key}`, null, { withCredentials: true, headers: { 'X-CSRF-Token': this.designer().csrfToken } }).subscribe({
            next: (res: any) => {
                this.status.set('updated');
                this.missingTokens.set([]);
                this.activateTheme(res.data);
            },
            error: (err: any) => {
                this.messageService.add({
                    key: 'designer',
                    severity: 'error',
                    summary: 'An Error Occurred',
                    detail: err.message,
                    life: 3000
                });
            }
        });
    }

    async loadTheme(theme: any) {
        this.http.get(`${this.baseUrl}/theme/load/${theme.t_key}`, { withCredentials: true, headers: { 'X-CSRF-Token': this.designer().csrfToken } }).subscribe({
            next: (res: any) => {
                this.status.set(null);
                this.missingTokens.set([]);
                const data = res.data;
                this.activateTheme(data);
            },
            error: (err: any) => {
                this.messageService.add({ key: 'designer', severity: 'error', summary: 'An Error Occurred', detail: err.message, life: 3000 });
            }
        });
    }

    async renameTheme(theme: any) {
        if (theme.t_name && theme.t_name.trim().length > 0) {
            const url = `${this.baseUrl}/theme/rename/${theme.t_key}`;
            const options = {
                withCredentials: true,
                headers: { 'X-CSRF-Token': this.designer().csrfToken }
            };
            const body = {
                name: theme.t_name
            };

            this.http.patch(url, body, options).subscribe({
                next: (res: any) => {
                    if (res.error) {
                        this.messageService.add({ key: 'designer', severity: 'error', summary: 'An Error Occurred', detail: res.error.message, life: 3000 });
                    }
                    const data = res.data;
                    if (data && data.valid) {
                        theme.t_name = data.name;
                    }
                },
                error: (err: any) => {
                    this.messageService.add({ key: 'designer', severity: 'error', summary: 'An Error Occurred', detail: err.message, life: 3000 });
                }
            });
        }
    }

    async createThemeFromPreset() {
        if (this.designer().verified) {
            const url = `${this.baseUrl}/theme/create`;
            const body = {
                name: this.themeName(),
                preset: this.newPreset(),
                project: 'primeng',
                base: this.basePreset(),
                config: {
                    font_size: '14px',
                    font_family: 'Inter var'
                }
            };

            this.http.post(`${url}`, body, { withCredentials: true, headers: { 'X-CSRF-Token': this.designer().csrfToken } }).subscribe({
                next: (res: any) => {
                    this.loadThemeEditor(res.data.t_key, this.newPreset());
                },
                error: (err: any) => {
                    this.messageService.add({ key: 'designer', severity: 'error', summary: 'An error occurred', detail: err.message, life: 3000 });
                }
            });
        } else {
            await this.loadThemeEditor('trial', this.newPreset());
        }
    }

    async loadThemeEditor(t_key: string, preset: any) {
        this.designer.update((prev) => ({
            ...prev,
            theme: {
                name: this.themeName(),
                key: t_key,
                preset: preset,
                config: {
                    font_size: '14px',
                    font_family: 'Inter var'
                }
            }
        }));
        this.missingTokens.set([]);
        this.status.set(null);
        await this.applyFont('Inter var');
        document.documentElement.style.fontSize = '14px';
        usePreset(preset);
        this.refreshACTokens();
        this.designer.update((prev) => ({ ...prev, activeTab: 0, activeView: 'editor' }));

        this.themeName.set(null);
        this.basePreset.set(null);
        this.newPreset.set(null);
    }

    async createThemeFromFigma() {
        if (this.designer().verified) {
            const url = `${this.baseUrl}/theme/figma`;
            const body = {
                name: this.themeName(),
                figma_tokens: this.figmaData(),
                project: 'primeng',
                base: 'Figma',
                config: {
                    font_size: '14px',
                    font_family: 'Inter var'
                }
            };
            this.http.post(`${url}`, body, { withCredentials: true, headers: { 'X-CSRF-Token': this.designer().csrfToken } }).subscribe({
                next: (res: any) => {
                    if (res.error) {
                        this.messageService.add({ key: 'designer', severity: 'error', summary: 'An error occurred', detail: res.error.message, life: 3000 });
                    } else {
                        const data = res.data;
                        if (data.lostAndFound?.length) {
                            this.messageService.add({ key: 'designer', severity: 'warn', summary: 'Warning', detail: 'There are missing tokens. An update is recommended using the "Migration Assistant" in the settings section.', life: 3000 });
                        }
                        this.designer.update((prev) => ({ ...prev, activeTab: 0, activeView: 'dashboard' }));
                    }
                },
                error: (err: any) => {
                    this.messageService.add({ key: 'designer', severity: 'error', summary: 'An error occurred', detail: err.message, life: 3000 });
                }
            });

            this.themeName.set(null);
            this.figmaData.set(null);
        } else {
            this.messageService.add({ key: 'designer', severity: 'error', summary: 'An error occurred', detail: 'A valid license required.', life: 3000 });
        }
    }

    async activateTheme(data: any) {
        this.designer.update((prev) => ({ ...prev, active: true, theme: { key: data.t_key, name: data.t_name, preset: JSON.parse(data.t_preset), config: JSON.parse(data.t_config) } }));

        usePreset(this.designer().theme.preset);
        await this.applyFont(this.designer().theme.config.fontFamily);
        document.documentElement.style.setProperty('font-size', this.designer().theme.config.font_size);
        this.refreshACTokens();

        this.designer.update((prev) => ({ ...prev, activeTab: 0, activeView: 'editor' }));
        this.status.set(null);
    }
}
