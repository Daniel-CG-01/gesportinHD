import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarritoService } from '../../../../service/carrito';
import { NotificacionService } from '../../../../service/notificacion';;
import { CarritoAdminDetail } from '../../../../component/carrito/admin/detail/detail';

@Component({
  selector: 'app-carrito-admin-delete-page',
  imports: [CarritoAdminDetail],
  templateUrl: './delete.html',
  styleUrl: './delete.css',
})
export class CarritoAdminDeletePage {
  private route = inject(ActivatedRoute);
  private carritoService = inject(CarritoService);
  private notificacion = inject(NotificacionService);

  id_carrito = signal<number>(0);
  error = signal<string | null>(null);

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    const id = idParam ? Number(idParam) : NaN;
    if (isNaN(id) || id <= 0) {
      this.error.set('ID de carrito no válido');
      return;
    }
    this.id_carrito.set(id);
  }

  doDelete(): void {
    this.carritoService.delete(this.id_carrito()).subscribe({
      next: () => {
        this.notificacion.info('Carrito eliminado');
        window.history.back();
      },
      error: (err) => {
        this.error.set('Error eliminando el carrito');
        this.notificacion.error('Error eliminando el carrito');
        console.error(err);
      },
    });
  }

  doCancel(): void {
    window.history.back();
  }
}
