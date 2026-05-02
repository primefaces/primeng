import { HttpClient } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { Injectable, inject, signal, computed, PLATFORM_ID } from '@angular/core';
import { Demo, DemosJson } from '@/domain/democode';
import { firstValueFrom } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DemoCodeService {
    private http = inject(HttpClient);
    private platformId = inject(PLATFORM_ID);
    private demosJson = signal<DemosJson | null>(null);
    private loadPromise: Promise<void> | null = null;

    /**
     * Load demos.json file. This is called once at app startup.
     * Returns a promise that resolves when loading is complete.
     */
    async loadDemos(): Promise<void> {
        // Skip loading during SSR - will load on client hydration
        if (!isPlatformBrowser(this.platformId)) {
            return;
        }

        if (this.demosJson()) {
            return; // Already loaded
        }

        if (this.loadPromise) {
            return this.loadPromise; // Already loading
        }

        this.loadPromise = this.fetchDemos();
        return this.loadPromise;
    }

    private async fetchDemos(): Promise<void> {
        try {
            const data = await firstValueFrom(this.http.get<DemosJson>('/demos.json'));
            this.demosJson.set(data);
            console.log(`[DemoCodeService] Loaded ${data.totalDemos} demos`);
        } catch (error) {
            console.warn('[DemoCodeService] Failed to load demos.json:', error);
            // Set empty object to prevent repeated attempts
            this.demosJson.set({
                version: '0.0.0',
                generatedAt: '',
                totalDemos: 0,
                demos: {}
            });
        }
    }

    /**
     * Get demo code by selector (e.g., 'select-basic-demo')
     */
    getCode(selector: string): Demo | null {
        const demos = this.demosJson();
        if (!demos) return null;
        return demos.demos[selector] ?? null;
    }

    /**
     * Get demo code by component and section name
     * @param component Component name (e.g., 'select')
     * @param section Section name (e.g., 'basic')
     */
    getCodeByComponent(component: string, section: string): Demo | null {
        const selector = `${component}-${section}-demo`;
        return this.getCode(selector);
    }

    /**
     * Check if demos are loaded (signal-based for reactivity)
     */
    isLoaded = computed(() => this.demosJson() !== null);

    /**
     * Get all demos for a component
     */
    getDemosByComponent(component: string): Demo[] {
        const demos = this.demosJson();
        if (!demos) return [];

        return Object.values(demos.demos).filter((demo) => demo.component === component);
    }
}
