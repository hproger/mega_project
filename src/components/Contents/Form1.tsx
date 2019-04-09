import * as React from 'react';
class Form1 extends React.Component<{}> {
    render() {
        return (
            <div className="page-form1 row">
                <div className="col-md-6">
                    
                    <form action="/" method="POST" role="form">
                        <legend>Форма 1</legend>
                    
                        <div className="form-group">
                            <label htmlFor="">Заголовок</label>
                            <input type="text" className="form-control" id="" placeholder="Введите заголовок..." />
                        </div>
                        <div className="form-group">
                            <label htmlFor="">Email</label>
                            <input type="text" className="form-control" id="" placeholder="Введите email ..." />
                        </div>
                        <div className="form-group">
                            <label htmlFor="">Телефон</label>
                            <input type="text" className="form-control" id="" placeholder="Введите телефон ..." />
                        </div>
                    
                        <button type="submit" className="btn btn-primary">Отправить</button>
                    </form>
                    
                </div>
            </div>
        );
    }
}

export default Form1;