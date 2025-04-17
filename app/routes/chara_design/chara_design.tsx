'use client'

import React, { useEffect, useRef, useState, Fragment } from 'react'
import Wheel from '@uiw/react-color-wheel'
import { hsvaToHex } from '@uiw/color-convert'
import './chara_design.css'

type Face = {
    hair: string
    eyes: string
    mouth: string
    nose: string
    //skin: string;
}

const FeaturesList = {
    empty: [],
    hair: ['hair1', 'hair2'],
    eyes: ['eyes1', 'eyes2', 'eyes3', 'eyes4'],
    mouth: ['mouth1', 'mouth2', 'mouth3', 'mouth4'],
    noses: ['nose1', 'nose2'],
}

type FeatureKey = keyof typeof FeaturesList

function ColorWheel({ hsva, setHsva }: { hsva: any; setHsva: any }) {
    return (
        <Wheel
            color={hsva}
            onChange={(color) => setHsva({ ...hsva, ...color.hsva })}
        />
    )
}

function BackButton() {
    return (
        <>
            <button
                className="ml-4 absolute top-[100%] translate-y-[-100%] font-body text-custom-violet text-[300%]"
                onClick={() => {
                    window.history.back()
                }}
            >
                <div className="self-end flex flex-row">
                    <div className="mt-10 content-stretch font-bold">
                        Back
                        <img
                            className="opacity-100 size-12 relative -top-[5%] left-[50%] -translate-x-[50%]"
                            src="/images/arrows/back.png"
                        ></img>
                    </div>
                    <div className="text-[300%]">)</div>
                </div>
            </button>
        </>
    )
}

function NextButton() {
    return (
        <>
            <button className="right-[0%] bottom-15 mr-4 absolute">
                <img
                    className="opacity-100 size-30"
                    src="/images/arrows/next.png"
                    onClick={() => {
                        window.location.href = 'chara_design'
                    }}
                ></img>
            </button>
        </>
    )
}
// Le 1er niveau de l'arborescence, on choisit l'élément physique à modifier (ex: cheveux, yeux, etc.)
function MainMenu({
    setFace,
    setCurrentSelectionMenu,
    currentSelection,
}: {
    setFace: React.Dispatch<React.SetStateAction<Face>>
    setCurrentSelectionMenu: React.Dispatch<
        React.SetStateAction<'empty' | 'hair' | 'eyes' | 'mouth' | 'noses'>
    >
    currentSelection: FeatureKey
}) {
    return (
        <div className="main-menu">
            <MainMenuItem
                image="/images/hair/hair1.png"
                name="hair"
                setCurrentSelectionMenu={setCurrentSelectionMenu}
                currentSelection={currentSelection}
            />
            <MainMenuItem
                image="/images/eyes/eyes1.png"
                name="eyes"
                setCurrentSelectionMenu={setCurrentSelectionMenu}
                currentSelection={currentSelection}
            />
            <MainMenuItem
                image="/images/mouth/mouth1.png"
                name="mouth"
                setCurrentSelectionMenu={setCurrentSelectionMenu}
                currentSelection={currentSelection}
            />
        </div>
    )
}

function MainMenuItem({
    image,
    name,
    setCurrentSelectionMenu,
    currentSelection,
}: {
    image: string
    name: FeatureKey
    setCurrentSelectionMenu: React.Dispatch<
        React.SetStateAction<'empty' | 'hair' | 'eyes' | 'mouth' | 'noses'>
    >
    currentSelection: FeatureKey
}) {
    const handleClick = () => {
        setCurrentSelectionMenu(name)
        console.log(`Selected menu for ${name}`)
    }

    return (
        <div
            className={`menu-item ${
                currentSelection === name ? 'grayed-out' : ''
            }`}
            onClick={handleClick}
            style={{
                opacity: currentSelection === name ? 0.5 : 1, // Griser si sélectionné
                pointerEvents: currentSelection === name ? 'none' : 'auto', // Désactiver les clics si sélectionné
            }}
        >
            <img src={image} alt={name} />
        </div>
    )
}
// Un sous-menu qui affiche les différentes options pour chaque élément physique

function SelectionMenu({
    name,
    setFace,
    currentFace,
}: {
    name: FeatureKey
    setFace: React.Dispatch<React.SetStateAction<Face>>
    currentFace: Face
}) {
    const features = FeaturesList[name]
    if (!features) {
        return null
    }
    console.log(`features for ${name}:`, features)
    return (
        <div className="feature-menu">
            {features.map((feature) => (
                <SelectionMenuItem
                    key={`${name}-${feature}`}
                    image={`/images/${name}/${feature}.png`}
                    parent={name}
                    name={feature}
                    setFace={setFace}
                    currentFace={currentFace}
                />
            ))}
        </div>
    )
}

