import { Component, OnInit } from "@angular/core";
import { YoutubeService } from "../../services/youtube.service";

declare var $: any;

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  videos: any[] = [];
  videoSelected: any;
  load:boolean = true;

  constructor(private ytService: YoutubeService) {
    //this.ytService.getVideos().subscribe(data => this.videos = data);
    this.getVideos();
  }

  loadMore() {
    this.getVideos();

    // debugger
    //this.ytService.getVideos().subscribe(data => this.videos.push.apply(this.videos,data));
  }

  getVideos() {
    this.load = true;
    this.ytService
      .getVideos()
      .subscribe(data => {
        this.videos.push.apply(this.videos, data);
        this.load = false;
      });
  }

  ngOnInit() {
    let video = document.querySelector("#myModal");

    video.addEventListener("click", $event => {
      if ($event.target === video) {
        this.closeModal();
      }

      // console.log($event.target);
    });

    window.onscroll = () => {
      let scrollHeight, totalHeight;
      scrollHeight = document.body.scrollHeight;
      totalHeight = window.scrollY + window.innerHeight;
      console.log(scrollHeight,totalHeight);
      if (totalHeight >= scrollHeight) {
        
          this.getVideos();

      }
    };
  }

  watchVideo(v: any) {
    this.videoSelected = v;
    $("#myModal").modal();
  }

  closeModal() {
    this.videoSelected = null;
    $("#myModal").modal("hide");
  }
}
