import { Routes } from '@angular/router';
import { Home } from './component/shared/home/home';
import { ArticuloPlistAdminRouted } from './component/articulo/plist-admin-routed/articulo-plist';
import { JugadorPlisComponent } from './component/jugador/jugadorPlist/jugador-plist';

export const routes: Routes = [
    { path: '', component: Home },
    { path: 'articulo', component: ArticuloPlistAdminRouted},
    { path: 'articulo/:tipoarticulo', component: ArticuloPlistAdminRouted},
    { path: 'jugador', component: JugadorPlisComponent},
    { path: 'jugador/usuario/:id', component: JugadorPlisComponent},
    { path: 'jugador/equipo/:id', component: JugadorPlisComponent}
];
