import { TacheDetailComponent } from './tache-detail/tache-detail.component';
import { ToDoListComponent } from './to-do-list.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { STATUS } from '../shared/model/enum.model';

const routes: Routes = [
  { path: '', component: ToDoListComponent },
  {
    path: ':id/tache-detail',
    component: TacheDetailComponent,
    data: { status: STATUS.MODIFICATION },
  },
  {
    path: 'tache-detail',
    component: TacheDetailComponent,
    data: { status: STATUS.CREER },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ToDoListRoutingModule {}
