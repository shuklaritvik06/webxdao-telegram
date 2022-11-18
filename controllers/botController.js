const { githubAPI } = require("../config/config");
async function options(ctx) {
  return ctx.telegram.sendMessage(
    ctx.chat.id,
    "Please select an option from the keyboard below. 📲",
    {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: "Contribute",
              callback_data: "contribute",
            },
          ],
          [
            {
              text: "About WebXDAO",
              callback_data: "more",
            },
          ],
          [
            {
              text: "Team",
              callback_data: "team",
            },
          ],
          [
            {
              text: "Contact",
              callback_data: "contact",
            },
          ],
          [
            {
              text: "FAQ",
              callback_data: "faq",
            },
          ],
          [
            {
              text: "Latest PRs",
              callback_data: "latest_prs",
            },
          ],
          [
            {
              text: "Latest Issues",
              callback_data: "latest_issues",
            },
          ],
          [
            {
              text: "Search Repo issues",
              callback_data: "search_issues",
            },
          ],
          [
            {
              text: "Search Repo PRs currently active",
              callback_data: "search_prs",
            },
          ],
          [
            {
              text: "Search Repo Contributors",
              callback_data: "search_contributor",
            },
          ],
          [
            {
              text: "Support WebXDAO",
              callback_data: "support_us",
              pay: true,
            },
          ],
        ],
        resize_keyboard: true,
        one_time_keyboard: true,
      },
    }
  );
}

module.exports.welcome = async (ctx) => {
  await ctx.telegram.sendPhoto(
    ctx.chat.id,
    "https://www.ebi.com.tr/medya/2017/12/chat-bot-for-social-networking.jpg",
    {
      caption: `
      Hello, ${ctx.from.first_name}! 👋 Thank you for showing interest in contributing to WebXDAO. This bot will help you to get started with the process of contributing to WebXDAO. To view commands use command /help. 🤖
    `,
    }
  );
  await options(ctx);
};

module.exports.moreFunc = async (ctx) => {
  await ctx.telegram.sendPhoto(
    ctx.chat.id,
    "https://user-images.githubusercontent.com/51391473/189403377-2a3ec554-4b89-498c-9f3c-cc1074deaa3c.png",
    {
      caption: `
    WebXDAO is a community that focus on the future of the web. Here you will learn how to become a blockchain developer while having fun with other community members. The community is powered by Dev Protocol.  
        `,
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: "Discord",
              url: "https://discord.gg/ATjzhfbpq4",
            },
          ],
          [
            {
              text: "Twitter",
              url: "https://twitter.com/WebXDAO",
            },
          ],
          [
            {
              text: "LinkedIn",
              url: "https://www.linkedin.com/company/webxdao/",
            },
          ],
          [
            {
              text: "GitHub",
              url: "https://github.com/webxdao",
            },
          ],
          [
            {
              text: "Mail",
              url: "mailto:webxdao@gmail.com",
            },
          ],
        ],
      },
    }
  );
};
module.exports.contribute = async (ctx) => {
  ctx.telegram.sendMessage(
    ctx.chat.id,
    `
        Awesome! 💫 We're happy to know that you want to contribute to WebXDAO projects.\n\nYou can check the open issues on the repos using /issues command. Let's start the flow! 💪
    `,
    {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: "Contributing Guidelines",
              url: "https://github.com/WebXDAO/WebXDAO.github.io/blob/main/CONTRIBUTING.md"
            },
          ],
        ],
      },
    }
  );
};

module.exports.team = async (ctx) => {
  const team = ["vinzvinci", "shuklaritvik06", "mkubdev", "KukretiShubham"]
  await ctx.telegram.sendMessage(
    ctx.chat.id,
    `
        Here are our cool founders. 🤝 Also want to know about our Awesome contributors? Use /contributors command. 🤩
    `
  );
  team.forEach(async (member) => {
    const data = await githubAPI.get(`/users/${member}`)
    await ctx.telegram.sendPhoto(
      ctx.chat.id,
      data.data.avatar_url,
      {
        caption: `
        Name: ${data.data.name}\nBio: ${data.data.bio}\nLocation: ${data.data.location}\nTwitter: ${data.data.twitter_username}\nGitHub: ${data.data.html_url}\n
        `,
      }
    )
  });
};

