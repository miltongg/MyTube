import {Card, CardImg, Col, Container, Row} from "react-bootstrap";
import {useEffect, useState} from "react";
import axios from "axios";
import ScrollContainer from "../Components/ScrollContainer";

export default function HomeScreen() {

    const [videos, setVideos] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await axios.get('/api/video')
                setVideos(result.data)
            } catch (error) {
                console.error(error.message)
            }
        }

        fetchData()
    },[])


    return (
        <Row className="mx-3">
            <ScrollContainer/>
            {videos.map((video) => (
                <Col key={video.id} xs={12} sm={6} md={6} lg={4} xl={3} className="mb-3">
                    <Card className="rounded-4 text-start border-0 bg-black">
                        <CardImg variant="top" src="/images/logo.png"  className="rounded-4 cover_video"/>
                        <Card.Body>
                            <div className="d-flex">
                                <div>
                                    <img src="/images/logo.png" className="rounded-circle avatar me-2" alt="avatar-img"/>
                                </div>
                                <div className="info_video_card_text">
                                    <p className="video_title text-light h6 fw-bold">{video.title}</p>
                                    <div>{video.id}</div>
                                    {video.views} - {video.createdAt}
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            ))}
        </Row>
    );
}