import React, { Component } from "react";
import { fetchData } from "../services/api.service.js";
import { List, Fab, ListItem, ListItemIcon, ListItemText, CircularProgress } from "@material-ui/core";
import { formatTitle, validData, isMovieEdited } from '../services/data.service';
import EditMovieComponent from './EditMovie.Component.jsx';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import uniqid from 'uniqid';
import ModalComponent from './Modal.component.jsx'

class ListComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      list: [],
      editMovie: null,
      isEditMode: false,
      message: null,
      openEdit: false,
      openModal: false,
      selectedMovie: null
    };
  }
  componentDidMount() {
    this.getData();
  }

  getData() {
    this.setState({ isLoading: true });
    fetchData("y=2019&s=love&apikey=c8cdce26")
      .then(data => data.Search.forEach(element => {
        fetchData(`i=${element.imdbID}&apikey=c8cdce26`)
          .then(data => {
            let title = formatTitle(data.Title);
            data.Title = title;
            let movies = this.state.list;
            movies.push(data);
            this.setState({ list: movies, isLoading: false });
          })
      }))
      .catch(error => this.setState({ error, isLoading: false }));
  }

  onEdit(element) {
    this.setState({ editMovie: element });
    this.setState({ isEditMode: true })
    this.setState({ openEdit: true })
  }

  cancelEdit() {
    this.setState({ message: null });
    this.setState({ isEditMode: false });
  }

  updateList(movie) {
    let list = this.state.list;
    let mov = list.find(((mov) => mov.imdbID === movie.imdbID));
    let index = list.indexOf(mov);
    index === -1 ? list.unshift(movie) : list.splice(index, 1, movie);
    this.setState({ list: list });
  }

  removeMovieFromList(movie) {
    let list = this.state.list;
    let mov = list.find(((mov) => mov.imdbID === movie.imdbID));
    let index = list.indexOf(mov);
    index >= 0 ? list.splice(index, 1) : movie = {};
    this.setState({ list: list });
  }

  saveEdit(movie) {
    let notEdited = isMovieEdited(movie, this.state.editMovie);
    if (notEdited) {
      this.cancelEdit();
      return
    }
    let validation = validData(movie, this.state.list);
    if (validation === true) {
      this.updateList(movie);
      this.setState({ message: null })
      this.cancelEdit();
      return
    }
    this.setState({ message: validation });
  }

  handleAddNew() {
    let imdbID = uniqid();
    let newMovie = { imdbID: imdbID }
    this.setState({ editMovie: newMovie });
    this.setState({ isEditMode: true })
    this.setState({ openEdit: true })

  }

  handleDelete(movie) {
    this.setState({ selectedMovie: movie })
    this.setState({ openModal: true })
  }

  deleteMovie(movie) {
    this.removeMovieFromList(movie);
    this.setState({ selectedMovie: {} });
    this.setState({ openModal: false });
  }

  canselDelete() {
    this.setState({ openModal: false });
    this.setState({ selectedMovie: {} })
  }

  render() {
    const { list, isLoading, editMovie, isEditMode, message, openEdit, selectedMovie } = this.state;
    return (
      <div className="container">
        <div className={"main-container"}>

          {isLoading ? <div className={"loader"}><CircularProgress disableShrink />.</div> : null}

          <ModalComponent
            noCancel={() => this.canselDelete()}
            onAction={() => this.deleteMovie(selectedMovie)}
            title={selectedMovie ? `delete: ${selectedMovie.Title}` : null}
            text={selectedMovie ? `are you ok with it?` : null}
            open={this.state.openModal}
          />

          {isEditMode && <EditMovieComponent
            editMovie={editMovie}
            open={openEdit}
            onCencel={() => this.cancelEdit()}
            onSave={movie => this.saveEdit(movie)}
            message={message}
          />}

          <Fab size="medium"
            color="primary"
            aria-label="Add"
            className="fab add-fab"
            style={{ backgroundColor: "green" }}
          >
            <AddIcon onClick={() => this.handleAddNew()} />
          </Fab> 
          
          <List className="movies-list">
            {list.map(hit => (
              <ListItem className= "list-item" key={hit.imdbID}>
                <ListItemText primary={`${hit.Title}  | ${hit.Year}`} secondary={`
                  ${hit.Runtime} |
                  ${hit.Genre} |
                  Director: ${hit.Director} |
                  ${hit.imdbID}`} />
                <ListItemIcon button="true" onClick={() => this.handleDelete(hit)}>
                  <Fab size="small" color="primary" aria-label="Delete" className="fab delete-fab" style={{ backgroundColor: "#af3a3a" }}>
                    <DeleteIcon />
                  </Fab>
                </ListItemIcon>
                <ListItemIcon button="true" onClick={() => this.onEdit(hit)}>
                  <Fab size="small" color="primary" aria-label="Edit" className="fab">
                    <EditIcon />
                  </Fab>
                </ListItemIcon>
              </ListItem>
            ))}
          </List>
        </div>
      </div>
    );
  }
}

export default ListComponent;
