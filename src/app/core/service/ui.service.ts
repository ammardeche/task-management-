import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UiService {
  constructor() {}

  isOpned = signal<boolean>(true);

  toggleSidebar() {
    this.isOpned.update((isOpened) => !isOpened);
  }
}
