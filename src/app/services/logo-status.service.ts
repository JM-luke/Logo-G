import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { MemoriaLogo } from '../memoria-logo/memoria-logo';

@Injectable({
  providedIn: 'root'
})
export class LogoStatusService {

  private baseUrl =  'http://localhost:3000';
  constructor(
    private httpClient: HttpClient
  ) { }

  getInitialLogoStatus() {
    return this.httpClient.get<MemoriaLogo[]>(`${this.baseUrl}/api/logo`);
  }
}