function SelectionMenuItem({
    image,
    parent,
    name,
    setFace,
    currentFace,
}: {
    image: string
    parent: string
    name: string
    setFace: React.Dispatch<React.SetStateAction<Face>>
    currentFace: Face
}) {
    const handleClick = () => {
        setFace((prevFace) => ({
            ...prevFace,
            [parent]: name, // Met à jour la propriété correspondante dans l'objet Face
        }))
    }

    return (
        <div
            className={`menu-item ${
                currentFace[parent as keyof Face] === name ? 'grayed-out' : ''
            }`}
            onClick={handleClick}
            style={{
                opacity: currentFace[parent as keyof Face] === name ? 0.5 : 1, // Griser si appliqué
                pointerEvents:
                    currentFace[parent as keyof Face] === name
                        ? 'none'
                        : 'auto', // Désactiver les clics si appliqué
            }}
        >
            <img src={image} alt={name} />
        </div>
    )
}

function FaceRender({
    hair,
    eyes,
    mouth,
    mouthPosition,
    mouthSize,
    eyesSize,
    hsva,
}: {
    hair: string
    eyes: string
    mouth: string
    mouthPosition: number
    mouthSize: number
    eyesSize: number
    hsva: { h: number; s: number; v: number; a: number }
}) {
    const skinCvsRef = useRef<HTMLCanvasElement>(null)
    const eyesCvsRef = useRef<HTMLCanvasElement>(null)
    const hairCvsRef = useRef<HTMLCanvasElement>(null)
    const mouthCvsRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const canvas = skinCvsRef.current
        if (!canvas) return
        const context = canvas.getContext('2d')

        if (!canvas || !context) return
        context.clearRect(0, 0, canvas.width, canvas.height) // Clear the canvas

        const faceWidth = 500
        const faceHeight = 500

        const baseSkinImage = new Image()
        baseSkinImage.src = `/images/face.png`
        baseSkinImage.onload = () => {
            context.drawImage(
                baseSkinImage,
                canvas.width / 2 - faceWidth / 2,
                canvas.height / 2 - faceHeight / 2,
                500,
                500
            )
        }
    }, [])

    useEffect(() => {
        const canvas = hairCvsRef.current
        if (!canvas) return
        const context = canvas.getContext('2d')

        if (!canvas || !context) return

        const faceWidth = 500
        const faceHeight = 500

        const hairImage = new Image()
        hairImage.src = `/images/hair/${hair}.png`
        //                     top: current_face.hair === 'hair1' ? '49%' : '47%',
        //                     transform: 'translate(-50%, -50%)',
        //                     height: current_face.hair === 'hair1' ? '40%' : '34%',

        const width = hair === 'hair1' ? 600 : 500
        const height = hair === 'hair1' ? 500 : 550
        const xoffset = -(width - faceWidth) / 2
        const yoffset =
            -(height - faceHeight) / 2 + (hair === 'hair1' ? -50 : -60)

        hairImage.onload = () => {
            context.clearRect(0, 0, canvas.width, canvas.height) // Clear the canvas
            context.drawImage(
                hairImage,
                canvas.width / 2 - faceWidth / 2 + xoffset,
                canvas.height / 2 - faceHeight / 2 + yoffset,
                width,
                height
            )
        }
    }, [hair])

    useEffect(() => {
        const canvas = eyesCvsRef.current
        if (!canvas) return
        const context = canvas.getContext('2d')

        if (!canvas || !context) return

        const faceWidth = 500
        const faceHeight = 500

        const eyesImage = new Image()
        eyesImage.src = `/images/eyes/${eyes}.png`

        const width = eyesSize * 10
        const height = eyesSize * 10
        const xoffset = -(width - faceWidth) / 2
        const yoffset = -(height - faceHeight) / 2 - 50

        const x = canvas.width / 2 - faceWidth / 2 + xoffset
        const y = canvas.height / 2 - faceHeight / 2 + yoffset

        eyesImage.onload = () => {
            context.clearRect(0, 0, canvas.width, canvas.height) // Clear the canvas
            // First draw your image to the buffer
            context.globalCompositeOperation = 'copy'
            context.drawImage(eyesImage, x, y, width, height)

            // Now we'll multiply a rectangle of your chosen color
            context.fillStyle = hsvaToHex(hsva)
            context.globalCompositeOperation = 'multiply'
            context.fillRect(0, 0, canvas.width, canvas.height)

            // Finally, fix masking issues you'll probably incur and optional globalAlpha
            context.fillStyle = '#000000'
            context.globalAlpha = 1
            context.globalCompositeOperation = 'destination-in'

            context.drawImage(eyesImage, x, y, width, height)
        }
    }, [eyes, eyesSize, hsva])

    useEffect(() => {
        const canvas = mouthCvsRef.current
        if (!canvas) return
        const context = canvas.getContext('2d')

        if (!canvas || !context) return

        const faceWidth = 500
        const faceHeight = 500

        const mouthImage = new Image()
        mouthImage.src = `/images/mouth/${mouth}.png`

        const width = mouthSize * 10
        const height = mouthSize * 10
        const xoffset = -(width - faceWidth) / 2
        const yoffset = -(height - faceHeight) / 2 + 10 * mouthPosition

        const x = canvas.width / 2 - faceWidth / 2 + xoffset
        const y = canvas.height / 2 - faceHeight / 2 + yoffset

        mouthImage.onload = () => {
            context.clearRect(0, 0, canvas.width, canvas.height) // Clear the canvas

            context.drawImage(mouthImage, x, y, width, height)
        }
    }, [mouth, mouthSize, mouthPosition, hsva])

    return (
        <>
            <canvas
                ref={skinCvsRef}
                width={1000}
                height={1000}
                className="absolute"
            />
            <canvas
                ref={eyesCvsRef}
                width={1000}
                height={1000}
                className="absolute"
            />
            <canvas
                ref={mouthCvsRef}
                width={1000}
                height={1000}
                className="absolute"
            />
            <canvas
                ref={hairCvsRef}
                width={1000}
                height={1000}
                className="absolute"
            />
        </>
    )
}

