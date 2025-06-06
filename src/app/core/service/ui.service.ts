import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UiService {
  constructor() {}

  isOpned = signal<boolean>(false);

  toggleSidebar() {
    this.isOpned.update((isOpened) => !isOpened);
  }
}
