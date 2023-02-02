const TelegramApi = require('node-telegram-bot-api')


const purchasesData = [
    {
        id: '1',
        name: 'Закупка №1',
        info: 'Информация по закупке #1',
        img: './img/nordlys.jpg',
        status: true
    },
    {
        id: '3',
        name: 'Закупка №1',
        info: 'Информация по закупке #3',
        img: './img/nordlys.jpg',
        status: true
    },
    {
        id: '2',
        name: 'Закупка №2',
        info: 'Информация по закупке #2',
        status: false
    }
]
const token = "5945703906:AAErv1Li2l8Ecn17uj1bx0asyPE3oSE-mKg"
const webAppUrl = 'https://d594-81-5-76-237.eu.ngrok.io/'

/*const button = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{ text: 'Открыть закупку', web_app: { url: webAppUrl } }]
        ]
    })
}*/

const bot = new TelegramApi(
    token,
    { polling: true }
)

bot.onText(/\/start/, async msg => {
    const chatId = msg.chat.id
    await bot.sendMessage(
        chatId,
        'Привет! Это бот MarysikShop, для того, чтобы увидеть доступные закупки, выбери в меню "/Purchese" или напиши закупки'
    )
})

bot.onText(/^\/purchase$|^закупки$/, async msg => {
    const chatId = msg.chat.id
    for (let purchase of purchasesData) {
        if (purchase.status) {
            let url = webAppUrl + purchase.id
            await bot.sendPhoto(
                chatId,
                './img/nordlys.jpg',
                {
                    caption: purchase.info,
                    reply_markup: JSON.stringify({
                        inline_keyboard: [
                            [{ text: 'Открыть закупку', web_app: { url: url } }]
                        ]
                    })
                }
            )
        }
    }
})

console.log("started")