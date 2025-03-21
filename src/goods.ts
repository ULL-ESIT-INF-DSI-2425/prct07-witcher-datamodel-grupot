export class Good {
  constructor(
    public id: number,
    public name: string,
    public description: string,
    public material: string,
    public weight: number,
    public value: number
  ) {}

  get getId() { return this.id; };
  get getName() { return this.name; };
  get getDescription() { return this.description; };
  get getMaterial() { return this.material; };
  get getWeight() { return this.weight; };
  get getValue() { return this.value; };

  set setId(new_id: number) { this.id = new_id; };
  set setName(new_name: string) { this.name = new_name; };
  set setDescription(new_desc: string) { this.description = new_desc; };
  set setMaterial(new_mat: string) { this.material = new_mat; };
  set setWeight(new_weight: number) { this.weight = new_weight; };
  set setValue(new_value: number) { this.value = new_value; };
}