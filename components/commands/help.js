var discord = require('discord.js')
var bot = new discord.Client()
module.exports.help = (msg) =>{
    var cmds = {
        ";help": {
            "description": "List all commands."
        },
        ";lvl": {
            "description": "Posts your level in chat."
        },
        ";bal": {
            "description": "Posts your balance in chat."
        },
        ";jobs": {
            "description": "Posts a list of all jobs with their id in chat."
        },
        ";jobs.join": {
            "description": "Lets you join a job. Usage: ***;jobs.join (jobid Eg: 1,2,3,etc)***."
        },
        ";jobs.work": {
            "description": "Lets you work with your chosen job."
        },
        ";archive": {
            "description": "Displays all the user's archived creations. Usage: ***;archive @User***"
        },
        ";leaderboard": {
            "description": "Displays the top 10 highest levels."
        },
        ";foundcompany": {
            "description": "Lets you found a company, usage: ***;foundcompany (companyid) to found a company, ;foundcompany to display the types of company***"
        },
        ";company.info": {
            "description": "Displays info about  your company."
        },
        ";company.sellproducts": {
            "description": "Sells all products your company has in stock"
        }
    }

    var helpemb = new discord.MessageEmbed()
        .setTitle("List of commands.")
        .setColor("BLUE")
        .setTimestamp()
        .setAuthor(msg.author.tag, msg.author.avatarURL({
            dynamic: false,
            format: 'png',
            size: 512
        }));
    for (var i in cmds) {

        helpemb.addField(i, cmds[i].description);
    }
    return msg.channel.send(helpemb);
}