const Discord = require("discord.js");
const sub3 = require("./../../data/iii.json").subs;
const extractFrames = require('ffmpeg-extract-frames')

module.exports.run = async (client, config, message, args) => {
console.log(message.author + " " + message.content);
var q = [];
for (var i in sub3){
    if (matches(sub3[i][2].toLowerCase(),message.content.slice(7).toLowerCase())) q.push(sub3[i]);
}
if (q.length == 0) {
    message.channel.send("No quotes for that dialogue found. :(");
    return;
}
if (q.length>6) {
    message.channel.send("Too many instances");
    return;
}
for (var ii in q){
    t = intT(q[ii][1].split(" --> ")[0]);
    t2 = intT(q[ii][1].split(" --> ")[1]);
    

await extractFrames({
  input: '/Users/admin/Documents/prequel_bot/data/iii.mp4',
  output: '/Users/admin/Documents/prequel_bot/data/screenshot-%i.jpg',
  offsets: [
 //   t + ((t2-t)/10)*1,
 //   t + ((t2-t)/10)*3,
    t + ((t2-t)/10)*5//,
 //   t + ((t2-t)/10)*7,
 //   t + ((t2-t)/10)*9
  ]
})
message.channel.send("Timeframe: " + q[ii][1] + "\nDialogue: " + q[ii][2].replace("\\","\n") + "\n\nPossible screenshots:",{files:
    ["./data/screenshot-1.jpg"]//,"./data/screenshot-2.jpg","./data/screenshot-3.jpg"]//,"./data/screenshot-4.jpg","./data/screenshot-5.jpg",]
})


}
}
function intT(s){
    return (3600*(parseInt(s.split(":")[0])) + 60*parseInt(s.split(":")[1]) + parseInt(s.split(":")[2].split(",")[0]))*1000 + parseInt(s.split(":")[2].split(",")[1]);
}
function matches(s1,s2){
    var s1_ = "";
    for (var i=0;i<s1.length;i++){
        if ("qwertyuiopasdfghjklzxcvbnm".indexOf(s1.charAt(i)) >= 0) s1_ += s1.charAt(i);
    }
    var s2_ = "";
    for (var i=0;i<s2.length;i++){
        if ("qwertyuiopasdfghjklzxcvbnm".indexOf(s2.charAt(i)) >= 0) s2_ += s2.charAt(i);
    }
    return s1.indexOf(s2) >= 0;
}

module.exports.help = {
    name: "quote",
    cmdName: "Get screenshot from Revenge of the Sith",
    alias: [],
    description: "Get screenshot from Revenge of the Sit.",
    botPermission: "",
    userPermissions: "",
    usage: "quote",
    example: ["quote"]
}