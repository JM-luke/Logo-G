import { MatButtonModule, MatCheckboxModule, MatToolbarModule } from '@angular/material';
import {MatIconModule} from '@angular/material/icon';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [
    MatButtonModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatIconModule
  ],
  exports: [
    MatButtonModule,
    MatCheckboxModule, 
    MatToolbarModule,
    MatIconModule
  ],
})
export class MaterialModule { }