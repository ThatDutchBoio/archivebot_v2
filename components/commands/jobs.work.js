function addCash(userId,guildId,amnt){
    var getEco = require('../data/ecoData').get
    var eco = getEco(userId,guildId);
    var setEco = require('../data/ecoData').set
    eco.cash += amnt;
    return setEco(eco)
}
function addExp(userId,guildId,amnt){
    var getEco = require('../data/ecoData').get
    var eco = getEco(userId,guildId);
    var setEco = require('../data/ecoData').set
    eco.xp += amnt;
    return setEco(eco)
}
var jobs = require('../../jsonfiles/jobs.json')
var lastWorked = new Map()
var discord = require('discord.js')
var bot = new discord.Client()
module.exports.work = (msg) =>{
    var getEco = require('../data/ecoData').get
    var eco = getEco(msg.author.id, msg.guild.id, msg.author.username);
    if (eco.jobid != "none") {
        var cooldown = jobs[eco.jobid].cooldown;
        if (lastWorked.has(msg.author.id) == false) {

            var z = jobs[eco.jobid].income[0];
            var y = jobs[eco.jobid].income[1];
            const a = Math.floor(Math.random() * y) + z;
            lastWorked.set(msg.author.id, Date.now())
            var amntXP = (10 + (100 * (eco.lvl / 100)))
            addExp(eco, amntXP)
            const workedEmb = new discord.MessageEmbed()
                .setTitle(`:white_check_mark: ${jobs[eco.jobid].message}`)
                .setDescription(`You earned: $${a} and ${amntXP} XP`)
                .setColor("GREEN")
                .setTimestamp()
            msg.channel.send(workedEmb)
            addCash(msg.author.id, msg.guild.id, a);

        } else {
            var elapsed = Math.ceil((Date.now() - lastWorked.get(msg.author.id)) / 1000)

            if (elapsed >= cooldown) {
                lastWorked.set(msg.author.id, Date.now());
                var z = jobs[eco.jobid].income[0];
                var y = jobs[eco.jobid].income[1];
                const a = randomIntFromInterval(z, y);
                var amntXP = (10 + (100 * (eco.lvl / 100)))
                var x = addExp(eco, amntXP)
                if (x) msg.reply(`You leveled up to lvl ${eco.lvl}!`);
                const workedEmb = new discord.MessageEmbed()
                    .setTitle(`:white_check_mark: ${jobs[eco.jobid].message}`)
                    .setDescription(`You earned: $${a} and ${amntXP} XP`)
                    .setColor("GREEN")
                    .setTimestamp()
                msg.channel.send(workedEmb)
                addCash(msg.author.id, msg.guild.id, a);

            } else {
                msg.reply(`You can work in ${cooldown-elapsed} Second(s)`)
            }
        }
    } else {
        const failedemb = new discord.MessageEmbed()
            .setTitle(":x: You dont have a job!")
            .setColor("RED")
            .setTimestamp()
        msg.channel.send(failedemb)
    }
}
module.exports.admin = (msg) =>{
    if (msg.member.hasPermission("ADMINISTRATOR") || msg.author.id == "188708544269254656") {
        var eco = getEco(msg.author.id, msg.guild.id, msg.author.username);
        var z = jobs[eco.jobid].income[0];
        var y = jobs[eco.jobid].income[1];
        const a = randomIntFromInterval(z, y);
        var amntXP = (10 + (100 * (eco.lvl / 100)))
        var x = addExp(eco, amntXP)
        if (x) msg.reply(`You leveled up to lvl ${eco.lvl}!`);
        const workedEmb = new discord.MessageEmbed()
            .setTitle(`:white_check_mark: ${jobs[eco.jobid].message}`)
            .setDescription(`You earned: $${a} and ${amntXP} XP`)
            .setColor("GREEN")
            .setTimestamp()
        msg.channel.send(workedEmb)
        return addCash(msg.author.id, msg.guild.id, a);
    }
}