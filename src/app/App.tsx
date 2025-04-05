import './style.css'

function RoseDesVents() {
    return (
        <img
            id="back_img"
            src="../images/rose_des_vents.png"
            className="absolute"
        ></img>
    )
}

function App() {
    return (
        <div>
            <RoseDesVents />
            <div>
                <button>Go on</button>
            </div>
        </div>
    )
}

export default App
