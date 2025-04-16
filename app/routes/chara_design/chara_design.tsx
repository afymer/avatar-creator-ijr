import React, { useState } from 'react'
import './chara_design.css'

type Face = {
    hair: string
    eyes: string
    mouth: string
    //skin: string;
}

const FeaturesList = {
    empty: [],
    hair: ['hair1', 'hair2'],
    eyes: ['eyes1', 'eyes2', 'eyes3', 'eyes4'],
    mouth: ['mouth1', 'mouth2', 'mouth3', 'mouth4'],
}

type FeatureKey = keyof typeof FeaturesList

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
}: {
    setFace: React.Dispatch<React.SetStateAction<Face>>
    setCurrentSelectionMenu: React.Dispatch<
        React.SetStateAction<'empty' | 'hair' | 'eyes' | 'mouth'>
    >
}) {
    return (
        <div className="main-menu">
            <MainMenuItem
                image="/images/hair/hair1.png"
                name="hair"
                setCurrentSelectionMenu={setCurrentSelectionMenu}
            />
            <MainMenuItem
                image="/images/eyes/eyes1.png"
                name="eyes"
                setCurrentSelectionMenu={setCurrentSelectionMenu}
            />
            <MainMenuItem
                image="/images/mouth/mouth1.png"
                name="mouth"
                setCurrentSelectionMenu={setCurrentSelectionMenu}
            />
        </div>
    )
}

function MainMenuItem({
    image,
    name,
    setCurrentSelectionMenu: setCurrentSelectionMenu,
}: {
    image: string
    name: FeatureKey
    setCurrentSelectionMenu: React.Dispatch<
        React.SetStateAction<'empty' | 'hair' | 'eyes' | 'mouth'>
    >
}) {
    const handleClick = () => {
        setCurrentSelectionMenu(name)
        console.log(`Selected menu for ${name}`)
    }

    return (
        <div className="menu-item" onClick={handleClick}>
            <img src={image} alt={name} />
        </div>
    )
}

// Un sous-menu qui affiche les différentes options pour chaque élément physique

function SelectionMenu({
    name,
    setFace,
}: {
    name: FeatureKey
    setFace: React.Dispatch<React.SetStateAction<Face>>
}) {
    const features = FeaturesList[name] // Utilisation de 'keyof' pour s'assurer que 'name' est une clé valide de 'FeaturesList'
    if (!features) {
        return null // Si le nom ne correspond à aucun élément de la liste, ne rien afficher
    }
    return (
        <div className="feature-menu">
            {features.map((feature, index) => (
                <SelectionMenuItem
                    key={`${name}-${feature}`}
                    image={`/images/${name}/${feature}.png`}
                    parent={name}
                    name={feature}
                    setFace={setFace}
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
}: {
    image: string
    parent: string
    name: string
    setFace: React.Dispatch<React.SetStateAction<Face>>
}) {
    const handleClick = () => {
        setFace((prevFace) => ({
            ...prevFace,
            [parent]: name, // Met à jour la propriété correspondante dans l'objet Face
        }))
        return (
            <div className="menu-item" onClick={handleClick}>
                <img src={image} alt={name} />
            </div>
        )
    }
    return <div className="menu-item" onClick={handleClick}></div>
}

function FaceRender({ current_face }: { current_face: Face }) {
    // Le rendu du visage au centre de l'écran

    return (
        <div
            className="face-render relative "
            style={{ width: '100%', height: '100%' }}
        >
            <img
                src={`/images/face.png`}
                alt="base_skin"
                style={{
                    position: 'absolute',
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-50%, -50%)',
                    height: '30%',
                    width: 'auto',
                }}
            />
            <img
                src={`/images/mouth/${current_face.mouth}.png`}
                alt={current_face.mouth}
                style={{
                    position: 'absolute',
                    left: '50%',
                    top: 53 + 0 + '%',
                    transform: 'translate(-50%, -50%)',
                    height: '5%',
                    width: 'auto',
                }}
            />
            <img
                src={`/images/eyes/${current_face.eyes}.png`}
                alt={current_face.eyes}
                style={{
                    position: 'absolute',
                    left: '50%',
                    top: 50 - 5 + '%',
                    transform: 'translate(-50%, -50%)',
                    height: '13%',
                    width: 'auto',
                }}
            />
            <img
                src={`/images/hair/${current_face.hair}.png`}
                alt={current_face.hair}
                style={{
                    position: 'absolute',
                    left: '50%',
                    top: current_face.hair === 'hair1' ? '49%' : 47 + '%',
                    transform: 'translate(-50%, -50%)',
                    height: current_face.hair === 'hair1' ? '40%' : 34 + '%',
                    width: 'auto',
                }}
            />
        </div>
    )
}

export default function FaceDesign() {
    const [current_face, setFace] = useState<Face>({
        hair: 'hair1',
        eyes: 'eyes1',
        mouth: 'mouth1',
    })
    const [current_menu, setCurrentSelectionMenu] =
        useState<FeatureKey>('empty')
    return (
        <div
            className="flex-1 h-full"
            style={{ display: 'flex', justifyContent: 'space-between' }}
        >
            <BackButton />
            <div style={{ width: '20%' }}>
                <h1>Character Design</h1>
                <MainMenu
                    setFace={setFace}
                    setCurrentSelectionMenu={setCurrentSelectionMenu}
                />
            </div>
            <div style={{ width: '20%' }}>
                <SelectionMenu name={current_menu} setFace={setFace} />
            </div>
            <div style={{ width: '60%' }}>
                <FaceRender current_face={current_face} />
            </div>

            <NextButton />
        </div>
    )
}
