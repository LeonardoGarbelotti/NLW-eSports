import * as Dialog from '@radix-ui/react-dialog'
import { GameController } from 'phosphor-react'

export function GetdiscordModal() {
    return (
        <Dialog.Trigger className="py-3 px-4 bg-violet-500 hover:bg-violet-600 text-white rounded flex items-center gap-3">
            <GameController size={24} />
            Conectar
        </Dialog.Trigger>
    )
}