import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { ThumbnailComponent } from './thumbnail/thumbnail.component';
import { ImageCropperComponent } from './image-cropper/image-cropper.component';
import { ImageCropperModule } from 'ngx-image-cropper';
@NgModule({
  declarations: [
    AppComponent,
    ThumbnailComponent,
    ImageCropperComponent
  ],
  imports: [
    BrowserModule, 
    FormsModule, 
    HttpClientModule,
    ImageCropperModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
