import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class ThemeService {
    private darkMode = false;

    constructor() {
        this.initTheme();
    }

    private initTheme() {
        // Check localStorage first
        const saved = localStorage.getItem('theme');
        if (saved) {
            this.darkMode = saved === 'dark';
        } else {
            // Fall back to system preference
            this.darkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
        }

        this.applyTheme();

        // Listen for system preference changes
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            if (!localStorage.getItem('theme')) {
                this.darkMode = e.matches;
                this.applyTheme();
            }
        });
    }

    private applyTheme() {
        document.documentElement.setAttribute('data-theme', this.darkMode ? 'dark' : 'light')
    }

    toggleTheme() {
        this.darkMode = !this.darkMode;
        localStorage.setItem('theme', this.darkMode ? 'dark' : 'light');
        this.applyTheme();
    }

    isDarkMode(): boolean {
        return this.darkMode;
    }


}