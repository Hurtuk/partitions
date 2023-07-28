import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AdminModule } from './admin.module';

import { AppRoutingModule } from './app-routing.module';

import { AppRootComponent } from '../components/app-root/app-root.component';
import { SideNavComponent } from '../components/side-nav/side-nav.component';
import { HeaderComponent } from '../components/header/header.component';
import { HomeComponent } from '../components/home/home.component';
import { InstrumentIconsComponent } from '../components/instrument-icons/instrument-icons.component';
import { ScoreComponent } from '../components/score/score.component';
import { FavStarComponent } from '../components/fav-star/fav-star.component';
import { AudioPlayerComponent } from "../components/audio-player/audio-player.component";
import { ScoresComponent } from "../components/scores/scores.component";
import { ProgressBarComponent } from "../components/progress-bar/progress-bar.component";
import { DownloadButtonsComponent } from '../components/download-buttons/download-buttons.component';
import { SocialShareButtonsComponent } from '../components/share-buttons/share-buttons.component';
import { ContactComponent } from '../components/contact/contact.component';

import { ScoreService } from '../services/score.service';
import { UrlBuilderService } from '../services/url-builder.service';
import { ErrorService } from '../services/error.service';
import { ScoreMetadataService } from '../services/score-metadata.service';
import { AudioPlayerService } from "../services/audio-player.service";
import { BandService } from "../services/band.service";
import { DownloadService } from '../services/download.service';
import { BrowserService } from '../services/browser.service';
import { NewsService } from '../services/news.service';

import { PdfViewerModule } from 'ng2-pdf-viewer';

import { DateFrPipe } from '../shared/pipes/DateFrPipe.pipe';
import { DatePipe } from '@angular/common';
import { AuthGuard } from '../services/auth-guard.service';
import { AuthService } from '../services/auth.service';
import { LoginComponent } from '../admin/login/login.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgxPageScrollCoreModule } from 'ngx-page-scroll-core';
import { ShareButtonsModule } from '@ngx-share/buttons';
import { SafePipe } from 'src/shared/pipes/SafePipe.pipe';

@NgModule({
  declarations: [
    AppRootComponent,
    SideNavComponent,
    HeaderComponent,
    HomeComponent,
    InstrumentIconsComponent,
    ScoreComponent,
    FavStarComponent,
    AudioPlayerComponent,
    ScoresComponent,
    ProgressBarComponent,
    DownloadButtonsComponent,
    SocialShareButtonsComponent,
    ContactComponent,
    LoginComponent,

    DateFrPipe,
    SafePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PdfViewerModule,
    FormsModule,
    AdminModule,
    HttpClientModule,
    NgxPageScrollCoreModule,
    ShareButtonsModule
  ],
  providers: [
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
    HttpClient
  ],
  bootstrap: [AppRootComponent]
})
export class AppModule { }
