import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CompraService } from '../../../../service/compra';
import { NotificacionService } from '../../../../service/notificacion';;
import { CompraAdminDetail } from '../../../../component/compra/admin/detail/detail';

@Component({
  selector: 'app-compra-admin-delete-page',
  imports: [CompraAdminDetail],
  templateUrl: './delete.html',
  styleUrl: './delete.css',
})
export class CompraAdminDeletePage {
  private route = inject(ActivatedRoute);
  private compraService = inject(CompraService);
  private notificacion = inject(NotificacionService);

  id_compra = signal<number>(0);
  error = signal<string | null>(null);

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    const id = idParam ? Number(idParam) : NaN;
    if (isNaN(id) || id <= 0) {
      this.error.set('ID de compra no válido');
      return;
    }
    this.id_compra.set(id);
  }

  doDelete(): void {
    this.compraService.delete(this.id_compra()).subscribe({
      next: () => {
        this.notificacion.info('Compra eliminada');
        window.history.back();
      },
      error: (err) => {
        this.error.set('Error eliminando la compra');
        this.notificacion.error('Error eliminando la compra');
        console.error(err);
      },
    });
  }

  doCancel(): void {
    window.history.back();
  }
}
