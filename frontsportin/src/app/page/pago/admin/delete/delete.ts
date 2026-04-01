import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PagoService } from '../../../../service/pago';
import { NotificacionService } from '../../../../service/notificacion';;
import { PagoAdminDetail } from '../../../../component/pago/admin/detail/detail';

@Component({
  selector: 'app-pago-admin-delete-page',
  imports: [PagoAdminDetail],
  templateUrl: './delete.html',
  styleUrl: './delete.css',
})
export class PagoAdminDeletePage {
  private route = inject(ActivatedRoute);
  private pagoService = inject(PagoService);
  private notificacion = inject(NotificacionService);

  id_pago = signal<number>(0);
  error = signal<string | null>(null);

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    const id = idParam ? Number(idParam) : NaN;
    if (isNaN(id) || id <= 0) {
      this.error.set('ID de pago no válido');
      return;
    }
    this.id_pago.set(id);
  }

  doDelete(): void {
    this.pagoService.delete(this.id_pago()).subscribe({
      next: () => {
        this.notificacion.info('Pago eliminado');
        window.history.back();
      },
      error: (err) => {
        this.error.set('Error eliminando el pago');
        this.notificacion.error('Error eliminando el pago');
        console.error(err);
      },
    });
  }

  doCancel(): void {
    window.history.back();
  }
}
