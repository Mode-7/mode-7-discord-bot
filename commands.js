module.exports = (client) => {
    client.on("message", (message) => {
        if (message.author.bot) return;
        if (!message.content.startsWith(prefix)) return;

        const commandBody = message.content.slice(prefix.length);
        const args = commandBody.split(' ');
        const command = args.shift().toLowerCase();

        function comandosPublicos() {
            if (command === "hola") {
                const timeTaken = Date.now() - message.createdTimestamp;
                message.reply(`¡Holi! Me tomó ${timeTaken}ms darme cuenta de lo guapo que estás, bombón.`);
            } else if (command == "uwu") {
                message.reply(`UwU`);
            }
        }

        function comandosPrivados() {
            if (command == "anunciar") {
                var announcement = "";
                for (const word in args) {
                    announcement = announcement + args[word] + " ";
                }
                webhookClient.send(announcement)
            }
        }

        if (!message.member.roles.cache.has(process.env["ANNOUNCER_ROLE"])) {
            comandosPublicos();
        } else {
            comandosPublicos();
            comandosPrivados();
        }
    });
}