import { MatButtonModule,
  MatCheckboxModule,
  MatToolbarModule,
  MatMenuModule,
  MatCardModule,
  MatInputModule,
  MatSelectModule
 } from '@angular/material';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
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
  MatSelectModule
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
    MatSelectModule    
  ],
})
export class MaterialModule { }