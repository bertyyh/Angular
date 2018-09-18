import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { api } from '../../apiConfig';

import { Observable, Subject, ReplaySubject, from, of, range, interval, forkJoin, concat, fromEvent} from 'rxjs';
import { map, filter, switchMap, take, tap, concatMap, mergeMap} from 'rxjs/operators';
import { ListComponent } from '../home/list/list.component';


@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})

export class StatusComponent implements OnInit {
  public status;
  public statusKeys;
  public getMemStats;
  public getMemStatsKeys;
  public MemStats;
  public MemStatsKeys;
  constructor(private http: HttpClient) {
    this.http.get('/siteapi' + api.getStatus).subscribe(data => {
      this.status = data;
      this.statusKeys = Object.keys(data);
    });
    this.http.get('/siteapi' + api.getStatus + "?getMemStats=true").subscribe(data => {
      this.getMemStats = data;
      this.getMemStatsKeys = Object.keys(data);
      this.MemStats = data['MemStats'];
      this.MemStatsKeys = Object.keys(this.MemStats);
    });
  }

  ngOnInit() {

    function addItem(val) {
      const node = document.createElement('li')
      const textnode = document.createTextNode(val)
      node.appendChild(textnode)
      document.getElementById('output').appendChild(node)
    }
    const s1$ = interval(1000).pipe(
      map(val => `s1   ${val}`),
      take(5)
    )

    const s2$ = interval(500).pipe(
      map(val => `s2  ${val}`),
      take(3)
    )

    const liveStreaming$ = concat(s1$, s2$).pipe(
      tap(val => console.log(val))
    )

    const subscription = liveStreaming$.subscribe(
      data => addItem(`${data}`),
      err => console.log(err),
      () => console.log('completed')
    )

  }

}
