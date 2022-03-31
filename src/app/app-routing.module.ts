import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'to-do-liste', pathMatch: 'full' },
  {
    path: 'to-do-liste',
    loadChildren: () =>
      import('./to-do-list/to-do-list.module').then((m) => m.ToDoListModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
