import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FacturaService } from '../../../../service/factura-service';
import { NotificacionService } from '../../../../service/notificacion';;
import { FacturaAdminDetail } from '../../../../component/factura/admin/detail/detail';

@Component({
  selector: 'app-factura-admin-delete-page',
  imports: [FacturaAdminDetail],
  templateUrl: './delete.html',
  styleUrl: './delete.css',
})
export class FacturaAdminDeletePage {
  private route = inject(ActivatedRoute);
  private facturaService = inject(FacturaService);
  private notificacion = inject(NotificacionService);

  id_factura = signal<number>(0);
  error = signal<string | null>(null);

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    const id = idParam ? Number(idParam) : NaN;
    if (isNaN(id) || id <= 0) {
      this.error.set('ID de factura no válido');
      return;
    }
    this.id_factura.set(id);
  }

  doDelete(): void {
    this.facturaService.delete(this.id_factura()).subscribe({
      next: () => {
        this.notificacion.info('Factura eliminada');
        window.history.back();
      },
      error: (err) => {
        this.error.set('Error eliminando la factura');
        this.notificacion.error('Error eliminando la factura');
        console.error(err);
      },
    });
  }

  doCancel(): void {
    window.history.back();
  }
}
