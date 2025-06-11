import { Component, OnInit, Pipe } from '@angular/core';
import { DataService } from '../../core/service/data.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ITask } from '../../core/models/ITask';
import { pipe } from 'rxjs';
import { DatePipe, NgClass, NgFor } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    NgClass,
    NgFor,
    DatePipe,
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

  ngOnInit(): void {
    this.tasksService.getTasks();
    this.tasksService.getTasks$().subscribe((task) => {
      this.taskList = task;
      this.dataSource.data = this.taskList;
      console.log('Tasks fetched successfully: __ ', this.taskList);
    });
  }
  constructor(private tasksService: DataService) {}

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
