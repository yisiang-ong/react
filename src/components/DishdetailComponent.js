import React,{Component} from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody,
    CardTitle,Breadcrumb,BreadcrumbItem,Button,Modal,ModalHeader,ModalBody,Col,Row,Label } from 'reactstrap';
import { Link } from 'react-router-dom';
import {Control,LocalForm,Errors} from 'react-redux-form';
import { Loading } from './LoadingComponent';
    function RenderComments({comments, addComment, dishId}) {
        const dateformatter = new Intl.DateTimeFormat("en-US", { 
            year: "numeric",
            month: "short", 
            day: "2-digit" 
        });
        
        if (comments != null){
            return(
                <div className="col-12 col-md-5 m-1">
                    <h4>Comments</h4>
                    <ul className="list-unstyled">
                        {comments.map((comment) => {
                            return(
                                <li key={comment.id}>
                                    <p>{comment.comment}</p>
                                    <p>--{comment.author}, {dateformatter.format(new Date(Date.parse(comment.date)))}</p>
                                </li>
                            ); 
                        })}
                    </ul>
                    {/* Render CommentForm from CommentForm.js */}
                    <CommentForm dishId={dishId} addComment={addComment} />
                </div>
            );
        } else {
            return(
                <div></div>
            );
        }
    }
    function RenderDish({dish}) {
        if (dish != null) {
          return (  
            <div className="col-12 col-md-5 m-1">
                <Card>
                    <CardImg width="100%" src={dish.image} alt={dish.name} />
                    <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            </div>
          );
        } else {
          return (
            <div></div>
          );
        }
      }

    //   Create CommentForm Class Component which has Button, toggleModal, Modal, LocalForm all inside React.Fragment.
      const required = (val) => val && val.length;
      const maxLength = (len) => (val) => !(val) || (val.length <= len);
      const minLength = (len) => (val) => val && (val.length >= len);
      
      class CommentForm extends Component {
          
          constructor(props) {
              super(props);
              
              this.state={
                  isModalOpen: false
              };
              this.toggleModal = this.toggleModal.bind(this); 
              this.handleSubmit = this.handleSubmit.bind(this);  
          }
          
          toggleModal() {
              this.setState({
                isModalOpen: !this.state.isModalOpen
              });
          }
      
          handleSubmit(values) {
              this.toggleModal();
              // use addCommetn function from /redux/ActionCreator.js which is passed through MainComponent.js
              if(!values.rating)
                  values={...values,rating:"1"}
              this.props.addComment(this.props.dishId, values.rating, values.author, values.comment);
              // event.preventDefault();
          }
      
      
          render() {
              return(
                  <React.Fragment>
                      <Button outline onClick={this.toggleModal}><span className="fa fa-edit"></span>Submit Comment</Button>
                      <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                          <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                          <ModalBody>
                              <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                                  <Row className="form-group">
                                      <Col>
                                          <Label htmlFor="Ratings">Ratings</Label>
                                          <Control.select model=".ratings" id="rating" name="rating"
                                              className="form-control">
                                              <option>1</option>
                                              <option>2</option>
                                              <option>3</option>
                                              <option>4</option>
                                              <option>5</option>
                                          </Control.select>
                                      </Col>
                                  </Row>
                                  <Row className="form-group">
                                      <Col>
                                          <Label htmlFor="author">Your Name</Label>
                                          <Control.text model=".author" id="author" name="author"
                                              placeholder="Your Name"
                                              className="form-control"
                                              validators={{
                                                  required, minLength: minLength(3), maxLength: maxLength(15)
                                              }}
                                              />
                                          <Errors
                                              className="text-danger"
                                              model=".author"
                                              show="touched"
                                              messages={{
                                                  required: 'Required',
                                                  minLength: 'Must be greater than 2 characters',
                                                  maxLength: 'Must be 15 characters or less'
                                              }}
                                          />
                                      </Col>
                                  </Row>
                                  <Row className="form-group">
                                      <Col>
                                          <Label htmlFor="comment">Comment</Label>
                                          <Control.textarea model=".comment" id="comment" name="comment"
                                              rows="12"
                                              className="form-control" />
                                      </Col>
                                  </Row>
                                  <Row className="form-group">
                                      <Col>
                                          <Button type="submit" color="primary">
                                          Submit
                                          </Button>
                                      </Col>
                                  </Row>
                              </LocalForm>
                          </ModalBody>
                      </Modal>
                  </React.Fragment>  
              );
          }
        }
    const DishDetail = (props) => {
        
        if (props.isLoading) {
            return(
                <div className="container">
                    <div className="row">            
                        <Loading />
                    </div>
                </div>
            );
        }
        else if (props.errMess) {
            return(
                <div className="container">
                    <div className="row">            
                        <h4>{props.errMess}</h4>
                    </div>
                </div>
            );
        }
        else if (props.dish != null)
            return(
                <div className="container">
                    <div className="row">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                            <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                        </Breadcrumb>
                        <div className="col-12">
                            <h3>{props.dish.name}</h3>
                            <hr />
                        </div>
                    </div>
                    <div className="row">
                        <RenderDish dish = {props.dish} />
                        <RenderComments comments = {props.comments} 
                            addComment={props.addComment}
                            dishId={props.dish.id}
                        />
                    </div>
                </div>
             );
        else
            return(
                <div></div>
            )
    }

export default DishDetail;