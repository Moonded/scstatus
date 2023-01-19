const sanatize = Object.defineProperty(String.prototype, "sanatizeModal", {
  value: function () {
    const regex = /^\[([\w\s\d]+)\]\(((?:\/|https?:\/\/)[\w\d./?=#]+)\)$/;
    const myMatch = this.match(regex);
    // console.log(myMatch);
    if (myMatch != null) {
      return myMatch[1];
    } else {
      return JSON.parse(JSON.stringify(this));
    }
  },
});

module.exports = sanatize;
