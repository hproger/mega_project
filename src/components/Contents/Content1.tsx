import * as React from 'react';
import {observer, inject} from 'mobx-react';
import { IMegaStore } from '../../stores/megaStore';

@inject('megaStore')
@observer
class Content1 extends React.Component<{
    megaStore?: IMegaStore
}> {
    render() {
        const {products} = this.props.megaStore!;
        return (
            <div className="page-contnet1 row">
                    
                    {products.map((item,i)=>(
                        <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3" key={i}>
                            <div className="thumbnail">
                                <img data-src="#" alt="" />
                                <div className="caption">
                                    <h3>{item.name}</h3>
                                    <p>
                                        Какое то описание 1
                                    </p>
                                    <p>
                                        <a href="#" className="btn btn-primary">Кнопка1</a>
                                        <a href="#" className="btn btn-default">Кнопка2</a>
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                    
            </div>
        );
    }
}

export default Content1;