import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { ContactFormComponent } from './components/contact-form/contact-form.component';
import { TopBarComponent } from './components/top-bar/top-bar.component';
import { HeroComponent } from './components/hero/hero.component';
import { FeaturesSectionComponent } from './components/features-section/features-section.component';
import { InfoCardComponent } from './components/info-card/info-card.component';
import { LocationComponent } from './components/location/location.component';
import { FooterComponent } from './components/footer/footer.component';
import { ContactComponent } from './components/contact/contact.component';
import { PricingComponent } from './components/pricing/pricing.component';
import { InstructorsComponent } from './components/instructors/instructors.component';
import { SessionsComponent } from './components/sessions/sessions.component';
import { JoinStepsComponent } from './components/join-steps/join-steps.component';
import { ArticlesComponent } from './components/articles/articles.component';
import { ArticleDetailComponent } from './components/article-detail/article-detail.component';
import { ArticleCardComponent } from './components/article-card/article-card.component';
import { PrivacyPolicyComponent } from './components/privacy-policy/privacy-policy.component';
import { HttpClientModule } from '@angular/common/http';
import { ConfirmFirstTrainingComponent } from './components/confirm-first-training/confirm-first-training.component';
import { DatePickerComponent } from './components/date-picker/date-picker.component';
import { SimpleSelectComponent } from './components/simple-select/simple-select.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    ContactFormComponent,
    TopBarComponent,
    HeroComponent,
    FeaturesSectionComponent,
    InfoCardComponent,
    LocationComponent,
    FooterComponent,
    ContactComponent,
    PricingComponent,
    InstructorsComponent,
    SessionsComponent,
    JoinStepsComponent,
    ArticlesComponent,
    ArticleDetailComponent,
    ArticleCardComponent,
    PrivacyPolicyComponent,
    ConfirmFirstTrainingComponent,
    DatePickerComponent,
    SimpleSelectComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
