import './style.css'
import type { Route } from './+types/welcome'
import { FaPlus } from 'react-icons/fa'
import { Button } from '~/components/ui/button'
import { cn } from '~/lib/utils'

export function meta({}: Route.MetaArgs) {
    return [
        { title: "Historia's dream" },
        { name: 'description', content: 'Create and browse your characters' },
    ]
}

function RoseDesVents({ className }: { className?: string }) {
    return (
        <img
            className={cn('opacity-30 absolute md:w-2/3', className)}
            src="/images/rose_des_vents.png"
        ></img>
    )
}

function MainTitle() {
    return (
        <div
            className="text-[200%] md:text-[250%] font-bold drop-shadow-[0_0_0.1em_rgba(72,2,65,1)] md:ml-5"
            style={{
                textShadow:
                    '0.09em 0 #480241, -0.09em 0 #480241, 0 0.09em #480241, 0 -0.09em #480241, 0.07em 0.07em #480241, -0.07em -0.07em #480241, 0.07em -0.07em #480241, -0.07em 0.07em #480241, 0.08em 0.06em #480241, -0.08em -0.06em #480241, 0.08em -0.06em #480241, -0.08em 0.06em #480241,  0.06em 0.08em #480241, -0.06em -0.08em #480241, 0.06em -0.08em #480241, -0.06em 0.08em #480241',
            }}
        >
            <h1 className="-top-45 text-5xl md:top-0 md:text-8xl relative font-title">
                Historia's <br></br>Dream
            </h1>
        </div>
    )
}

function SelectionButtons() {
    return (
        <Button
            variant="outline"
            size="default"
            className="flex h-auto place-items-center cursor-pointer"
        >
            <FaPlus />
            <div className="text-2xl">Create a character</div>
        </Button>
    )
}

export default function App() {
    return (
        <div>
            <RoseDesVents className="left-1/4 bottom-1/5 -translate-x-1/2 translate-y-1/2 blur-[2px]" />
            <div className="absolute text-amber-100">
                <MainTitle />
                <SelectionButtons />
            </div>
        </div>
    )
}
