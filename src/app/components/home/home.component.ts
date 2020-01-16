import { Component, OnInit } from '@angular/core';
import { YoutubeService } from '../../services/youtube.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  videos: any[] = [];

  constructor(private ytService: YoutubeService) {

    this.ytService.getVideos().subscribe(data => {
      this.videos = data;
    });

  }

  ngOnInit() {
  }

}
