import { Component, inject, OnInit, signal } from '@angular/core';
import { ILevel, Levels } from '../../core/models/ILevel';
import { NgClass, NgFor } from '@angular/common';
import { DataService } from '../../core/service/data.service';

@Component({
  selector: 'app-four-quadrants',
  imports: [NgFor, NgClass],
  templateUrl: './four-quadrants.component.html',
  styleUrl: './four-quadrants.component.css',
})
export class FourQuadrantsComponent {
  dataService = inject(DataService);
  levels = this.dataService.levels;
  constructor() {
    console.log('level is fetched ', this.levels());
  }
}
