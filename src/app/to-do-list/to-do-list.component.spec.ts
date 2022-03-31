import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router, RouterModule } from '@angular/router';
import { Tache } from '../shared/model/tache.model';
import { MaterialModule } from '../shared/module/material-module/material-module';

import { ToDoListComponent } from './to-do-list.component';

describe('ToDoListComponent', () => {
  let component: ToDoListComponent;
  let fixture: ComponentFixture<ToDoListComponent>;
  let httpTestingController: HttpTestingController;
  let compiled: HTMLElement;
  let routerSpy = { navigate: jasmine.createSpy('navigate') };

  const mockTaches: Tache[] = [
    {
      id: '1',
      label: 'tache1',
      complete: false,
    },
    {
      id: '2',
      label: 'tache2',
      complete: true,
    },
  ];

  const mockTachesComplete: Tache[] = [
    {
      id: '2',
      label: 'tache2',
      complete: true,
    },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        MaterialModule,
        BrowserAnimationsModule,
        RouterModule.forRoot([]),
      ],
      declarations: [ToDoListComponent],
      providers: [{ provide: Router, useValue: routerSpy }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToDoListComponent);
    httpTestingController = TestBed.inject(HttpTestingController);
    component = fixture.componentInstance;
    compiled = fixture.debugElement.nativeElement;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('init state - getAllTache', () => {
    const request = httpTestingController.expectOne(
      'http://localhost:8080/taches'
    );
    request.flush(mockTaches);
    fixture.detectChanges();
    expect(compiled.querySelectorAll('tr')?.length).toEqual(3);
    expect(component).toBeTruthy();
  });

  it('slide click - getAllTacheComplete', () => {
    // Etat initiale du composant
    const request = httpTestingController.expectOne(
      'http://localhost:8080/taches'
    );
    request.flush(mockTaches);
    fixture.detectChanges();
    expect(compiled.querySelectorAll('tr')?.length).toEqual(3);
    expect(component).toBeTruthy();

    // Activation du slide
    const slideElementHTML = compiled.querySelector(
      'input[type=checkbox]'
    ) as HTMLInputElement;
    slideElementHTML.click();

    // Mock tache complete
    const requestComplete = httpTestingController.expectOne(
      'http://localhost:8080/taches/completed'
    );
    requestComplete.flush(mockTachesComplete);
    fixture.detectChanges();
    expect(compiled.querySelectorAll('tr')?.length).toEqual(2);
    expect(component).toBeTruthy();
  });

  it('nouvelle tache - call tache-detail', () => {
    const ButtonElementHTML = compiled.querySelector(
      'button'
    ) as HTMLButtonElement;
    ButtonElementHTML.click();
    expect(routerSpy.navigate).toHaveBeenCalledWith([
      'to-do-liste/tache-detail',
    ]);
  });

  it('Detail tache - call :id/tache-detail', () => {
    const request = httpTestingController.expectOne(
      'http://localhost:8080/taches'
    );
    request.flush(mockTaches);
    fixture.detectChanges();
    const TableRownElement = compiled.querySelector(
      '.mat-row'
    ) as HTMLTableRowElement;
    TableRownElement.click();
    expect(routerSpy.navigate).toHaveBeenCalledWith([
      'to-do-liste/1/tache-detail',
    ]);
  });
});
