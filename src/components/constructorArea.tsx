import * as React from 'react';
import { Suspense} from 'react';
import {DropTarget, DropTargetMonitor} from 'react-dnd';
import { ItemTypes } from '../Constants';
import {observer, inject} from 'mobx-react';
import { IMegaStore } from '../stores/megaStore';

interface IConstructorAreaProps {
    connectDropTarget?(elem:any): any;
    newItem?: {title: string, dataName:string, dataComponent: string}
    isOver?: boolean;
    squareTarget?: any;
    megaStore?: IMegaStore;
}
const squareTarget = {
    drop(props: any, monitor:any, component:any) {
      const newItem = monitor.getItem();
      let {elements} = props.megaStore!;

      /* хрень, переделать нужно */
      /*if (elements.length === 0 && localStorage.getItem('elements')) {
        elements = JSON.parse(localStorage.getItem('elements')!);
      }*/
      elements.push(newItem);
      /*localStorage.setItem('elements',JSON.stringify(elements));*/
      return newItem;
    },
}
function collect(connect: any, monitor: any) {
    
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver(),
    }
}

@inject('megaStore')
@observer
class EditorComponent extends React.Component<{
  megaStore?: IMegaStore;
  index: number;
  item: {title: string, dataName:string, dataComponent: string}
}> {
  handleMove = (up: boolean, elements: {}[], ind: number) => {
    if (up && ind > 0) {
      [elements[ind-1], elements[ind]] = [elements[ind], elements[ind-1]]
    }
    else if (!up && ind < elements.length-1){
      [elements[ind+1], elements[ind]] = [elements[ind], elements[ind+1]]
    }
  }
  handleRemove = (ind: number, elements: {}[]) => {
    elements.splice(ind,1);
  }
  render() {
    const {children, index, item} = this.props;
    let {elements} = this.props.megaStore!;
    return (
      <div className="editor-wrapper">
        <div className="panel-editor">
          <div className="left-side-panel">
            <div className="move-btns">
              {index > 0 &&
                <div className="panel-btn btn-move move-up" onClick={()=>this.handleMove(true, elements, index)}>
                  <span className="glyphicon glyphicon-arrow-up" aria-hidden="true"></span>
                </div>
              }
              {index < elements.length-1 &&
                <div className="panel-btn btn-move move-down" onClick={()=>this.handleMove(false, elements, index)}>
                  <span className="glyphicon glyphicon-arrow-down" aria-hidden="true"></span>
                </div>
              }
            </div>
          </div>
          <div className="right-side-panel">
            <div className="right-panel-btns">
              <div className="panel-btn btn-edit" data-toggle="modal" data-target={"#editor"+index} > 
                <span className="glyphicon glyphicon-pencil" aria-hidden="true"></span>
              </div>
              <div className="panel-btn btn-remove" onClick={()=>this.handleRemove(index, elements)}>
              <span className="glyphicon glyphicon-remove" aria-hidden="true"></span>
              </div>
            </div>
          </div>
        </div>
        {children}
        <div className="modal fade" id={"editor"+index}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 className="modal-title">{item.title}</h4>
              </div>
              <div className="modal-body">
                
                <div role="tabpanel">
                    <ul className="nav nav-tabs" role="tablist">
                        <li role="presentation" className="active">
                            <a href={"#data"+index} aria-controls={"data"+index} role="tab" data-toggle="tab">Данные</a>
                        </li>
                        <li role="presentation">
                            <a href={"#json"+index} aria-controls={"json"+index} role="tab" data-toggle="tab">JSON</a>
                        </li>
                    </ul>
                
                    <div className="tab-content">
                        <div role="tabpanel" className="tab-pane active" id={"data"+index}>Тут данные для заполнения</div>
                        <div role="tabpanel" className="tab-pane" id={"json"+index}>
                          
                          <textarea name="json_area" id="inputjson_area" className="form-control"></textarea>
                          
                        </div>
                    </div>
                </div>
                
              </div>
              <div className="modal-footer">
              <button type="button" className="btn btn-primary">Сохранить изменения</button>
                <button type="button" className="btn btn-default" data-dismiss="modal">Отмена</button>
              </div>
            </div>
          </div>
        </div>
        
      </div>
    );
  }
}

@inject('megaStore')
@DropTarget(ItemTypes.ELEMENT, squareTarget, collect)
@observer
class ConstructorArea extends React.Component<IConstructorAreaProps, any> {

  render() {
    const connectDropTarget = this.props.connectDropTarget!
    let {elements} = this.props.megaStore!;
    /*if (elements.length === 0 && localStorage.getItem('elements')) {
      elements = JSON.parse(localStorage.getItem('elements')!);
    }*/
    return connectDropTarget(
      <div className="ctr-area-inner">
        
        {elements.length > 0 &&
          elements.map((item,i)=>{
          const OtherComponent = React.lazy(() => import('./'+item.dataComponent+'/'+item.dataName));
          return <Suspense key={i} fallback={<div>Loading...</div>}><EditorComponent index={i} item={item} ><OtherComponent /></EditorComponent></Suspense>;
        })}
        
      </div>
    )
  }
}

export default ConstructorArea;
