import { rerenderEntireTree } from './render'

let state = {
    GameContainer:{
        mainCounter: 1,
        currentPlayer: true,
        GameMap:null,
        GameStatus:false,
        winningItemsList:[],
        isGameEnded:{
            status:null,
            gameEndResponse:null
        },
        wll:3,
        size:{
            w:5, 
            h:5 
        }
    },
    GameSettings:{
        width:3, 
        height:3, 
        wll:3,
        wllMaxValue:3,
        buttonValue:'play'
    }
}

let actions = {
    GameContainer:{
        setNewItem(){
            state.GameContainer.mainCounter += 1
            state.GameContainer.currentPlayer = !state.GameContainer.currentPlayer
            rerenderEntireTree({state, actions})
        },

        GameEnd(response){
            state.GameContainer.isGameEnded.status = true
            state.GameContainer.GameStatus = false
            state.GameContainer.isGameEnded.gameEndResponse = response
            rerenderEntireTree({state, actions})
        },
    },
    GameSettings:{
        inputChange(e){
            if(e.target.getAttribute('data-item') === 'gsInp'){
                switch(e.target.getAttribute('name')){
                    case 'w':
                        state.GameSettings.width = parseInt(e.target.value)
                        break
                    case 'h':
                        state.GameSettings.height = parseInt(e.target.value)
                        break
                    case 'wll':
                        state.GameSettings.wll = parseInt(e.target.value)
                        break
                    default:
                        break
                }

                state.GameSettings.wllMaxValue = Math.min(state.GameSettings.width, state.GameSettings.height)
                if(state.GameSettings.wll > Math.min(state.GameSettings.width, state.GameSettings.height)){
                    state.GameSettings.wll = Math.min(state.GameSettings.width, state.GameSettings.height)
                }
                
                rerenderEntireTree({state, actions})
            }
        },

        buttonClick(){
            state.GameContainer.size.w = state.GameSettings.width + 2
            state.GameContainer.size.h = state.GameSettings.height + 2
            state.GameContainer.wll = state.GameSettings.wll
            state.GameContainer.winningItemsList = []
            state.GameContainer.currentPlayer = true
            state.GameContainer.GameMap = null
            state.GameContainer.mainCounter = 1
            state.GameContainer.isGameEnded.status = false
            state.GameSettings.buttonValue = 'replay'
            state.GameContainer.GameStatus = true
            
            rerenderEntireTree({state, actions})
        }
    }
}

export { state, actions }