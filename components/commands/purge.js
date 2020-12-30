module.exports.purge = (msg) =>{
    if (msg.member.hasPermission("MANAGE_MESSAGES")) {

        let msgCount = parseInt(args[1]);
        const limit = 1000;
        if (msgCount <= limit) {
            msg.channel.bulkDelete(msgCount + 1);
        }
    }
}