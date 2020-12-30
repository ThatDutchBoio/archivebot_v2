'use strict'
var getCompany = require('../data/companyData').get
var setCompany = require('../data/companyData').set
var addCash = require('./addStuff').cash
var addXP = require('./addStuff').xp
//var removeCash = require('./removeStuff').cash
//var removeXP = require('./removeStuff').xp
var getEco = require('../data/ecoData').get
//var setEco = require('../data/ecoData').set
var discord = require('discord.js')
//var bot = new discord.Client()
module.exports.info = (msg) =>{
    var company = getCompany(msg.author.id, msg.guild.id);
    if (company.companytype == 0) {
        const failedEmb = new discord.MessageEmbed()
            .setTitle(":x: You don't have a company!")
            .setColor("RED")
        return msg.channel.send(failedEmb);
    } else {
        const companies = require('../../jsonFiles/companies.json')
        var base_production;
        var price_fluxuation;
        var comptype;
        for (var i in companies) {
            if (companies[i].index == company.companytype) {
                base_production = companies[i]["base_production"];
                price_fluxuation = companies[i]["price_fluxuation"];
                comptype = companies[i].name
            }
        }
        var upgrades = company.upgrades
        upgrades = JSON.parse(upgrades);

        var production = base_production + ((base_production / 10) * upgrades.upgrades["Production Speed"])
        const infoEmb = new discord.MessageEmbed()
            .setTitle("Company info:")
            .setColor("BLUE")
            .addField("Company Type", `${comptype}`)
            .addField("Production", `${production}/Hour`)
            .addField(`Total Profit`, `$${company.totalprofit}`)
            .addField(`Total products`, `${Math.floor(production/60*Math.floor(((Date.now()-company.lastchecked)/60000)))}`)

        return msg.channel.send(infoEmb);
    } 
}
module.exports.sellproducts = (msg) =>{
    var company = getCompany(msg.author.id, msg.guild.id);
    if (company.companytype == 0) {
        const failedEmb = new discord.MessageEmbed()
            .setTitle(":x: You don't have a company!")
            .setColor("RED")
        return msg.channel.send(failedEmb);
    } else {
        const companies = require('../../jsonfiles/companies.json')
        var base_production;
        var price_fluxuation;
        var comptype;
        for (var i in companies) {
            if (companies[i].index == company.companytype) {
                base_production = companies[i]["base_production"];
                price_fluxuation = companies[i]["price_fluxuation"];
                comptype = companies[i].name
            }
        }
        var upgrades = company.upgrades
        upgrades = JSON.parse(upgrades);

        var production = base_production + ((base_production / 10) * upgrades.upgrades["Production Speed"])
        var products = Math.floor(production / 60 * Math.floor(((Date.now() - company.lastchecked) / 60000)))

        var eco = getEco(msg.author.id, msg.guild.id, msg.author.username);
        addXP(msg, Math.floor((products * price_fluxuation[0]) / 100))
        company.totalprofit += (products * price_fluxuation[1])
        addCash(msg,(products * price_fluxuation[1]))
        const successemb = new discord.MessageEmbed()
            .setTitle(`:white_check_mark: You sold your products for a profit of: $${(products*price_fluxuation[1])}`)
            .setColor("GREEN")
        msg.channel.send(successemb)
        company.lastchecked = Date.now();
        setCompany(company)

    }
}