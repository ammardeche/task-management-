import { Component } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from './sidebar/sidebar.component';
import { UiService } from '../core/service/ui.service';
import { AddTaskComponent } from '../pages/add-task/add-task.component';

@Component({
  selector: 'app-layout',
  imports: [HeaderComponent, SidebarComponent, AddTaskComponent, RouterOutlet],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css',
})
export class LayoutComponent {}
