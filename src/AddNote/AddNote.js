import React from 'react'

const AddNote = (props) => {

    return (
        <div>
            <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#modal">New Note</button>

            <div className="modal fade" id="modal" tabIndex="-1" role="dialog" aria-labelledby="modalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="modalLabel">Add New Note</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body">
                <form id="myForm">
                    <div className="form-group text-left">
                        <label htmlFor="note-title ">Note title:</label>
                        <input type="text" className="form-control" name="title" id="note-title" placeholder="Enter note title..." onChange={props.changed}/>
                    </div>
                    <div className="form-group text-left">
                        <label htmlFor="note-body ">Note body:</label>
                        <input type="text" className="form-control" name="body" id="note-body" placeholder="Enter note body..." onChange={props.changed}/>
                    </div>
                    <div className="form-group text-left">
                        <label htmlFor="note-author ">Note author:</label>
                        <input type="text" className="form-control" name="author" id="note-author" placeholder="Enter note author..." onChange={props.changed}/>
                    </div>
                    </form>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="button" className="btn btn-warning" name="drat" onClick={props.authenticate}>Save As Draft</button>
                    <button type="button" className="btn btn-success" name="post" onClick={props.authenticate} >Add Note</button>
                </div>
                </div>
            </div>
            </div>
        </div>
    )
}


export default AddNote