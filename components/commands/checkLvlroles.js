const {
    SystemChannelFlags
} = require("discord.js")
'use strict'
const lvlroles = require('../../jsonfiles/lvlroles.json');
const getEco = require('../data/ecoData').get

module.exports.check = (msg) => {
    var eco = getEco(msg.author.id, msg.guild.id, msg.author.username);
    for (var i in lvlroles) {
        if (eco.lvl >= lvlroles[i].levelrequired) {
            var role = msg.guild.roles.cache.get(lvlroles[i].id);
            msg.member.roles.add(role)


        }
    }
}