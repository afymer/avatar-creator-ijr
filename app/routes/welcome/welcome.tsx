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
            className="md:text-[250%] font-bold drop-shadow-[0_0_0.1em_rgba(72,2,65,1)]"
            style={{
                textShadow:
                    '0.09em 0 #480241, -0.09em 0 #480241, 0 0.09em #480241, 0 -0.09em #480241, 0.07em 0.07em #480241, -0.07em -0.07em #480241, 0.07em -0.07em #480241, -0.07em 0.07em #480241, 0.08em 0.06em #480241, -0.08em -0.06em #480241, 0.08em -0.06em #480241, -0.08em 0.06em #480241,  0.06em 0.08em #480241, -0.06em -0.08em #480241, 0.06em -0.08em #480241, -0.06em 0.08em #480241',
            }}
        >
            <h1 className="text-8xl font-title">
                Historia's <br />
                Dream
            </h1>
        </div>
    )
}

function SelectionButtons() {
    return (
        <div className="flex flex-col items-center">
            <Button
                variant="outline"
                size="default"
                className="flex w-fit h-auto place-items-center cursor-pointer"
            >
                <FaPlus />
                <div className="text-3xl">Create a character</div>
            </Button>
            <Button
                variant="link"
                size="default"
                className="flex w-fit h-auto place-items-center cursor-pointer text-primary-foreground text-2xl"
            >
                Browse my characters
            </Button>
        </div>
    )
}

function CharactersCarousel() {
    return (
        <div className="flex-1 relative">
            <RoseDesVents className="absolute left-1/2 bottom-0 scale-200 -translate-x-1/2 blur-[2px]" />
            <div className="">
                <img
                    src="/images/welcome/character2.png"
                    alt="character 2"
                    className="absolute bottom-0 left-1/2 -translate-x-[calc(50%+100px)] origin-bottom rotate-[-5deg] transition-transform hover:scale-110"
                    style={{ pointerEvents: 'visiblePainted' }}
                />
                <img
                    src="/images/welcome/character3.png"
                    alt="character 3"
                    className="absolute bottom-0 left-1/2 -translate-x-[calc(50%-100px)] origin-bottom rotate-[5deg] transition-transform hover:scale-110"
                    style={{ pointerEvents: 'visiblePainted' }}
                />
                <img
                    src="/images/welcome/character1.png"
                    alt="character 1"
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 origin-bottom transition-transform hover:scale-110"
                    style={{ pointerEvents: 'visiblePainted' }}
                />
            </div>
        </div>
    )
}

export default function App() {
    return (
        <div className="flex flex-row h-full">
            <CharactersCarousel />
            <div className="relative h-full min-w-[30%] text-amber-100 flex flex-col justify-between p-4 py-[10%]">
                <RoseDesVents className="absolute top-0 right-0 -rotate-12 blur-[2px]" />
                <MainTitle />
                <SelectionButtons />
            </div>
        </div>
    )
}
