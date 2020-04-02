module.exports.run = async (client, message, args, r, conn, config) => {
  var a = args.filter(s => s !== '')
  console.log(a[0].slice(3).split(">")[0].length);
};

module.exports.config = {command: "test"}
