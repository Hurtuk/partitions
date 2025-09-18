import { enableProdMode, importProvidersFrom } from '@angular/core';
import { environment } from './environments/environment';
import { ScoreService } from './services/score.service';
import { UrlBuilderService } from './services/url-builder.service';
import { ErrorService } from './services/error.service';
import { ScoreMetadataService } from './services/score-metadata.service';
import { AudioPlayerService } from './services/audio-player.service';
import { BandService } from './services/band.service';
import { DownloadService } from './services/download.service';
import { BrowserService } from './services/browser.service';
import { NewsService } from './services/news.service';
import { DatePipe } from '@angular/common';
import { AuthGuard } from './services/auth-guard.service';
import { AuthService } from './services/auth.service';
import { HttpClient, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { AppRoutingModule } from './app/app-routing.module';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { FormsModule } from '@angular/forms';
import { NgxPageScrollCoreModule } from 'ngx-page-scroll-core';
import { AppRootComponent } from './components/app-root/app-root.component';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppRootComponent, {
    providers: [
        importProvidersFrom(BrowserModule, AppRoutingModule, PdfViewerModule, FormsModule, NgxPageScrollCoreModule),
        ScoreService,
        UrlBuilderService,
        ErrorService,
        ScoreMetadataService,
        AudioPlayerService,
        BandService,
        DownloadService,
        BrowserService,
        NewsService,
        DatePipe,
        AuthGuard,
        AuthService,
        HttpClient,
        provideHttpClient(withInterceptorsFromDi())
    ]
});
