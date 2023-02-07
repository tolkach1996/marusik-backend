const mongoose = require('mongoose')
const TelegramApi = require('node-telegram-bot-api');
const Express = require('express')
const Post = require("./models/post")
require('dotenv').config()


const PORT = 5000;

mongoose.Promise = global.Promise;
const options = {
    socketTimeoutMS: 30000,
    keepAlive: true,
    useUnifiedTopology: true,
    useNewUrlParser: true
}
mongoose.set('debug', false);
mongoose.connection
    .on('error', error => console.log(error))
    .on('close', () => console.log('Database connection closed.'))
    .once('open', () => {
        const info = mongoose.connections[0];
        console.log(`Connected to ${info.host}:${info.port}/${info.name}`);
    })
mongoose.connect(process.env.MONGO_URL, options);



const app = Express()
app.use(Express.json())


app.post('/', async (req, res) => {
    try {
        const { author, title, content, picture } = req.body
        const post = await post.create({ author, title, content })
        res.status(200).json('Сервер работает123')
    } catch (e) {
        res.status(e)
    }
})



async function startApp() {
    try {
        app.listen(PORT, () => console.log('Server started on port ' + PORT))
    } catch (e) {
        console.log(e)
    }
}

/*app.get('/', (req, res) => {
    const post = post.create({})
    res.status(200).json('Сервер работает123')
})*/

startApp()
























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
const webAppUrl = 'https://ae93-81-5-76-237.eu.ngrok.io/'

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