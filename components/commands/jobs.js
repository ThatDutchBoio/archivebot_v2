var discord = require('discord.js')
var bot = new discord.Client()
module.exports.jobs = (msg) =>{
   var jobs = require('../../jsonfiles/jobs.json');
    const jobsemb = new discord.MessageEmbed()
        .setTitle("Job list")
        .setColor("BLUE")
        .setTimestamp()
        .setFooter("Type 'jobs.join (jobid)' to join a job")
    for (var i in jobs) {
        jobsemb.addField(`${jobs[i].index}. ` + jobs[i].name, `income: $${jobs[i].income[0]}-$${jobs[i].income[1]} \n ***Required Level: ${jobs[i].lvl}***`);
    }
    return msg.channel.send(jobsemb); 
}