const dotenv = require("dotenv");
const { Telegraf } = require("telegraf");
dotenv.config();
const {
  welcome,
  contact,
  contribute,
  faq,
  latest_issues,
  latest_prs,
  moreFunc,
  support,
  team,
  inline,
  search_prs,
  search_issues,
  search_contributor,
} = require("./controllers/botController");

const bot = new Telegraf(process.env.TOKEN);
bot.start(welcome);
bot.action("contribute", contribute);
bot.action("more", moreFunc);
bot.action("team", team);
bot.action("contact", contact);
bot.action("faq", faq);
bot.action("latest_prs", latest_prs);
bot.action("latest_issues", latest_issues);
bot.action("search_contributor", search_contributor)
bot.action("donate", support);
bot.command("/contributors", search_contributor);
bot.command("/issues", latest_issues);
bot.command("/prs", latest_prs);
bot.command("/isearch", search_issues);
bot.command("/psearch", search_prs);
bot.command("/contribute", contribute);
bot.command("/about", moreFunc);
bot.command("/team", team);
bot.command("/contact", contact);
bot.command("/faq", faq);
bot.command("/support", support);
bot.help((ctx) =>
  ctx.reply(
    `
Welcome to WebXDAO Bot 💫\n\n
/help - To get help
/contribute - To contribute to WebXDAO
/team - To know about the team
/contact - To contact the team
/faq - To know about the frequently asked questions
/prs - To know about the pull requests across the WebXDAO repositories
/issues - To know about the issues across the WebXDAO repositories
/support - To support WebXDAO
/search - To search for a particular repository
`
  )
);
bot.on("inline_query", inline);
bot.launch();
