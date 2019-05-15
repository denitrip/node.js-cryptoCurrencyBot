const Telegraf = require('telegraf');

let bot_commands = require('./src/botCommands');

const bot_token = ''

const app = new Telegraf(bot_token);

app.start((ctx) => ctx.reply('Hello there! You can check current crypto currency price by typing it name. For additional help type /help'))

app.hears('Denis Puchko', ctx => {
    return ctx.reply('Hello my owner!');
});

app.command('help', ctx => bot_commands.help(ctx));

app.command('currencies', ctx => bot_commands.get_currencies(ctx));

app.on('callback_query', (ctx) => {
    bot_commands.get_currency_data(ctx, ctx.callbackQuery.data)
});

app.on('text', (ctx) => {
    bot_commands.get_currency_id_by_name(ctx, ctx.update.message.text);
});

app.startPolling();