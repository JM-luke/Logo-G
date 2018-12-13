import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { DataLogo, ConfigLogo } from '../models/ObjDatalogo';

@Injectable({
  providedIn: 'root'
})
export class LogoStatusService {
  private config; // Configuración de inputs y outputs del Logo.
  private baseUrl =  'http://localhost:3000';
  constructor(
    private httpClient: HttpClient
  ) { }

  getInitialLogoStatus() {
    this.config = this.httpClient.get<ConfigLogo[]>(`${this.baseUrl}/api/config`)
    return this.httpClient.get<DataLogo[]>(`${this.baseUrl}/api/logo`);
  }
}
