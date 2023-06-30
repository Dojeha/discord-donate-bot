const express = require("express");
const { WebSocketServer } = require("ws");
const { Client, GatewayIntentBits } = require("discord.js");

const commandDonate = require("./commandDonate");

require("dotenv").config();

const TOKEN = process.env.DISCORD_BOT_TOKEN;

const client = new Client({
    "intents": [
        GatewayIntentBits.Guilds
    ]
});

client.once("ready", () => {
    console.log(`${client.user.tag} 봇 켜짐`);
});

client.on("interactionCreate", async (interaction) => {
    if (!interaction.isChatInputCommand()) return;
    if (interaction.commandName != "후원") return;

    try {
        await commandDonate.execute(interaction);
    } catch (error) {
        console.error(error);
        await interaction.reply({
            "content": "명령어를 실행하는 동안 오류가 발생했어요!",
            "ephemeral": true
        });
    }
});

const app = express();
const port = 5080;

app.disable("x-powered-by");

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/views/index.html");
});

app.listen(port, "127.0.0.1", () => {
    console.log(`http://localhost:${port}/`);
});

client.login(TOKEN);