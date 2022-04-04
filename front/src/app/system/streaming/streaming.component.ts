import {
  Component,
  NgModule,
  VERSION,
  ViewChild,
  ViewChildren,
  QueryList,
  ElementRef,
  AfterViewInit
} from '@angular/core';

@Component({
  selector: 'app-streaming',
  templateUrl: './streaming.component.html',
  styleUrls: ['./streaming.component.scss']
})
export class StreamingComponent implements AfterViewInit {
  title = "live-video-demo";
  @ViewChild("video") video!: ElementRef;
  ngVersion: string;
  streaming = false;
  error: any;
  private stream!: MediaStream;
  private constraints = {
    audio: false,
    video: true,
  };

  constructor() {
    this.ngVersion = `Angular! v${VERSION.full}`;
  }

  ngAfterViewInit() {
  }

  initVideo(e: any) {
    this.getMediaStream()
      .then((stream) => {
        this.stream = stream;
        this.streaming = true;
      })
      .catch((err) => {
        this.streaming = false;
        this.error = err.message + " (" + err.name + ":" + err.constraintName + ")";
      });
  }

  closeVideo(e: any) {
    this.streaming = false;
    const video_constraints = { video: false };
    const _video = this.video.nativeElement;
    _video.stop();
  }

  private getMediaStream(): Promise<MediaStream> {
    const video_constraints = { video: true };
    const _video = this.video.nativeElement;
    return new Promise<MediaStream>((resolve, reject) => {
      // (get the stream)
      return navigator.mediaDevices.
        getUserMedia(video_constraints)
        .then(stream => {
          (<any>window).stream = stream; // make variable available to browser console
          _video.srcObject = stream;
          // _video.src = window.URL.createObjectURL(stream);
          _video.onloadedmetadata = function (e: any) { };
          _video.play();
          return resolve(stream);
        })
        .catch(err => reject(err));
    });
  }

  private clMediaStream(): Promise<MediaStream> {
    const video_constraints = { video: false };
    const _video = null;
    return new Promise<MediaStream>((resolve, reject) => {
      // (get the stream)
      return null;
    });
  }
}
