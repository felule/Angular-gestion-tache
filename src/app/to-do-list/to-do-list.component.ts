import { Component, OnInit } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { Router } from '@angular/router';
import { Tache } from '../shared/model/tache.model';
import { GestionTacheService } from '../shared/services/gestion-tache.service';

@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.css'],
})
export class ToDoListComponent implements OnInit {
  taches!: Tache[];
  displayedColumns: string[] = ['id', 'label', 'complete'];
  constructor(
    private gestionTacheService: GestionTacheService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getTache();
  }

  goToDetailTache(tache: Tache): void {
    this.router.navigate([`to-do-liste/${tache.id}/tache-detail`]);
  }

  nouvelleTache(): void {
    this.router.navigate([`to-do-liste/tache-detail`]);
  }

  getTache(): void {
    this.gestionTacheService
      .getTaches()
      .subscribe((taches: Tache[]) => (this.taches = taches));
  }

  getTacheComplete(): void {
    this.gestionTacheService
      .getTacheCompleted()
      .subscribe((taches: Tache[]) => (this.taches = taches));
  }

  filtreTaches(status: MatSlideToggleChange): void {
    if (status.checked === true) {
      this.getTacheComplete();
    } else {
      this.getTache();
    }
  }
}
