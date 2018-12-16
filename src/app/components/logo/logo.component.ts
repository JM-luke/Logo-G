import { Component, OnInit } from '@angular/core';
import { DataLogo } from '../../models/ObjDataLogo';
import { LogoStatusService } from '../../services/logo-status.service';

@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.css']
})
export class LogoComponent implements OnInit {
  logoStatus: DataLogo[];
  logoStatusToPlot: DataLogo[];

  set LogoStatus(status: DataLogo[]){
    this.logoStatus = status;
    this.logoStatusToPlot = this.logoStatus.slice(0,20);
  }

  constructor(private logoStatusSvc: LogoStatusService) {
    this.logoStatusSvc.getInitialLogoStatus()
      .subscribe(data => {
        
        this.LogoStatus = data;
        let logoUpdateObservable =  this.logoStatusSvc.getUpdates(); 
        logoUpdateObservable.subscribe((latestStatus: DataLogo) => { 
          this.LogoStatus = [latestStatus].concat(this.logoStatus); 
        }); 
      });
   }

  ngOnInit() {
  }

}