module.exports.contact = async (ctx) => {
  ctx.telegram.sendMessage(
    ctx.chat.id,
    `
        You can contact us by sending an email to webxdao@gmail.com or by joining our discord server. 📧
    `
  );
};
module.exports.faq = async (ctx) => {
  await ctx.telegram.sendMessage(
    ctx.chat.id,
    `
          Q: How can I contribute to WebXDAO?\nA: You can contribute to WebXDAO by contributing to our projects. You can check the open issues on the repos using /issues command. 🤝
      `
  );
  await ctx.telegram.sendMessage(
    ctx.chat.id,
    `Q: How can I contact WebXDAO?\nA: You can contact us by sending an email to webxdao@gmail.com`
  );
  await ctx.telegram.sendMessage(
    ctx.chat.id,
    `\nQ. How can I join WebXDAO?\nA: You can join WebXDAO by joining our discord server. 🤝`
  );
  await ctx.telegram.sendMessage(
    ctx.chat.id,
    `Q. How can I support WebXDAO?\nA: You can support WebXDAO by donating or contributing. 🤝`
  );
  await ctx.telegram.sendMessage(
    ctx.chat.id,
    `Q. How can I donate to WebXDAO?\nA: You can donate to WebXDAO by clicking the donate button below. 🤝`
  );
};

module.exports.latest_prs = async (ctx) => {
  const { data } = await githubAPI.get("/orgs/WebXDAO/repos");
  const repos = data.map((repo) => repo.name);
  const prs = await Promise.all(
    repos.map(async (repo) => {
      const { data } = await githubAPI.get(`/repos/WebXDAO/${repo}/pulls`);
      return data;
    })
  );
  const latestPrs = prs.flat().sort((a, b) => b.id - a.id);
  latestPrs.forEach((pr) => {
    ctx.telegram.sendMessage(
      ctx.chat.id,
      `
        Title: ${pr.title}\nLink: ${pr.html_url}
      `
    );
  });
};
module.exports.latest_issues = async (ctx) => {
  const { data } = await githubAPI.get("/orgs/WebXDAO/repos");
  const repos = data.map((repo) => repo.name);
  const issues = await Promise.all(
    repos.map(async (repo) => {
      const { data } = await githubAPI.get(`/repos/WebXDAO/${repo}/issues`);
      return data;
    })
  );
  const latestIssues = issues.flat().sort((a, b) => b.id - a.id);
  latestIssues.forEach((issue) => {
    ctx.telegram.sendMessage(
      ctx.chat.id,
      `
        Title: ${issue.title}\nLink: ${issue.html_url}
        `,
      {
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: "Open",
                url: issue.html_url,
              },
            ],
          ],
        },
      }
    );
  });
};
module.exports.support = async (ctx) => {
  ctx.telegram.sendMessage(
    ctx.chat.id,
    `
    🚧 Payment is still in testing mode\n\nThank you for your support! 🙏\n\nYou can support WebXDAO by donating to us. You can also support us by contributing to our projects. 🤝
    `,
    {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: "Donate",
              callback_data: "donate",
            },
          ],
        ],
      },
    }
  );
};

module.exports.search_issues = async (ctx) => {
  await ctx.telegram.sendMessage(
    ctx.chat.id,
    `
    Search for a project to get open issues. 🤔\n\nExample: @webxdao_bot issues <Repo_name>
    `,
    {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: "Search",
              switch_inline_query_current_chat: "issues",
            },
          ],
        ],
      },
    }
  );
};

module.exports.search_prs = async (ctx) => {
  await ctx.telegram.sendMessage(
    ctx.chat.id,
    `
    Search for a project to get open prs. 🤔\n\nExample: @webxdao_bot prs <Repo_name>
    `,
    {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: "Search",
              switch_inline_query_current_chat: "pr",
            },
          ],
        ],
      },
    }
  );
};

module.exports.search_contributor = async (ctx) => {
  await ctx.telegram.sendMessage(
    ctx.chat.id,
    `
    Search for a project to get contributors. 🤔\n\nExample: @webxdao_bot contributor <Repo_name>
    `,
    {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: "Search",
              switch_inline_query_current_chat: "contributor",
            },
          ],
        ],
      },
    }
  );
};

