import './App.css'
//DATA
import { wordsList } from './data/words'
//REACT
import { useCallback, useEffect, useState } from 'react'
//COMPONENTS
import StartScreen from './components/StartScreen'
import Game from './components/Game'
import GameOver from './components/GameOver'

//id e o nome de cada estagio do jogo
const stages = [
  {id: 1, name: 'start'},
  {id: 2, name: 'game'},
  {id: 3, name: 'end'},
]

const guessesQty = 3

function App() {

  const [gameStage, setGameStage] = useState(stages[0].name) //iniciando com o stage 0 que é o start
  const  [words] = useState(wordsList) //pegando os elementos importados de wordsList e colocando em words

  const [pickedWord, setPickedWord] = useState('')  //recebe a palavra
  const [pickedCategory, setPickedCategory] = useState('') //recebe a categoria
  const [letters, setLetters] = useState([]) //lista de letras que começa vazia

  //aops declarar passsar todos esses estados para o componente de games
  const [guessedLetters, setGuessedLetters] = useState([]) //letras adivinhadas
  const [wrongLetters, setWrongLetters] = useState([]) //letras erradas
  const [guesses, setGuesses] = useState(guessesQty) //numero de tentativas
  const [score, setScore] = useState(0)//pontuaçao apos acertar uma letra

  const pickWordAndCategory = useCallback(() => {
    //retorna uma categoria aleatoria do data
    const categories = Object.keys(words)
    const category = categories[Math.floor(Math.random() * Object.keys(categories).length)]
    console.log(category)

    //retorna uma palavra aleatorio da categoria acima
    const word = words[category][Math.floor(Math.random() * words[category].length)]
    console.log(word)

    return {word, category} //tem que retornar como objeto por isso esta entre { } chaves

  }, [words])

  //startando o jogo
  const startGame = useCallback(() => {
    //limpar todas as letras
    clearLetterStates()
    
    //recebe essas duas variaveis da funçao acima
    const {word, category } = pickWordAndCategory()

    // criar um array de letras da palavra aleatoria de word
    let wordLetters = word.split('')
    //colocando para que todas as letras sejam minusculas
    wordLetters = wordLetters.map((l) => l.toLowerCase())

    console.log(wordLetters)
    //settar os estados
    setPickedWord(word)
    setPickedCategory(category)
    setLetters(wordLetters)

    setGameStage(stages[1].name) //manda para a pagina Game.jsx
  }, [pickWordAndCategory])

  //processar a letra que o usuario digita no input
  const verifyLetter = (letter) => {
    const normalizedLetter = letter.toLowerCase() //para deixar a letra minuscula quando o usuario digitar

    //verificar se a letra ja foi utilizada
    if(guessedLetters.includes(normalizedLetter) || wrongLetters.includes(normalizedLetter)){
      return
    }
    //incluir as letras que o usuario adinha na lista de letras acertadas ou erradas
    //caso seja a letra certa pegar o array com as que ja estao e incluir a letra nova (normalizedLetter)
    if(letters.includes(normalizedLetter)){
      console.log("Correct guess!");
      setGuessedLetters((atualGuessedLetters) => [
        ...atualGuessedLetters,
        normalizedLetter,
      ])
      setScore((currentScore) => currentScore + 1); // Incrementar a pontuação por letra correta
    }
    
    //caso seja a palavra errada iremos pegar o array de atualtWrongLetters e incluir a digitada errada por ultimo (normalizedLetter)
    else{
      console.log("Wrong guess!");
      setWrongLetters((atualtWrongLetters) => [
        ...atualtWrongLetters,
        normalizedLetter,
      ])

      setGuesses((atualGuesses) => atualGuesses -1)
    }
  }
  
  const clearLetterStates = () => {
    setGuessedLetters([])
    setWrongLetters([])
  }

  //verificar se as tentativas terminaram
    useEffect(() => {
      if(guesses <= 0){

        clearLetterStates()
        setGameStage(stages[2].name)
      }
    }, [guesses])


    useEffect(() => {

      const uniqueLetters = [... new Set(letters)]

      //condiçao de vitoria
      if(guessedLetters.length === uniqueLetters.length){
        //adicionar a pontuaçao final
        setScore((actualScore) => actualScore += 100)

        //reiniar para um novo jogo
        startGame()

      }

    }, [guessedLetters, letters, startGame])



    
  //retornar para o inciio
  const retry = () => {

    setScore(0)
    setGuesses(guessesQty)


    setGameStage(stages[0].name) //voltamos para o estagio inicial do jogo
  }

  return (
    <div className='App'>
      {/* condicional para aparecer a pagina de start, game ou end */}
      {gameStage === 'start' && <StartScreen startGame={startGame} />}
      {gameStage === 'game' && <Game 
      verifyLetter={verifyLetter}
       pickedWord={pickedWord} 
       pickedCategory={pickedCategory} 
       letters={letters} 
       guessedLetters={guessedLetters} 
       wrongLetters={wrongLetters} 
       guesses={guesses} 
       score={score} />} 
      {gameStage === 'end' && <GameOver retry={retry} score={score} />}

    </div>
  )
}

export default App
