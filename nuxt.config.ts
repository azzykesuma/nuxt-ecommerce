// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    app : {
        head : {
            charset: 'utf-16',
            viewport: 'width=500, initial-scale=1',
            title: 'My App',
            meta: [
              // <meta name="description" content="My amazing site">
              { name: 'description', content: 'My amazing site.' }
            ],
            link : [
                {
                    rel : 'stylesheet',
                    href: '//unpkg.com/element-plus/dist/index.css'
                },
                {
                    rel : 'stylesheet',
                    href: 'https://fonts.googleapis.com/css?family=Montserrat&display=swap'
                },
            ],
        },
    },
    css : [
        '@/assets/global.css'
    ]
})
