
import React, { useState } from 'react';

type Face = {
    hair: string;
    eyes: string;
    mouth: string;
    //skin: string;
}

function BackButton() {
    return (
        <button onClick={() => window.history.back()}>Back</button>
    );
}

function NextButton() {
    return (
        <button onClick={() => console.log('Next')}>Next</button>
    );
}


// Le 1er niveau de l'arborescence, on choisit l'élément physique à modifier (ex: cheveux, yeux, etc.)
function MainMenu(setFace: React.Dispatch<React.SetStateAction<Face>>) {
    return (
        <div>
            <h1>Selection Menu</h1>
            MenuItem({image: 'path/to/hair.png', name: 'Hair', level: 0});
            MenuItem({image: 'path/to/eyes.png', name: 'Eyes', level: 1});
            MenuItem({image: 'path/to/mouth.png', name: 'Mouth', level: 2});
        </div>
    );
}

function FeatureMenu(name: string, image: ) { // Un sous-menu qui affiche les différentes options pour chaque élément physique
    return (
        <div>
            <h1>Menu</h1>
            <MenuItem />
            <MenuItem />
            <MenuItem />
        </div>
    );
}

function MenuItem({ image, name, level, parent }: { image: string; name: string; level: number; parent?: string }) {
    return (
        <div>
            <img src={image} alt={`${name} icon`} style={{ width: '50px', height: '50px' }} />
            <h2>{name}</h2>
            <p>Level: {level}</p>
            {parent && <p>Parent: {parent}</p>}
        </div>
    );
}

function FaceRender() { // Le rendu du visage au centre de l'écran
    return (
        <div>
            <h1>Main Render</h1>
            <img src="path/to/face.png" alt="Face" style={{ width: '200px', height: '200px' }} />
            <h2>Face Details</h2>
            <p>Hair: {face.hair}</p>
            <p>Eyes: {face.eyes}</p>
            <p>Mouth: {face.mouth}</p>
        </div>
    );
}



export default function FaceDesign() {
    const [current_face, setFace] = useState<Face>({
        hair: 'short',
        eyes: 'blue',
        mouth: 'smile',
    });


    return (
        <div>
            <h1>Character Design</h1>
            <SelectionMenu />
        </div>
    );
}