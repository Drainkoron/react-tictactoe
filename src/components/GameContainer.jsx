import React from 'react';
import s from '../styles/GameContainer.module.css';

class GameContainer extends React.Component{
    constructor(props){
        super(props)
        this.actions = props.actions
        this.sData = props.state
        this.GameContainerRef = React.createRef()
        this.checked = null
        if(!this.sData.GameMap){
            this.sData.GameMap = this.getGameMap()
            this.mainCounter = this.sData.mainCounter
        }
        
        this.state = { 
            height: window.innerHeight, 
            width: window.innerWidth,
            itemsGridData: '',
        };
    }

    checkGame = (x, y) => {
        const directions = [
            [[0, -1],[0, 1]],
            [[-1, 0],[1, 0]],
            [[-1, -1],[1, 1]],
            [[1, -1],[-1, 1]]
        ]
        const { GameMap } = this.sData
        let current = GameMap[y][x]
        let linesList = []

        directions.forEach(element => {
            let list = []
            let cords1 = [y, x]
            let cords2 = [y, x]
            while(true){
                cords1[0] += element[0][0]
                cords1[1] += element[0][1]
                
                if(GameMap[cords1[0]][cords1[1]] === current)
                    list.push([cords1[0], cords1[1]])
                else{
                    break
                }
            }
            while(true){
                cords2[0] += element[1][0]
                cords2[1] += element[1][1]
                
                if(GameMap[cords2[0]][cords2[1]] === current)
                    list.push([cords2[0], cords2[1]])
                else{
                    break
                }
            }

            list.push([y, x])
            if(list.length >= this.sData.wll)
                linesList.push(list)
        });

        if(linesList.length > 0)
            return {linesList, current}
        return null    
    }

    updateData = (e) => {
        this.setState({
            height: window.innerHeight, 
            width: window.innerWidth,
            itemsGridData: this.getItemsGridData(this.sData.size, this.state.width),
        });
    }

    componentDidMount() {
        this.setState({
            winningItemsList: [],
            itemsGridData: this.getItemsGridData(this.sData.size, this.state.width),
        });
        window.addEventListener('resize', this.updateData);
        window.addEventListener('click', this.clickEvent);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateData);
        window.removeEventListener('click', this.clickEvent);
    }

    setWinningItems = (data) => {
        let { current, linesList } = data
    
        linesList.forEach(i => {
            i.forEach(j => {
                let y = j[0] - 1
                let x = j[1] - 1
                let index = this.sData.size.w * y + x
                let list = this.state.winningItemsList
                list[index] = true
                this.setState({
                    winningItemsList: list
                })
            }); 
        });
    }

    clickEvent = (e) => {
        let $item = e.target
        let { GameMap } = this.sData

        if($item.parentElement.getAttribute('item-type') === 'item')
            $item = $item.parentElement

        let x = $item.getAttribute('item-index') % (this.sData.size.w - 2) + 1
        let y = Math.floor($item.getAttribute('item-index') / (this.sData.size.w - 2)) + 1
        
        if(GameMap[y][x] === '#' && $item.getAttribute('item-type') === 'item'){
            if(this.sData.currentPlayer)
                GameMap[y][x] = 'x'
            else 
                GameMap[y][x] = 'o'
            
            this.sData.GameMap = GameMap
            this.checked = this.checkGame(x, y)
            
            if(this.checked != null){
                this.setWinningItems(this.checked)
                //this.actions.GameEnd()
            }
            this.actions.setNewItem()
        }
    }

    getItemsGridData = (size, width) => {
        let itemSize = 60 
        let itemsInRow = size.w - 2
        
        itemSize = Math.min(Math.floor(width/size.w), itemSize)
        return { itemsInRow, itemSize }
    }

    getGameMap = () => {
        const { w, h } = this.sData.size
        
        var matrix = []
        for(var i=0; i<h; i++) {
            matrix[i] = [];
            for(var j=0; j<w; j++) {
                matrix[i][j] = '#';
            }
        }

        return matrix
    }

    getItemClassList = (data) => {
        const { j, i, w, h, cnt } = data
        let classList = [s.item] 
        
        if(j === 1)
            classList.push(s.left)
        if(j === w - 2)
            classList.push(s.right)
        if(i === 1)
            classList.push(s.top)
        if(i === h - 2)
            classList.push(s.bottom)
        if(this.state.winningItemsList && this.state.winningItemsList[cnt]){
            classList.push(s.winning)
        }
        
        return classList
    }

    getItemContent = (i, j) => {
        if(!this.sData.GameStatus)
            return
        if(this.sData.GameMap[i][j] === 'x' || this.sData.GameMap[i][j] === 'o')
            return <p>{this.sData.GameMap[i][j]}</p>
    }   

    getItems = () => {
        let items = [], cnt = 0
        const { getItemClassList } = this
        const { w, h } = this.sData.size

        let itemStyle = {
            height:`${this.state.itemsGridData.itemSize}px`, 
            width:`${this.state.itemsGridData.itemSize}px`
        }
        
        for(let i = 1; i < h - 1; i++){
            for(let j = 1; j < w - 1; j++){
                items.push(<div item-type={'item'} item-index={cnt} key={`item${cnt}`} className={getItemClassList({ j, i, w, h, cnt }).join(' ')} style={itemStyle}>
                    {this.getItemContent(i, j)}
                </div>)
                cnt += 1
            }
        }   
        return items
    }
    
    endGameContainer = () => {
        console.log(1)
        if(this.checked != null){
            console.log(2)
            return (
                <div className={s.endGameWindow}>
                    <div className={s.textContainer}> 
                        <p>{this.checked.current} wins</p>
                    </div>
                </div>
            )
        }
    }

    render (){
        return(
            <div ref = { this.GameContainerRef } className = { s.GameContainer } style={{gridTemplateColumns: `repeat(${this.state.itemsGridData.itemsInRow}, ${this.state.itemsGridData.itemSize}px)`}}>
        
                { this.getItems(this.sData.size) }
                { this.endGameContainer() } 
            </div>
            
        )
    };
}

export { GameContainer }