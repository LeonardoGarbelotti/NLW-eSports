import * as Dialog from "@radix-ui/react-dialog";
import * as Checkbox from "@radix-ui/react-checkbox";
import * as Select from '@radix-ui/react-select';
import * as ToggleGroup from '@radix-ui/react-toggle-group';

import { CaretDown, Check, GameController } from 'phosphor-react';

import { FormInput } from './Form/FormInput';
import { useState, useEffect, FormEvent } from "react";
import axios from "axios";

interface Game {
    id: string;
    title: string;
}

export function CreateAdModal() {
    const [games, setGames] = useState<Game[]>([])
    const [weekDays, setWeekDays] = useState<string[]>([])
    const [useVoiceChannel, setUseVoiceChannel] = useState(false)

    {/* Esse Hook de efeito será executado apenas 1x quando abrir o site, pois [] está vazio */ }
    useEffect(() => {
        axios('http://localhost:3333/games').then(response => {
            setGames(response.data)
        })
    }, [])

    // Esta função irá pegar os dados do formulário e enviar para o BD
    async function handleCreateAd(event: FormEvent) {
        event.preventDefault();

        const formData = new FormData(event.target as HTMLFormElement)
        const data = Object.fromEntries(formData)

        if (!data.name) {
            return;
        }

        try {
            await axios.post(`http://localhost:3333/games/${data.game}/ads`, {
                name: data.name,
                yearsPlaying: Number(data.yearsPlaying),
                discord: data.discord,
                weekDays: weekDays.map(Number),
                hourStart: data.hourStart,
                hourEnd: data.hourEnd,
                useVoiceChannel: useVoiceChannel
            })

            alert('Anúncio criado com sucesso!')
        } catch (err) {
            alert('Erro ao criar o anúncio :(')
        }

    }

    return (
        <Dialog.Portal>
            <Dialog.Overlay className="bg-black/60 inset-0 fixed" />

            <Dialog.Content className="fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-lg shadow-black/25">
                <Dialog.Title className="text-3xl font-black">Publique um anúncio</Dialog.Title>

                <form onSubmit={handleCreateAd} className="mt-8 flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                        <label htmlFor="game" className="font-semibold">Qual o game?</label>
                        <Select.Root name="game">
                            <Select.Trigger className="inline-flex items-center justify-between rounded text-sm py-3 px-4 bg-zinc-900 hover:bg-zinc-800 radix-placeholder:text-zinc-500">
                                <Select.Value placeholder="Selecione o game que deseja jogar" />
                                <Select.Icon>
                                    <CaretDown size={16} weight="bold" className="text-zinc-500" />
                                </Select.Icon>
                            </Select.Trigger>
                            <Select.Portal>
                                <Select.Content className="overflow-hidden bg-zinc-900 rounded shadow-sm">
                                    <Select.Viewport>
                                        {games.map(game => {
                                            return (
                                                <Select.Item className="flex relative items-center pt-0 pr-8 pb-0 pl-6 text-white select-none hover:bg-violet-500"
                                                    key={game.id}
                                                    value={game.id}
                                                >
                                                    <Select.ItemText>
                                                        {game.title}
                                                    </Select.ItemText>
                                                    <Select.ItemIndicator className="absolute left-0 inline-flex items-center justify-center ml-1 text-emerald-400">
                                                        <Check size={16} weight="bold" />
                                                    </Select.ItemIndicator>
                                                </Select.Item>
                                            )
                                        })}
                                    </Select.Viewport>
                                </Select.Content>
                            </Select.Portal>
                        </Select.Root>
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="name">Seu nome (ou nickname)</label>
                        <FormInput name="name" id="name" placeholder="Como te chamam dentro do game?" />
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        <div className="flex flex-col gap-2">
                            <label htmlFor="yearsPlaying">Joga há quantos anos?</label>
                            <FormInput name="yearsPlaying" id="yearsPlaying" type="number" placeholder="Tudo bem ser zero..." />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="discord">Qual seu Discord?</label>
                            <FormInput name="discord" id="discord" placeholder="Usuário#0000" />
                        </div>
                    </div>

                    <div className="flex gap-6">
                        <div className="flex flex-col gap-2">
                            <label htmlFor="weekDays">Quando costuma jogar?</label>

                            <ToggleGroup.Root type="multiple" className="grid grid-cols-4 gap-2" value={weekDays} onValueChange={setWeekDays}>
                                <ToggleGroup.Item value="4" className="w-8 h-8 rounded bg-zinc-900 radix-state-on:bg-violet-500" title="Domingo">D</ToggleGroup.Item>
                                <ToggleGroup.Item value="0" className="w-8 h-8 rounded bg-zinc-900 radix-state-on:bg-violet-500" title="Segunda-Feira">S</ToggleGroup.Item>
                                <ToggleGroup.Item value="1" className="w-8 h-8 rounded bg-zinc-900 radix-state-on:bg-violet-500" title="Terça-Feira">T</ToggleGroup.Item>
                                <ToggleGroup.Item value="2" className="w-8 h-8 rounded bg-zinc-900 radix-state-on:bg-violet-500" title="Quarta-Feira">Q</ToggleGroup.Item>
                                <ToggleGroup.Item value="3" className="w-8 h-8 rounded bg-zinc-900 radix-state-on:bg-violet-500" title="Quinta-Feira">Q</ToggleGroup.Item>
                                <ToggleGroup.Item value="5" className="w-8 h-8 rounded bg-zinc-900 radix-state-on:bg-violet-500" title="Sexta-Feira">S</ToggleGroup.Item>
                                <ToggleGroup.Item value="6" className="w-8 h-8 rounded bg-zinc-900 radix-state-on:bg-violet-500" title="Sábado">S</ToggleGroup.Item>
                            </ToggleGroup.Root>

                        </div>
                        <div className="flex flex-col gap-2 flex-1">
                            <label htmlFor="hourStart">Qual o horário?</label>
                            <div className="grid grid-cols-2 gap-2">
                                <FormInput name="hourStart" id="hourStart" type="time" placeholder="De" />
                                <FormInput name="hourEnd" id="hourEnd" type="time" placeholder="Até" />
                            </div>
                        </div>
                    </div>

                    <label className="mt-2 flex items-center gap-2 text-sm select-none">
                        <Checkbox.Root
                            className="w-6 h-6 p-1 rounded bg-zinc-900"
                            checked={useVoiceChannel}
                            onCheckedChange={(checked) => {
                                if (checked === true) {
                                    setUseVoiceChannel(true)
                                } else {
                                    setUseVoiceChannel(false)
                                }
                            }}>
                            <Checkbox.Indicator>
                                <Check size={16} className="text-emerald-400" weight="bold" />
                            </Checkbox.Indicator>
                        </Checkbox.Root>
                        Costumo me conectar ao chat de voz
                    </label>

                    <footer className="mt-4 flex justify-end gap-4">
                        <Dialog.Close type="button" className="bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600">Cancelar</Dialog.Close>
                        <button type="submit" className="bg-violet-500 px-5 h-12 rounded-md font-semibold flex items-center gap-3 hover:bg-violet-600">
                            <GameController size={24} />
                            Encontrar duo
                        </button>
                    </footer>
                </form>
            </Dialog.Content>
        </Dialog.Portal>
    )
}