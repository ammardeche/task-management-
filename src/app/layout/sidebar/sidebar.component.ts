import { Component, signal } from '@angular/core';
import {
  faTableColumns,
  faCheckCircle,
  faBell,
  faSliders,
  faArrowRightFromBracket,
  faFontAwesome,
} from '@fortawesome/free-solid-svg-icons';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/service/auth.service';
import { NgFor } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { UiService } from '../../core/service/ui.service';

@Component({
  selector: 'app-sidebar',
  imports: [
    FontAwesomeModule,
    NgFor,
    MatSidenavModule,
    MatButtonModule,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  faTableColumns = faTableColumns;
  faCheckCircle = faCheckCircle;
  faBell = faBell;
  faSliders = faSliders;
  faArrowRightFromBracket = faArrowRightFromBracket;

  constructor(private authService: AuthService, private uiservice: UiService) {}

  get isOpenedState() {
    return this.uiservice.isOpned();
  }
  navItems = [
    { label: 'Dashboard', icon: 'fa-solid fa-house', route: '/dashboard' },
    { label: 'My Tasks', icon: 'fa-solid fa-tasks', route: '/tasks' },
    { label: 'Settings', icon: 'fa-solid fa-cog', route: '/settings' },
  ];
  bottomItems = [
    { label: 'Profile', icon: 'fa-solid fa-user', route: '/profile' },
    { label: 'Logout', icon: 'fa-solid fa-sign-out-alt', route: '/logout' },
  ];
}
