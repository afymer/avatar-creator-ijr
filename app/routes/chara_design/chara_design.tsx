'use client'

import React, {
    useEffect,
    useRef,
    useState,
    Fragment,
    useCallback,
    type PointerEventHandler,
} from 'react'
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
    hair: ['hair1', 'hair2', 'hair3', 'hair4'],
    eyes: ['eyes1', 'eyes2', 'eyes3', 'eyes4'],
    mouth: ['mouth1', 'mouth2', 'mouth3', 'mouth4'],
    nose: ['nose1', 'nose2'],
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
        React.SetStateAction<'empty' | 'hair' | 'eyes' | 'mouth' | 'nose'>
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
            <MainMenuItem
                image="/images/nose/nose1.png"
                name="nose"
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
        React.SetStateAction<'empty' | 'hair' | 'eyes' | 'mouth' | 'nose'>
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

let clickedElement: string | null = null
let dragOffset: { x: number; y: number } | null = null
let initialPosition: { x: number; y: number } | null = null

function FaceRender({
    hair,

    eyes,
    eyesPosition,
    setEyesPosition,

    mouth,
    mouthPosition,
    setMouthPosition,

    nose,
    nosePosition,
    setNosePosition,

    mouthSize,
    noseSize,
    eyesSize,
    hsva,
}: {
    hair: string

    eyes: string
    eyesPosition: number
    setEyesPosition: React.Dispatch<React.SetStateAction<number>>

    mouth: string
    mouthPosition: number
    setMouthPosition: React.Dispatch<React.SetStateAction<number>>

    nose: string
    nosePosition: number
    setNosePosition: React.Dispatch<React.SetStateAction<number>>

    mouthSize: number
    noseSize: number
    eyesSize: number
    hsva: { h: number; s: number; v: number; a: number }
}) {
    const skinCvsRef = useRef<HTMLCanvasElement>(null)
    const eyesCvsRef = useRef<HTMLCanvasElement>(null)
    const hairCvsRef = useRef<HTMLCanvasElement>(null)
    const mouthCvsRef = useRef<HTMLCanvasElement>(null)
    const noseCvsRef = useRef<HTMLCanvasElement>(null)

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

        let width
        let height
        let dx
        let dy

        if (hair === 'hair1') {
            width = 600
            height = 500
            dx = 0
            dy = -50
        } else if (hair === 'hair2') {
            width = 500
            height = 550
            dx = 0
            dy = -50
        } else if (hair === 'hair3') {
            width = 400
            height = 400
            dx = 0
            dy = -180
        } else {
            width = 350
            height = 400
            dx = 0
            dy = -200
        }

        const xoffset = -(width - faceWidth) / 2 + dx
        const yoffset = -(height - faceHeight) / 2 + dy

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
        const yoffset = -(height - faceHeight) / 2 + 10 * eyesPosition - 50

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
    }, [eyes, eyesSize, eyesPosition, hsva])

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

    useEffect(() => {
        const canvas = noseCvsRef.current
        if (!canvas) return
        const context = canvas.getContext('2d')

        if (!canvas || !context) return

        const faceWidth = 500
        const faceHeight = 500

        const noseImage = new Image()
        noseImage.src = `/images/nose/${nose}.png`

        const width = noseSize * 10
        const height = noseSize * 10
        const xoffset = -(width - faceWidth) / 2
        const yoffset = -(height - faceHeight) / 2 + 10 * nosePosition

        const x = canvas.width / 2 - faceWidth / 2 + xoffset
        const y = canvas.height / 2 - faceHeight / 2 + yoffset

        noseImage.onload = () => {
            context.clearRect(0, 0, canvas.width, canvas.height) // Clear the canvas

            context.drawImage(noseImage, x, y, width, height)
        }
    }, [nose, nosePosition, noseSize])

    // Handle clicks on either canvas, with priority and pixel testing
    const handlePointerDown = (
        event: React.PointerEvent<HTMLCanvasElement>
    ) => {
        // const handleClick = (event: Pointer) => {
        // const canvas = skinCvsRef.current as HTMLCanvasElement
        const canvas = event.currentTarget
        const rect = canvas.getBoundingClientRect()
        const x = event.clientX - rect.left
        const y = event.clientY - rect.top

        // Sample each canvas
        const skinCanvas = skinCvsRef.current
        const skinContext = skinCanvas?.getContext('2d')
        const skinData = skinContext?.getImageData(x, y, 1, 1).data
        const eyesCanvas = eyesCvsRef.current
        const eyesContext = eyesCanvas?.getContext('2d')
        const eyesData = eyesContext?.getImageData(x, y, 1, 1).data
        const mouthCanvas = mouthCvsRef.current
        const mouthContext = mouthCanvas?.getContext('2d')
        const mouthData = mouthContext?.getImageData(x, y, 1, 1).data
        const noseCanvas = noseCvsRef.current
        const noseContext = noseCanvas?.getContext('2d')
        const noseData = noseContext?.getImageData(x, y, 1, 1).data
        const hairCanvas = hairCvsRef.current
        const hairContext = hairCanvas?.getContext('2d')
        const hairData = hairContext?.getImageData(x, y, 1, 1).data
        // Check if the pixel is not transparent (alpha > 0)
        const skinClicked = skinData && skinData[3] > 0
        const eyesClicked = eyesData && eyesData[3] > 0
        const mouthClicked = mouthData && mouthData[3] > 0
        const noseClicked = noseData && noseData[3] > 0
        const hairClicked = hairData && hairData[3] > 0

        dragOffset = {
            x: event.clientX,
            y: event.clientY,
        }

        if (eyesClicked) {
            clickedElement = 'eyes'
            initialPosition = {
                x: event.clientX - x,
                y: eyesPosition,
            }
        } else if (noseClicked) {
            clickedElement = 'nose'
            initialPosition = {
                x: event.clientX - x,
                y: nosePosition,
            }
        } else if (mouthClicked) {
            clickedElement = 'mouth'
            initialPosition = {
                x: event.clientX - x,
                y: mouthPosition,
            }
        } else if (hairClicked) {
            clickedElement = 'hair'
        } else if (skinClicked) {
            clickedElement = 'skin'
        } else {
            clickedElement = null
        }
    }

    const handlePointerMove = (
        event: React.PointerEvent<HTMLCanvasElement>
    ) => {
        let displacement = {
            x: event.clientX - (dragOffset?.x || 0),
            y: event.clientY - (dragOffset?.y || 0),
        }
        // console.log('displacement', displacement)
        // console.log('initial position', initialPosition)

        if (!clickedElement) return
        if (clickedElement === 'skin') return
        if (clickedElement === 'mouth') {
            setMouthPosition((initialPosition?.y || 0) + displacement.y / 10)
        }
        if (clickedElement === 'nose') {
            setNosePosition((initialPosition?.y || 0) + displacement.y / 10)
        }
        if (clickedElement === 'eyes') {
            setEyesPosition((initialPosition?.y || 0) + displacement.y / 10)
        }
    }

    const handleMouseUp = () => {
        clickedElement = null
    }

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
                ref={noseCvsRef}
                width={1000}
                height={1000}
                className="absolute"
            />
            <canvas
                ref={hairCvsRef}
                width={1000}
                height={1000}
                className="absolute"
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handleMouseUp}
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
    const [nosePosition, setNosePosition] = useState(0) // Position verticale en pourcentage
    const [eyesPosition, setEyesPosition] = useState(0) // Position verticale en pourcentage

    const [mouthSize, setMouthSize] = useState(7) // Taille en pourcentage
    const [eyesSize, setEyesSize] = useState(13) // Taille en pourcentage
    const [noseSize, setNoseSize] = useState(7) // Taille en pourcentage

    const [hsva, setHsva] = useState({
        h: 0,
        s: 0,
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
                    eyesPosition={eyesPosition}
                    setEyesPosition={setEyesPosition}
                    mouth={current_face.mouth}
                    mouthPosition={mouthPosition}
                    setMouthPosition={setMouthPosition}
                    nose={current_face.nose}
                    nosePosition={nosePosition}
                    setNosePosition={setNosePosition}
                    // current_face={current_face}
                    mouthSize={mouthSize}
                    noseSize={noseSize}
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
                        <span>Hauteur des yeux :</span>
                        <input
                            type="range"
                            min="-10"
                            max="10"
                            step="0.1"
                            value={eyesPosition}
                            onChange={(e) =>
                                setEyesPosition(Number(e.target.value))
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
                            min="10"
                            max="25"
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
                    <label className="flex flex-col items-start">
                        <span>Hauteur du nez :</span>
                        <input
                            type="range"
                            min="-10"
                            max="10"
                            step="0.1"
                            value={nosePosition}
                            onChange={(e) =>
                                setNosePosition(Number(e.target.value))
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
                        <span>Taille du nez :</span>
                        <input
                            type="range"
                            min="3"
                            max="10"
                            step="0.1"
                            value={noseSize}
                            onChange={(e) =>
                                setNoseSize(Number(e.target.value))
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
