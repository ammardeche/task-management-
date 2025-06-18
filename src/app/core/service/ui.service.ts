import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UiService {
  constructor() {}

  isOpned = signal<boolean>(false);
  isCartOpened = signal<boolean>(false);
  isAddTaskOpened = signal<boolean>(false);

  toggleAddTask() {
    this.isAddTaskOpened.update((isOpened) => !isOpened);
  }
  toggleCart() {
    this.isCartOpened.update((isOpened) => !isOpened);
  }
  toggleSidebar() {
    this.isOpned.update((isOpened) => !isOpened);
  }
}
