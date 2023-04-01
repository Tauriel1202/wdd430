import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Subject } from 'rxjs';
import { Char } from './chars.model';

@Injectable()
export class CharService {
  selectedEvent = new Subject<Char>();
  changedEvent = new Subject<Char[]>();

  public chars: Char[] = [];

  constructor(private http: HttpClient) {}

  getChars() {
    this.http
      .get<{ message: string; chars: Char[] }>('http://localhost:3000/chars')
      .pipe(
        map((data) => {
          console.log('E: ', data.chars.length);
          console.log('F: ', data.chars);
          return data.chars.map((char) => {
            return {
              id: char.id,
              charId: char.charId,
              imgUrl: char.imgUrl,
              land: char.land,
              name: char.name,
              role: char.role,
              species: char.species,
            };
          });
        })
      )
      .subscribe((charData) => {
        this.chars = charData;
        this.changedEvent.next([...this.chars]);
      });
  }

  getLength() {
    return this.chars.length;
  }

  getChar(id: number) {
    return this.chars[id];
  }

  addChar(newChar: Char) {
    const char: Char = newChar;

    this.http
      .post<{ message: string; cId: string }>(
        'http://localhost:3000/chars',
        char
      )
      .subscribe((resData) => {
        console.log('C: ', resData.message);
        const id = resData.cId;
        char.id = id;
        this.chars.push(char);
        this.changedEvent.next([...this.chars]);
      });
  }

  updateChar(orig: Char, newChar: Char) {
    const pos = this.chars.findIndex((c) => c.charId === orig.charId);

    if (pos < 0) {
      return;
    }

    console.log('🧝‍♀️', newChar);
    console.log('The Elves are editting the chars.');

    this.http
      .put<Char[]>(`http://localhost:3000/chars/` + orig.charId, newChar)
      .subscribe((response) => {
        console.log('👍', response);
        this.chars[pos] = newChar;
        this.changedEvent.next(this.chars.slice());
      });
  }

  deleteChar(char: Char, id: number) {
    console.log(char);
    this.http
      .delete<{ message: string }>('http://localhost:3000/chars/' + char.charId)
      .subscribe((res) => {
        // this.chars.splice(pos, 1);
        this.changedEvent.next(this.chars.slice());
      });
  }
}
