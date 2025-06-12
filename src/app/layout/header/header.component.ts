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

  isCartOpened = signal(false);

  toggleCart() {
    this.isCartOpened.update((state) => !state);
  }

  onClick() {
    this.uiService.toggleSidebar();
  }

  OnCartClick() {
    this.uiService.toggleCart();
    console.log('Cart toggled: ', this.uiService.isCartOpened());
  }
}
