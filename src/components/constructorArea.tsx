import * as React from 'react';
import { Suspense} from 'react';
import {DropTarget, DropTargetMonitor} from 'react-dnd';
import { ItemTypes } from '../Constants';
import {observer, inject} from 'mobx-react';
import { IMegaStore } from '../stores/megaStore';

import Header1 from './Headers/Header1';
import Footer1 from './Footers/Footer1';
import Content1 from './Contents/Content1';
import Form1 from './Contents/Form1';
import Slider1 from './Sliders/Slider1';

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
    const {elements} = this.props.megaStore!;
    return connectDropTarget(
      <div>
        
        {elements.length > 0 &&
          elements.map((item,i)=>{
          const OtherComponent = React.lazy(() => import('./'+item.dataComponent+'/'+item.dataName));
          return <Suspense fallback={<div>Loading...</div>}><OtherComponent /></Suspense>;
          /*import('./'+item.dataComponent+'/'+item.dataName)
          .then((resp) => {
            
            return <resp.default.name />;
          })
          .catch(err => {
            console.log('err',err);
          });*/
        })}
        <Header1 />
        <Content1 />
        <Form1 /> 
        <Slider1 />
        <Footer1 />
        
      </div>
    )
  }
}

export default ConstructorArea;
