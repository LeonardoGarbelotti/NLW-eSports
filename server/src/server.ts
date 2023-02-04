import express from 'express'
import cors from 'cors'

import { PrismaClient } from '@prisma/client'
import { convertHourToMinutes } from './utils/convert-hour-to-minutes'
import { convertMinutesToHour } from './utils/convert-minutes-to-hour'

const app = express()
app.use(express.json())
app.use(cors())

const prisma = new PrismaClient()

{/* Como o método findMany pode demorar na consulta, utiliza-se o async para sincronizar e esperar
 o 'await' acabar para continuar a execução do código*/}
app.get('/games', async (request, response) => {
    const games = await prisma.game.findMany({
        // quando executar a função de buscar, ele vai incluir uma contagem dos anúncios daquele jogo
        include: {
            _count: {
                select: {
                    ads: true,
                }
            }
        }
    })

    return response.json(games);
});

{/* :id significa que ele será passado como parâmetro */ }
app.post('/games/:id/ads', async (request, response) => {
    const gameId = request.params.id;
    const body: any = request.body;

    const ad = await prisma.ad.create({
        data: {
            gameId,
            name: body.name,
            yearsPlaying: body.yearsPlaying,
            discord: body.discord,
            weekDays: body.weekDays.join(','),
            hourStart: convertHourToMinutes(body.hourStart),
            hourEnd: convertHourToMinutes(body.hourEnd),
            useVoiceChannel: body.useVoiceChannel,
        }
    })

    return response.status(201).json(ad);
});

{/* :id significa que ele será passado como parâmetro */ }
app.get('/games/:id/ads', async (request, response) => {
    const gameId = request.params.id;

    const ads = await prisma.ad.findMany({
        select: {
            id: true,
            name: true,
            useVoiceChannel: true,
            yearsPlaying: true,
            weekDays: true,
            hourStart: true,
            hourEnd: true,
        },
        where: {
            gameId: gameId
        },
        orderBy: {
            createdAt: 'desc',
        }
    })

    // função que vai trazer mapear todos os dados que vem dos Ads
    // apenas o weekdays vai ser separado na virgula, e transformar o número em dia da semana
    return response.json(ads.map(ad => {
        return {
            ...ad,
            weekDays: ad.weekDays.split(','),
            hourStart: convertMinutesToHour(ad.hourStart),
            hourEnd: convertMinutesToHour(ad.hourEnd),
        }
    }))
})

app.listen(3333)