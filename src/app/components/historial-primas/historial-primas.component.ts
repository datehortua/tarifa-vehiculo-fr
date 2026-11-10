import { Component, computed, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HistorialTarifasService } from '../../services/historial-tarifas.service';

@Component({
  selector: 'app-historial-primas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './historial-primas.component.html',
  styleUrls: ['./historial-primas.component.css']
})
export class HistorialPrimasComponent {
  // 1. Inyectamos los servicios con la función inject()
  private historialService = inject(HistorialTarifasService);
  private router = inject(Router);

  // 2. Ahora sí, el servicio ya está inicializado y podemos leer el historial
  datosCompletos = this.historialService.historial;

  // Variables de paginación
  paginaActual = signal(1);
  itemsPorPagina = 5;

  // Computamos los datos de la página actual
  datosPaginados = computed(() => {
    const inicio = (this.paginaActual() - 1) * this.itemsPorPagina;
    const fin = inicio + this.itemsPorPagina;
    return this.datosCompletos().slice(inicio, fin);
  });

  // Total de páginas
  totalPaginas = computed(() => {
    return Math.ceil(this.datosCompletos().length / this.itemsPorPagina) || 1;
  });

  cambiarPagina(nuevaPagina: number) {
    if (nuevaPagina >= 1 && nuevaPagina <= this.totalPaginas()) {
      this.paginaActual.set(nuevaPagina);
    }
  }

  volverAlFormulario() {
    this.router.navigate(['/']);
  }
}
