const axios = require('axios');

module.exports.help = (ctx) => {
    ctx.replyWithHTML(`<b>Usage:</b>\n Enter the name of the crypto coin and we will give you all possible information about it \c <b>Commands:</b>\n /currencies - see the list of all avaliable currencies`)
};

module.exports.get_currencies = (ctx) => {
    axios.get('https://api.udilia.com/coins/v1/cryptocurrencies')
        .then(response => {
                let currencies = {
                    reply_markup: JSON.stringify({
                        inline_keyboard: response.data.currencies.map(cur => {
                            return [{text: cur.name, callback_data: cur.id}]
                        })
                    })
                };
                ctx.replyWithHTML('<b>Choose currency from the list</b>', currencies)
        })
        .catch(error => {
            console.log(error);
        });
};

module.exports.get_currency_data = (ctx, cur_id) => {
    axios.get(`https://api.udilia.com/coins/v1/cryptocurrencies/${cur_id}`)
        .then(response => {
            const result = `<b>Rank:</b> ${response.data.rank} \n<b>Name:</b> ${response.data.name} \n<b>Price:</b> ${response.data.price} $ \n<b>Market Cap.:</b> ${response.data.marketCap} $ \n<b>Total Supply:</b> ${response.data.totalSupply} $ \n<b>Percent Change in 24H:</b> ${response.data.percentChange24h} %`
            ctx.replyWithHTML(result)
        })
        .catch(error => {
            console.log(error);
        });
};

module.exports.get_currency_id_by_name = (ctx, cur_name) => {
    axios.get('https://api.udilia.com/coins/v1/cryptocurrencies')
        .then(response => {
            const result = response.data.currencies.find(cur => cur.name.toLowerCase().includes(cur_name.toLowerCase()));
            if (result) module.exports.get_currency_data(ctx, result.id)
            else ctx.reply('Sorry, could not find such crypto currency. You can type /currencies to see the list of all available coins')
        })
        .catch(error => {
            console.log(error);
        });
};