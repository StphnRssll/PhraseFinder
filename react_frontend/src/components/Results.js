import React from 'react';
import queryString from 'query-string';
import {getVideoSearch} from "../apiservice";
import {
  Container,
  Row,
  Col,
  Navbar,
  Nav,
  Form,
  FormControl,
  Button,
  NavDropdown,
  InputGroup,
  ListGroup,
  Alert,
  Table
} from 'react-bootstrap'; 

const videoListStyle = {
  display: 'flex',
  flex: '100px 1fr'
}

const imageStyle = {
  display: 'inline-block',
  maxWidth: '100px',
  marginRight: '10px',
}
const cursorStyle = {
  cursor: 'pointer',
}

function Results(props) {
  
  const [apiResponse,setApiResponse] = React.useState();
  const [selectedVid, setSelectedVid] = React.useState();
  const [selectedTime, setSelectedTime] = React.useState();

  React.useEffect(() => {
    const params = queryString.parse(props.location.search);
    getVideoSearch(params.vidQuery,params.capQuery)
      .then(apiResponse => {
        setApiResponse(apiResponse)
      });
      //style="width:500px;height:150px;line-height:3em;overflow:scroll;padding:5px;"
      //{JSON.stringify(video, null, 2)}

  }, [props.location.search]);
  
  return (
    <React.Fragment>
      <Container>
        <Row>
          <Col>
            {selectedVid ? (
              <React.Fragment>
              <iframe
                width="560"
                height="315"
                  src={selectedTime ? `https://www.youtube.com/embed/${selectedVid.vid_id}?start=${selectedTime}` : `https://www.youtube.com/embed/${selectedVid.vid_id}`}
                frameBorder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen>
              </iframe>
              {selectedVid.transcript ? (
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>Time</th>
                        <th>Text</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedVid.found_lines.map((line, index) => (
                        <tr style={cursorStyle} key={`${selectedVid.vid_id}-${index}`} onClick={() => setSelectedTime(line.line["start"])}>
                          <td>{line.line["start"]}</td>
                          <td>{line.line["text"]}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
              ) : (
                <Alert variant="primary">
                  This video has no transcript.
                </Alert>
              )}
              </React.Fragment>
            ): (
              <Alert variant="primary">
                Please select a video from the list.
              </Alert>
            )}

          </Col>
          <Col>
            {apiResponse ? (
              <ListGroup variant="flush">
                {apiResponse.data.top_vids.map(video => {
                  if (selectedVid && selectedVid.vid_id === video.vid_id) {
                    return (
                      <ListGroup.Item
                        active
                        variant='primary'
                        onClick={() => {
                          setSelectedVid(video);
                          setSelectedTime();
                        }}
                        key={video.vid_id}>
                        <div style={videoListStyle}>
                          <img style={imageStyle} src={`https://i.ytimg.com/vi/${video.vid_id}/hqdefault.jpg`} />
                          <p>{video.title}</p>
                        </div>
                      </ListGroup.Item>
                    )
                  }
                  return (
                    <ListGroup.Item
                      onClick={() => {
                        setSelectedVid(video);
                        setSelectedTime();
                      }}
                      key={video.vid_id}>
                      <div style={videoListStyle}>
                        <img style={imageStyle} src={`https://i.ytimg.com/vi/${video.vid_id}/hqdefault.jpg`} />
                        <p>{video.title}</p>
                      </div>
                    </ListGroup.Item>
                  )
                })}
              </ListGroup>
            ) : (
              <Alert variant="primary">
                The list is loading.
              </Alert>
            )}
          </Col>
        </Row>
        <Row>
          <Col>1 of 3</Col>
          <Col>2 of 3</Col>
          <Col>3 of 3</Col>
        </Row>
      </Container>
    </React.Fragment>
  )
}

export default Results;