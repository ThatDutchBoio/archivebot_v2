var discord = require('discord.js')
var bot = new discord.Client()
module.exports.bal = (msg) =>{
    var geteco = require('../data/ecoData').get
    if (!msg.mentions.members.first()) {
        var eco = geteco(msg.author.id, msg.guild.id, msg.author.username);
        const balEmb = new discord.MessageEmbed()
            .setTitle(`${msg.author.username}'s Balance`)
            .setDescription(`$${eco.cash}`)
            .setColor("BLUE")
            .setAuthor(msg.author.tag, msg.author.avatarURL({
                dynamic: false,
                format: 'png',
                size: 512
            }));
        return msg.channel.send(balEmb);
    } else {
        var eco = geteco(msg.mentions.members.first().id, msg.guild.id, msg.mentions.members.first().user.username);
        const balEmb = new discord.MessageEmbed()
            .setTitle(`${msg.mentions.members.first().user.username}'s Balance`)
            .setDescription(`$${eco.cash}`)
            .setColor("BLUE")
            .setAuthor(msg.mentions.members.first().user.tag, msg.mentions.members.first().user.avatarURL({
                dynamic: false,
                format: 'png',
                size: 512
            }));
        return msg.channel.send(balEmb);
    }
}