import { useState, useRef } from 'react'
import './Game.css'

export default function Game({verifyLetter, pickedWord, pickedCategory, letters, guessedLetters, wrongLetters, guesses, score}){

    const [letter, setLetter] = useState('') //para receber uma letra e iremos atrelar essa letra no input com o onChange
    //cria referencia a algum lugar
    const letterInputRef = useRef(null)

    const handleSubmit = (e) => {
        e.preventDefault()
        verifyLetter(letter)
        setLetter('')
        letterInputRef.current.focus()
    }

    return(
        <div className='game'>

            <p className='points'>
                <span>Pontuação: {score} </span>
            </p>
           
            <h1>
                Adivinhe a palavra:
            </h1>

            <h3 className='tip'>
                Dicas sobre a palavra: <span> {pickedCategory} </span> 
            </h3>
            <p>
                Você ainda tem {guesses} tentativa(s).
            </p>

            <div className="wordContainer">
                {/* condicional para mapear pelo indice i cada uma das letras e verificar se a letra esta certa. caso nao esteja imprime o blankSquare */}
                {letters.map((letter, i) => (
                    guessedLetters.includes(letter) ? (
                        <span className='letter' key={i} > {letter} </span>
                    ) : (
                        <span key={i} className='blankSquare'> </span>
                    )
                ))}
            </div>

            <div className="letterContainer">
                <p>
                    Tente adivinhar uma letra da palavra:
                </p>
                <form onSubmit={handleSubmit}>
                    <input type="text" name="letter" 
                    maxLength='1' 
                    required onChange={(e) => setLetter(e.target.value)} value={letter} ref={letterInputRef} />
                    <button>Jogar</button>
                </form>
            </div>

            <div className="wrongLettersContainer">
                <p>
                    Letras ja utilizadas: 
                </p>
                {/* condicional para retornar as letras erradas a virgula e um espaço */}
                {wrongLetters.map((letter, i) => (
                    <span key={i}> {letter},  </span>
                ))}
            </div>

        </div>
    )
}