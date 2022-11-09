export default class StringEx {
  constructor(string = "") {
    this.string = string;
  }

  init() {
    console.log(this.isString(123));
    this.splitString(123);
    console.log(this.capitalize(123));
    console.log(this.repeat("123A", 4));
  }

  // check if the input value is string
  isString(params) {
    return typeof params === "string";
  }

  // split string into array
  splitString(params) {
    const value = this.isString(params)
      ? params.split(" ")
      : "params is not string...";
    console.log(value);
  }

  capitalize(params) {
    const check = this.isString(params);
    if (check) {
      const strings = params.split(" ");
      const newStrings = strings.map((string) => {
        const start = string[0];
        const ascii = start.charCodeAt();
        const end = string.substring(1);
        let newString = [];
        if (ascii >= 96 && ascii <= 122) {
          return (newString = String.fromCharCode(ascii - 32) + end);
        }
        return string;
      });
      return newStrings.join(" ");
    }
    return "params is not string...";
  }

  // concatenates a given string n times
  repeat(string, n = 1) {
    return new Array(n).fill(string).join("");
  }
}
