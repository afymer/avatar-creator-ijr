import { useState } from 'react'
import './style.css'

// function RoseDesVents() {
//     return <img id="back_img" src="../images/rose_des_vents.png"></img>
// }

function App() {
    const list = [
        '../images/rose_des_vents.png',
        '../images/background_texture.png',
    ]
    const [counter, setCounter] = useState(0)

    return (
        <div className="bg-white">
            {/* <RoseDesVents /> */}

            <button onClick={() => setCounter((counter - 1) % 2)}>-</button>
            <img src={list[counter]} alt="" />
            <button onClick={() => setCounter((counter + 1) % 2)}>+</button>
        </div>
    )
}

export default App
