import { ThemeService } from '@primeuix/styled';

export default {
    _loadedStyleNames: new Set(),
    _themeChangeWired: false,
    _groupedThemeChangeListeners: new Map(),
    _ensureThemeChangeWired() {
        if (this._themeChangeWired) {
            return;
        }

        this._themeChangeWired = true;
        ThemeService.on('theme:change', () => this._loadedStyleNames.clear());
    },
    _registerGroupedThemeChangeListener(name, callback) {
        const listener = this._groupedThemeChangeListeners.get(name);

        if (listener) {
            listener.callbacks.add(callback);
            return () => {
                listener.callbacks.delete(callback);

                if (!listener.callbacks.size) {
                    ThemeService.off('theme:change', listener.hold);
                    this._groupedThemeChangeListeners.delete(name);
                }
            };
        }

        const callbacks = new Set([callback]);
        const hold = (...args) => callbacks.forEach((callback) => callback(...args));

        this._groupedThemeChangeListeners.set(name, { callbacks, hold });
        ThemeService.on('theme:change', hold);

        return () => {
            callbacks.delete(callback);

            if (!callbacks.size) {
                ThemeService.off('theme:change', hold);
                this._groupedThemeChangeListeners.delete(name);
            }
        };
    },
    getLoadedStyleNames() {
        return this._loadedStyleNames;
    },
    isStyleNameLoaded(name) {
        return this._loadedStyleNames.has(name);
    },
    setLoadedStyleName(name) {
        this._loadedStyleNames.add(name);
    },
    deleteLoadedStyleName(name) {
        this._loadedStyleNames.delete(name);
    },
    clearLoadedStyleNames() {
        this._loadedStyleNames.clear();
    }
};
