import { useState, useEffect } from 'react';
import * as Dialog from "@radix-ui/react-dialog"
import axios from "axios";


import '../styles/main.css';

import logoImg from '../assets/nlw-esports-logo.svg';

import { GameBanner } from '../components/GameBanner';
import { CreateAdBanner } from '../components/CreateAdBanner';
import { CreateAdModal } from '../components/CreateAdModal';
import { Link } from 'react-router-dom';


// Criada uma interface para especificar quais serão as variáveis que estão vindo do banco
interface Game {
    id: string;
    title: string;
    bannerUrl: string;
    _count: {
        ads: number;
    }
}

export function Home() {
    const [games, setGames] = useState<Game[]>([])

    {/* Esse Hook de efeito será executado apenas 1x quando abrir o site, pois [] está vazio */ }
    useEffect(() => {
        axios('http://localhost:3333/games').then(response => {
            setGames(response.data)
        })
    }, [])

    return (
        <div className="max-w-[1344px] mx-auto my-20 flex flex-col items-center">
            <img src={logoImg} />
            <h1 className="text-6xl text-white font-black my-20">
                Seu <span className="text-transparent bg-green-gradient bg-clip-text">duo</span> está aqui!
            </h1>

            <div className="grid grid-cols-6 gap-6 mt-16">
                {/* o map percorre o array de jogos e retorna os valores para cada game existente*/}
                {games.map(game => {
                    return (
                        <Link to={`/games/${game.id}/${game.title}/ads`}>
                            <GameBanner
                                id={game.id}
                                key={game.id}
                                bannerUrl={game.bannerUrl}
                                title={game.title}
                                adsCount={game._count.ads}
                            />
                        </Link>
                    )
                })}

            </div>

            <Dialog.Root>
                <CreateAdBanner />
                <CreateAdModal />
            </Dialog.Root>
        </div>
    )
}