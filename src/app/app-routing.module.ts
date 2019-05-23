import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EstablishmentComponent } from './components/establishment/establishment.component';
import { ZoneComponent } from './components/zone/zone.component';
import { BranchComponent } from './components/branch/branch.component';
import { SigninComponent } from './components/signin/signin.component';

import { GuardService } from './service/guard.service';

const routes: Routes = [
  { path: '', component: EstablishmentComponent },
  { path: 'login', component: SigninComponent },
  { path: 'establishments', component: EstablishmentComponent, canActivate: [GuardService] },
  { path: 'branch/:id', component: BranchComponent,  canActivate: [GuardService] },
  { path: 'zone', component: ZoneComponent, canActivate: [GuardService] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
