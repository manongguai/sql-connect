const router = require('koa-router')()

router.get('/', async (ctx, next) => {
    try {
        await ctx.render('index', {
            title: 'Hello Koa 2!',
            color: 'red'
        })
    } catch (error) {
        console.log(error);
    }
})

router.get('/string', async (ctx, next) => {
    ctx.body = 'koa2 string'
})

router.get('/json', async (ctx, next) => {
    ctx.body = {
        title: 'koa2 json'
    }
})

module.exports = router
