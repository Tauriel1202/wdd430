export class Document {
  constructor(public id: number, public name: string, public descr: string, public url: string, public children: []){
    this.id = id;
    this.name = name;
    this.descr = descr;
    this.url = url;
    this.children = children;
  }
}