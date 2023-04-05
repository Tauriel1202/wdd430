import { Injectable } from '@angular/core';
import { Subject, map } from 'rxjs';
import { Land } from './lands.model';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class LandService {
  changedEvent = new Subject<Land[]>();

  public lands: Land[] = [];

  constructor(private http: HttpClient) {}

  getLands() {
    this.http
      .get<{ message: string; lands: Land[] }>('http://localhost:3000/lands')
      .pipe(
        map((data) => {
          console.log('Get Lands data: ', data.lands);
          return data.lands.map((land) => {
            return {
              id: land.id,
              landId: land.landId,
              name: land.name,
              imgUrl: land.imgUrl,
            };
          });
        })
      )
      .subscribe((landData) => {
        this.lands = landData;
        this.changedEvent.next([...this.lands]);
      });
  }

  addLand(newLand: Land) {
    const land: Land = newLand;

    this.http
      .post<{ message: string; lId: string }>(
        'http://localhost:3000/lands',
        land
      )
      .subscribe((resData) => {
        console.log(resData.message);
        const id = resData.lId;
        land.id = id;
        this.lands.push(land);
        this.changedEvent.next([...this.lands]);
      });
  }
}
