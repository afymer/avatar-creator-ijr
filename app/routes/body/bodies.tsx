import { useState } from 'react'
import type { Route } from './+types/bodies'
import './style.css'

export function meta({}: Route.MetaArgs) {
    return [
        { title: "Historia's dream" },
        { name: 'description', content: 'Create and browse your characters' },
    ]
}

function RoseDesVents_avg_bg() {
    return (
        <div className="absolute w-full">
            <img
                className="translate-x-[50%] opacity-40 w-[80%] md:w-[50%] -z-10"
                id="back_img"
                src="/images/half_rose_des_vents.png"
            ></img>
        </div>
    )
}

function Instruction({ consigne }: { consigne: string }) {
    return (
        <div className="font-title text-center text-amber-100 text-[200%] md:text-[250%] font-bold drop-shadow-[0_0_0.1em_rgba(72,2,65,1)] md:p-5">
            <h1 className="-top-45 text-5xl md:top-0 md:text-8xl relative font-title">
                {consigne}
            </h1>
        </div>
    )
}

function NextButton({ activator }: { activator: any }) {
    if (activator === -1)
        //if button should be deactivated
        return (
            <>
                <button className="h-fit mr-4 self-end">
                    <img
                        className="opacity-40 size-30 self-end"
                        src="/images/arrows/next.png"
                    ></img>
                </button>
            </>
        )
    else
        return (
            <>
                <button className="mr-4 h-fit self-end">
                    <img
                        className="opacity-100 size-30 self-end"
                        src="/images/arrows/next.png"
                        onClick={() => {
                            window.location.href = 'chara_design'
                        }}
                    ></img>
                </button>
            </>
        )
}
function BackButton() {
    return (
        <>
            <button
                className="h-fit ml-4 self-end flex flex-row font-body text-custom-violet text-[300%]"
                onClick={() => {
                    window.history.back()
                }}
            >
                <div className="mt-10 content-stretch font-bold">
                    Back
                    <img
                        className="opacity-100 size-12 relative -top-[5%] left-[50%] -translate-x-[50%]"
                        src="/images/arrows/back.png"
                    ></img>
                </div>
                <div className="text-[300%]">)</div>
            </button>
        </>
    )
}

function Body({
    current_selected,
    index,
    selectBody,
}: {
    current_selected: any
    index: any
    selectBody: React.Dispatch<React.SetStateAction<number>>
}) {
    const body_list = [
        '/images/bodies/man_silhouette.png',
        '/images/bodies/woman_silhouette.png',
        '/images/bodies/neutral_silhouette.png',
    ]

    if (current_selected === index)
        return (
            <button
                className="h-150 w-70"
                style={{
                    filter: 'drop-shadow(0 0 1em rgba(255,165,0,1))',
                }}
                onClick={(e) => {
                    selectBody(-1)
                }}
            >
                <div
                    className="mask-contain mask-no-repeat mask-center bg-linear-to-t from-custom-orange to-custom-violet w-full h-full"
                    style={{
                        maskImage: 'url(' + body_list[index] + ')',
                        WebkitMaskImage: 'url(' + body_list[index] + ')',
                    }}
                ></div>
            </button>
        )
    else
        return (
            <button
                className="h-150 w-70"
                style={{
                    filter: 'drop-shadow(0 0 0.5em rgba(72,2,65,1))',
                }}
                onClick={(e) => {
                    selectBody(index)
                }}
            >
                <div
                    className="mask-contain mask-no-repeat mask-center bg-linear-to-t from-custom-orange to-custom-violet w-full h-full"
                    style={{
                        maskImage: 'url(' + body_list[index] + ')',
                        WebkitMaskImage: 'url(' + body_list[index] + ')',
                    }}
                    //className="bg-linear-to-t from-custom-orange to-custom-violet flex-1"
                >
                    {/*<img
                        src={body_list[index]}
                        className="w-full h-full object-cover"
                        alt="Body Silhouette"
                    ></img>*/}
                </div>
            </button>
        )
}

function Bodies({
    body_id,
    setBodyId,
}: {
    body_id: any
    setBodyId: React.Dispatch<React.SetStateAction<number>>
}) {
    return (
        <>
            <div className="flex-1 flex items-center justify-around flex-row">
                <Body
                    current_selected={body_id}
                    index={0}
                    selectBody={setBodyId}
                />
                <Body
                    current_selected={body_id}
                    index={1}
                    selectBody={setBodyId}
                />
                <Body
                    current_selected={body_id}
                    index={2}
                    selectBody={setBodyId}
                />
            </div>
        </>
    )
}

//================================================

export default function App() {
    const [body_id, setBodyId] = useState(-1)

    return (
        <>
            <RoseDesVents_avg_bg />
            <Instruction consigne={'Choose your body'} />
            <div className="flex flex-row flex-1 grow-0.1 mt-10">
                <BackButton />
                <Bodies body_id={body_id} setBodyId={setBodyId} />
                <NextButton activator={body_id} />
            </div>
        </>
    )
}
