
export class Movie {
  constructor(
    public id: string,
    public moviename: string,
    public no_tickets: number,
    public theatre: string,
    public seatsBooked:string[]
  ) {}
}
