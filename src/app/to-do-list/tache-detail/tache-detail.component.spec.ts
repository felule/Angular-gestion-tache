import { ServiceModule } from './../../shared/services/service.module';
import { MaterialModule } from './../../shared/module/material-module/material-module';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TacheDetailComponent } from './tache-detail.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('TacheDetailComponent', () => {
  let component: TacheDetailComponent;
  let fixture: ComponentFixture<TacheDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TacheDetailComponent],
      imports: [
        ReactiveFormsModule,
        MaterialModule,
        ServiceModule,
        BrowserAnimationsModule,
        RouterModule.forRoot([]),
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TacheDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
