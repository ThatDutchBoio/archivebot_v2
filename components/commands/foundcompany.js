var discord = require('discord.js')
var bot = new discord.Client()
module.exports.foundcompany = (msg) =>{
    var args = msg.content.substring(1).split(' ')
    var setCompanies = require('../data/companyData').set
    var removeCash = require('./removeStuff').cash
    if (!args[1]) {
        const companies = require('../../jsonfiles/companies.json');
        const optionsEmb = new discord.MessageEmbed()
            .setTitle("Types of companies")
            .setColor("BLUE")
        for (var i in companies) {

            optionsEmb.addField(`${companies[i].index}.${companies[i].name}`, `**Setup Cost**: $${companies[i].price}.\n**Estimated income:** $${companies[i].base_production *(companies[i].price_fluxuation[1]-companies[i].price_fluxuation[0])}/Hour `)
        }
        msg.channel.send(optionsEmb);
    } else {

        const companies = require('../../jsonfiles/companies.json');
        var type = parseInt(args[1])
        for (var i in companies) {
            if (companies[i].index == type) {
                var comp = getCompany(msg.author.id, msg.guild.id);

                if (comp.companytype == 0) {

                    if (eco.cash - companies[i].price >= 0) {
                        removeCash(msg, companies[i].price)
                        comp.companytype = type;
                        comp.lastchecked = Date.now()
                        setCompanies(comp)
                        const successemb = new discord.MessageEmbed()
                            .setTitle(":white_check_mark: Succesfully founded company!")
                            .setColor("GREEN")
                        msg.channel.send(successemb);
                        msg.delete();
                    } else {
                        const failedemb = new discord.MessageEmbed()
                            .setTitle(":x: You don't have enough cash to do this!")
                            .setColor("RED")
                        return msg.channel.send(failedemb)
                    }
                } else {
                    msg.reply("Are you sure? Doing this will disband your other company.").then(message => {
                        message.react("✔️").then(() => {
                            bot.on('messageReactionAdd', (reaction, user) => {
                                if (user.id == msg.author.id && reaction.emoji.name == '✔️') {
                                    if (eco.cash - companies[i].price >= 0) {
                                        removeCash(msg, companies[i].price)
                                        comp.companytype = type;
                                        comp.lastchecked = Date.now()
                                            setCompanies(comp)
                                        const successemb = new discord.MessageEmbed()
                                            .setTitle(":white_check_mark: Succesfully founded company!")
                                            .setColor("GREEN")
                                        message.channel.send(successemb);
                                        message.delete();
                                    } else {
                                        const failedemb = new discord.MessageEmbed()
                                            .setTitle(":x: You don't have enough cash to do this!")
                                            .setColor("RED")
                                        return msg.channel.send(failedemb)
                                    }
                                }
                            })
                        })
                    });

                }
            }
        }
    }
}