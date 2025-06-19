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
import { DefaultUrlSerializer } from '@angular/router';
import { UrlSerializer } from '@angular/router';
import { UrlTree } from '@angular/router';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { providePrimeNG } from 'primeng/config';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import Aura from '@primeng/themes/aura';

export class CustomUrlSerializer extends DefaultUrlSerializer {
  override parse(url: string): UrlTree {
    if (!url.endsWith('/')) {
      url += '/'; // Dodaje ukośnik, jeśli go brakuje
    }
    return super.parse(url);
  }

  override serialize(tree: UrlTree): string {
    let serialized = super.serialize(tree);
    if (!serialized.endsWith('/')) {
      serialized += '/';
    }
    return serialized;
  }
}


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
        ArticleCardComponent
    ],
    bootstrap: [AppComponent], 
    imports: [
        BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule
    ], 
    providers: 
    [
        provideClientHydration(),
        { provide: UrlSerializer, useClass: CustomUrlSerializer },
        provideHttpClient(withInterceptorsFromDi()),
        provideAnimationsAsync(),
        providePrimeNG({
          theme: {
            preset: Aura,
            options: {
              darkModeSelector: false
            }
          }
        })
    ] 
  })
export class AppModule { }
