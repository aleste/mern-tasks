import React, { Component } from 'react';

class App extends Component {

    constructor() {
        super();
        this.state = {
            title: '',
            description: '',
            tasks: [],
            _id: ''
        };
        this.addTask = this.addTask.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    addTask(e) {
        e.preventDefault();
        let method = 'POST';

        if(this.state._id){
            let method = 'PUT';
        }

        fetch('/api/tasks', {
            method: method,
            body: JSON.stringify(this.state),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
          .then(data => {
            M.toast({html: 'Task Saved'});
            this.setState({title: '', description: ''});
            this.fetchTasks();
          })
          .catch(err => console.lerror(err));
    }


    editTask(id) {
        
        fetch('/api/tasks/' + id)
        .then(res => res.json())
            .then(data => {
                this.setState({
                    _id: data._id,
                    title: data.title,
                    description: data.description
                })
                 M.toast({html: 'Task Updated'});
                this.fetchTasks();
            })
            .catch(err => console.lerror(err));
        

    }  

    
    deleteTask(id) {
        if(confirm('Are you sure?')){
            fetch('/api/tasks/' + id, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }).then(res => res.json())
              .then(data => {
                M.toast({html: 'Task Deleted'});
                this.fetchTasks();
              })
              .catch(err => console.lerror(err));
        }

    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        }) 
    }

    componentDidMount() {
        this.fetchTasks();
    }

    fetchTasks() {
        fetch('/api/tasks')
            .then(res => res.json())
            .then(data => {
               this.setState({tasks: data});
            })
            .catch(err => console.lerror(err)); 
    }

    render() {
        return (
            <div>
                {/* NAVIGATION */ }
                <nav className="light-blue darken-4">
                    <div className="container">
                        <a className="brand-logo" href="/">Mearn Stack</a>
                    </div> 
                </nav>

                <div className="container">
                    <div className="row">
                    <div className="col s5">
                        <div className="card">
                            <div className="card-content">
                                <form onSubmit={this.addTask}> 
                                    <div className="row">
                                        <div className="input-field col s12">
                                            <input name="title" value={this.state.title} onChange={this.handleChange} type="text" placeholder="Task Title" />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="input-field col s12">
                                            <textarea name="description" value={this.state.description} onChange={this.handleChange} className="materialize-textarea" placeholder="Task description"></textarea>
                                        </div>
                                    </div>
                                    <button type="submit" className="btn btn-light-blue darken-4">Send</button>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="col s7">
                        <table>
                            <thead>
                                <tr>
                                    <th>Title</th>
                                    <th>Description</th>
                                </tr>
                            </thead>
                            <tbody>

                                  
                                {
                                    this.state.tasks.map(task => {
                                        return (
                                            <tr key={task._id}>
                                                <td>{task.title}</td>
                                                <td>{task.description}</td>
                                                <td>
                                                    <button onClick={() => this.editTask(task._id)} className="btn light-blue darken-4" style={{margin: '4px'}}>
                                                        <i className="material-icons">edit</i>
                                                    </button>
                                                    <button onClick={() => this.deleteTask(task._id)} className="btn light-blue darken-4">
                                                    <i className="material-icons">delete</i>
                                                    </button>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                                <tr></tr>
                            </tbody>
                        </table>
                    </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default App;