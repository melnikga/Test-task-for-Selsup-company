import ReactDOM from 'react-dom/client';
import './index.css';
import React, {Component} from 'react';


interface Param {
  id: number;
  name: string;
}
interface ParamValue {
   paramId: number;
   value: string;
}
interface Model {
  paramValues: ParamValue[];
}
interface Props {
  params: Param[];
  model: Model;
}
interface State {
  paramValues: ParamValue[];
  paramState: Param[];
}

const inputStyles: {} = {border: '2px solid black', borderRadius: '10px', marginLeft: '10px', marginBottom: '10px', padding: '5px'};


class ParamEditor extends React.Component<Props, State> {
  textInput: React.RefObject<HTMLInputElement>
    constructor(props: Props){
      super(props)
      this.state = {
        paramValues: props.model.paramValues,
        paramState: props.params 
      }
      this.textInput = React.createRef();
    }
    public getModel(): Model {
      const model: Model = {
        paramValues: this.state.paramValues
      };
      return model;
    }

    handlerChanger = (e:string, id: number) => {
      const newValue = this.state.paramValues.map((item) => {
        if(item.paramId === id){
          item.value = e;
        }
        return item;
        
      });
      this.setState({paramValues: newValue}); 
    }
    
    onAdd = (e: any) => {
      e.preventDefault();
      if(e.target[0].value && e.target[1].value){
        
        const value = e.target[0].value.toString();
        const newItemModel = {
          id: this.state.paramState.length + 1,
          name: value
        }
        const newValueModel = [...this.state.paramState, newItemModel]
        this.setState({paramState: newValueModel})

        const text = e.target[1].value.toString();
        const newItemParams = {
          paramId: this.state.paramValues.length + 1,
          value: text
        }
        const newValueParams = [...this.state.paramValues, newItemParams]
        this.setState({paramValues: newValueParams})
        
  
        e.target[0].value = '';
        e.target[1].value = '';
      }
      
      
    }
    
    render(): React.ReactNode {
      const params = this.state.paramState;
      const model = this.state.paramValues;
      return(
        <div style={{padding: '20px'}}>
          <h2 style={{fontSize: '24px', fontWeight: 'bold'}}>Редактируемые поля</h2>
          <div style={{display: 'flex'}}>
            <div>
                {params.map(item => {
                  return(
                    <div style={{marginBottom: '25px'}}>
                      <label style={{fontWeight: 'bold'}} htmlFor={`param-${item.id}`}>{item.name}</label>
                    </div>
                    
                  )
                })}
            </div>
            <div>
              {params.map(item => {
                return(
                  
                  <div key={item.id}>
                    <input 
                      style={inputStyles} 
                      id={`param-${item.id}`} 
                      type="text" name="text" 
                      value={model.find(paramItem => paramItem.paramId === item.id)?.value} 
                      onChange={(e) => this.handlerChanger(e.target.value, item.id)}
                    />
                  </div>
                )
              })}
            </div>
          </div>
          <h2 style={{fontSize: '24px', fontWeight: 'bold'}}>Добавление нового параметра</h2>
          <div style={{border: '2px solid black', padding:'10px', borderRadius: '10px', width: '40%', marginBottom:'40px'}}>
              <form action="" onSubmit={this.onAdd}>
                <div>
                  <input style={inputStyles} placeholder='Введите название нового параметра' ref={this.textInput} className='' type="text" />
                  <input style={inputStyles} placeholder='Введите значение нового параметра' className='' type="text" />
                </div>
                <input type='submit' style={inputStyles} value={'Добавить значение'}/>
                </form>
          </div>
          <h2 style={{fontSize: '24px', fontWeight: 'bold'}}>Структура</h2>
          <div style={{display:'flex', gap: '20rem'}}>
            <div>
              <h2 style={{fontSize: '18px', fontWeight: 'bold'}}>Models</h2>
              {
                
                this.getModel().paramValues.map(item => {
                  return(
                    <div key={item.paramId} className=''>
                      <div>
                        <span style={{fontWeight: 'bold'}}>paramId:</span> {item.paramId}
                      </div>
                      <div>
                      <span style={{fontWeight: 'bold'}}>value:</span> {item.value}
                      </div>
                    </div>
                  )
                })
              }
            </div>
            <div>
              <h2 style={{fontSize: '18px', fontWeight: 'bold'}}>Params</h2>
              {
                this.state.paramState.map(item => {
                  return(
                    <div key={item.id}>
                      <div>
                        <span style={{fontWeight: 'bold'}}>Id:</span> {item.id}
                      </div>
                      <div>
                        <span style={{fontWeight: 'bold'}}>name:</span> {item.name}
                      </div>
                    </div>
                  )
                })
              }
            </div>
          </div>
          
          
        </div>
      )
    }

}
  
const testParams = [
  {
    "id": 1,
    "name": "Назначение"
  },
  {
    "id": 2,
    "name": "Длина"
  }
]

const testModel = {
  "paramValues": [
    {
      "paramId": 1,
      "value": "повседневное"
    },
    {
      "paramId": 2,
      "value": "макси"
    }
  ] 
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ParamEditor params={testParams} model={testModel}/>
  </React.StrictMode>
);

