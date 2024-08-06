import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticleService } from '../../services/article.service';
import { TimerService } from '../../services/timer.service';
import { MetaPixelService } from '../../services/meta-pixel.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ArticleDetailComponent implements OnInit {
  article: any;
  private conversionTracked = false;

  constructor(
    private route: ActivatedRoute,
    private articleService: ArticleService,
    private timerService: TimerService,
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const articleId = params.get('id');
      if (articleId) {
        this.article = this.articleService.getArticleById(articleId);
      }
    });
    this.conversionTracked = this.checkConversionTracked();
    if (!this.conversionTracked) {
      this.timerService.startTimer();
    }
  }



  private checkConversionTracked(): boolean {
    return localStorage.getItem('conversionTracked') === 'true';
  }
}
