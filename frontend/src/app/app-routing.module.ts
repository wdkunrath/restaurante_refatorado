import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthGuard } from "../app/_helpers";

import { HomeComponent } from "./views/home/home.component";
import { LoginComponent } from './views/login/login.component';

import { RestaurantCrudComponent } from "./views/restaurant-crud/restaurant-crud.component";
import { RestaurantCreateComponent } from './components/restaurant/restaurant-create/restaurant-create.component';
import { RestaurantUpdateComponent } from './components/restaurant/restaurant-update/restaurant-update.component';
import { RestaurantDeleteComponent } from './components/restaurant/restaurant-delete/restaurant-delete.component';

import { UsuariosCrudComponent } from "./views/usuarios-crud/usuarios-crud.component";
import { UsuariosCreateComponent } from './components/usuarios/usuarios-create/usuarios-create.component';
import { UsuariosUpdateComponent } from './components/usuarios/usuarios-update/usuarios-update.component';
import { UsuariosDeleteComponent } from './components/usuarios/usuarios-delete/usuarios-delete.component';

import { SemanasCrudComponent } from "./views/semanas-crud/semanas-crud.component";
import { SemanasCreateComponent } from './components/semanas/semanas-create/semanas-create.component';
import { SemanasUpdateComponent } from './components/semanas/semanas-update/semanas-update.component';
import { SemanasDeleteComponent } from './components/semanas/semanas-delete/semanas-delete.component';
 
import { VotacaoCrudComponent } from "./views/votacao-crud/votacao-crud.component";
import { VotacaoCreateComponent } from "./components/votacao/votacao-create/votacao-create.component";

const routes: Routes = [
  {path: "", component: LoginComponent},
  {path: "home", component: HomeComponent, canActivate: [AuthGuard]},
  {path: "restaurant",component: RestaurantCrudComponent, canActivate: [AuthGuard]},
  {path: "restaurant/create",component: RestaurantCreateComponent, canActivate: [AuthGuard]},
  {path: "restaurant/update/:id",component: RestaurantUpdateComponent, canActivate: [AuthGuard]},
  {path: "restaurant/delete/:id",component: RestaurantDeleteComponent, canActivate: [AuthGuard]},
  {path: "usuarios",component: UsuariosCrudComponent, canActivate: [AuthGuard]},
  {path: "usuarios/create",component: UsuariosCreateComponent, canActivate: [AuthGuard]},
  {path: "usuarios/update/:id",component: UsuariosUpdateComponent, canActivate: [AuthGuard]},
  {path: "usuarios/delete/:id",component: UsuariosDeleteComponent, canActivate: [AuthGuard]},
  {path: "semanas",component: SemanasCrudComponent, canActivate: [AuthGuard]},
  {path: "semanas/create",component: SemanasCreateComponent, canActivate: [AuthGuard]},
  {path: "semanas/update/:id",component: SemanasUpdateComponent, canActivate: [AuthGuard]},
  {path: "semanas/delete/:id",component: SemanasDeleteComponent, canActivate: [AuthGuard]},
  {path: "votacao",component: VotacaoCrudComponent, canActivate: [AuthGuard]},
  {path: "votacao/create",component: VotacaoCreateComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {}
