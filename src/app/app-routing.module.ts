import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { LocationComponent } from './components/location/location.component';
import { ContactComponent } from './components/contact/contact.component';
import { PricingComponent } from './components/pricing/pricing.component';
import { InstructorsComponent } from './components/instructors/instructors.component';
import { SessionsComponent } from './components/sessions/sessions.component';
import { JoinStepsComponent } from './components/join-steps/join-steps.component';
import { ArticlesComponent } from './components/articles/articles.component';
import { ArticleDetailComponent } from './components/article-detail/article-detail.component';
import { PrivacyPolicyComponent } from './components/privacy-policy/privacy-policy.component';

const routes: Routes = [
  { path: 'login/', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadComponent: () =>
      import('./login-page/login-page.component').then(m => m.LoginPageComponent)
  },
  { path: '', component: LandingPageComponent, pathMatch: 'full' },
  { path: 'lokalizacja', redirectTo: 'lokalizacja/', pathMatch: 'full' },
  { path: 'lokalizacja/', component: LocationComponent },
  { path: 'zapisy', redirectTo: 'zapisy/', pathMatch: 'full' },
  { path: 'zapisy/', component: JoinStepsComponent },
  { path: 'cennik', redirectTo: 'cennik/', pathMatch: 'full' },
  { path: 'cennik/', component: PricingComponent },
  { path: 'trenerzy', redirectTo: 'trenerzy/', pathMatch: 'full' },
  { path: 'trenerzy/', component: InstructorsComponent },
  { path: 'zajecia', redirectTo: 'zajecia/', pathMatch: 'full' },
  { path: 'zajecia/', component: SessionsComponent },
  { path: 'artykuly', redirectTo: 'artykuly/', pathMatch: 'full' },
  { path: 'artykuly/', component: ArticlesComponent },
  { path: 'artykuly/:id', redirectTo: 'artykuly/:id/', pathMatch: 'full' },
  { path: 'artykuly/:id/', component: ArticleDetailComponent },
  { path: 'polityka-prywatnosci', redirectTo: 'polityka-prywatnosci/', pathMatch: 'full' },
  { path: 'polityka-prywatnosci/', component: PrivacyPolicyComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { 
    scrollPositionRestoration: 'top',
    enableTracing: true
   })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
