export class Customer {
  constructor(
    public id: number,
    public name: string,
    public race: string,
    public location: string
  ) {}

  get getId() { return this.id; };
  get getName() { return this.name; };
  get getRace() { return this.race; };
  get getLocation() { return this.location; };

  set setId(new_id: number) { this.id = new_id; };
  set setName(new_name: string) { this.name = new_name; };
  set setRace(new_race: string) { this.race = new_race; };
  set setLocation(new_location: string) { this.location = new_location; };
}