export default function FaceDesign() {
    const [current_face, setFace] = useState<Face>({
        hair: 'hair1',
        eyes: 'eyes1',
        mouth: 'mouth1',
        nose: 'nose1',
    })
    const [current_menu, setCurrentSelectionMenu] =
        useState<FeatureKey>('empty')

    // Nouveaux états pour la position verticale et la taille de la bouche
    const [mouthPosition, setMouthPosition] = useState(5) // Position verticale en pourcentage
    const [mouthSize, setMouthSize] = useState(7) // Taille en pourcentage
    const [eyesSize, setEyesSize] = useState(13) // Taille en pourcentage

    const [hsva, setHsva] = useState({
        h: 0,
        s: 100,
        v: 100,
        a: 1,
    })

    return (
        <div
            className="flex-1 h-full flex flex-row"
            style={{ padding: '20px', gap: '20px' }}
        >
            <BackButton />
            <div
                className="flex flex-row justify-start items-stretch gap-4"
                style={{ width: '30%' }} // Le menu occupe toujours 30% de la largeur
            >
                <div style={{ width: '50%' }}>
                    <MainMenu
                        setFace={setFace}
                        setCurrentSelectionMenu={setCurrentSelectionMenu}
                        currentSelection={current_menu}
                    />
                </div>
                <div style={{ width: '50%' }}>
                    <SelectionMenu
                        name={current_menu}
                        setFace={setFace}
                        currentFace={current_face}
                    />
                </div>
            </div>

            <div
                className="flex justify-center items-center"
                style={{
                    width: '40%',
                    height: '70vh',
                }}
            >
                <FaceRender
                    hair={current_face.hair}
                    eyes={current_face.eyes}
                    mouth={current_face.mouth}
                    // current_face={current_face}
                    mouthPosition={mouthPosition}
                    mouthSize={mouthSize}
                    eyesSize={eyesSize}
                    hsva={hsva}
                />
            </div>

            <div className="flex flex-col gap-4" style={{ width: '30%' }}>
                <div className="flex flex-col gap-2" style={{ height: '25%' }}>
                    <label className="flex flex-col items-start">
                        <span>Hauteur de la bouche :</span>
                        <input
                            type="range"
                            min="-10"
                            max="10"
                            step="0.1"
                            value={mouthPosition}
                            onChange={(e) =>
                                setMouthPosition(Number(e.target.value))
                            }
                            className="slider"
                            style={{
                                appearance: 'none',
                                width: '100%',
                                height: '8px',
                                borderRadius: '5px',
                                background: '#ddd',
                                outline: 'none',
                                opacity: '0.9',
                                transition: 'opacity 0.2s',
                            }}
                        />
                    </label>
                    <label className="flex flex-col items-start">
                        <span>Taille de la bouche :</span>
                        <input
                            type="range"
                            min="3"
                            max="10"
                            step="0.1"
                            value={mouthSize}
                            onChange={(e) =>
                                setMouthSize(Number(e.target.value))
                            }
                            className="slider"
                            style={{
                                appearance: 'none',
                                width: '100%',
                                height: '8px',
                                borderRadius: '5px',
                                background: '#ddd',
                                outline: 'none',
                                opacity: '0.9',
                                transition: 'opacity 0.2s',
                            }}
                        />
                    </label>
                    <label className="flex flex-col items-start">
                        <span>Taille des yeux :</span>
                        <input
                            type="range"
                            min="5"
                            max="18"
                            step="0.1"
                            value={eyesSize}
                            onChange={(e) =>
                                setEyesSize(Number(e.target.value))
                            }
                            className="slider"
                            style={{
                                appearance: 'none',
                                width: '100%',
                                height: '8px',
                                borderRadius: '5px',
                                background: '#ddd',
                                outline: 'none',
                                opacity: '0.9',
                                transition: 'opacity 0.2s',
                            }}
                        />
                    </label>
                </div>
                <div
                    className="flex-1"
                    style={{
                        backgroundColor: '#f0f0f0',
                        borderRadius: '8px',
                    }}
                >
                    <ColorWheel hsva={hsva} setHsva={setHsva} />
                </div>
            </div>
            <NextButton />
        </div>
    )
}
