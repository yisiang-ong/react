import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody,
    CardTitle } from 'reactstrap';
class DishDetail extends Component{
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    renderComments(dish){
        if (dish != null){
            const dateformatter = new Intl.DateTimeFormat("en-US", { 
                year: "numeric",
                month: "short", 
                day: "2-digit" 
            });
            const comments = dish.comments.map((comment) => {
                return(
                    <ul key={comment.id} className="list-unstyled">
                        <li>{comment.comment}</li>
                        <li>
                            -- {comment.author}, { }
                            {dateformatter.format(new Date(Date.parse(comment.date)))}
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
    renderDish(dish) {
        if (dish != null) {
          return (
            
            <Card>
                <CardImg width="100%" src={dish.image} alt={dish.name} />
                <CardBody>
                <CardTitle>{dish.name}</CardTitle>
                <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>

          );
        } else {
          return <div></div>;
        }
      }
    render() {
    
        const dish = this.props.dish;
        console.log("dish detail render is invoked.");
        return(
            <div className="container">
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        {this.renderDish(dish)}
                    </div>
                    <div className="col-12 col-md-5 m-1">
                        {this.renderComments(dish)}
                    </div>
                </div>    
            </div>
            
            
        );
    }
}

export default DishDetail;