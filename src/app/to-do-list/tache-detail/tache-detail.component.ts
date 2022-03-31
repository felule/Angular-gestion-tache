import { GestionTacheService } from './../../shared/services/gestion-tache.service';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Tache } from 'src/app/shared/model/tache.model';
import { STATUS } from 'src/app/shared/model/enum.model';

@Component({
  selector: 'app-tache-detail',
  templateUrl: './tache-detail.component.html',
  styleUrls: ['./tache-detail.component.css'],
})
export class TacheDetailComponent implements OnInit {
  tacheForm!: FormGroup;
  status!: STATUS;
  STATUS = STATUS;
  labelBtnSubmit = 'Creer';

  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private gestionTacheService: GestionTacheService
  ) {}

  ngOnInit(): void {
    this.status = this.activatedRoute.snapshot.data['status'];

    this.tacheForm = this.fb.group({
      label: [{ value: '', disabled: this.status === STATUS.MODIFICATION }],
      complete: [],
    });

    // Cas modification
    if (this.status === STATUS.MODIFICATION) {
      this.labelBtnSubmit = 'Modifier';
      this.tacheForm.addControl(
        'id',
        new FormControl({ value: '', disabled: true })
      );
      const id = this.activatedRoute.snapshot.params['id'];
      this.getTacheById(id);
    }
  }

  getTacheById(id: string): void {
    this.gestionTacheService.getTacheById(id).subscribe((tache: Tache) => {
      this.tacheForm.patchValue(tache);
      this.tacheForm.updateValueAndValidity();
    });
  }

  onSubmit(): void {
    if (this.status === STATUS.MODIFICATION) {
      this.gestionTacheService
        .patchCompletionTache(
          this.tacheForm.get('id')?.value,
          this.tacheForm.get('complete')?.value
        )
        .subscribe((tache: Tache) => this.router.navigate(['to-do-liste']));
    } else if (this.status === STATUS.CREER) {
      this.gestionTacheService
        .postTache(this.tacheForm.value)
        .subscribe((tache: Tache) => this.router.navigate(['to-do-liste']));
    }
  }

  annuler(): void {
    this.router.navigate(['to-do-liste']);
  }
}
