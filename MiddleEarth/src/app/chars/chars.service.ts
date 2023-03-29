import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Subject } from 'rxjs';
import { Char } from './chars.model';

@Injectable()
export class CharService {
  selectedEvent = new Subject<Char>();
  changedEvent = new Subject<Char[]>();
  // maxCharId: number;

  public chars: Char[] = [];

  constructor(private http: HttpClient) {
    // this.maxCharId = this.getMaxId();
  }

  getChars() {
    this.http
      .get<{ message: string; chars: Char[] }>('http://localhost:3000/chars')
      .pipe(
        map((data) => {
          return data.chars.map((char) => {
            return {
              id: char.id,
              imgUrl: char.imgUrl, 
              land: char.land,
              name: char.name,
              role: char.role,
              species: char.species
            };
          });
        })
      )
      .subscribe((charData) => {
        this.chars = charData;
        this.changedEvent.next([...this.chars]);
      });
  }

  getChar(id: number) {
    return this.chars[id];
  }

  // getMaxId() {
  //   let maxId = 0;

  //   for (let c in this.chars) {
  //     let currentId = +this.chars[c].id;
  //     if (currentId > maxId) {
  //       maxId = currentId;
  //     }
  //   }

  //   return (maxId += 1);
  // }

  addChar(newChar: Char) {
    const char: Char = newChar;
    this.http
      .post<{ message: string }>('http://localhost:3000/chars', char)
      .subscribe((resData) => {
        console.log(resData.message);
        this.chars.push(char);
        this.changedEvent.next([...this.chars]);
      });
  }

  updateChar(orig: Char, newChar: Char) {
    if (!orig || !newChar) {
      return;
    }

    const pos = this.chars.findIndex((c) => c.id === orig.id);

    if (pos < 0) {
      return;
    }

    newChar.id = orig.id;

    this.chars = JSON.parse(JSON.stringify(this.chars));
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    console.log('The Elves are editting the chars.');

    this.http
      .put<Char[]>(
        `https://middleearth-d033c-default-rtdb.firebaseio.com/chars.json` +
          orig.id,
        newChar,
        { headers: headers }
      )
      .subscribe((response) => {
        console.log(`👍 ${response}`);
        this.chars[pos] = newChar;
        this.changedEvent.next(this.chars.slice());
      });
  }

  deleteChar(id: number) {
    // let charId = this.chars[id]
    console.log(id)

    this.http
      .delete<{message: string}>(
        `http://localhost:3000/chars/` + id
      )
      .subscribe((res) => {
        console.log(res.message)
        console.log(`Deleted!`);
        this.changedEvent.next(this.chars.slice());
      });
  }
}
