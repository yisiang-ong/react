import React from 'react';
import { Card, CardImg, CardText, CardBody,
    CardTitle } from 'reactstrap';


    function RenderComments({dish}){
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
    function RenderDish({dish}) {
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
    const DishDetail = (props) => {
        
        console.log("Dish detail component render is invoked.");
        
        if (props.dish != null)
            return(
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-md-5 m-1">
                            <RenderDish dish = {props.dish} />
                        </div>
                        <div className="col-12 col-md-5 m-1">
                            <RenderComments dish = {props.dish} />
                        </div>
                    </div>    
                </div>
             );
        else
            return(
                <div></div>
            )
    }

export default DishDetail;