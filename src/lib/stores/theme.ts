import { writable } from 'svelte/store';
import { browser } from '$app/environment';

type Theme = 'light' | 'dark';

function createThemeStore() {
	// Initialize with dark theme as default
	const { subscribe, set, update } = writable<Theme>('dark');

	return {
		subscribe,
		toggle: () => update(theme => {
			const newTheme = theme === 'light' ? 'dark' : 'light';
			
			if (browser) {
				// Update HTML data-theme attribute
				document.documentElement.setAttribute('data-theme', newTheme);
				// Persist to localStorage
				localStorage.setItem('theme', newTheme);
			}
			
			return newTheme;
		}),
		init: () => {
			if (browser) {
				// Load from localStorage or default to dark
				const stored = localStorage.getItem('theme') as Theme;
				const theme = stored || 'dark';
				
				document.documentElement.setAttribute('data-theme', theme);
				set(theme);
			}
		}
	};
}

export const themeStore = createThemeStore();