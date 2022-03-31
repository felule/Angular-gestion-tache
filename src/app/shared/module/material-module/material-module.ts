import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

const materialModule = [
  MatFormFieldModule,
  MatInputModule,
  MatCheckboxModule,
  MatTableModule,
  MatSlideToggleModule,
];

@NgModule({
  declarations: [],
  imports: [...materialModule, CommonModule],
  exports: [...materialModule],
})
export class MaterialModule {}
