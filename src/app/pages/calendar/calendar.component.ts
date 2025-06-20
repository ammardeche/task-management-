import { Component, OnInit, signal } from '@angular/core';
import { Calendar } from '@fullcalendar/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions } from '@fullcalendar/core'; // useful for typechecking
import dayGridPlugin from '@fullcalendar/daygrid';
import { DataService } from '../../core/service/data.service';
import { ITask } from '../../core/models/ITask';

@Component({
  selector: 'app-calendar',
  imports: [FullCalendarModule],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css',
})
export class CalendarComponent implements OnInit {
  constructor(private dataService: DataService) {}
  tasks: ITask[] = [];
  ngOnInit(): void {
    this.dataService.getTasks$().subscribe((res) => {
      this.tasks = res;
      console.log('data from calendar comp === ', this.tasks);

      if (this.tasks) {
        this.calendarOptions.events = this.tasks.map((task) => ({
          title: task.title,

          start: task.dueDate,
          allDay: true,
          extendedProps: {
            description: task.description,
          },
        }));
      }
    });
  }

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin],
  };
}
