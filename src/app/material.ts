import { MatButtonModule,
  MatCheckboxModule,
  MatToolbarModule,
  MatMenuModule,
  MatCardModule,
  MatInputModule,
  MatSelectModule,
  MatProgressSpinnerModule,
  MatFormFieldModule,
  MatIconModule, 
 } from '@angular/material';

import { NgModule } from '@angular/core';

@NgModule({
  imports: [
    MatButtonModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatCardModule,
    MatIconModule,
    MatMenuModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatProgressSpinnerModule
  ],
  exports: [
    MatButtonModule,
    MatCheckboxModule, 
    MatToolbarModule,
    MatCardModule,
    MatIconModule,
    MatMenuModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatProgressSpinnerModule    
  ],
})
export class MaterialModule { }