import React, {Component} from 'react';
import { Label, Row, Col, Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem, Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Loading } from './LoadingComponent';
import { Control, LocalForm, Errors} from 'react-redux-form';
import { baseUrl } from '../shared/baseUrl';
import { FadeTransform, Fade, Stagger } from "react-animation-components";

const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => (val) && (val.length >= len);

function RenderDish({dish})
{
    return(
        <FadeTransform
        in
        transformProps={{
            exitTransform: 'scale(0.5) translateY(-50%)'
        }}>
            <Card>
                <CardImg top src={baseUrl + dish.image} alt={dish.name} />
                <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>
        </FadeTransform>
    );
}
function RenderComments({comments, postComment, dishId})
{   
    return(
        <React.Fragment>
        <ul key={comments.id} className="list-unstyled">
                <Stagger in>
                    {comments.map((comment) => {
                        return (
                            <Fade in>
                            <li key={comment.id}>
                            <p>{comment.comment}</p>
                            <p>-- {comment.author} , {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
                            </li>
                            </Fade>
                        );
                    })}
                </Stagger>
            </ul>
            <CommentForm dishId={dishId} postComment={postComment} />
        </React.Fragment>
    );
}
const DishDetail = (props) => {
    if(props.isLoading)
    {
        return(
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        );
    }
    else if (props.errMess)
    {
        return(
            <div className="container">
                <div className="row">
                    <h4>{props.errMess}</h4>
                </div>
            </div>
        ); 
    }
    else if(props.dish != null)
    {
        return(
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to='/menu'>Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        <RenderDish dish = {props.dish}/>
                    </div>
                    <div className="col-12 col-md-5 m-1">
                        <h4>Comments</h4>
                        <ul className="list-unstyled">
                            <RenderComments comments={props.comments} 
                            postComment={props.postComment}
                            dishId={props.dish.id}/>
                        </ul>
                    </div>
                </div> 
            </div>
        );
    }
    else
    {
        return(
            <div></div>
        );
    }
}

class CommentForm extends Component 
{
    
    constructor(props)
    {
        super(props)

        this.state = 
        {
            isModalOpen: false
        }
        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }
    toggleModal()
    {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    handleSubmit(values)
    {
        this.toggleModal();
        this.props.postComment(this.props.dishId, values.rating, values.name, values.comment);
    }

    render()
    {
        return(
            <React.Fragment>
                <Button outline onClick={this.toggleModal}><span className="fa fa-pencil fa-lg"></span> Submit Comment</Button>
                <Modal isOpen={this.state.isModalOpen}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={this.handleSubmit}>
                            <Row className="mb-2">
                                <Col md={12}>                                
                                    <Label>Rating</Label>
                                </Col>
                            </Row>
                            <Row className="mb-2">
                                <Col md={12}>
                                    <Control.select className="form-control" model=".rating">
                                        <option defaultValue value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                    </Control.select>
                                </Col>                                
                            </Row>
                            <Row className="mb-2">
                                <Col md={12}>Your Name</Col>
                            </Row>
                            <Row className="mb-2">
                                <Col md={12}>
                                    <Control.text className="form-control" 
                                    model=".name"
                                    placeholder="Your Name"
                                    validators={{
                                        minLength: minLength(3),
                                        maxLength: maxLength(15)
                                    }}
                                    />
                                    <Errors
                                    className="text-danger"
                                    model=".name"
                                    show="touched"
                                    messages={{
                                        minLength: 'This field should at least be three characters long.',
                                        maxLength: 'This field should be less than or equal to 15 characters'
                                    }}/>
                                </Col>
                            </Row>
                            <Row className="mb-2">
                                <Col md={12}><Label>Comment</Label></Col>
                            </Row>
                            <Row className="mb-2">
                                <Col md={12}>
                                    <Control.textarea className="form-control" rows={6} 
                                        model=".comment"/>
                                </Col>
                            </Row>
                            <Row className="mb-2">
                                <Col md={{size: 3}}>
                                    <Button type="submit" color="primary">Submit</Button>
                                </Col>
                            </Row>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </React.Fragment>
        );
    }
}


export default DishDetail;