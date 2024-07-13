import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { LocationComponent } from './components/location/location.component';
import { ContactComponent } from './components/contact/contact.component';
import { PricingComponent } from './components/pricing/pricing.component';
import { InstructorsComponent } from './components/instructors/instructors.component';
import { SessionsComponent } from './components/sessions/sessions.component';
import { JoinStepsComponent } from './components/join-steps/join-steps.component';

const routes: Routes = [
  {path: '', component: LandingPageComponent},
  {path: 'lokalizacja', component: LocationComponent},
  {path: 'zapisy', component: JoinStepsComponent},
  {path: 'cennik', component: PricingComponent},
  {path: 'trenerzy', component: InstructorsComponent},
  {path: 'zajęcia', component: SessionsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
