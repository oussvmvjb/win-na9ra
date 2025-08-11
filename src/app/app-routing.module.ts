import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { IntroComponent } from './pages/intro/intro.component';
import { HomeComponent } from './pages/home/home.component';
import { IsetComponent } from './pages/iset/iset.component';
import { BejaComponent } from './pages/beja/beja.component';
import { ConseilsComponent } from './pages/conseils/conseils.component';
import { GalerieComponent } from './pages/galerie/galerie.component';
import { EnactusComponent } from './pages/enactus/enactus.component';
import { ContactComponent } from './pages/contact/contact.component';
import { ItComponent } from './etud/it/it.component';
import { ElectComponent } from './etud/elect/elect.component';
import { MicanComponent } from './etud/mican/mican.component';

const routes: Routes = [
  { path: '', component: IntroComponent },             // الصفحة الأولى
  { path: 'home', component: HomeComponent },          // الرئيسية
  { path: 'iset', component: IsetComponent },          // ISET Béja
  { path: 'beja', component: BejaComponent },          // ولاية باجة
  { path: 'conseils', component: ConseilsComponent },  // نصائح
  { path: 'galerie', component: GalerieComponent },    // الصور والفيديوهات
  { path: 'enactus', component: EnactusComponent },    // تعريف بـ Enactus
  { path: 'contact', component: ContactComponent },
  { path: 'it', component: ItComponent }, 
  { path: 'elect', component: ElectComponent }, 
  { path: 'mican', component: MicanComponent },     // تواصل معنا

  // Redirect أي مسار غير معروف للصفحة الأولى
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy } // أضف هذا السطر
  ]
})
export class AppRoutingModule { }
