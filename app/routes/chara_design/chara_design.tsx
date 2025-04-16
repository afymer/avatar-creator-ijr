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
    currentSelection,
}: {
    setFace: React.Dispatch<React.SetStateAction<Face>>
    setCurrentSelectionMenu: React.Dispatch<
        React.SetStateAction<'empty' | 'hair' | 'eyes' | 'mouth'>
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
        React.SetStateAction<'empty' | 'hair' | 'eyes' | 'mouth'>
    >
    currentSelection: FeatureKey
}) {
    const handleClick = () => {
        setCurrentSelectionMenu(name)
        console.log(`Selected menu for ${name}`)
    }

    return (
        <div
            className={`menu-item ${currentSelection === name ? 'grayed-out' : ''}`}
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
            className={`menu-item ${currentFace[parent as keyof Face] === name ? 'grayed-out' : ''}`}
            onClick={handleClick}
            style={{
                opacity: currentFace[parent as keyof Face] === name ? 0.5 : 1, // Griser si appliqué
                pointerEvents: currentFace[parent as keyof Face] === name ? 'none' : 'auto', // Désactiver les clics si appliqué
            }}
        >
            <img src={image} alt={name} />
        </div>
    )
}

function FaceRender({
    current_face,
    mouthPosition,
    mouthSize,
    eyesSize,
}: {
    current_face: Face;
    mouthPosition: number;
    mouthSize: number;
    eyesSize: number
}) {
    return (
        <div
            className="face-render relative"
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
                    top: `${mouthPosition}%`, // Utilisation de la position verticale
                    transform: 'translate(-50%, -50%)',
                    height: `${mouthSize}%`, // Utilisation de la taille
                    width: 'auto',
                }}
            />
            <img
                src={`/images/eyes/${current_face.eyes}.png`}
                alt={current_face.eyes}
                style={{
                    position: 'absolute',
                    left: '50%',
                    top: '45%',
                    transform: 'translate(-50%, -50%)',
                    height: `${eyesSize}%`,
                    width: 'auto',
                }}
            />
            <img
                src={`/images/hair/${current_face.hair}.png`}
                alt={current_face.hair}
                style={{
                    position: 'absolute',
                    left: '50%',
                    top: current_face.hair === 'hair1' ? '49%' : '47%',
                    transform: 'translate(-50%, -50%)',
                    height: current_face.hair === 'hair1' ? '40%' : '34%',
                    width: 'auto',
                }}
            />
        </div>
    );
}

export default function FaceDesign() {
    const [current_face, setFace] = useState<Face>({
        hair: 'hair1',
        eyes: 'eyes1',
        mouth: 'mouth1',
    });
    const [current_menu, setCurrentSelectionMenu] = useState<FeatureKey>('empty');

    // Nouveaux états pour la position verticale et la taille de la bouche
    const [mouthPosition, setMouthPosition] = useState(53); // Position verticale en pourcentage
    const [mouthSize, setMouthSize] = useState(5); // Taille en pourcentage
    const [eyesSize, setEyesSize] = useState(13); // Taille en pourcentage

    return (
        <div
            className="flex-1 h-full flex flex-row"
            style={{ padding: '20px', gap: '20px' }}
        >
            <div
                className="flex flex-col justify-start items-stretch gap-4"
                style={{ width: '30%' }} // Le menu occupe toujours 30% de la largeur
            >
                <MainMenu
                    setFace={setFace}
                    setCurrentSelectionMenu={setCurrentSelectionMenu}
                    currentSelection={current_menu}
                />
                <SelectionMenu
                    name={current_menu}
                    setFace={setFace}
                    currentFace={current_face}
                />
            </div>

            <div
                className="flex justify-center items-center"
                style={{
                    width: '40%',
                    height: '70vh',
                }}
            >
                <FaceRender
                    current_face={current_face}
                    mouthPosition={mouthPosition}
                    mouthSize={mouthSize}
                    eyesSize={eyesSize}
                />
            </div>

            <div
                className="flex flex-col gap-4"
                style={{ width: '30%' }}
            >
                <div
                    className="flex flex-col gap-2"
                    style={{ height: '25%' }}
                >
                    <label className="flex flex-col items-start">
                        <span>Hauteur de la bouche :</span>
                        <input
                            type="range"
                            min="50"
                            max="53"
                            step="0.1"
                            value={mouthPosition}
                            onChange={(e) => setMouthPosition(Number(e.target.value))}
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
                            onChange={(e) => setMouthSize(Number(e.target.value))}
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
                            onChange={(e) => setEyesSize(Number(e.target.value))}
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
                    {/* Placeholder */}
                </div>
            </div>
        </div>
    );
}
