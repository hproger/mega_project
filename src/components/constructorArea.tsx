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
    drop(props: any,monitor:any, component:any) {
      const newItem = monitor.getItem();
      let {elements} = props.megaStore!;
      elements.push(newItem);
      localStorage.setItem('elements',JSON.stringify(elements));
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
@DropTarget(ItemTypes.ELEMENT, squareTarget, collect)
@observer
class ConstructorArea extends React.Component<IConstructorAreaProps, any> {

  render() {
    const connectDropTarget = this.props.connectDropTarget!
    let {elements} = this.props.megaStore!;
    if (elements.length === 0 && localStorage.getItem('elements')) {
      elements = JSON.parse(localStorage.getItem('elements')!);
    }
    return connectDropTarget(
      <div className="ctr-area-inner">
        
        {elements.length > 0 &&
          elements.map((item,i)=>{
          const OtherComponent = React.lazy(() => import('./'+item.dataComponent+'/'+item.dataName));
          return <Suspense key={i} fallback={<div>Loading...</div>}><OtherComponent /></Suspense>;
        })}
        
      </div>
    )
  }
}

export default ConstructorArea;
