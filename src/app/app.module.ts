import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AgmCoreModule } from '@agm/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EstablishmentComponent } from './components/establishment/establishment.component';
import { HeaderComponent } from './templates/header/header.component';
import { FooterComponent } from './templates/footer/footer.component';
import { NavbarComponent } from './templates/navbar/navbar.component';
import { StatusPipe } from './filters/status.pipe';
import { BranchComponent } from './components/branch/branch.component';
import { SigninComponent } from './components/signin/signin.component';
import { ZoneComponent } from './components/zone/zone.component';

@NgModule({
  declarations: [
    AppComponent,
    EstablishmentComponent,
    HeaderComponent,
    FooterComponent,
    NavbarComponent,
    StatusPipe,
    BranchComponent,
    SigninComponent,
    ZoneComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AgmCoreModule.forRoot({
      apiKey: 'xxxxx',
      libraries: ['places', 'drawing', 'geometry']
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
