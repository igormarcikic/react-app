import React from 'react'

const Draft = (props) => {

    return (
        <div className="note col col-lg-4 col-sm-12">
            <div className="card m-2">
            <img src={props.note.url} className="card-img-top" alt="img"/>
                <div className="card-body">
                <h5 className="card-title text-left">{props.note.title}</h5>
                <p className="card-text text-left">{props.note.body}</p>
                </div>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">By: <strong>{props.note.author_name}</strong></li>
                    <li className="list-group-item"><span className={"badge badge-pill " + (props.note.status === 'completed' ? "badge-success" : "badge-warning") }>{props.note.status}</span></li>
                    <li className="list-group-item"> {props.note.date}</li>
                </ul>
                <div className="card-body">
                    <button className="card-link btn btn-info btn-sm text-white" onClick={props.publish}>Publish</button>
                    <button className="card-link btn btn-danger btn-sm text-white" onClick={props.delete}>Delete</button>
                </div>
            </div>
        </div>
    )
}

export default Draft;

