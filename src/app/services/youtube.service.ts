import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {

  constructor(private http: HttpClient) { }

  private youtubeUrl = 'https://www.googleapis.com/youtube/v3/';
  private apiKey = 'AIzaSyDbFLK9iU7POBsc2F-a7otGWfuwTg7F094';
  private playList = 'UUuaPTYj15JSkETGnEseaFFg';
  private nextPageToken: string = '';

  getVideos() {

    const url = `${this.youtubeUrl}playlistItems`;

    // const parametros = new HttpParams()
    //   .set('part', 'snippet')
    //   .set('maxResults', '10')
    //   .set('playlistId', this.playList)
    //   .set('key', this.apiKey)
    //   .append('pageToken', this.nextPageToken)

    let parametros = new HttpParams();
    parametros = parametros.append('part', 'snippet');
    parametros = parametros.append('maxResults', '10');
    parametros = parametros.append('playlistId', this.playList);
    parametros = parametros.append('key', this.apiKey);
    

    if(this.nextPageToken) { 
      parametros = parametros.append('pageToken', this.nextPageToken);
    }

      console.log(parametros);

    return this.http.get(url, { params: parametros }).pipe(
      map((data: any) => {
        console.log(this.nextPageToken);
        this.nextPageToken = data.nextPageToken;

        const videos: any[] = [];

        for (const video of data.items) {

          const snippet = video.snippet;

          videos.push(snippet);

        }

        return videos;
      })
    )

  }
}
