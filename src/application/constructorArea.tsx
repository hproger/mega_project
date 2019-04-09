import * as React from 'react';
import {DropTarget, DropTargetMonitor} from 'react-dnd';
import { ItemTypes } from '../Constants';
import {observer, inject} from 'mobx-react';
import { IMegaStore } from '../stores/megaStore';

interface IConstructorAreaProps {
    connectDropTarget?(elem:any): any;
    isOver?: boolean;
    squareTarget?: any;
    megaStore?: IMegaStore;
}
const squareTarget = {
    drop(props: any) {
        console.log('props',props);
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
  public render() {
    let { children } = this.props;
    const connectDropTarget = this.props.connectDropTarget!
    return connectDropTarget(
      <div>
        {children}
      </div>
    )
  }
}

export default ConstructorArea;
