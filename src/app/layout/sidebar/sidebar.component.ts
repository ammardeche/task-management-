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
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [FontAwesomeModule, RouterLink],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  faTableColumns = faTableColumns;
  faCheckCircle = faCheckCircle;
  faBell = faBell;
  faSliders = faSliders;
  faArrowRightFromBracket = faArrowRightFromBracket;
}
