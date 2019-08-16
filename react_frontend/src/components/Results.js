import React from 'react';
import queryString from 'query-string';
import {getVideoSearch} from "../apiservice";
import {
  Container,
  Row,
  Col,
  //Navbar,
  //Nav,
  //Form,
  //FormControl,
  //Button,
  //NavDropdown,
  //InputGroup,
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

const formatSeconds = (seconds) => {
	let hours = Math.floor(seconds / (3600));
	seconds %= 3600;
	let minutes = Math.floor(seconds / 60);
	seconds %= 60;

	if(hours>0){
		return `${hours}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
	}
	if(minutes>0){
		return `${minutes}:${seconds.toString().padStart(2, "0")}`
	}
	return `${seconds}`
}


function Results(props) {
  
  const [apiResponse,setApiResponse] = React.useState();
  const [selectedVid, setSelectedVid] = React.useState();
	const [selectedTime, setSelectedTime] = React.useState();

  React.useEffect(() => {
		const params = queryString.parse(props.location.search);
		setApiResponse(undefined);
		setSelectedVid(undefined);
		setSelectedTime(undefined);
    getVideoSearch(params.vidQuery,params.capQuery)
      .then(apiResponse => {
        setApiResponse(apiResponse)
      });
      

	}, [props.location.search]);
	
	React.useEffect(() => {
		if(selectedTime){
			window.scrollTo(0,0);
		}
	},[selectedTime])	
	
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
                  src={selectedTime ? `https://www.youtube.com/embed/${selectedVid.vid_id}?start=${selectedTime}&autoplay=1` : `https://www.youtube.com/embed/${selectedVid.vid_id}`}
                frameBorder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen>
              </iframe>
							<p>*Timestamps may not align perfectly with captions in video</p>
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
                          <td>{formatSeconds(line.line["start"])}</td>
                          <td>{line.line["text"]}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
              ) : (
                <Alert variant="danger">
                  This video has no transcript.
                </Alert>
              )}
              </React.Fragment>
            ): (
               apiResponse ? <Alert variant="primary">
                Please select a video from the list.
              </Alert> : null
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
														<Container>
															<Row>
																	<Col lg={3}>
																		<img alt="Thumbnail" style={imageStyle} src={`https://i.ytimg.com/vi/${video.vid_id}/hqdefault.jpg`} />
																	</Col>
																	<Col lg={9}>
																	<p>{video.title}</p>
																		<Row>
																		{video.transcript ? 
																	(<Alert variant="primary">Occurances of word: {video.word_count}</Alert>)
																	:<Alert variant="danger">No transcript</Alert>}
																		</Row>
																	</Col>
															</Row>
														</Container>	
													</div>
													</ListGroup.Item>
													)
											}
											return (
												<ListGroup.Item
													onClick={() => {
													setSelectedVid(video);
													setSelectedTime();
													}
												} key={video.vid_id}>
												<div style={videoListStyle}>
												<Container>
													<Row>
															<Col lg={3}>
																<img alt="Thumbnail" style={imageStyle} src={`https://i.ytimg.com/vi/${video.vid_id}/hqdefault.jpg`} />
															</Col>
															<Col lg={9}>
															<p>{video.title}</p>
																<Row>
																	{console.log(video)}
																	{video.transcript ? 
																	(<Alert variant="primary">Occurances of word: {video.word_count}</Alert>)
																	:<Alert variant="danger">No transcript</Alert>}
																</Row>
															</Col>
													</Row>
												</Container>												
												</div>
												</ListGroup.Item>
											)
											})}
									</ListGroup>
                ) : ( 
								<React.Fragment>
									<Alert variant="primary">The list is loading.</Alert>
									<div className="ellipseContainer"><div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div></div>
								</React.Fragment>)}
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  )
}

export default Results;