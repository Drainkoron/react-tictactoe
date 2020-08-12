import React from 'react';
import s from '../styles/GameSettings.module.css';

class GameSettings extends React.Component{
    constructor(props){
        super(props)
        this.formRef = React.createRef()
        this.sData = props.state
        this.actions = props.actions
    }

    componentDidMount(){
        window.addEventListener("change", this.actions.inputChange)
    }

    onSubmit(event, actions){
        event.preventDefault();
        actions.buttonClick()
    }

    setInputs = () => {
        return(
            <div className={s.inputContainer}>
                <form ref={this.formRef} name="gameSettings" onSubmit={(event) => {
                    this.onSubmit(event, this.actions)
                }}>
                    <div className={s.inputContainer}>
                        <label>Width</label>
                        <input type="number" name="w" data-item="gsInp" min="3" max="12" defaultValue="3"/>
                    </div>
                    <div className={s.inputContainer}>
                        <label>Height</label>
                        <input type="number" name="h" data-item="gsInp" min="3" max="12" defaultValue="3"/>
                    </div>
                    <div className={s.inputContainer}>
                        <label>Winning line length</label>
                        <input type="number" name="wll" data-item="gsInp" min="3" max={this.sData.wllMaxValue} defaultValue="3"/>
                    </div>
                    <input type="submit" name="button" className={s.button} value={this.sData.buttonValue}/>    
                </form>    
            </div>
        )
    };

    render (){        
        return(
            <div className={s.container}>
                {this.setInputs()}
            </div>
        )
    };
}

export { GameSettings }