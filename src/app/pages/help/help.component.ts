import { Component, signal } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIcon } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-help',
  imports: [MatExpansionModule, MatIcon, MatCardModule, NgFor],
  templateUrl: './help.component.html',
  styleUrl: './help.component.css',
})
export class HelpComponent {
  readonly panelOpenState = signal(false);

  faqs = [
    {
      question: 'How do I create a new task?',
      answer:
        'Click on the "Add Task" button in the dashboard or task page and fill in the required details.',
    },
    {
      question: 'Can I assign tasks to team members?',
      answer:
        'Yes, during task creation or editing, you can assign tasks to registered users.',
    },
    {
      question: 'How does the level system work?',
      answer:
        'Each task completed gives you points. Points determine your level and unlock new features.',
    },
    {
      question: 'Where can I manage categories?',
      answer:
        'Go to the "Categories" section from the sidebar to add, edit, or delete categories.',
    },
  ];
}
