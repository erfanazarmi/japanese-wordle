import { useSelector } from 'react-redux';
import { RootState } from '../state/store';
import { GuessType } from '../state/guessListSlice';

const Guess: React.FunctionComponent<{guess: GuessType}> = ({guess}) => {
  return (
    <div>
      {guess.map(item => (
        item.tag === 'CORRECT_POSITION' ?
          <div className='box green'>{item.value}</div> :
        item.tag === 'INCORRECT_POSITION' ?
          <div className='box yellow'>{item.value}</div> :
          <div className='box grey'>{item.value}</div>
      ))}
    </div>
  )
}

const GuessList = () => {
  const guessList = useSelector((state: RootState) => state.guessList);
  return (
    <div className='container'>
      {guessList.map((item) => (
        <Guess guess={item} />
      ))}
    </div>
  )
}

export default GuessList