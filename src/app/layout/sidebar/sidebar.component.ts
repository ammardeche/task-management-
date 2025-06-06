import { Component, signal } from '@angular/core';
import {
  faTableColumns,
  faCheckCircle,
  faBell,
  faSliders,
  faArrowRightFromBracket,
  faFontAwesome,
} from '@fortawesome/free-solid-svg-icons';
import { MatIconModule } from '@angular/material/icon';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/service/auth.service';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { UiService } from '../../core/service/ui.service';

@Component({
  selector: 'app-sidebar',
  imports: [
    FontAwesomeModule,
    RouterLink,
    MatSidenavModule,
    MatButtonModule,
    NgClass,
    MatIconModule,
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  constructor(private authService: AuthService, private uiservice: UiService) {}

  get isOpenedState() {
    return this.uiservice.isOpned();
  }
  navItems = [
    { label: 'Dashboard', icon: 'monitoring', route: '' },
    { label: 'My Tasks', icon: 'pending_actions', route: '/layout/tasks' },
    { label: 'Level', icon: 'tenancy', route: '/layout/levels' },
  ];

  bottomItems = [
    { label: 'Settings', icon: 'settings', route: '/settings' },
    { label: 'Help', icon: 'help', route: '/layout/help' },
  ];
}
