import './App.css';
import { useEffect, useState } from 'react';

function App() {

  const [appStates, setAppStates] = useState({
    page: 0,
    calcDirection: true
  })

  const [movingState, setMovingStates] = useState({

    movingDirection:{
      toRight:false,
      toLeft: false,
      toBottom: false,
      toTop: false,
    },

    coordinates: {
      horizontal: 0,
      vertical: 0
    }

  })

  useEffect(() => {
    let renderTimer = setTimeout(()=>{
      // gameBoard object
      const gameBoard = document.querySelector('.game-board');

      const gameBoardSize = gameBoard.getBoundingClientRect();

      //gameBoardSize from all sides
      const leftLimit = gameBoardSize.left;

      const rightLimit = gameBoardSize.right;

      const topLimit = gameBoardSize.top;

      const bottomLimit = gameBoardSize.bottom;

      const boarderThickness = 5;

      // movingTarget object
      let movingTarget = document.querySelector('.moving-target');

      let movingTargetSize = movingTarget.getBoundingClientRect();

      movingTarget.style.left = movingState.coordinates.horizontal + "px"
      movingTarget.style.right = movingState.coordinates.horizontal + "px"

      if (movingState.movingDirection.toRight) {
        setMovingStates((prevState)=>{
          return {
            ...prevState, 
            coordinates: {
              ...prevState.coordinates, horizontal: prevState.coordinates.horizontal + 1
            }
          }
        })
      }

      if (movingState.movingDirection.toLeft) {
        setMovingStates((prevState)=>{
          return {
            ...prevState, 
            coordinates: {
              ...prevState.coordinates, horizontal: prevState.coordinates.horizontal - 1
            }
          }
        })
      }
      
      movingTarget.style.top = movingState.coordinates.vertical + "px"
      movingTarget.style.bottom = movingState.coordinates.vertical + "px"

      if (movingState.movingDirection.toBottom) {
        setMovingStates((prevState)=>{
          return {
            ...prevState, 
            coordinates: {
              ...prevState.coordinates, vertical: prevState.coordinates.vertical + 1
            }
          }
        })
      }

      if (movingState.movingDirection.toTop) {
        setMovingStates((prevState)=>{
          return {
            ...prevState, 
            coordinates: {
              ...prevState.coordinates, vertical: prevState.coordinates.vertical - 1
            }
          }
        })
      }

      if (movingTargetSize.right === rightLimit - boarderThickness) {
        // move to the left
        setMovingStates((prevState)=>{
          return {
            ...prevState,
            movingDirection: {
              ...prevState.movingDirection, 
              toRight: false, 
              toLeft: true
            }
          }
        })
      }

      if (movingTargetSize.left === leftLimit + boarderThickness) {
        // move to the right
        setMovingStates((prevState)=>{
          return {
            ...prevState,
            movingDirection: {
              ...prevState.movingDirection, 
              toRight: true, 
              toLeft: false
            }
          }
        })
      }

      if (movingTargetSize.top === topLimit + boarderThickness) {
        // move to the right
        setMovingStates((prevState)=>{
          return {
            ...prevState,
            movingDirection: {
              ...prevState.movingDirection, 
              toBottom: true, 
              toTop: false
            }
          }
        })
      }

      if (movingTargetSize.bottom === bottomLimit - boarderThickness) {
        // move to the right
        setMovingStates((prevState)=>{
          return {
            ...prevState,
            movingDirection: {
              ...prevState.movingDirection, 
              toBottom: false, 
              toTop: true
            }
          }
        })
      }
    }, 5) // end of setTimeout

    return () => {
      clearTimeout(renderTimer)
    }

  }, [movingState])

  const StateTester = (e) => {
    e.preventDefault();

    if (appStates.page > 8 && appStates.calcDirection === true) {
      setAppStates((prevState)=>{
        return {...prevState, calcDirection:false}
      })
    } 

    if (appStates.page < 2 && appStates.calcDirection === false) {
      setAppStates((prevState)=>{
        return {...prevState, calcDirection:true}
      })
    }

    if (appStates.calcDirection === true) {
      setAppStates((prevState) => {
        return {...prevState, page: prevState.page + 1}
      })
    }

    if (appStates.calcDirection === false) {
      setAppStates((prevState) => {
        return {...prevState, page: prevState.page - 1}
      })
    }
  }

  const SwitchButton = (e) => {
    e.preventDefault()
    setAppStates((prev)=>{
      return {...prev, calcDirection:!prev.calcDirection}
    })

  }

  const cursorLocation = (e) => {
    e.preventDefault();
    console.log(e.clientX);
    console.log(e.clientY)
    console.log(e)
  }

  return (
    <div className="App">
      <button onClick={StateTester}> Click Me </button>
      <button onClick={SwitchButton}> Switch </button>
      <div className="game-board" onClick={cursorLocation}>
        <div className="moving-target"></div>
      </div>
    </div>
  );
}

export default App;
