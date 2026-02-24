import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, Meta, SafeResourceUrl, Title } from '@angular/platform-browser';
import { Placement } from '../../types/placement.type';

interface EntranceMap {
  title: string;
  description: string;
  src: SafeResourceUrl;
}

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrl: './location.component.css'
})
export class LocationComponent implements OnInit {
  @Input() placement: Placement = 'subpage';
  isSummerSeason = this.checkIsSummerSeason(new Date());

  entranceMaps: EntranceMap[] = [
    {
      title: 'Wejście od ul. Piotra Norblina',
      description: 'Wejście na bieżnię w sezonie letnim.',
      src: '' as unknown as SafeResourceUrl
    },
    {
      title: 'Wejście od ul. Stefanii Sempołowskiej',
      description: 'Wejście na salę sportową w sezonie zimowym.',
      src: '' as unknown as SafeResourceUrl
    }
  ];

  constructor(
    private metaService: Meta,
    private titleService: Title,
    private sanitizer: DomSanitizer
  ) {
    this.entranceMaps = [
      {
        title: 'Wejście od ul. Piotra Norblina',
        description: 'Wejście na bieżnię w sezonie letnim.',
        src: this.sanitizer.bypassSecurityTrustResourceUrl(
          'https://www.google.com/maps/embed?pb=!4v1720870513671!6m8!1m7!1sZXCZOhg2fLbum0L3Ie0Xbw!2m2!1d51.10285799771516!2d17.10929768880831!3f354.53224621202025!4f-1.3548564065376212!5f1.5077024739559617'
        )
      },
      {
        title: 'Wejście od ul. Stefanii Sempołowskiej',
        description: 'Wejście na salę sportową w sezonie zimowym.',
        src: this.sanitizer.bypassSecurityTrustResourceUrl(
          'https://www.google.com/maps/embed?pb=!4v1720872061551!6m8!1m7!1sf-sNb_gAOcyQr-eZvUgBlQ!2m2!1d51.1027760885261!2d17.11025900871237!3f358.49542865447285!4f-0.01289436942182931!5f1.543477489944903'
        )
      }
    ];
  }

  private checkIsSummerSeason(date: Date): boolean {
    const month = date.getMonth();
    const day = date.getDate();

    if (month > 3 && month < 9) {
      return true;
    }

    if (month === 3) {
      return day >= 1;
    }

    if (month === 9) {
      return day <= 15;
    }

    return false;
  }

  ngOnInit(): void {
    if (this.placement === 'subpage') {
      this.titleService.setTitle('Lokalizacja treningów dla dzieci | Akademia Lekkiej Atletyki Wrocław');
      this.metaService.updateTag({
        name: 'description',
        content: 'Sprawdź lokalizację treningów ALA Wrocław: ul. Stefanii Sempołowskiej 54. Zobacz mapę wejść i zapisz dziecko na zajęcia.'
      });
    }
  }
}
