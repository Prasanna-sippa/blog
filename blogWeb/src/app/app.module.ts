import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CreatePostComponent } from './pages/create-post/create-post.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularMaterailModule } from './AngularMaterialModule';
import { HttpClientModule } from '@angular/common/http';
import { ViewAllComponent } from './pages/view-all/view-all.component';
import { ViewPostComponent } from './pages/view-post/view-post.component';
import { SearchByNameComponent } from './pages/search-by-name/search-by-name.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
@NgModule({
  declarations: [
    AppComponent,
    CreatePostComponent,
    ViewAllComponent,
    ViewPostComponent,
    SearchByNameComponent,
    HomePageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AngularMaterailModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
