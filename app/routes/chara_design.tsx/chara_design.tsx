
import React, { useState } from 'react';
import { useEffect } from 'react';

type Face = {
    hair: string;
    eyes: string;
    mouth: string;
    //skin: string;
}

const FeaturesList = {
    hair: ['hair1', 'hair2'],
    eyes: ['eyes1', 'eyes2', 'eyes3', 'eyes4'],
    mouth: ['mouth1', 'mouth2', 'mouth3', 'mouth4'],
}

// function BackButton() {
//     return (
//         <button onClick={() => window.history.back()}>Back</button>
//     );
// }

// function NextButton() {
//     return (
//         <button onClick={() => console.log('Next')}>Next</button>
//     );
// }


// Le 1er niveau de l'arborescence, on choisit l'élément physique à modifier (ex: cheveux, yeux, etc.)
function MainMenu({ setFace, setCurrentSelectionMenu }: { setFace: React.Dispatch<React.SetStateAction<Face>>, setCurrentSelectionMenu: React.Dispatch<React.SetStateAction<string>> }) {
    return (
        <div className='main-menu'>
            <MainMenuItem
                image='/images/hair.png'
                name='Hair'
                setCurrentMenu={setCurrentSelectionMenu}
            />
            <MainMenuItem
                image='/images/eyes.png'
                name='Eyes'
                setCurrentMenu={setCurrentSelectionMenu}
            />
            <MainMenuItem
                image='/images/mouth.png'
                name='Mouth'
                setCurrentMenu={setCurrentSelectionMenu}
            />
        </div>
    );
}

function MainMenuItem({ image, name, setCurrentMenu: setCurrentSelectionMenu }: { image: string, name: string, setCurrentMenu: React.Dispatch<React.SetStateAction<string>> }) {
    const handleClick = () => {
        setCurrentSelectionMenu(name);
    };

    return (
        <div className='menu-item' onClick={handleClick}>
            <img src={image} alt={name} />
        </div>
    );
}

// Un sous-menu qui affiche les différentes options pour chaque élément physique

function SelectionMenu({ name, setFace }: { name: string, setFace: React.Dispatch<React.SetStateAction<Face>> }) {
    const features = FeaturesList[name as keyof typeof FeaturesList];

    if (!features) {
        return null; // Si le nom ne correspond à aucun élément de la liste, ne rien afficher
    }
    return (
        <div className='feature-menu'>
            {features.map((feature, index) => (
                <SelectionMenuItem
                    image={`/images/${name}/${feature}.png`}
                    parent={name}
                    name={feature}
                    setFace={setFace}
                />
            ))}
        </div>
    );
}

function SelectionMenuItem({ image, parent, name, setFace }: { image: string, parent: string, name: string, setFace: React.Dispatch<React.SetStateAction<Face>> }) {
    const handleClick = () => {
        setFace((prevFace) => ({
            ...prevFace,
            [parent]: name, // Met à jour la propriété correspondante dans l'objet Face
        }));
        return (
            <div className='menu-item' onClick={handleClick}>
                <img src={image} alt={name} />
            </div>
        )
    }
    return (
        <div className='menu-item' onClick={handleClick}>
        </div>
    )

}


function FaceRender({ current_face }: { current_face: Face }) { // Le rendu du visage au centre de l'écran
    return (
        <div>
            <ul>
                {Object.entries(current_face).map(([key, value]) => (
                    <li key={key}>
                        {key}: {value}
                    </li>
                ))}
            </ul>
        </div>
    );
}



export default function FaceDesign() {
    const [current_face, setFace] = useState<Face>({
        hair: 'hair1',
        eyes: 'eyes1',
        mouth: 'mouth1',
    });
    const [current_menu, setCurrentSelectionMenu] = useState('Empty');
    return (
        <div>
            <h1>Character Design</h1>
            <MainMenu setFace={setFace} setCurrentSelectionMenu={setCurrentSelectionMenu} />
            <SelectionMenu name={current_menu} setFace={setFace} />
            <FaceRender current_face={current_face} />
        </div>
    );
}