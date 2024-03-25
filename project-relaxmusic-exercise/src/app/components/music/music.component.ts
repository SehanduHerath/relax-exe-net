import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';


@Component({
  selector: 'app-music',
  templateUrl: './music.component.html',
  styleUrls: ['./music.component.css']
})

export class  MusicComponent implements OnInit {
  trackIndex = 0;
  tracks = [
    'assets/Images/audio1.mp3',
    'assets/Images/audio2.mp3',
    'assets/Images/audio3.mp3',
    'assets/Images/audio4.mp3',
    'assets/Images/audio5.mp3',
  ];

  
  @ViewChild('audio', { static: true }) audio!: ElementRef<HTMLAudioElement>;
  @ViewChild('progressBar', { static: true }) progressBar!: ElementRef<HTMLDivElement>;
  @ViewChild('progress', { static: true }) progress!: ElementRef<HTMLDivElement>;
  @ViewChild('currentTime', { static: true }) currentTimeElem!: ElementRef<HTMLDivElement>;
  @ViewChild('totalTime', { static: true }) totalTimeElem!: ElementRef<HTMLDivElement>;

  constructor() { }

  ngOnInit(): void {
    this.loadTrack(this.trackIndex);
  }

  loadTrack(index: number) {
    this.trackIndex = index;
    this.audio.nativeElement.src = this.tracks[this.trackIndex];
    this.audio.nativeElement.load();
  }
  
  

  playTrack() {
    this.audio.nativeElement.play();
  }
  playPauseLabel = 'Play';


  pauseTrack() {
    this.audio.nativeElement.pause();
  }

  onPlayPauseClick() {
    if (this.audio.nativeElement.paused) {
      this.playTrack();
      this.playPauseLabel = 'Pause';
    } else {
      this.pauseTrack();
      this.playPauseLabel = 'Play';
    }
  }
  

  onPrevClick() {
    this.trackIndex--;
    if (this.trackIndex < 0) {
      this.trackIndex = this.tracks.length - 1;
    }
    this.loadTrack(this.trackIndex);
    this.playPauseLabel = 'Play';
  }
  
  onNextClick() {
    this.trackIndex++;
    if (this.trackIndex > this.tracks.length - 1) {
      this.trackIndex = 0;
    }
    this.loadTrack(this.trackIndex);
    this.playPauseLabel = 'Play';
  }
  
  

  onTimeUpdate() {
    const percentage = (this.audio.nativeElement.currentTime / this.audio.nativeElement.duration) * 100;
    this.progress.nativeElement.style.width = `${percentage}%`;
    this.currentTimeElem.nativeElement.textContent = this.formatTime(this.audio.nativeElement.currentTime);
  }

  onLoadedMetadata() {
    this.totalTimeElem.nativeElement.textContent = this.formatTime(this.audio.nativeElement.duration);
  }

  onProgressBarClick(e: MouseEvent) {
    const offsetX = e.offsetX;
    const totalWidth = this.progressBar.nativeElement.clientWidth;
    const percentage = offsetX / totalWidth;
    const time = percentage * this.audio.nativeElement.duration;
    this.audio.nativeElement.currentTime = time;
  }

  formatTime(seconds: number) {
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60);
    return `${min}:${sec < 10 ? '0' : ''}${sec}`;
  }
}

// Exporting MusicComponent
