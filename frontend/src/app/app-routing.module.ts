import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './helpers';

import { HomeComponent } from '@app/views/home';
import { LoginComponent } from '@app/views/login';
import { RestaurantCrudComponent } from "@app/views/restaurant-crud/restaurant-crud.component";
import { SemanasCrudComponent } from "@app/views/semanas-crud/semanas-crud.component";
import { UsuariosCrudComponent } from "@app/views/usuarios-crud/usuarios-crud.component";
import { VotacaoCrudComponent } from "@app/views/votacao-crud/votacao-crud.component";
import { ResultadoVotoCrudComponent } from '@app/views/resultado-voto/resultado-voto.component';

import { RestaurantCreateComponent } from '@components/restaurant/restaurant-create/restaurant-create.component';
import { RestaurantUpdateComponent } from '@components/restaurant/restaurant-update/restaurant-update.component';
import { RestaurantDeleteComponent } from '@components/restaurant/restaurant-delete/restaurant-delete.component';


import { UsuariosCreateComponent } from '@components/usuarios/usuarios-create/usuarios-create.component';
import { UsuariosUpdateComponent } from '@components/usuarios/usuarios-update/usuarios-update.component';
import { UsuariosDeleteComponent } from '@components/usuarios/usuarios-delete/usuarios-delete.component';

import { SemanasCreateComponent } from '@components/semanas/semanas-create/semanas-create.component';
import { SemanasUpdateComponent } from '@components/semanas/semanas-update/semanas-update.component';
import { SemanasDeleteComponent } from '@components/semanas/semanas-delete/semanas-delete.component';

import { VotacaoCreateComponent } from "@components/votacao/votacao-create/votacao-create.component";
import { VotacaoUpdateComponent } from '@components/votacao/votacao-update/votacao-update.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: '', component: HomeComponent, canActivate: [AuthGuard]},
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
  {path: "votacao/update/:id",component: VotacaoUpdateComponent, canActivate: [AuthGuard]},
  {path: "resultado",component: ResultadoVotoCrudComponent, canActivate: [AuthGuard]},

  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }
