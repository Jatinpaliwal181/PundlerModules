import { Component, OnInit,ViewChild, ElementRef, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-thumbnail',
  templateUrl: './thumbnail.component.html',
  styleUrls: ['./thumbnail.component.css']
})
export class ThumbnailComponent implements OnInit {
  @ViewChild('videoElement') public videoElement: ElementRef;
  @Input('snapshotName') public snapshotName: string;
  @Input('downloadImageType') public userImageType: string;
  public videoUrl: any;
  public videoLoaded = false;
  public loadingState = false;
  public imageTypes = ['JPG', 'PNG', 'BMP', 'TIFF', 'GIF', 'PPM', 'PGM', 'PBM', 'PNM', 'WebP', 'HEIF', 'BPG', 'ECW', 'FITS', 'FLIP', 'PAM', 'CD5', 'CPT', 'PSD', 'PSP', 'XCF', 'PDN'];
  constructor(private http: HttpClient) {}
  public readUrl(event) {
    this.loadingState = true;
    this.videoLoaded = false;
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (data: any) => {
        this.snapshotPreview(data.target.result);
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }
  public takeSnapshot() {
    const canvasElement = <HTMLCanvasElement> document.createElement('CANVAS');
    const video = this.videoElement.nativeElement;
    const context = canvasElement.getContext('2d');
    let w: number, h: number, ratio: number;
    ratio = video.videoWidth / video.videoHeight;
    w = video.videoWidth - 100;
    h = w / ratio;
    canvasElement.width = w;
    canvasElement.height = h;
    context.fillRect(0, 0, w, h);
    context.drawImage(video, 0, 0, w, h);
    const link = document.createElement('a');
    this.snapshotName = this.snapshotName !== '' ?  this.snapshotName : 'snapshot';
    this.userImageType = this.imageTypes.indexOf(this.userImageType.toUpperCase()) >= 0 ? this.userImageType.toUpperCase() : 'PNG';
    link.setAttribute('download', this.snapshotName + '.' + this.userImageType);
    const dataURL = canvasElement.toDataURL();
    link.href = dataURL;
    document.body.appendChild(link);
    link.click();
  }
  public snapshotPreview(url) {
    this.loadingState = false;
    this.videoLoaded = true;
    this.videoUrl = url;
    if (this.videoElement !== undefined) {
      this.videoElement.nativeElement.load();
    }
  }


  ngOnInit(): void {
  }

}
