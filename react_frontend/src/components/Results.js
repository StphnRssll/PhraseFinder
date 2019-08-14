import React from 'react';
import queryString from 'query-string';
import {getVideoSearch} from "../apiservice";

function Results(props) {
    
    const [apiResponse,setApiResponse] = React.useState();
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
            {apiResponse ? apiResponse.data.top_vids.map(video => (
                <div key={video.vid_id}>

                        <a href={`https://www.youtube.com/watch?v=${video.vid_id}`}><h5>{video.title}</h5></a>
                        <a href={`https://www.youtube.com/watch?v=${video.vid_id}`}><img src={`https://i.ytimg.com/vi/${video.vid_id}/hqdefault.jpg`}></img></a>
                        <br></br><br></br>
                        <div className="scrollbox">
                            {video.transcript ? video.found_lines.map(line => (
                                <div key={line["start"]}>
                                    <a href={`https://youtu.be/${video.vid_id}?t=${line.line["start"]}`}>
                                        Time: {line.line["start"]} 
                                        <br></br>
                                        Text: {line.line["text"]}
                                        <br></br><br></br>
                                    </a>
                                </div>
                            )): "This video has no transcript."}
                        </div>               
                </div>
            )): <div>Loading...</div>}
            <pre>
                {JSON.stringify(apiResponse, null, 2)}
            </pre>
        </React.Fragment>
    )
}

export default Results;