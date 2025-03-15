import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LayoutService {
  public readonly isSidebarVisible = signal<boolean>(true);
  public readonly isDarkMode = signal<boolean>(
    sessionStorage.getItem('darkMode') === 'true' || false,
  );
  public readonly _sidebarConfig = [];

  public toggleSidebar(): void {
    this.isSidebarVisible.set(!this.isSidebarVisible());
  }

  public toggleTheme(): void {
    const element = document.querySelector('html');
    element?.classList.toggle('dark');
    const isDarkMode = element?.classList.contains('dark') || false;
    this.isDarkMode.set(isDarkMode);
    sessionStorage.setItem('darkMode', isDarkMode ? 'true' : 'false');
  }
}