module.exports.inline = async (ctx) => {
  const query = await ctx.inlineQuery.query;
  if (query.length > 0 && query !== " ") {
    const [command, ...args] = query.split(" ");
    if (command === "issues") {
      try {
        const repo = args.join(" ");
        const { data } = await githubAPI.get(`/repos/WebXDAO/${repo}/issues`);
        if (data.length !== 0 && args.length !== 0) {
          const issues = data.map((issue) => {
            return {
              type: "article",
              id: issue.id,
              title: issue.title,
              description: issue.body,
              input_message_content: {
                message_text: `
                Title: ${issue.title}\nLink: ${issue.html_url}  
                `,
              },
              reply_markup: {
                inline_keyboard: [
                  [
                    {
                      text: "Open",
                      url: issue.html_url,
                    },
                  ],
                ],
              },
            };
          });
          ctx.telegram.answerInlineQuery(ctx.inlineQuery.id, issues);
        } else {
          ctx.telegram.answerInlineQuery(ctx.inlineQuery.id, [{
            type: "article",
            id: 1,
            title: "Error",
            description: "Error",
            input_message_content: {
              message_text: `
              Error: No PRs found
              `,
            },
          }]);
        }
      } catch (e) {
        ctx.telegram.answerInlineQuery(ctx.inlineQuery.id, [{
          type: "article",
          id: 1,
          title: "Error",
          description: "Error",
          input_message_content: {
            message_text: `
            Error: ${e.message}
            `,
          },
        }]);
      }
    }
    if (command === "pr") {
      try {
        const repo = args.join(" ");
        const { data } = await githubAPI.get(`/repos/WebXDAO/${repo}/pulls`);
        if (data.length !== 0 && args.length !== 0) {
          const prs = data.map((pr) => {
            return {
              type: "article",
              id: pr.id,
              title: pr.title,
              description: pr.body,
              input_message_content: {
                message_text: `
                Title: ${pr.title}\nLink: ${pr.html_url}  
                `,
              },
              reply_markup: {
                inline_keyboard: [
                  [
                    {
                      text: "Open",
                      url: pr.html_url,
                    },
                  ],
                ],
              },
            };
          });
          ctx.telegram.answerInlineQuery(ctx.inlineQuery.id, prs);
        } else {
          ctx.telegram.answerInlineQuery(ctx.inlineQuery.id, [{
            type: "article",
            id: 1,
            title: "No PRs Found",
            description: "Not Found",
            input_message_content: {
              message_text: `
              Error: No PRs found
              `,
            },
          }]);
        }
      } catch (e) {
        ctx.telegram.answerInlineQuery(ctx.inlineQuery.id, [{
          type: "article",
          id: 1,
          title: "Error",
          description: "Error",
          input_message_content: {
            message_text: `
            Error: ${e.message}
            `,
          },
        }]);
      }
    }
    if (command == "contributor") {
      try {
        const repo = args.join(" ");
        const { data } = await githubAPI.get(`/repos/WebXDAO/${repo}/contributors`);
        if (data.length !== 0 && args.length !== 0) {
          const contributors = data.map((contributor) => {
            return {
              type: "article",
              id: contributor.id,
              title: contributor.login,
              description: `Contributions: ${contributor.contributions} commits`,
              input_message_content: {
                message_text: `
              Name: ${contributor.login}\nContributions: ${contributor.contributions}
              `,
              },
              reply_markup: {
                inline_keyboard: [
                  [
                    {
                      text: "Open",
                      url: contributor.html_url,
                    },
                  ],
                ],
              },
            };
          });
          ctx.telegram.answerInlineQuery(ctx.inlineQuery.id, contributors);
        } else {
          ctx.telegram.answerInlineQuery(ctx.inlineQuery.id, [{
            type: "article",
            id: 1,
            title: "Not Found",
            description: "Repo Not Found",
            input_message_content: {
              message_text: `
              Error: ${e.message}
              `,
            },
          }]);
        }
      } catch (e) {
        ctx.telegram.answerInlineQuery(ctx.inlineQuery.id,[{
          type: "article",
          id: 1,
          title: "Error",
          description: "Error",
          input_message_content: {
            message_text: `
            Error: ${e.message}
            `,
          },
        }]);
      }
    }
  }
}
