const Discord = require("discord.js");

module.exports.run = async (client, config, message, args) => {
    message.channel.send("`;quote [query]` sends captioned image for scene closest to query - random scene if query is empty.");
    message.channel.send("`;thanos [query]` is `;quote` but onlky thanos");
    message.channel.send("`;nocap [query]` is `;quote` but without caption");
    message.channel.send("`;fake [query]|[newcap]` is `;quote` but it replaces the caption with `newcap`");
    message.channel.send("`;ffake [arg]` is `;fake` but [arg] is both [query] and [newcap]");
}

module.exports.help = {
    name: "help",
    cmdName: "Get screenshot from Revenge of the Sith",
    alias: [],
    description: "Get screenshot from Revenge of the Sit.",
    botPermission: "",
    userPermissions: "",
    usage: "quote",
    example: ["quote"]
}
