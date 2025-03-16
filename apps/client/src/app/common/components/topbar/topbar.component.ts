import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { Button } from 'primeng/button';
import { Menu } from 'primeng/menu';

import { LayoutService } from '../../services/layout.service';

@Component({
  selector: 'app-topbar',
  imports: [Button, Menu, NgOptimizedImage, RouterLink],
  templateUrl: './topbar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopbarComponent {
  public readonly layoutService = inject(LayoutService);
  public readonly oidc = inject(OidcSecurityService);

  public readonly profileItems = [
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
