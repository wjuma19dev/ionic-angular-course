class Place {
  constructor(
    public id: string,
    public title: string,
    public description: string,
    public imageUrl: string,
    public price: number,
    public avaliableFrom: Date,
    public avaliableTo: Date,
    public userId: string
  ) {}
}

export default Place;