import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

interface PricingPlan {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  recommended: boolean;
}

interface FaqItem {
  question: string;
  answer: string;
}

@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrl: './pricing.component.css'
})
export class PricingComponent {
  plans: PricingPlan[] = [
    {
      name: 'Jeden trening w tygodniu',
      price: '150 zł',
      period: '/miesiąc',
      description: 'Dobry start dla dziecka, które zaczyna przygodę z regularnym ruchem.',
      features: [
        'Godzinne zajęcia grupowe raz w tygodniu',
        'Opieka profesjonalnego trenera',
        'Diagnostyka i testy funkcjonalne z fizjoterapeutą',
        'Kwartalny raport sprawności i ocena postawy',
        'Koszulka Akademii ALA Wrocław'
      ],
      recommended: false
    },
    {
      name: 'Dwa treningi w tygodniu',
      price: '230 zł',
      period: '/miesiąc',
      description: 'Najlepszy wybór dla szybszego rozwoju sprawności i budowania nawyku ruchu.',
      features: [
        'Godzinne zajęcia grupowe dwa razy w tygodniu',
        'Opieka profesjonalnego trenera',
        'Diagnostyka i testy funkcjonalne z fizjoterapeutą',
        'Kwartalny raport sprawności i ocena postawy',
        'Koszulka Akademii ALA Wrocław'
      ],
      recommended: true
    },
    {
      name: 'Rodzeństwo dwa razy w tygodniu',
      price: '385 zł',
      period: '/miesiąc',
      description: 'Wspólny plan dla rodzeństwa w korzystniejszej cenie.',
      features: [
        'Dwoje dzieci na 2 treningach tygodniowo',
        'Opieka profesjonalnego trenera',
        'Diagnostyka i testy funkcjonalne z fizjoterapeutą',
        'Kwartalny raport sprawności i ocena postawy',
        'Koszulka Akademii ALA Wrocław'
      ],
      recommended: false
    }
  ];

  includedInEachPlan: string[] = [
    'Pierwszy trening bezpłatny',
    'Małe grupy treningowe',
    'Dostęp do infrastruktury i sprzętu',
  ];

  faqItems: FaqItem[] = [
    {
      question: 'Czy można dołączyć w trakcie miesiąca?',
      answer: 'Tak, można dołączyć w trakcie miesiąca. Opłata ustalana jest indywidualnie przy zapisie.'
    },
    {
      question: 'Czy umowa jest na cały rok?',
      answer: 'Nie. Umowę można wypowiedzieć w dowolnym momencie (obowiązuje miesięczny okres wypowiedzenia).'
    },
    {
      question: 'Co jeśli dziecko opuści zajęcia?',
      answer: 'W przypadku nieobecności, w miarę dostępności miejsc w innych grupach, możemy zaproponować udział w dodatkowym terminie.'
    }
  ];

  constructor(private metaService: Meta, private titleService: Title) {
    this.titleService.setTitle('Cennik treningów lekkoatletycznych dla dzieci | Akademia Lekkiej Atletyki Wrocław');
    this.metaService.updateTag({
      name: 'description',
      content: 'Sprawdź aktualny cennik ALA Wrocław. Pierwszy trening bezpłatny, jasne zasady i opieka fizjoterapeuty.'
    });
  }
}
