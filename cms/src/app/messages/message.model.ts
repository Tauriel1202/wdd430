export class Message {
  constructor(
    public id: number,
    public subject: string,
    public messageText: string,
    public sender: string
  ) {
    this.id = id;
    this.subject = subject;
    this.messageText = messageText;
    this.sender = sender;
  }
}
