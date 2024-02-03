import $ from 'jquery';

import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { GuessType, addToGuessList, clearGuessList } from '../state/guessListSlice';

const Input = () => {
  const dispatch = useDispatch();
  const [wordList, setWordList] = useState([]);
  const [word, setWord] = useState("");
  const [input, setInput] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    fetch('japanese-wordle/wordList.json')
      .then(response => response.json())
      .then(data => setWordList(data))
  }, []);

  useEffect(() => {
    start();
  }, [wordList]);

  const start = () => {
    setWord(wordList[Math.floor(Math.random() * wordList.length)]);
    setDone(false);
    setInput("");
    $('#input').prop('disabled', false);
    $('#error').css('visibility', 'hidden');
    dispatch(clearGuessList());
  }
  
  const checkLetters = (input: string): GuessType => {
    let lettersArray: GuessType = [];
    for(let i=0; i<input.length; i++) {
      if(input[i] === word[i])
        lettersArray.push({value: input[i], tag: 'CORRECT_POSITION'});
      else if(word.includes(input[i]))
        lettersArray.push({value: input[i], tag:'INCORRECT_POSITION'});
      else
        lettersArray.push({value: input[i], tag: 'WRONG'});
    }
    return lettersArray;
  }

  const handleInput = () => {
    const regex = /[^\u30fc\u3041-\u3093]/ig;
    if(!regex.test(input) && input.length === word.length) {
      dispatch(addToGuessList(checkLetters(input)));
      setInput("");
      $('#error').css('visibility', 'hidden');
      if(input === word) {
        setDone(true);
        $('#input').prop('disabled', true);

      }
    } else {
      !done && $('#error').css('visibility', 'visible');
    }
  }

  return (
    <div>
      <h1>Wordle</h1>
      <div className='info'>
        <p>
          <strong>遊び方 :</strong>
          「回答」の前に推測を入力して、「OK」を押してください。答えはひらがな<span style={{fontWeight: 'bold', padding: 5}}>{word?.length}</span>文字です。<br/>
          答えの中にその文字が含まれていれば<span className='highlight' style={{backgroundColor: '#ffd53c'}}>黄色</span>、
          更に場所もあっていれば<span className='highlight' style={{backgroundColor: "#2ab8b8"}}>緑色</span>になります。<br/>
          新しい単語で遊ぶには、「NEW」を押してください。
        </p>
      </div>
      <div className='container-input'>
        <label>回答 : </label>
        <input id='input' className='input-guess' type='text' onChange={(e) => setInput(e.target.value.trim())} value={input} />
        <button className='button-blue' onClick={handleInput}>ok</button>
        <button className='button-blue' onClick={start}>new</button>
        <div id='error'>{`ひらがな ${word?.length} 文字`}</div>
      </div>
    </div>
  )
}

export default Input