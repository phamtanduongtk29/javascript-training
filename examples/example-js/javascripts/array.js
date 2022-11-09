export default class ArrayEx {
  constructor() {}

  init() {
    console.log(this.isArray([]));
    console.log(this.first([7, 9, 0, -2], -3));
    console.log(this.last([7, 9, 0, -2], 4));
    console.log(this.join([7, 9, 0, -2], "_"));
  }

  isArray(params) {
    return Array.isArray(params);
  }

  //get the first 'n' elements of the array.
  first(params, n = 1) {
    if (this.isArray && n > 0) {
      return params.slice(0, n);
    }
    return [];
  }

  // get the last 'n' elements of the array
  last(params, n = 1) {
    if (this.isArray && n > 0) {
      const index = params.length - n > 0 ? params.length - n : 0;
      return params.slice(index);
    }
    return [];
  }

  // join all elements of the following array into a string
  join(params, slug = ",") {
    return params.join(slug);
  }
}
