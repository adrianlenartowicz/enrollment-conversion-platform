import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

interface SessionHighlight {
  label: string;
  value: string;
}

interface SessionArea {
  title: string;
  description: string;
  exercises: string[];
}

interface CharacterArea {
  title: string;
  description: string;
}

@Component({
  selector: 'app-sessions',
  templateUrl: './sessions.component.html',
  styleUrl: './sessions.component.css'
})
export class SessionsComponent {
  highlights: SessionHighlight[] = [
    { label: 'Wiek', value: '5-11 lat' },
    { label: 'Czas zajęć', value: '60 minut' },
    { label: 'Częstotliwość', value: '1 lub 2 razy w tygodniu' },
    { label: 'Liczebność grup', value: 'Do 15 osób' }
  ];

  motorAreas: SessionArea[] = [
    {
      title: 'Szybkość',
      description: 'Rozwijamy dynamikę i reakcję startową.',
      exercises: [
        'Dynamiczne gry i zabawy ruchowe',
        'Sprinty na krótkich dystansach',
        'Starty z różnych pozycji',
        'Starty z reakcją na sygnał'
      ]
    },
    {
      title: 'Wytrzymałość',
      description: 'Utrzymanie tempa i dłuższy wysiłek.',
      exercises: [
        'Aktywne zabawy i gry zespołowe',
        'Ćwiczenia z utrzymaniem tempa',
        'Biegi na długich dystansach',
        'Biegi o zróżnicowanej intensywności'
      ]
    },
    {
      title: 'Siła',
      description: 'Budowanie siły i stabilizacji ciała.',
      exercises: [
        'Ćwiczenia i zabawy siłowe',
        'Ćwiczenia wzmacniające mięśnie posturalne',
        'Ćwiczenia z własną masą ciała',
        'Rzuty'
      ]
    },
    {
      title: 'Koordynacja',
      description: 'Płynność ruchu i technika lekkoatletyczna.',
      exercises: [
        'Gry i zabawy koordynacyjne',
        'Ćwiczenia na płotkach',
        'Tory przeszkód',
        'Kształtowanie prawidłowej techniki biegów, skoków i rzutów'
      ]
    }
  ];

  characterAreas: CharacterArea[] = [
    {
      title: 'Determinacja',
      description:
        'Podczas treningów dzieci uczą się radzenia sobie ze zmęczeniem i wytrwałości w trudnych momentach, rozwijając determinację oraz świadomość, że sukces wymaga konsekwencji, systematyczności i wewnętrznej motywacji.'
    },
    {
      title: 'Współpraca',
      description:
        'Zabawy i ćwiczenia zespołowe uczą dzieci współpracy i odpowiedzialności. Biegi sztafetowe pokazują, że sukces zależy od wspólnego wysiłku, a zaangażowanie każdego uczestnika prowadzi do osiągnięcia celu.'
    },
    {
      title: 'Rywalizacja',
      description:
        'W czasie zajęć dzieci uczą się zdrowej rywalizacji w przyjaznej atmosferze. Doświadczając zarówno sukcesów, jak i porażek, rozwijają umiejętność radzenia sobie z emocjami, budując pewność siebie i szacunek do innych.'
    },
    {
      title: 'Samodzielność',
      description:
        'Lekkoatletyka, jako sport indywidualny, uczy dzieci niezależności i odpowiedzialności za swoje wyniki. Postęp zależy od ich własnej pracy i zaangażowania, co pozwala im zrozumieć, że sukcesy i porażki są efektem ich wysiłku.'
    },
    {
      title: 'Pewność siebie',
      description:
        'Lekkoatletyka, dzięki różnorodnym konkurencjom, daje każdemu dziecku szansę na odkrycie swoich mocnych stron. Wspieramy młodych sportowców, pomagając im rozwijać talent niezależnie od ich predyspozycji.'
    }
  ];

  constructor(private metaService: Meta, private titleService: Title) {
    this.titleService.setTitle('Zajęcia lekkoatletyczne dla dzieci | Akademia Lekkiej Atletyki Wrocław');
    this.metaService.updateTag({
      name: 'description',
      content:
        'Zobacz, jak wyglądają zajęcia ALA Wrocław dla dzieci 5-13 lat. Rozwój sprawności, charakteru i bezpieczny start sportowy.'
    });
  }
}
