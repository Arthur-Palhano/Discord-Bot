const discord = require('discord.js');
const bot = new discord.Client();
const config = require("./package.json")
const token = "NzAzMzg5OTI5MjUzNzY1MTgy.XqN5mw.VClj_6L73ONyMtiulrerniiKj7w";
var Algorithmia = require("algorithmia");

bot.on('ready', () => {
    console.log(`Estou pronto ${bot.user.tag}`);
    console.log(bot.user.size);
});

bot.on('message', (msg) => {
    console.log(`${msg.author.username} : ${msg.content}`);
    men = msg.content;
    men = men.split(" ");
    men[0] = men[0].toLowerCase();
    if (men[0] == "repita") {
        rep = ""
        for (var i = 1; i < men.length; i++) {
            //msg.suppressEmbeds;
            rep += " " + men[i];
        }
        msg.reply(rep);
    };

    if (men[0] == "calc") {
        if (men[2] == "+") {
            res = Number(men[1]) + Number(men[3]);
            msg.reply("Mas não é óbvio que é " + res);
        }

        if (men[2] == "-") {
            res = Number(men[1]) - Number(men[3]);
            msg.reply("Mas não é óbvio que é " + res);
        }

        if (men[2] == "*") {
            res = Number(men[1]) * Number(men[3]);
            msg.reply("Mas não é óbvio que é " + res);
        }

        if (men[2] == "/") {
            res = Number(men[1]) / Number(men[3]);
            msg.reply("Mas não é óbvio que é " + res);
        }

        if (men[2] == "**") {
            res = Number(men[1]) ** Number(men[3]);
            msg.reply("Mas não é óbvio que é " + res);
        }

    };

    if (men[0] == "cala" && men[3] == "macaco") {
        msg.reply("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
    };

    if (men[0] == "pode" && men[2] == "macaco") {
        msg.reply("Nossa, obrigado, agora estou mais relaxado ein, ufaa");
    };

    if (men[0] == "random") {
        fat = Math.random()

        if (men[1] > men[2]) {
            const passa = men[1];
            men[1] = men[2];
            men[2] = passa;
        }

        men[2] = parseInt(men[2])
        men[1] = parseInt(men[1])
        console.log(fat, men[2], men[1])
        res = Math.floor(fat * (men[2] - men[1]) + men[1]);
        msg.reply("Vejamos: " + res);
    };

    const search = (men) => {
        var searchTag = "";
        for (var i = 1; i < men.length; i++) {
            searchTag = searchTag + "_" + men[i];
        }
        return searchTag;
    }

    if (men[0] == "busque") {
        var input = {
            "articleName": search(men),
            "lang": "pt"
        };
        Algorithmia.client("sim5pytQdYovLXw0NftGjsF2Ob01")
            .algo("web/WikipediaParser/0.1.2?timeout=300") // timeout is optional
            .pipe(input)
            .then(function (response) {
                if (response.get().summary.length > 1900) {
                    splited = response.get().summary.split(".");
                    res = "";
                    for (var i = 0;i < 6; i++) {
                        res = res + splited[i];
                    }
                    response.get().summary = res;
                }
                msg.reply(response.get().summary);
                response.get().images.length > 0 ? msg.reply(response.get().images[0]) : msg.reply("Foi mal bro, sem imagens :(")
            });

    }

});

bot.login(token);