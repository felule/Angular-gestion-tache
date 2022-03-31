import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../shared/module/material-module/material-module';
import { ToDoListComponent } from './to-do-list.component';
import { ToDoListRoutingModule } from './to-do-list-routing.module';
import { TacheDetailComponent } from './tache-detail/tache-detail.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ToDoListComponent, TacheDetailComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ToDoListRoutingModule,
    ReactiveFormsModule,
  ],
})
export class ToDoListModule {}
