import React from 'react';
import s from '../styles/GameContainer.module.css';

class GameContainer extends React.Component{
    constructor(props){
        super(props)
        this.mainCounter = 1
        this.currentPlayer = true
        this.ItemsGridData = this.getItemsGridData(props.size) 
        this.state = { 
            height: window.innerHeight, 
            width: window.innerWidth,
            itemsGridData: '',
            GameMap: this.getGameMap(this.props.size)
        };
    }

    updateData = (e) => {
        this.setState({
            height: window.innerHeight, 
            width: window.innerWidth,
            itemsGridData: this.getItemsGridData(this.props.size, this.state.width),
            GameMap: this.GameMap
        });
    }

    componentDidMount() {
        this.props.size.w += 2
        this.props.size.h += 2
        this.setState({
            itemsGridData: this.getItemsGridData(this.props.size, this.state.width),
        });
        window.addEventListener('resize', this.updateData);
        window.addEventListener('click', this.clickEvent);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateData);
        window.removeEventListener('click', this.clickEvent);
    }

    clickEvent = (e) => {
        let $item = e.target
        let { GameMap } = this.state 
        if($item.parentElement.getAttribute('item-type') === 'item')
            $item = $item.parentElement

        let x = Math.floor($item.getAttribute('item-index') % (this.props.size.w - 2)) + 1
        let y = Math.floor($item.getAttribute('item-index') / (this.props.size.h - 2)) + 1
    
        if(GameMap[y][x] === '#'){
            if(this.currentPlayer)
                GameMap[y][x] = 'x'
            else 
                GameMap[y][x] = 'o'
            
            $item.innerHTML = `<p>${this.state.GameMap[y][x]}</p>`
            this.mainCounter += 1
            this.currentPlayer = !this.currentPlayer
            this.setState ({
                GameMap: GameMap
            })
        }
    }

    getItemsGridData = (size, width) => {
        let itemSize = 60 
        let itemsInRow = size.w - 2
        
        itemSize = Math.min(Math.floor(width/size.w), itemSize)

        return { itemsInRow, itemSize }
    }

    getGameMap = (size) => {
        const { w, h } = size
        
        var matrix = []
        for(var i=0; i<=h+1; i++) {
            matrix[i] = [];
            for(var j=0; j<=w+1; j++) {
                matrix[i][j] = '#';
            }
        }

        return matrix
    }

    getItemClassList = (data) => {
        const { j, i, w, h } = data
        let classList = [s.item] 
        
        if(j === 1)
            classList.push(s.left)
        if(j === w - 2)
            classList.push(s.right)
        if(i === 1)
            classList.push(s.top)
        if(i === h - 2)
            classList.push(s.bottom)
        
        return classList
    }

    getItems = (size) => {
        let items = [], cnt = 0
        const { getItemClassList } = this
        const { w, h } = size

        let itemStyle = {
            height:`${this.state.itemsGridData.itemSize}px`, 
            width:`${this.state.itemsGridData.itemSize}px`
        }

        for(let i = 1; i < h - 1; i++){
            for(let j = 1; j < w - 1; j++){
                items.push(<div item-type={'item'} item-index={cnt} key={`item${cnt}`} className={getItemClassList({ j, i, w, h }).join(' ')} style={itemStyle}>
                    {<p>{this.state.GameMap[i][j]}</p>}
                </div>)
                cnt += 1
            }
        }   
        return items
    }
    
    render (){
        
        return(
            <div ref = { this.GameContainerRef } className = { s.GameContainer } style={{gridTemplateColumns: `repeat(${this.state.itemsGridData.itemsInRow}, ${this.state.itemsGridData.itemSize}px)`}}>
        
                { this.getItems(this.props.size) }
                
            </div>
        )
    };
}

export { GameContainer }