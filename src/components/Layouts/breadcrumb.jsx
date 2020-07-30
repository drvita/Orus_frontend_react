import React, {Component} from 'react';

class Breadcrumb extends Component {

    render(){
        let {title, subtitle} = this.props;
        return (
            <div className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1 className="m-0 text-dark text-capitalize">
                                {this.props.title}
                            </h1>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className="breadcrumb-item"><a href="#end">Inicio</a></li>
                                <li className="breadcrumb-item active text-lowercase">{title}</li>
                                { title !== subtitle
                                ? <li className="breadcrumb-item active text-lowercase">{subtitle}</li>
                                : ''
                                }
                            </ol>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Breadcrumb;