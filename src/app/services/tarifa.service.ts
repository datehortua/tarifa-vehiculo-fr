import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Interfaces que coinciden con tu Backend
export interface TarifaRequest {
  pnuValcomVeh: number;
  pnuAntgVeh: number;
  pnuEdacli: number;
  pnuCansini: number;
}

export interface TarifaResponse {
  tarifa?: number;
  salerr?: number;
  pvaSalerr?: string;
  exitoso: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class TarifaService {
  private apiUrl = 'http://localhost:8080/api/v1/tarifas/calcular';

  constructor(private http: HttpClient) { }

  calcularTarifa(request: TarifaRequest): Observable<TarifaResponse> {
    return this.http.post<TarifaResponse>(this.apiUrl, request);
  }
}
