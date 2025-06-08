import { Component, OnInit } from '@angular/core';
import { DataService } from '../../core/service/data.service';
import { ITask } from '../../core/models/ITask';
import {
  CdkDrag,
  CdkDragDrop,
  CdkDropList,
  DragDropModule,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-tasks-list',
  imports: [DragDropModule, CdkDropList, CdkDrag],
  templateUrl: './tasks-list.component.html',
  styleUrl: './tasks-list.component.css',
})
export class TasksListComponent implements OnInit {
  constructor(private taskService: DataService) {}

  drop(event: CdkDragDrop<ITask[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }
  tasks!: ITask[];

  ngOnInit(): void {
    this.taskService.getTasks();
    this.taskService.getTasks$().subscribe((res) => {
      this.tasks = res;
      console.log('Tasks fetched successfully:', this.tasks);
    });
  }
}
