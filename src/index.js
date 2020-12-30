'use strict'
const {prefix,token} = require('../jsonfiles/config.json');
const discord = require('discord.js');
const bot = new discord.Client()

bot.on("ready", () =>{
    console.log('Bot online');
})

bot.on("message", async(msg) =>{
    if(!msg.author.bot){
        require('../components/commands/checkLvlroles').check(msg,bot)
        var args = msg.content.substring(prefix.length).split(' ')
        var {autoIncr} = require('../components/commands/giveXP');
        autoIncr(msg.author.id,msg.guild.id,msg.author.username)
        if(msg.channel.name == "creations" || msg.channel.name == "Creations"){
            msg.react('⭐')
        }
        switch(args[0]){
            case 'purge':
                var purge = require('../components/commands/purge').purge(msg)
            break;
            case 'info':
                var info = require('../components/commands/info').info(msg)
            break;
            case 'meme':
                var meme = require('../components/commands/meme').meme(msg)
            break;
            case 'bal':
                var bal = require('../components/commands/bal').bal(msg)
            break;
            case 'setbal':
                var setbal = require('../components/commands/setbal').setbal(msg)
            break;
            case 'jobs':
                var jobs = require('../components/commands/jobs').jobs(msg)
            break;
            case 'jobs.join':
                var jobsjoin = require('../components/commands/jobs.join').joinjob(msg)
            break;
            case 'jobs.join.admin':
                var jobsjoinadmin = require('../components/commands/jobs.join').adminjoin(msg)
            break;
            case 'jobs.work':
                var jobswork = require('../components/commands/jobs.work').work(msg)
            break;
            case 'jobs.work.admin':
                var jobsworkadmin = require('../components/commands/jobs.work').admin(msg)
            break;
            case 'mute':
                var mute = require('../components/commands/mute').mute(msg)
            break;
            case 'warns':
                var warns = require('../components/commands/warns').warns(msg)
            break;
            case 'warn':
                var warn = require('../components/commands/warn').warn(msg)
            break;
            case 'lvl':
                var lvl = require('../components/commands/lvl').lvl(msg)
            break;
            case 'help':
                var help = require('../components/commands/help').help(msg)
            break;
            case 'leaderboard':
                var leaderboard = require('../components/commands/leaderboard').leaderboard(msg)
            break;
            case 'archive':
                var archive = require('../components/commands/archive').archive(msg,bot)
            break;
            case 'foundcompany':
                var foundcompany = require('../components/commands/foundcompany').foundcompany(msg)
            break;
            case 'company.info':
                var companyinfo = require('../components/commands/company').info(msg)
            break;
            case 'company.sellproducts':
                var companysell = require('../components/commands/company').sellproducts(msg)
            break;
            case 'resetsql':
                var resetsql = require('../components/data/reset').reset(msg)
            break;
        }
    }
})

const checkMap = new Map();

bot.on('messageReactionAdd', async (reaction, user) => {
    if (!user.bot) {
        let msg = reaction.message


        if (reaction.count >= 3 && reaction.emoji.name === "⭐" && !checkMap.has(msg.id)) {
            checkMap.set(msg.id, 0)
            let archiveChannel = bot.channels.cache.find(c => c.id === "770325208132747304");
            if (!msg.attachments.first()) {
                const creationEmbed = new discord.MessageEmbed()
                    .setTitle(`${msg.author.username}'s creation`)
                    .setDescription(`***Description:*** ${msg.content} `)
                    .setTimestamp()
                    .setColor("BLUE")
                    .setFooter(`${msg.author.id}`)
                archiveChannel.send(creationEmbed);
            } else {
                const creationEmbed = new discord.MessageEmbed()
                    .setTitle(`${msg.author.username}'s creation`)
                    .setDescription(`***Description:*** ${msg.content} `)
                    .setImage(msg.attachments.first().attachment)
                    .setTimestamp()
                    .setColor("BLUE")
                    .setFooter(`${msg.author.id}`)
                archiveChannel.send(creationEmbed);

            }


        }
    }

})
bot.login(token)