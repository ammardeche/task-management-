import { Component, computed, signal } from '@angular/core';
import { UiService } from '../../core/service/ui.service';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { ChangeDetectionStrategy, inject } from '@angular/core';
import {
  MatChipEditedEvent,
  MatChipInputEvent,
  MatChipsModule,
} from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ITask } from '../../core/models/ITask';
import { NgFor, NgIf } from '@angular/common';
import { ILevel, Levels } from '../../core/models/ILevel';
import { DataService } from '../../core/service/data.service';

@Component({
  selector: 'app-add-task',
  imports: [
    MatFormFieldModule,
    MatChipsModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    NgFor,
  ],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddTaskComponent {
  taskForm!: FormGroup;

  // For chips input
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  addOnBlur = true;
  tags: string[] = [];
  levels = Levels;

  constructor(
    private fb: FormBuilder,
    private uiService: UiService,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      dueDate: ['', Validators.required],
      priority: ['', Validators.required],
      status: ['', Validators.required],
      tags: [[], Validators.required], // We'll sync tags array manually
    });
  }
  get priority() {
    return this.taskForm.get('priority')?.value;
  }
  get levelId(): string | undefined {
    const selectedPriority = this.taskForm.get('priority')?.value;
    return this.levels.find((level) => level.lvl === selectedPriority)?.id;
  }
  addTag(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add tag
    if (value && !this.tags.includes(value)) {
      this.tags.push(value);
      this.updateTagsFormControl();
    }

    // Clear input value
    event.chipInput!.clear();
  }

  removeTag(tag: string): void {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);
      this.updateTagsFormControl();
    }
  }

  editTag(tag: string, event: MatChipEditedEvent) {
    const value = event.value.trim();

    if (!value) {
      this.removeTag(tag);
      return;
    }

    const index = this.tags.indexOf(tag);
    if (index >= 0) {
      this.tags[index] = value;
      this.updateTagsFormControl();
    }
  }

  private updateTagsFormControl() {
    this.taskForm.get('tags')?.setValue(this.tags);
    this.taskForm.get('tags')?.markAsDirty();
  }

  onSubmit() {
    const task = this.taskForm.value as ITask;
    if (this.taskForm.valid) {
      this.dataService.addTask(task);
      this.dataService.addTaskToLevel(this.levelId!, task);
      this.onReset();
    }
  }

  onReset() {
    // Reset form and tags
    this.taskForm.reset({
      title: '',
      description: '',
      dueDate: '',
      priority: this.levels[0].lvl, // Default to 'Low'
      status: 'Not Started',
      tags: [],
    });
    this.tags = [];
  }
  onClose() {
    this.uiService.toggleAddTask();
  }
}
