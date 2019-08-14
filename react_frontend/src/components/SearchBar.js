import React from 'react';
import queryString from 'query-string';

function SearchBar(props) {
    const [vidQuery, setVidQuery] = React.useState('')
    const [capQuery, setCapQuery] = React.useState('')
    const onSubmit=(event) => {
        event.preventDefault();
        console.log('redirect')
        props.history.push({
            pathname: '/results',
            search: queryString.stringify({
                vidQuery,
                capQuery,
            })
        })
    }

    return (
        <React.Fragment>
            <h2>YouTube PhraseFinder</h2>
            <div>
                <form onSubmit={onSubmit}>
                    <input 
                        onChange={(event) => setVidQuery(event.target.value)} 
                        value={vidQuery} 
                        type="text" 
                        placeholder="Video Search Query" 
                     />
                    <input 
                        onChange={(event) => setCapQuery(event.target.value)}
                        value={capQuery}
                        type="text" 
                        placeholder="Caption Search Query" 
                        name="caption_query" />
                    <button type="submit">Submit</button>
                </form>
            </div>
        </React.Fragment>
    )
}
export default SearchBar;