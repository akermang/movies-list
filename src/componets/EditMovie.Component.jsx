import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

class EditMovieComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: this.props.open,
            editMovie: this.props.editMovie,
            title: this.props.editMovie.Title || "",
            year: this.props.editMovie.Year || "",
            runtime: this.props.editMovie.Runtime || "",
            genre: this.props.editMovie.Genre || "",
            director: this.props.editMovie.Director || "",
        };
    }

    handleClose() {
        this.setState({ open: false });
        this.props.onCencel()
    };

    handleSave() {
        const { editMovie, title, year, runtime, genre, director } = this.state;
        const movie = {
            imdbID: editMovie.imdbID,
            Title: title,
            Year: year,
            Runtime: runtime,
            Genre: genre,
            Director: director
        }
        this.props.onSave(movie);
    }

    render() {
        const { title, year, runtime, genre, director } = this.state;
        const { message } = this.props;
        return (
            <div>
                <Dialog
                    open={this.state.open}
                    onClose={() => this.handleClose()}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">movie info</DialogTitle>
                    <DialogContent>
                        {<DialogContentText style={{ textAlign: "center" }} color="secondary">{message}</DialogContentText>}

                        <TextField
                            autoFocus
                            margin="dense"
                            label="Title"
                            type="text"
                            value={title}
                            fullWidth
                            onChange={(e) => this.setState({ title: e.target.value })}
                        />
                        <TextField
                            margin="dense"
                            label="Year"
                            type="text"
                            value={year}
                            fullWidth
                            onChange={(e) => this.setState({ year: e.target.value })}
                        />
                        <TextField
                            margin="dense"
                            label="Runtime"
                            type="text"
                            value={runtime}
                            fullWidth
                            onChange={(e) => this.setState({ runtime: e.target.value })}
                        />
                        <TextField
                            margin="dense"
                            label="Genre"
                            type="text"
                            value={genre}
                            fullWidth
                            onChange={(e) => this.setState({ genre: e.target.value })}
                        />
                        <TextField
                            margin="dense"
                            label="Director"
                            type="text"
                            value={director}
                            fullWidth
                            onChange={(e) => this.setState({ director: e.target.value })}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => this.handleClose()} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={() => this.handleSave()} color="secondary">
                            Save
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}
export default EditMovieComponent;