import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LayoutService {
  public readonly isSidebarVisible = signal<boolean>(window.innerWidth >= 768);
  public readonly isDarkMode = signal<boolean>(sessionStorage.getItem('darkMode') === 'true' || false);
  public readonly isMobile = signal(window.innerWidth < 768);

  public get isSidebarVisiblePlain(): boolean {
    return this.isSidebarVisible();
  }

  public set isSidebarVisiblePlain(value: boolean) {
    this.isSidebarVisible.set(value);
  }

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

  public registerWidthListener(): void {
    window.addEventListener('resize', () => {
      const isMobile = window.innerWidth < 768;
      if (this.isMobile() !== isMobile) {
        this.isMobile.set(isMobile);
        this.isSidebarVisible.set(!isMobile);
      }
    });
  }
}
