import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IntroComponent } from './pages/intro/intro.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { CardInfoComponent } from './components/card-info/card-info.component';
import { SectionTitleComponent } from './components/section-title/section-title.component';
import { ImageSliderComponent } from './components/image-slider/image-slider.component';
import { HomeComponent } from './pages/home/home.component';
import { IsetComponent } from './pages/iset/iset.component';
import { BejaComponent } from './pages/beja/beja.component';
import { ConseilsComponent } from './pages/conseils/conseils.component';
import { GalerieComponent } from './pages/galerie/galerie.component';
import { EnactusComponent } from './pages/enactus/enactus.component';
import { ContactComponent } from './pages/contact/contact.component';
import { StarsBackgroundComponent } from './stars-background/stars-background.component';
import { ItComponent } from './etud/it/it.component';
import { MicanComponent } from './etud/mican/mican.component';
import { ElectComponent } from './etud/elect/elect.component';

@NgModule({
  declarations: [
    AppComponent,
    IntroComponent,
    NavbarComponent,
    FooterComponent,
    CardInfoComponent,
    SectionTitleComponent,
    ImageSliderComponent,
    HomeComponent,
    IsetComponent,
    BejaComponent,
    ConseilsComponent,
    GalerieComponent,
    EnactusComponent,
    ContactComponent,
    StarsBackgroundComponent,
    ItComponent,
    MicanComponent,
    ElectComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
