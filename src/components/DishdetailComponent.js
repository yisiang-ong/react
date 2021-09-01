import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody,
    CardTitle } from 'reactstrap';
class DishDetail extends Component{
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    renderComments(detail){
        if (detail != null){
            const dateformatter = new Intl.DateTimeFormat("en", { 
                year: "numeric",
                month: "short", 
                day: "numeric" 
            });
            const comments = detail.comments.map((comment) => {
                return(
                    <ul key={comment.id} className="list-unstyled">
                        <li>{comment.comment}</li>
                        <li>
                            -- {comment.author}, { }
                            {dateformatter.format(new Date(comment.date))}
                        </li>
                    </ul>
                )
            });

            return(
                <div>
                    <h4>Comments</h4>
                    {comments}
                </div>
            );
        } else {
            return <div></div>;
        }
    }
    renderDish(detail) {
        if (detail != null) {
          return (
            
            <Card>
                <CardImg width="100%" src={detail.image} alt={detail.name} />
                <CardBody>
                <CardTitle>{detail.name}</CardTitle>
                <CardText>{detail.description}</CardText>
                </CardBody>
            </Card>

          );
        } else {
          return <div></div>;
        }
      }
    render() {
    
        const detail = this.props.detail;
        console.log("dish detail render is invoked.");
        return(
            <div className="row">
                <div className="col-12 col-md-5 m-1">
                    {this.renderDish(detail)}
                </div>
                <div className="col-12 col-md-5 m-1">
                    {this.renderComments(detail)}
                </div>
            </div>
            
        );
    }
}

export default DishDetail;