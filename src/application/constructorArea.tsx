import * as React from 'react';
import {DropTarget, DropTargetMonitor} from 'react-dnd';
import { ItemTypes } from '../Constants';
import {observer, inject} from 'mobx-react';
import { IMegaStore } from '../stores/megaStore';
import Element from '../application/elements';
import Header1 from '../components/Headers/Header1';
import Footer1 from '../components/Footers/Footer1';
import Content1 from '../components/Contents/Content1';
import Form1 from '../components/Contents/Form1';
import Slider1 from '../components/Sliders/Slider1';

interface IConstructorAreaProps {
    connectDropTarget?(elem:any): any;
    newItem?: {title: string, dataName:string, dataComponent: string}
    isOver?: boolean;
    squareTarget?: any;
    megaStore?: IMegaStore;
}
const squareTarget = {
    drop(props: any) {
        return {...props}
    },
}
function collect(connect: any, monitor: any) {
    
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver(),
        newItem: monitor.getItem(),
    }
}
@inject('megaStore')
@DropTarget(ItemTypes.ELEMENT, squareTarget, collect)
@observer
class ConstructorArea extends React.Component<IConstructorAreaProps, any> {
  render() {
    let { children } = this.props;
    const newItem = this.props.newItem!;
    const connectDropTarget = this.props.connectDropTarget!
    return connectDropTarget(
      <div>
        {children}
        {newItem &&
            (
                newItem.dataName
            )
        }
      </div>
    )
  }
}

export default ConstructorArea;
