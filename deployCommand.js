require("dotenv").config();

const TOKEN = process.env.DISCORD_BOT_TOKEN;
const CLIENT_ID = process.env.DISCORD_BOT_CLIENT_ID;

const { REST, Routes } = require("discord.js");
const commandDonate = require("./commandDonate");

const deployCommands = async (slashCommands, token, clientId) => {
    try {
        const rest = new REST({"version": "10"}).setToken(token);
        const data = await rest.put(Routes.applicationCommands(clientId), {"body": slashCommands});
        return {"isSuccess": true, "data": data};
    } catch (error) {
        return {"isSuccess": false, "error": error};
    }
}

const main = async () => {
    const result = await deployCommands([commandDonate.data.toJSON()], TOKEN, CLIENT_ID);
    if (result.isSuccess) {
        console.log(`후원 명령어 배포 성공`);
    } else {
        console.error(result.error);
    }
}

main();