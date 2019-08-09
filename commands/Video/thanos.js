const Discord = require("discord.js");
const fnames = ['thanos iw'];
const subs = [];
const root_path = '/home/dakota/epicbotsllc/quoteBOT';
const fs = require('fs');
let nonce = Math.floor(Math.random()*64);

for (var i in fnames){
    subs.push(require(root_path+"/data/"+fnames[i]+".json"));
}

const extractFrames = require('ffmpeg-extract-frames')
//const Jimp = require('jimp');
const caption = require('caption');

module.exports.run = async (client, config, message, args) => {
//    if (fs.existsSync(root_path+'/thanos')){
//        message.channel.send("spammer no spamming >;(");
//        return;
//    }
//    fs.writeFileSync(root_path+"/thanos");
 //   console.log(message.author + " " + message.content); console.log(levenshtein("hello", "helo") + "  " + levenshtein("helo", "hello") + " " + " q ".split(" ").length + "  " + " " + "   ".split(" ").length);
 var ml = -6;
for (var i = 0;i<message.content.length;i++)ml+="qwertyuiopasdfghjklzxcvbn".indexOf(message.content.charAt(i))>=0?1:0;
//if (ml<0){message.channel.send("Search query too small");
//    return;}
if (ml<=0){
    var sub_ = Math.floor(Math.random()*subs.length);
    var sub3=subs[sub_].subs;
    var i = Math.floor(Math.random()*sub3.length);
    var q = sub3[i];
    var qf =  fnames[sub_];
    t = intT(q[1].split(" --> ")[0]);
    t2 = intT(q[1].split(" --> ")[1]);
    message.channel.send("selecting random quote");
    await extractFrames({
        input: root_path+'/data/'+qf+'.mp4',
        output: root_path+'/data/thanos'+nonce+'-%i.jpg',
        offsets: [
            weightedRandomTime(t,t2)//can have multiple screenshots - just put weightedRandomTime(t,t2) in more times
        ]
    })

    caption.path(root_path+"/data/thanos"+nonce+"-1.jpg",{
        caption : q[2].replace(/\\/g, "\n"),
        outputFile : root_path+"/data/thanos"+nonce+"-1.jpg",
        },function(err,filename){
            if(err)console.log(err);
            message.channel.send("Movie: "+qf+"\nTimeframe: " + q[1] + "\nDialogue: " + q[2].replace(/\\/g, "\n") + "\n\nPossible screenshots:", {
            files:
                [root_path+"/data/thanos"+nonce+"-1.jpg"]
        })       
                })
                console.log(0);
 //       fs.unlinkSync(root_path+"/thanos");
return;}

   var q = [];
   var qf = [];
    var maxLevenshtein = 0;
for (var sub_ in subs){
    var sub3=subs[sub_].subs;//console.log(sub_);
    for (var i in sub3) {
        var ii = stripKeepSpaces(sub3[i][2].toLowerCase());//"";
        ii = " "+ii+" ";
        var lc;
        for (var i2 = 0; i2 < ii.length - 2; i2++) {
            if (ii.charAt(i2) === ' ') {
                for (var j = i2 + 2; j < ii.length; j++) {
                    if (ii.charAt(j) === ' ') {
                        lc = levenshtein(stripKeepSpaces(message.content.slice(8).toLowerCase()),ii.slice(i2+1,j)) - ((ii.length-j+i2-1)/(10*ii.length));
                        if (lc === maxLevenshtein) {
                            q.push(sub3[i]);
                            qf.push(fnames[sub_])
                        }
                        if (lc > maxLevenshtein){
                            maxLevenshtein=lc;
                            q = [];
                            qf = [];
                            q.push(sub3[i]);
                            qf.push(fnames[sub_]);
                            //console.log(sub3[i]);
                        }
                    }
                }
            }
        }
    }
}
    if (q.length == 0) {
        message.channel.send("No quotes for that dialogue found. :(");
 //       fs.unlink(root_path+"/thanos");
        return;
    }
    if (q.length > 6) {
        message.channel.send("Too many instances");
 //       fs.unlink(root_path+"/thanos");
        return;
    }
    message.channel.send("Match found with " + (Math.round(calcConf(maxLevenshtein)*1000))/10 + " percent confidence:");
    for (var ii in q) {
        t = intT(q[ii][1].split(" --> ")[0]);
        t2 = intT(q[ii][1].split(" --> ")[1]);
        await extractFrames({
            input: root_path+'/data/'+qf[ii]+'.mp4',
            output: root_path+'/data/thanos'+nonce+'-%i.jpg',
            offsets: [
                weightedRandomTime(t,t2)//can have multiple screenshots - just put weightedRandomTime(t,t2) in more times
            ]
        })

           caption.path(root_path+"/data/thanos"+nonce+"-1.jpg",{
                caption : q[ii][2].replace(/\\/g, "\n"),
                outputFile : root_path+"/data/thanos"+nonce+"-1.jpg",
              },function(err,filename){
                  if(err)console.log(err);
                  message.channel.send("Movie: "+qf[ii]+"\nTimeframe: " + q[ii][1] + "\nDialogue: " + q[ii][2].replace(/\\/g, "\n") + "\n\nPossible screenshots:", {
                    files:
                        [root_path+"/data/thanos"+nonce+"-1.jpg"]
                })       
                       })





    }
 //   fs.unlink(root_path+"/thanos");
}
function intT(s) {
    return (3600 * (parseInt(s.split(":")[0])) + 60 * parseInt(s.split(":")[1]) + parseInt(s.split(":")[2].split(",")[0])) * 1000 + parseInt(s.split(":")[2].split(",")[1]);
}
function weightedRandomTime(t1,t2){
    var t = (t2+t1)/2,td=t2-t1;
    for (var i=0;i<2;i++){
        t+=Math.pow(Math.random(),0.5)*(td/2)-td/4;
    }
    return t;
}
function matches(s1, s2) {
    var s1_ = "";
    for (var i = 0; i < s1.length; i++) {
        if ("qwertyuiopasdfghjklzxcvbnm".indexOf(s1.charAt(i)) >= 0) s1_ += s1.charAt(i);
    }
    var s2_ = "";
    for (var i = 0; i < s2.length; i++) {
        if ("qwertyuiopasdfghjklzxcvbnm".indexOf(s2.charAt(i)) >= 0) s2_ += s2.charAt(i);
    }
    return s1.indexOf(s2) >= 0;
}
function strip(s1) {
    var s1_ = "";
    for (var i = 0; i < s1.length; i++) {
        if ("qwertyuiopasdfghjklzxcvbnm".indexOf(s1.charAt(i)) >= 0) s1_ += s1.charAt(i);
    }
    return s1_;
}
function stripKeepSpaces(s1) {
    var s1_ = "";
    for (var i = 0; i < s1.length; i++) {
        if ("qwertyuiopasdfghjklzxcvbnm ".indexOf(s1.charAt(i)) >= 0) s1_ += s1.charAt(i);
    }
    return s1_;
}

function levenshtein(a, b) {
 //   b = strip(b);
    var t = [], u, i, j, m = a.length, n = b.length;
    if (!m) { return n; }
    if (!n) { return m; }
    for (j = 0; j <= n; j++) { t[j] = j; }
    for (i = 1; i <= m; i++) {
        for (u = [i], j = 1; j <= n; j++) {
            u[j] = a[i - 1] === b[j - 1] ? t[j - 1] : Math.min(t[j - 1], t[j], u[j - 1]) + 1;
        } t = u;
    } return 1 - Math.abs(u[n]) / b.length;
}
function calcConf(p){
    return Math.pow(p,5)*(6-5*p);
}
module.exports.help = {
    name: "thanos",
    cmdName: "Get screenshot from Revenge of the Sith",
    alias: [],
    description: "Get screenshot from Revenge of the Sit.",
    botPermission: "",
    userPermissions: "",
    usage: "thanos",
    example: ["thanos"]
}
