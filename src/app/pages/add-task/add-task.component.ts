import { Component, signal } from '@angular/core';
import { UiService } from '../../core/service/ui.service';

@Component({
  selector: 'app-add-task',
  imports: [],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.css',
})
export class AddTaskComponent {
  constructor(private uiService: UiService) {
    const isOpened = this.uiService.toggleCart();
  }
}
