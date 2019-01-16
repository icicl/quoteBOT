// AUTHENTICATION
const Discord = require("discord.js"); //https://discord.js.org/#/docs/main/stable/general/welcome
const client = new Discord.Client(); //Get "npm install opusscript"
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
let modules = fs.readdirSync('./commands/').filter(file => fs.statSync(path.join('./commands/', file)).isDirectory());
for (let module of modules) {
    console.log(`============[FOLDER Set: ${module}]============`)

    let commandFiles = fs.readdirSync(path.resolve(`./commands/${module}`)).
        filter(file => !fs.statSync(path.resolve('./commands/', module, file)).isDirectory()).
        filter(file => file.endsWith('.js'));

    commandFiles.forEach((f, i) => {
        let props = require(`./commands/${module}/${f}`);
        console.log(`Loaded: ${f} (${i + 1})`);
        client.commands.set(props.help.name, props);
        props.help.alias.forEach(alias => {
            client.aliases.set(alias, props.help.name);
        });
    });
}

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

//https://discordapp.com/api/oauth2/authorize?client_id=517897194615865364&permissions=34816&scope=bot
