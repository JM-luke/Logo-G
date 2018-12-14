import { Component } from '@angular/core';
import { LogoStatusService } from './services/logo-status.service';
import { Observable } from 'rxjs';
import { DataLogo } from './models/ObjDataLogo';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'WEB SERVER LOGO';
  logoStatus: DataLogo[];
  logoStatusToPlot: DataLogo[];

  set LogoStatus(status: DataLogo[]){
    this.logoStatus = status;
    this.logoStatusToPlot = this.logoStatus.slice(0,20);
  }

  constructor(private logoStatusSvc: LogoStatusService){
    this.logoStatusSvc.getInitialLogoStatus()
      .subscribe(data => {
        
        this.LogoStatus = data;
        let logoUpdateObservable =  this.logoStatusSvc.getUpdates(); 
        logoUpdateObservable.subscribe((latestStatus: DataLogo) => { 
          this.LogoStatus = [latestStatus].concat(this.logoStatus); 
        }); 
      });
  }
}
