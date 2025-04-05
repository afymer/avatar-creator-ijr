import { useState } from 'react'
import './style.css'

function RoseDesVents() {
    return (
        <img
            className="opacity-30 fixed -bottom-1/100 md:-bottom-3/20 -left-2/5 md:-left-1/5 w-7xl md:w-2/3"
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

function SelectionButtons() {
    return (
        <>
            <button className="bg-button_bg border-2 border-amber-100 rounded-full p-[2%] relative md:m-[4%]  flex w-[7em] md:w-[11em] font-body ">
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

function App() {
    return (
        <>
            <RoseDesVents />
            <div className="md:absolute text-amber-100 ml-15 md:ml-0 text-4xl top-1/100 right-1/6">
                <MainTitle />
                <SelectionButtons />
            </div>
        </>
    )
}

export default App
