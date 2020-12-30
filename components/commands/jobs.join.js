var discord = require('discord.js')
var bot = new discord.Client()
var setEco = require('../data/ecoData').set;
var getECo = require('../data/ecoData').get
module.exports.joinjob = (msg) =>{
    var args = msg.content.substring(1).split(' ')
    var jobs = require('../../jsonfiles/jobs.json')
    var getEco = require('../data/ecoData').get
    var eco = getEco(msg.author.id, msg.guild.id, msg.author.username);
    var x = msg.content;
    x = x.substring(args[0].length + 2);
    x = parseInt(x);

    if (!x) return msg.reply("Specify a job Id!");;
    var joinEmb = new discord.MessageEmbed()
        .setColor("GREEN")
        .setTimestamp()
        .setAuthor(msg.author.tag, msg.author.avatarURL({
            dynamic: false,
            format: 'png',
            size: 512
        }))
    for (var i in jobs) {

        if (jobs[i].index == x) {
            if (eco.lvl >= jobs[i].lvl) {
                eco.jobid = jobs[i].id;

                setEco(eco);
                joinEmb.setTitle(`:white_check_mark: Joined job: ${jobs[i].name}`)
                return msg.channel.send(joinEmb);
            } else {
                const aB = new discord.MessageEmbed()
                    .setTitle("You're too low level to join this job!")
                    .setColor("RED")
                    .setAuthor(bot.user.tag, bot.user.avatarURL({
                        dynamic: false,
                        format: 'png',
                        size: 512
                    }))
                return msg.channel.send(aB);
            }
        }
    }

    return msg.channel.send("Invalid Job ID!");
}
module.exports.adminjoin = (msg) =>{
    if (msg.member.hasPermission("ADMINISTRATOR")) {
        var eco = getEco(msg.author.id, msg.guild.id, msg.author.username);
        var x = msg.content;
        x = x.substring(args[0].length + 2);
        x = parseInt(x);

        if (!x) return msg.reply("Specify a job Id!");;
        var joinEmb = new discord.MessageEmbed()
            .setColor("GREEN")
            .setTimestamp()
            .setAuthor(msg.author.tag, msg.author.avatarURL({
                dynamic: false,
                format: 'png',
                size: 512
            }))
        for (var i in jobs) {

            if (jobs[i].index == x) {

                eco.jobid = jobs[i].id;

                setEco(eco);
                joinEmb.setTitle(`:white_check_mark: Joined job: ${jobs[i].name}`)
                return msg.channel.send(joinEmb);

            }
        }

        return msg.channel.send("Invalid Job ID!");
    }
}