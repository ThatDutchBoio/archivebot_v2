var discord = require('discord.js')
var bot = new discord.Client()
module.exports.leaderboard = (msg) =>{
    var x = require('../data/ecoData').getAll()
    var leadEmb = new discord.MessageEmbed()
        .setTitle("Top 10 highest levels")
        .setColor("BLUE")
    for (var i in x) {
        if (i < 10) {

            var index = parseInt(i)
            leadEmb.addField(`${index+1}.${x[i].username}`, `Level: ${x[i].lvl}`);
        } else {
            break;
        }
    }
    return msg.channel.send(leadEmb);
}