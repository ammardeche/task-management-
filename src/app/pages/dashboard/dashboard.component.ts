import { Component, OnInit, Pipe, ViewChild } from '@angular/core';
import { DataService } from '../../core/service/data.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ITask } from '../../core/models/ITask';
import { pipe } from 'rxjs';
import { DatePipe, NgClass, NgFor, NgIf } from '@angular/common';
import { AddTaskComponent } from '../add-task/add-task.component';
import { UiService } from '../../core/service/ui.service';
import { RouterLink } from '@angular/router';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-dashboard',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    NgClass,
    NgFor,
    DatePipe,
    RouterLink,
    MatPaginatorModule,
    MatPaginator,
    AddTaskComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  displayedColumns: string[] = [
    'title',
    'description',
    'dueDate',
    'priority',
    'status',
    'tags',
  ];
  taskList!: ITask[];
  dataSource = new MatTableDataSource<ITask>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.tasksService.getTasks();
    this.tasksService.getTasks$().subscribe((task) => {
      this.taskList = task;
      this.dataSource.data = this.taskList;
      console.log('Tasks fetched successfully: __ ', this.taskList);
    });
  }
  constructor(
    private tasksService: DataService,
    private uiService: UiService
  ) {}

  get isOpenedState() {
    return this.uiService.isAddTaskOpened;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
