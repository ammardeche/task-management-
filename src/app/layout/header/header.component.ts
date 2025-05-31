import { Component, signal, Signal } from '@angular/core';
import { UiService } from '../../core/service/ui.service';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  constructor(private uiService: UiService) {}

  onClick() {
    this.uiService.toggleSidebar();
  }
}
