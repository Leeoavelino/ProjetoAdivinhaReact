import './StartScreen.css'

export default function StartScreen({startGame}){
    return(
        <div className='start'>

            <h1>
                Secret Word
            </h1>
            <p>
                Clique para começar a jogar
            </p>

            <button onClick={startGame}>
                Começar a Jogar
            </button>

        </div>
    )
}