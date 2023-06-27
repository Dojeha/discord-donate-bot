const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("후원")
        .setDescription("후원")
        .addIntegerOption((input) => {
            input.setName("금액")
            .setDescription("후원할 금액")
            .setRequired(true);
            return input;
        }),
    /**
     * @param {import("discord.js").Interaction} interaction
     */
    async execute(interaction) {
        const money = interaction.options.getInteger("금액");
        await interaction.reply(`${money}`);
    }
};