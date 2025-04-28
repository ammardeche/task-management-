import { Component } from '@angular/core';
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

@Component({
  selector: 'app-sidebar',
  imports: [FontAwesomeModule, RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  faTableColumns = faTableColumns;
  faCheckCircle = faCheckCircle;
  faBell = faBell;
  faSliders = faSliders;
  faArrowRightFromBracket = faArrowRightFromBracket;

  constructor(private authService: AuthService) {}

  logout() {
    this.authService.logout();
  }
}
