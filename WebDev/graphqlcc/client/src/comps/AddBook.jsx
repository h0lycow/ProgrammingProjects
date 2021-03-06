import { useQuery,useMutation } from "@apollo/client";
import { getBooksQuery,getAuthorsQuery,addBookMutation} from "../queries";
import { useState } from "react";

function AddBook() {
  const [state,setState]=useState({name:'',genre:'',authorId:''})
  const { loading, error, data } = useQuery(getAuthorsQuery)
  const [addBook, status]=useMutation(addBookMutation,{refetchQueries:[getBooksQuery]})
  
  const handleSubmit=(e)=>{
    if (status.loading) return 'Submitting...';
    if (status.error) return `Submission error! ${status.error.message}`;
    e.preventDefault()
    addBook({variables:state})
    setState({name:'',genre:'',authorId:''})
  }

  const displayAuthors=()=>{
    if (loading) return `Loading...`
    if (error) return `Error ${error.message}`
    return data.authors.map(author => <option key={ author.id } value={author.id}>{ author.name }</option>)
  }
  
  return (
    <form id="add-book" onSubmit={handleSubmit}>
      <div className="field">
        <label>Book name:</label>
        <input 
        type="text" 
        onChange={(e)=>setState((old)=>({...old,name:e.target.value}))}
        value={state.name}
        />
      </div>
      <div className="field">
        <label>Genre:</label>
        <input 
        type="text" 
        onChange={(e)=>setState((old)=>({...old,genre:e.target.value}))}
        value={state.genre}
        />
      </div>
      <div className="field">
        <label>Author:</label>
        <select 
        onChange={(e)=>setState((old)=>({...old,authorId:e.target.value}))}
        >
          <option>Select Author</option>
          {displayAuthors()}
        </select>
      </div>
      <button> + </button>
    </form>
  )
}

export default AddBook;