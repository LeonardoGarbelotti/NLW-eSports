interface GameBannerProps {
    id: string,
    bannerUrl: string,
    title: string,
    adsCount: number,
}

export function GameBanner(props: GameBannerProps) {

    return (
        <div className="relative rounded-lg overflow-hidden hover:border-2 hover:border-[#121214]">
            <img src={props.bannerUrl} alt={props.title} />

            <div className="w-full pt-16 pb-4 px-4 bg-game-gradient absolute bottom-0 left-0 right-0">
                <strong className="font-bold text-white block">{props.title}</strong>
                <span className="text-zinc-300 text-sm block">{props.adsCount} anúncio(s)</span>
            </div>
        </div>
    )
}