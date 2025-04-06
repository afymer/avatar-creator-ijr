import { useState } from 'react'
import './style.css'

//=========================================================================================================
//===============================PAGE 0 (ACCUEIL) =========================================================
//=========================================================================================================
function RoseDesVents_home_bg() {
    return (
        <img
            className="opacity-30 fixed -bottom-1/100 md:-bottom-3/20 -left-2/5 md:-left-1/5 w-7xl md:w-4/5"
            id="back_img"
            src="../images/rose_des_vents.png"
        ></img>
    )
}

function MainTitle() {
    return (
        <>
            <div
                className="text-[200%] md:text-[250%] font-bold drop-shadow-[0_0_0.1em_rgba(72,2,65,1)] md:ml-5"
                style={{
                    textShadow:
                        '0.09em 0 #480241, -0.09em 0 #480241, 0 0.09em #480241, 0 -0.09em #480241, 0.07em 0.07em #480241, -0.07em -0.07em #480241, 0.07em -0.07em #480241, -0.07em 0.07em #480241, 0.08em 0.06em #480241, -0.08em -0.06em #480241, 0.08em -0.06em #480241, -0.08em 0.06em #480241,  0.06em 0.08em #480241, -0.06em -0.08em #480241, 0.06em -0.08em #480241, -0.06em 0.08em #480241',
                }}
            >
                <img
                    className="opacity-70 relative w-3xs md:w-2xs top-5 left-20 md:top-65 md:left-65"
                    src="../images/rose_des_vents.png"
                ></img>
                <h1 className="-top-45 text-5xl md:top-0 md:text-8xl relative font-title">
                    Historia's <br></br>Dream
                </h1>
            </div>
        </>
    )
}

function SelectionButtons({
    setCounter,
}: {
    setCounter: React.Dispatch<React.SetStateAction<number>>
}) {
    return (
        <>
            <button
                className="bg-button_bg border-2 border-amber-100 rounded-full p-[2%] relative md:m-[4%]  flex w-[7em] md:w-[11em] font-body "
                onClick={() => setCounter(1)}
            >
                <img
                    className="size-10 md:size-[10%] mr-4 ml-3 md:ml-0 mt-3 md:mt-0"
                    src="../images/plus.png"
                ></img>
                <span className="inline-flex mt-[0.em] text-3xl md:text-4xl">
                    Create a character
                </span>
            </button>
        </>
    )
}

//=========================================================================================================
//===============================PAGE 1 (BODIES) ==========================================================
//=========================================================================================================

function RoseDesVents_avg_bg() {
    return (
        <div className="absolute w-full">
            <img
                className="translate-x-[50%] opacity-40 w-[80%] md:w-[50%] -z-10"
                id="back_img"
                src="../images/half_rose_des_vents.png"
            ></img>
        </div>
    )
}

function Instruction({ consigne }: { consigne: string }) {
    return (
        <div className="font-title text-center text-amber-100 text-[200%] md:text-[250%] font-bold drop-shadow-[0_0_0.1em_rgba(72,2,65,1)] md:m-5">
            <h1 className="-top-45 text-5xl md:top-0 md:text-8xl relative font-title">
                {consigne}
            </h1>
        </div>
    )
}

function NextButton({
    page,
    setPage,
    activator,
}: {
    page: any
    setPage: React.Dispatch<React.SetStateAction<number>>
    activator: any
}) {
    if (activator === -1)
        //if button should be deactivated
        return (
            <>
                <button className="mr-4 h-fit self-end">
                    <img
                        className="opacity-40 size-30 self-end"
                        src="../images/arrows/next.png"
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
                        src="../images/arrows/next.png"
                        onClick={() => setPage(page + 1)}
                    ></img>
                </button>
            </>
        )
}
function BackButton({
    page,
    setPage,
}: {
    page: any
    setPage: React.Dispatch<React.SetStateAction<number>>
}) {
    return (
        <>
            <button className="h-fit ml-4 self-end flex flex-row font-body text-custom_violet text-[300%]">
                <div className="mt-10 content-stretch font-bold">
                    Back
                    <img
                        className="opacity-100 size-12 relative -top-[5%] left-[50%] -translate-x-[50%]"
                        src="../images/arrows/back.png"
                        onClick={() => setPage(page - 1)}
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
        '../images/bodies/man_silhouette.png',
        '../images/bodies/woman_silhouette.png',
        '../images/bodies/neutral_silhouette.png',
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
                    className="mask-contain mask-no-repeat mask-center bg-linear-to-t from-custom_orange to-custom_violet h-full w-full"
                    style={{
                        maskImage: `url(${body_list[index]})`,
                        WebkitMaskImage: `url(${body_list[index]})`,
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
                    className="mask-contain mask-no-repeat mask-center bg-linear-to-t from-custom_orange to-custom_violet h-full w-full"
                    style={{
                        maskImage: `url(${body_list[index]})`,
                        WebkitMaskImage: `url(${body_list[index]})`,
                    }}
                ></div>
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
            <div className="w-full flex items-center justify-around flex-row">
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

function App() {
    const [page, setPage] = useState(0)
    const [body_id, setBodyId] = useState(-1)

    if (page === 0) {
        return (
            <>
                <RoseDesVents_home_bg />
                <div className="md:absolute text-amber-100 ml-15 md:ml-0 text-4xl top-1/100 right-1/6">
                    <MainTitle />
                    <SelectionButtons setCounter={setPage} />
                </div>
            </>
        )
    } else if (page === 1) {
        return (
            <>
                <RoseDesVents_avg_bg />
                <Instruction consigne={'Choose your class'} />
                <div className="flex flex-row h-full grow-0.1">
                    <BackButton page={page} setPage={setPage} />
                    <Bodies body_id={body_id} setBodyId={setBodyId} />
                    <NextButton
                        page={page}
                        setPage={setPage}
                        activator={body_id}
                    />
                </div>
            </>
        )
    }

    return (
        <>
            <BackButton page={page} setPage={setPage} />
        </>
    )
}

export default App
