import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UiService {
  constructor() {}

  isOpned = signal<boolean>(false);
  isCartOpened = signal<boolean>(false);

  toggleCart() {
    this.isCartOpened.update((isOpened) => !isOpened);
  }
  get cartState() {
    return this.isCartOpened(); // Return the current value of the signal
  }

  toggleSidebar() {
    this.isOpned.update((isOpened) => !isOpened);
  }
}
