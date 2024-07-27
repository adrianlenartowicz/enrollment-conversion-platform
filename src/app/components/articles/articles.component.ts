import { Component } from '@angular/core';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrl: './articles.component.css'
})
export class ArticlesComponent {
  articles = [
    {
      header: 'Kiedy dziecko powinno zacząć swoją przygodę ze sportem?',
      paragraph: 'Wielu rodziców zadaje sobie pytanie kiedy jest odpowiedni czas, aby zaznajomić swoje dziecko ze sportem. Czy powinno to nastąpić w przedszkolu? W zerówce? A może to jeszcze za wcześnie?',
      image: '../../../assets/sessions-feature-1.svg'
    },
    {
      header: 'Kiedy zdecydować się na zakup kolców dla dziecka?',
      paragraph: 'Podstawowym wyposażeniem lekkoatlety jest odpowiednie obuwie. I tu pojawia się wiele pytań, czy dziecko potrzebuje kolców? Kiedy jest odpowiedni moment na ich zakup? W tym artykule postaramy się rozwiać wszelkie wątpliwości dotyczące zakupy kolców dla dziecka.',
      image: '../../../assets/sessions-feature-2.svg'
    }
  ]
}
