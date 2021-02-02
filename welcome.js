module.exports = (client) => {
    welcomeChannelID = '741028008361721866'; // Canal de bienvenida
    rulesChannelID = '479304179102384128'; // Canal de reglas
    generalChannelID = '478782494666129419'; // Canal general
    
    client.on("guildMemberAdd", (member) => {
        console.log(member);

        const welcomeText = `¡Bienvenid@  <@${member.id}>! 🎉 🤗\nAntes de comenzar, te pedimos leer las ${member.guild.channels.cache.get(rulesChannelID).toString()} y si necesitas ayuda con algo, puedes preguntar en ${member.guild.channels.cache.get(generalChannelID).toString()}.\n\nDisfruta de tu estancia en Mode 7.`
        const channel = member.guild.channels.cache.get(welcomeChannelID);

        channel.send(welcomeText);
    });
}