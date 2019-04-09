import * as React from 'react';
import { ItemTypes } from '../../Constants';
import { DragSource } from 'react-dnd';

const elementSource = {
  beginDrag(props:any) {
    return {}
  },
}

function collect(connect: any, monitor: any) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  }
}

interface IElementsProps {
  connectDragSource?(elem:any): any;
  isDragging?: boolean;
  title: string;
  dataComponent: string;
  dataName: string;
}

@DragSource(ItemTypes.ELEMENT, elementSource, collect)
class Element extends React.Component<IElementsProps, any> {
  
  render() {
    const connectDragSource = this.props.connectDragSource!;
    let isDragging = this.props.isDragging!;
    const {title, dataComponent, dataName} = this.props;
    return connectDragSource(
        <div 
          className="element-list"
          data-component={dataComponent}
          data-name={dataName}
          style={{
            opacity: isDragging ? 0.5 : 1,
            cursor: 'move',
          }}
          >{title}</div>
    )
  }
}

export default Element;