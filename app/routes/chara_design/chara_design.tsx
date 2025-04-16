'use client'

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

function ColorWheel() {
    return (
        <>
            <canvas id="canvas" className="w-[60%] h-auto mb-10"></canvas>
            <div id="answer"> </div>
            <script
                dangerouslySetInnerHTML={{
                    __html: `
                        let radius = 75;
                        let canvas = document.getElementById('canvas');
                        let ctx = canvas.getContext('2d');
                        let image = ctx.createImageData(2*radius, 2*radius);
                        let data = image.data;
                        document.addEventListener('DOMContentLoaded', () => {
                            drawCircle(ctx);
                        });

                        

                        const selectedColor = document.getElementById('selected-color');

                        function pick(event) {
                            const bounding = canvas.getBoundingClientRect();
                            const x = event.clientX - bounding.left;
                            const y = event.clientY - bounding.top;
                            const pixel = ctx.getImageData(x, y, 1, 1);
                            const data = pixel.data;

                            const rgbColor = \`\${data[0]}, \${data[1]}, \${data[2]}\`;
                            const color = new Color(data[0], data[1], data[2]);
                            const solver = new Solver(color);
                            const result = solver.solve();
                            
                            eyes = document.getElementById('eyes');
                            const currentStyle = eyes.getAttribute('style') || '';
                            const updatedStyle = currentStyle.replace(/filter:[^;]*;/, '') + 'filter: ' + result.filter + ';';
                            eyes.setAttribute('style', updatedStyle);

                            document.getElementById('answer').textContent = rgbColor;
                        }

                        canvas.addEventListener('click', (event) => pick(event));
                        
                        class Color {
                            constructor(r, g, b) {
                                this.set(r, g, b)
                            }

                            toString() {
                                return 'rgb(\${Math.round(this.r)}, \${Math.round(this.g)}, \${Math.round(this.b)})'
                            }

                            set(r, g, b) {
                                this.r = this.clamp(r)
                                this.g = this.clamp(g)
                                this.b = this.clamp(b)
                            }

                            hueRotate(angle = 0) {
                                angle = (angle / 180) * Math.PI
                                const sin = Math.sin(angle)
                                const cos = Math.cos(angle)

                                this.multiply([
                                    0.213 + cos * 0.787 - sin * 0.213,
                                    0.715 - cos * 0.715 - sin * 0.715,
                                    0.072 - cos * 0.072 + sin * 0.928,
                                    0.213 - cos * 0.213 + sin * 0.143,
                                    0.715 + cos * 0.285 + sin * 0.14,
                                    0.072 - cos * 0.072 - sin * 0.283,
                                    0.213 - cos * 0.213 - sin * 0.787,
                                    0.715 - cos * 0.715 + sin * 0.715,
                                    0.072 + cos * 0.928 + sin * 0.072,
                                ])
                            }

                            grayscale(value = 1) {
                                this.multiply([
                                    0.2126 + 0.7874 * (1 - value),
                                    0.7152 - 0.7152 * (1 - value),
                                    0.0722 - 0.0722 * (1 - value),
                                    0.2126 - 0.2126 * (1 - value),
                                    0.7152 + 0.2848 * (1 - value),
                                    0.0722 - 0.0722 * (1 - value),
                                    0.2126 - 0.2126 * (1 - value),
                                    0.7152 - 0.7152 * (1 - value),
                                    0.0722 + 0.9278 * (1 - value),
                                ])
                            }

                            sepia(value = 1) {
                                this.multiply([
                                    0.393 + 0.607 * (1 - value),
                                    0.769 - 0.769 * (1 - value),
                                    0.189 - 0.189 * (1 - value),
                                    0.349 - 0.349 * (1 - value),
                                    0.686 + 0.314 * (1 - value),
                                    0.168 - 0.168 * (1 - value),
                                    0.272 - 0.272 * (1 - value),
                                    0.534 - 0.534 * (1 - value),
                                    0.131 + 0.869 * (1 - value),
                                ])
                            }

                            saturate(value = 1) {
                                this.multiply([
                                    0.213 + 0.787 * value,
                                    0.715 - 0.715 * value,
                                    0.072 - 0.072 * value,
                                    0.213 - 0.213 * value,
                                    0.715 + 0.285 * value,
                                    0.072 - 0.072 * value,
                                    0.213 - 0.213 * value,
                                    0.715 - 0.715 * value,
                                    0.072 + 0.928 * value,
                                ])
                            }

                            multiply(matrix) {
                                const newR = this.clamp(
                                    this.r * matrix[0] + this.g * matrix[1] + this.b * matrix[2]
                                )
                                const newG = this.clamp(
                                    this.r * matrix[3] + this.g * matrix[4] + this.b * matrix[5]
                                )
                                const newB = this.clamp(
                                    this.r * matrix[6] + this.g * matrix[7] + this.b * matrix[8]
                                )
                                this.r = newR
                                this.g = newG
                                this.b = newB
                            }

                            brightness(value = 1) {
                                this.linear(value)
                            }
                            contrast(value = 1) {
                                this.linear(value, -(0.5 * value) + 0.5)
                            }

                            linear(slope = 1, intercept = 0) {
                                this.r = this.clamp(this.r * slope + intercept * 255)
                                this.g = this.clamp(this.g * slope + intercept * 255)
                                this.b = this.clamp(this.b * slope + intercept * 255)
                            }

                            invert(value = 1) {
                                this.r = this.clamp((value + (this.r / 255) * (1 - 2 * value)) * 255)
                                this.g = this.clamp((value + (this.g / 255) * (1 - 2 * value)) * 255)
                                this.b = this.clamp((value + (this.b / 255) * (1 - 2 * value)) * 255)
                            }

                            hsl() {
                                const r = this.r / 255
                                const g = this.g / 255
                                const b = this.b / 255
                                const max = Math.max(r, g, b)
                                const min = Math.min(r, g, b)
                                let h,
                                    s,
                                    l = (max + min) / 2

                                if (max === min) {
                                    h = s = 0
                                } else {
                                    const d = max - min
                                    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
                                    switch (max) {
                                        case r:
                                            h = (g - b) / d + (g < b ? 6 : 0)
                                            break

                                        case g:
                                            h = (b - r) / d + 2
                                            break

                                        case b:
                                            h = (r - g) / d + 4
                                            break
                                    }
                                    h /= 6
                                }

                                return {
                                    h: h * 100,
                                    s: s * 100,
                                    l: l * 100,
                                }
                            }

                            clamp(value) {
                                if (value > 255) {
                                    value = 255
                                } else if (value < 0) {
                                    value = 0
                                }
                                return value
                            }
                        }

                        class Solver {
                            constructor(target, baseColor) {
                                this.target = target
                                this.targetHSL = target.hsl()
                                this.reusedColor = new Color(0, 0, 0)
                            }

                            solve() {
                                const result = this.solveNarrow(this.solveWide())
                                return {
                                    values: result.values,
                                    loss: result.loss,
                                    filter: this.css(result.values),
                                }
                            }

                            solveWide() {
                                const A = 5
                                const c = 15
                                const a = [60, 180, 18000, 600, 1.2, 1.2]

                                let best = { loss: Infinity }
                                for (let i = 0; best.loss > 25 && i < 3; i++) {
                                    const initial = [50, 20, 3750, 50, 100, 100]
                                    const result = this.spsa(A, a, c, initial, 1000)
                                    if (result.loss < best.loss) {
                                        best = result
                                    }
                                }
                                return best
                            }

                            solveNarrow(wide) {
                                const A = wide.loss
                                const c = 2
                                const A1 = A + 1
                                const a = [0.25 * A1, 0.25 * A1, A1, 0.25 * A1, 0.2 * A1, 0.2 * A1]
                                return this.spsa(A, a, c, wide.values, 500)
                            }

                            spsa(A, a, c, values, iters) {
                                const alpha = 1
                                const gamma = 0.16666666666666666

                                let best = null
                                let bestLoss = Infinity
                                const deltas = new Array(6)
                                const highArgs = new Array(6)
                                const lowArgs = new Array(6)

                                for (let k = 0; k < iters; k++) {
                                    const ck = c / Math.pow(k + 1, gamma)
                                    for (let i = 0; i < 6; i++) {
                                        deltas[i] = Math.random() > 0.5 ? 1 : -1
                                        highArgs[i] = values[i] + ck * deltas[i]
                                        lowArgs[i] = values[i] - ck * deltas[i]
                                    }

                                    const lossDiff = this.loss(highArgs) - this.loss(lowArgs)
                                    for (let i = 0; i < 6; i++) {
                                        const g = (lossDiff / (2 * ck)) * deltas[i]
                                        const ak = a[i] / Math.pow(A + k + 1, alpha)
                                        values[i] = fix(values[i] - ak * g, i)
                                    }

                                    const loss = this.loss(values)
                                    if (loss < bestLoss) {
                                        best = values.slice(0)
                                        bestLoss = loss
                                    }
                                }
                                return { values: best, loss: bestLoss }

                                function fix(value, idx) {
                                    let max = 100
                                    if (idx === 2 /* saturate */) {
                                        max = 7500
                                    } else if (idx === 4 /* brightness */ || idx === 5 /* contrast */) {
                                        max = 200
                                    }

                                    if (idx === 3 /* hue-rotate */) {
                                        if (value > max) {
                                            value %= max
                                        } else if (value < 0) {
                                            value = max + (value % max)
                                        }
                                    } else if (value < 0) {
                                        value = 0
                                    } else if (value > max) {
                                        value = max
                                    }
                                    return value
                                }
                            }

                            loss(filters) {
                                // Argument is array of percentages.
                                const color = this.reusedColor
                                color.set(0, 0, 0)

                                color.invert(filters[0] / 100)
                                color.sepia(filters[1] / 100)
                                color.saturate(filters[2] / 100)
                                color.hueRotate(filters[3] * 3.6)
                                color.brightness(filters[4] / 100)
                                color.contrast(filters[5] / 100)

                                const colorHSL = color.hsl()
                                return (
                                    Math.abs(color.r - this.target.r) +
                                    Math.abs(color.g - this.target.g) +
                                    Math.abs(color.b - this.target.b) +
                                    Math.abs(colorHSL.h - this.targetHSL.h) +
                                    Math.abs(colorHSL.s - this.targetHSL.s) +
                                    Math.abs(colorHSL.l - this.targetHSL.l)
                                )
                            }

                            css(filters) {
                                function fmt(idx, multiplier = 1) {
                                    return Math.round(filters[idx] * multiplier)
                                }
                                return \`invert(\${fmt(0)}\%) sepia(\${fmt(1)}\%) saturate(\${fmt(2)}\%) hue-rotate(\${fmt(3, 3.6)}deg) brightness(\${fmt(4)}\%) contrast(\${fmt(5)}\%)\`
                            }
                        }

                        function hexToRgb(hex) {
                            // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
                            const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i
                            hex = hex.replace(shorthandRegex, (m, r, g, b) => {
                                return r + r + g + g + b + b
                            })

                            const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
                            return result
                                ? [
                                    parseInt(result[1], 16),
                                    parseInt(result[2], 16),
                                    parseInt(result[3], 16),
                                ]
                                : null
                        }

                        function drawCircle(ctx) {
                            let image = ctx.createImageData(2 * radius, 2 * radius)
                            let data = image.data

                            for (let x = -radius; x < radius; x++) {
                                for (let y = -radius; y < radius; y++) {
                                    let [r, phi] = xy2polar(x, y)

                                    if (r > radius) {
                                        continue
                                    }

                                    let deg = rad2deg(phi)
                                    let rowLength = 2 * radius
                                    let adjustedX = x + radius
                                    let adjustedY = y + radius
                                    let pixelWidth = 4
                                    let index = (adjustedX + adjustedY * rowLength) * pixelWidth

                                    let hue = deg
                                    let saturation = 1.0
                                    let value = 1.0

                                    let [red, green, blue] = hsv2rgb(hue, saturation, value)
                                    let alpha = 255

                                    data[index] = red
                                    data[index + 1] = green
                                    data[index + 2] = blue
                                    data[index + 3] = alpha
                                }
                            }

                            ctx.putImageData(image, 0, 0)
                        }

                        function xy2polar(x, y) {
                            let r = Math.sqrt(x * x + y * y)
                            let phi = Math.atan2(y, x)
                            return [r, phi]
                        }

                        function rad2deg(rad) {
                            return ((rad + Math.PI) / (2 * Math.PI)) * 360
                        }

                        function hsv2rgb(hue, saturation, value) {
                            let chroma = value * saturation
                            let hue1 = hue / 60
                            let x = chroma * (1 - Math.abs((hue1 % 2) - 1))
                            let r1, g1, b1
                            if (hue1 >= 0 && hue1 <= 1) {
                                ;[r1, g1, b1] = [chroma, x, 0]
                            } else if (hue1 >= 1 && hue1 <= 2) {
                                ;[r1, g1, b1] = [x, chroma, 0]
                            } else if (hue1 >= 2 && hue1 <= 3) {
                                ;[r1, g1, b1] = [0, chroma, x]
                            } else if (hue1 >= 3 && hue1 <= 4) {
                                ;[r1, g1, b1] = [0, x, chroma]
                            } else if (hue1 >= 4 && hue1 <= 5) {
                                ;[r1, g1, b1] = [x, 0, chroma]
                            } else if (hue1 >= 5 && hue1 <= 6) {
                                ;[r1, g1, b1] = [chroma, 0, x]
                            }

                            let m = value - chroma
                            let [r, g, b] = [r1 + m, g1 + m, b1 + m]

                            return [255 * r, 255 * g, 255 * b]
                        }
                    `,
                }}
            />
        </>
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
                id="eyes"
                style={{
                    position: 'absolute',
                    left: '50%',
                    top: 45 - 0 + '%',
                    transform: 'translate(-50%, -50%)',
                    height: '13%',
                    width: 'auto',
                    filter: 'grayscale(2) brightness(95%) hue-rotate(156deg)',
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
            <div style={{ width: '15%' }}>
                <h1>Character Design</h1>
                <MainMenu
                    setFace={setFace}
                    setCurrentSelectionMenu={setCurrentSelectionMenu}
                />
            </div>
            <div style={{ width: '15%' }}>
                <SelectionMenu name={current_menu} setFace={setFace} />
            </div>
            <div className="w-[60%]">
                <FaceRender current_face={current_face} />
            </div>
            <div className="h-full w-10%">
                <ColorWheel />
            </div>
            <NextButton />
        </div>
    )
}
