import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

import { AdBanner } from '../components/AdBanner';

import logoImg from '../assets/nlw-esports-logo.svg';


interface Game {
    id: string;
    name: string;
    discord: string;
    yearsPlaying: number;
    weekDays: string[];
    hourStart: string,
    hourEnd: string,
    useVoiceChannel: boolean
}

export function GameAds() {
    const [ads, setAds] = useState<Game[]>([])
    const { gameId, gameTitle } = useParams();

    useEffect(() => {
        axios(`http://localhost:3333/games/${gameId}/ads`).then(response => {
            setAds(response.data)
        })
    }, [])

    return (
        <div className="max-w-[1344px] mx-auto my-20 flex flex-col items-center">
            <Link to="/">
                <img src={logoImg} />
            </Link>
            <h1 className="text-6xl text-white mt-20 font-black">
                {gameTitle}
            </h1>
            <span className="text-zinc-300 text-lg font-semibold py-4 mb-20">Conecte-se e começe a jogar!</span>

            <div className="grid grid-cols-6 gap-6">
                {ads.map(ad => {
                    return (
                        <AdBanner
                            key={ad.id}
                            id={ad.id}
                            name={ad.name}
                            yearsPlaying={ad.yearsPlaying}
                            weekDays={ad.weekDays}
                            hourEnd={ad.hourEnd}
                            hourStart={ad.hourStart}
                            useVoiceChannel={ad.useVoiceChannel}
                        />
                    )
                })}
            </div>
        </div>
    )
}