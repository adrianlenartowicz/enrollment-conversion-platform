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
import { ConfirmFirstTrainingComponent } from './components/confirm-first-training/confirm-first-training.component';

const routes: Routes = [
  { path: '', component: LandingPageComponent },

  { path: 'lokalizacja', component: LocationComponent },
  { path: 'zapisy', component: JoinStepsComponent },
  { path: 'cennik', component: PricingComponent },
  { path: 'zajecia', component: SessionsComponent },

  { path: 'artykuly', component: ArticlesComponent },
  { path: 'artykuly/:id', component: ArticleDetailComponent },

  { path: 'polityka-prywatnosci', component: PrivacyPolicyComponent },
  { path: 'confirm-first-training', component: ConfirmFirstTrainingComponent },
];


@NgModule({
  imports: [RouterModule.forRoot(routes, { 
    scrollPositionRestoration: 'top',
    enableTracing: true
   })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
