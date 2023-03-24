import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Char } from './chars.model';
import { MOCKCHARS } from './MOCKCHARS';

@Injectable()
export class CharService {
  selectedEvent = new Subject<Char>();
  changedEvent = new Subject<Char[]>();
  maxCharId: number;

  public chars: Char[] = [];

  constructor(private http: HttpClient) {
    this.chars = MOCKCHARS;
    this.getChars();
    this.maxCharId = this.getMaxId();
  }

  getChars() {
    return this.http.get<Char[]>('/chars').subscribe(
      (chars: Char[]) => {
        console.log(chars);
        this.chars = chars;
        this.changedEvent.next(this.chars.slice());
      },
      (e: any) => {
        console.log(e);
      }
    );
  }

  getChar(id: number) {
    return this.chars[id];
  }

  getMaxId() {
    let maxId = 0;

    for (let c in this.chars) {
      let currentId = +this.chars[c].id;
      if (currentId > maxId) {
        maxId = currentId;
      }
    }

    return (maxId += 1);
  }

  addChar(newChar: Char) {
    if (!newChar) {
      return;
    }

    newChar.id;

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http
      .post<Char>('/chars', Char, { headers: headers })
      .subscribe((res) => {
        console.log(res);
        this.chars.push(res);
        this.changedEvent.next(this.chars.slice());
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

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http
      .put(`/chars/${orig.id}`, newChar, {
        headers: headers,
      })
      .subscribe((response) => {
        console.log(`👍 ${response}`);
        this.chars[pos] = newChar;
        this.changedEvent.next(this.chars.slice());
      });
  }

  deleteChar(char: Char) {
    if (!char) {
      return;
    }

    const pos = this.chars.findIndex((c) => {
      c.id === char.id;
    });

    if (pos < 0) {
      return;
    }

    this.http.delete(`/chars/${char.id}`).subscribe((res) => {
      console.log(`${char.name} deleted! ${res}`);
      this.chars.splice(pos, 1);
      this.changedEvent.next(this.chars.slice());
    });
  }
}
