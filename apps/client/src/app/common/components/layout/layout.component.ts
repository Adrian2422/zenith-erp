import { NgOptimizedImage, NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Drawer } from 'primeng/drawer';

import { LayoutService } from '../../services/layout.service';
import { TopbarComponent } from '../topbar/topbar.component';

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, Drawer, NgTemplateOutlet, NgOptimizedImage, TopbarComponent],
  providers: [LayoutService],
  templateUrl: './layout.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutComponent implements OnInit {
  public readonly layoutService = inject(LayoutService);

  public sidebarItems = [
    {
      label: 'Dashboard',
      children: [
        {
          label: 'Lorem',
          link: '/',
        },
        {
          label: 'Ipsum',
          link: '/ipsum',
        },
      ],
    },
    {
      label: 'Users',
      children: [
        {
          label: 'Dolor',
          link: '/dolor',
        },
        {
          label: 'Sit',
          link: '/sit',
        },
        {
          label: 'Amet',
          link: '/amet',
        },
      ],
    },
  ];

  public ngOnInit(): void {
    this.initializeTheme();
    this.layoutService.registerWidthListener();
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
