import { NgOptimizedImage, NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MenuItem, MessageService } from 'primeng/api';
import { Breadcrumb } from 'primeng/breadcrumb';
import { Drawer } from 'primeng/drawer';
import { Toast } from 'primeng/toast';

import { LayoutService } from '../../services/layout.service';
import { TopbarComponent } from '../topbar/topbar.component';

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, Drawer, NgTemplateOutlet, NgOptimizedImage, TopbarComponent, Breadcrumb, Toast],
  providers: [LayoutService],
  templateUrl: './layout.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutComponent implements OnInit {
  public readonly layoutService = inject(LayoutService);
  public readonly translate = inject(TranslateService);

  public readonly translateBase = 'sidebar';
  public readonly sidebarItems = signal<MenuItem[]>([]);
  public readonly home: MenuItem = { icon: 'pi pi-home', routerLink: '/' };

  public ngOnInit(): void {
    this.initializeTheme();
    this.layoutService.registerWidthListener();
    this.translate.onLangChange.subscribe((_) => {
      console.log('LayoutComponent ', _);
      this.sidebarItems.set([
        {
          label: this.translate.instant(this.translateBase + '.home'),
          children: [
            {
              label: this.translate.instant(this.translateBase + '.dashboard'),
              link: '/',
            },
          ],
        },
        {
          label: this.translate.instant(this.translateBase + '.users'),
          children: [
            {
              label: 'Dolor',
              link: '/dolor',
            },
          ],
        },
      ]);
    });
  }

  public initializeTheme(): void {
    const element = document.querySelector('html');
    if (this.layoutService.isDarkMode()) {
      element?.classList.add('dark');
    } else {
      element?.classList.remove('dark');
    }
  }
}
