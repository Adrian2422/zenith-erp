import { NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { MenuItem } from 'primeng/api';
import { Button } from 'primeng/button';
import { Drawer } from 'primeng/drawer';
import { Menu } from 'primeng/menu';

import { LayoutService } from '../../services/layout.service';

@Component({
  selector: 'app-layout',
  imports: [
    RouterOutlet,
    Button,
    Menu,
    RouterLink,
    RouterLinkActive,
    Drawer,
    NgTemplateOutlet,
  ],
  providers: [LayoutService],
  templateUrl: './layout.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutComponent implements OnInit {
  public readonly oidc = inject(OidcSecurityService);
  public readonly layoutService = inject(LayoutService);

  public profileItems: MenuItem[] | undefined;
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
    this.profileItems = [
      { label: 'Profile', icon: 'pi pi-user' },
      {
        label: 'Log out',
        icon: 'pi pi-power-off',
        command: (): void => {
          this.oidc.logoff().subscribe();
        },
      },
    ];
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
