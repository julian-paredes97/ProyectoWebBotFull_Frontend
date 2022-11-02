const { Telegraf } = require("telegraf");
//const TOKEN = "5153026043:AAEOA6Jgze21I8PGuZWKJoNMGY1Wzl6S5OI";
const TOKEN = "5489576102:AAEppJsThPctLwr4iEp9C5iyGMMdd9JHUXk";
const bot = new Telegraf(TOKEN);

//const web_link = "https://celebrated-torte-184681.netlify.app/";
//const web_link = "https://snazzy-tartufo-5f17da.netlify.app/";
const web_link = "https://lively-speculoos-0685e4.netlify.app/";


bot.start((ctx) =>
  ctx.reply("Welcome :)))))", {
    reply_markup: {
      keyboard: [[{ text: "web app", web_app: { url: web_link } }]],
    },
  })
);

bot.launch();