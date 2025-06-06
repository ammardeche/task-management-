import { Component, signal, Signal } from '@angular/core';
import { UiService } from '../../core/service/ui.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [NgClass],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  constructor(private uiService: UiService) {}

  isCartOpened = signal(true);

  toggleCart() {
    this.isCartOpened.update((state) => !state);
  }

  onClick() {
    this.uiService.toggleSidebar();
  }
}
