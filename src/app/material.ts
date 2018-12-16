import { MatButtonModule, MatCheckboxModule, MatToolbarModule, MatMenuModule, MatCardModule } from '@angular/material';
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
  ],
  exports: [
    MatButtonModule,
    MatCheckboxModule, 
    MatToolbarModule,
    MatCardModule,
    MatIconModule,
    MatMenuModule,
  ],
})
export class MaterialModule { }