import React from 'react';
import queryString from 'query-string';
import { 
  Navbar, 
  Form, 
  FormControl, 
  Button,
} from 'react-bootstrap'; 
import { LinkContainer } from 'react-router-bootstrap'

function SearchBar(props) {
  const [vidQuery, setVidQuery] = React.useState('')
  const [capQuery, setCapQuery] = React.useState('')
  const onSubmit=(event) => {
    event.preventDefault();
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
      <Navbar justify-content="between" bg="dark" variant="dark">
        <LinkContainer to='/'>
          <Navbar.Brand href="#home">YouTube Phrase Finder</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Form inline onSubmit={onSubmit}>
            <FormControl type="text" placeholder="Video" className="mr-sm-2" onChange={(event) => setVidQuery(event.target.value)} value={vidQuery} />
            <FormControl type="text" placeholder="Caption" className="mr-sm-2" onChange={(event) => setCapQuery(event.target.value)} value={capQuery} />
            <Button variant="danger" type="submit">Search</Button>
          </Form>
        </Navbar.Collapse>
      <a href="https://github.com/StphnRssll/PhraseFinder/edit/master">
        <span class="iconify" data-icon="logos-github-icon" data-inline="false"></span>
      </a>
      </Navbar>
    </React.Fragment>
  )
}
export default SearchBar;
