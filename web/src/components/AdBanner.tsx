interface AdBannerProps {
    id: string;
    name: string;
    yearsPlaying: number;
    weekDays: string[];
    hourStart: string,
    hourEnd: string,
    useVoiceChannel: boolean
}

export function AdBanner(props: AdBannerProps) {
    return (
        <div className="flex flex-col gap-3 bg-[#2A2634] rounded-lg overflow-hidden text-white px-5 py-5">
            <div className="flex flex-col">
                <label className="text-sm text-zinc-400">Nome</label>
                <h1 className="font-bold text-sm">{props.name}</h1>
            </div>

            <div className="flex flex-col">
                <span className="text-sm text-zinc-400">Tempo de jogo</span>
                <h1 className="font-bold text-sm">{props.yearsPlaying} anos</h1>
            </div>

            <div className="flex flex-col">
                <span className="text-sm text-zinc-400">Disponibilidade</span>
                <h1 className="font-bold text-sm">
                    {`${props.weekDays.length} dias \u2022 `}
                    {props.hourStart} ~ {props.hourEnd}
                </h1>
            </div>

            <div className="flex flex-col">
                <span className="text-sm text-zinc-400">Chamada de Voz?</span>
                <h1>
                    {props.useVoiceChannel ?
                        <h1 className="font-bold text-sm text-emerald-400">Sim</h1>
                        :
                        <h1 className="font-bold text-sm text-rose-500">Não</h1>
                    }
                </h1>
            </div>
        </div >
    )
}