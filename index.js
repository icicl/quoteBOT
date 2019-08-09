// AUTHENTICATION
const Discord = require("discord.js"); //https://discord.js.org/#/docs/main/stable/general/welcome
const client = new Discord.Client(); //Get "npm install opusscript"
const root_path = '/home/dakota/epicbotsllc/quoteBOT'
var active = false;
var spammessage=true;
let cooldown = [];
// CONFIGURATION FILES
const config = require("./config/config.json");

// MODULES 
const fs = require("fs");
const path = require('path')

// COMMANDS AND ALIASES
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();

// LOGIN
client.login(config.token);

// LOADS COMMANDS
let modules = fs.readdirSync(root_path+'/commands/').filter(file => fs.statSync(path.join(root_path+'/commands/', file)).isDirectory());
for (let module of modules) {
    console.log(`============[FOLDER Set: ${module}]============`)

    let commandFiles = fs.readdirSync(path.resolve(root_path+`/commands/${module}`)).
        filter(file => !fs.statSync(path.resolve(root_path+'/commands/', module, file)).isDirectory()).
        filter(file => file.endsWith('.js'));

    commandFiles.forEach((f, i) => {
        let props = require(root_path+`/commands/${module}/${f}`);
        console.log(`Loaded: ${f} (${i + 1})`);
        client.commands.set(props.help.name, props);
        props.help.alias.forEach(alias => {
            client.aliases.set(alias, props.help.name);
        });
    });
}
if (fs.existsSync(root_path+'/thanos'))fs.unlinkSync(root_path+"/thanos");

// CONFIRM READY
client.on("ready", () => {
    let date = new Date();
    console.log('\x1b[33m', `QuoteBOT has started on ${date}.`);
    client.user.setActivity(
        'The Revenge of the Sith.', {
            type: 'WATCHING'
        });
    client.user.setStatus('online');
});

// BOT COMMANDS
client.on("message", async message => { // Everything Below Here & Indented Within This Line Requires Prefix.
    if (message.author.bot) return; // Prevent Bot from Responding to Other Bots
    if (!message.guild) {
        let app = await message.client.fetchApplication();
        let owner = await message.client.fetchUser(app.owner.id);
       owner.send(message.content);
       return;
    }
    if (message.content.indexOf(config.prefix) !== 0) return; // Must Use Prefix

    let prefix = config.prefix;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);
    let commandfile = cmd.slice(prefix.length);
    for (let users in cooldown) {
        if (cooldown[users] === message.author.id) {
            console.log(message.author.id);
            message.author.send(spam());
            message.reply(spam());
            return;
        }
    }
    cooldown.push(message.author.id);
    setTimeout(() => {
        for (let users in cooldown) {
            if (cooldown[users] === message.author.id) {
                delete cooldown[users];break;}}
    }, 5000);
//    if(active){
//        if (spammessage){message.channel.send('spam makes me sad ;(');spammessage=false;}
//        return;}
//    active = true;
//    setTimeout(function(){active=false;spammessage=true},2000);
    let execCMD;
    if (client.commands.has(commandfile)) {
        execCMD = client.commands.get(commandfile);
    } else if (client.aliases.has(commandfile)) {
        execCMD = client.commands.get(client.aliases.get(commandfile));
    }

    if (execCMD) {
        execCMD.run(client, config, message, args);
    }
});

function spam(){
    m = ['everytime you spam a transistor dies inside :(','spamming isn\'t nice :(','you\'re mean, *spammer* :(','spamming makes me sad :(','spam is bad'];
    r = ['spamming is a sin','fr||i||ck you, spammer >;(','https://proxy.duckduckgo.com/iu/?u=https%3A%2F%2Fi5.walmartimages.com%2Fasr%2F220b9405-3e45-4410-8996-1db6e5262f3a_1.dcef6a080c598b7fbcd60de1456562cd.jpeg&f=1']
    if (Math.random()*m.length>1)return m[Math.floor(Math.random()*m.length)];
    return r[Math.floor(Math.random()*r.length)];
}

//https://discordapp.com/api/oauth2/authorize?client_id=517897194615865364&permissions=34816&scope=bot
