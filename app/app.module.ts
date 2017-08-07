import { FormsModule } from '@angular/forms';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { ContatosModule } from './contatos/contatos.module';
import { AppRoutingMododule } from './app-routing.module';
import { InMemoryDataService } from './in-memory-data.service';
import { DialogService } from './dialog.service';
import './util/rxjs-extensions';

@NgModule({
    imports:[BrowserModule,
        ContatosModule,
        AppRoutingMododule,
        HttpModule,
        InMemoryWebApiModule.forRoot(InMemoryDataService),
        FormsModule
    ],
    declarations: [AppComponent],
    providers: [DialogService],
    bootstrap: [AppComponent]
})
export class AppModule { }