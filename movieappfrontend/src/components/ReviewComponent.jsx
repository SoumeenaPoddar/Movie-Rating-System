import React, { useEffect, useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Rating from '@material-ui/lab/Rating';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { BsFillEmojiSmileFill } from "react-icons/bs";

const useStyles = makeStyles((theme) => ({
  heading: {
  	fontSize: 30,
  	color: "white",
  	margin: 15,
    paddingTop:'5rem'
  },
  rating: {
  	margin: "0px 0px 20px 20px",
	paddingRight:"1rem"
  },
  reviewBox: {
  	maxWidth: 500,
  	fontSize: 20,
  	fontWeight: "bolder",
  	width: "250%",
  	background: "rgb(30,30,30)",
  	border: "none",
  	padding: 15,
  	color: "white",
  	borderRadius: 30,
    letterSpacing: 3,
    wordSpacing: 7,
  	[theme.breakpoints.down('sm')]: {
  		width: "80%"
  	},
  	'&:focus': {
      outline: "none"
    }
  },
  postButton: {
  	background: "transparent",
  	border: "2px solid white",
  	color: "white",
  	fontWeight: "bolder",
  	borderRadius: 17,
  },
  disabledButton: {
    borderColor: "blue",
	color:"blue"
  },
  revheading: {
    fontSize: 30,
    color: "white",
    marginTop: 45,
    marginLeft: 15
  },
  list: {
    background: '#121212',
    color: 'white',
    margin: 30,
    [theme.breakpoints.down('xs')]: {
      marginLeft: 10
    }
  },
  text: {
    fontSize: 20,
    margin: 15,
    color: "white"
  },
  poster: {
    maxWidth: 50
  },
  avatar: {
    margin: 25
  },
  box: {
    fontSize: 20,
    margin: 15,
    [theme.breakpoints.down('xs')]: {
      display: "none"
    }
  }
}));

export default function ReviewComponent(props) {

  const classes = useStyles();
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(5);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/Review/"+localStorage.getItem("movieId")).then(resp => resp.json()).then((data) => setReviews(data));
  },[])

  var isLoggedIn = localStorage.getItem("email")?true:false;

  function postReview(rating,review,type) {
    let reviewData = {
                      movieId:localStorage.getItem("movieId"),
                      title:localStorage.getItem("title"),
                      image:localStorage.getItem("image"),
                      userName:localStorage.getItem("userName"),
                      comment:review,
                      rating:rating
                    }
    fetch("http://localhost:5000/Review/",
    {
    method: "POST", 
    body: JSON.stringify(reviewData), 
    headers: {'Content-Type': "application/json",
            'accept':'*/*',
            'Access-Control-Allow-Origin': 'http://localhost:3000' }
    }).then(x=>x.text()).then(function() {
      setReview("")
      fetch("http://localhost:5000/Review/"+localStorage.getItem("movieId")).then(resp => resp.json()).then((data) => setReviews(data));
    }).catch(console.log);
  };

  return (
  	<div className="pl-7">
  	<Typography className={classes.heading}>Post Review</Typography>
  	<TextareaAutosize disabled={!isLoggedIn} value={review} onChange={ (e) => setReview(e.target.value) } maxLength={300} className={classes.reviewBox} boxShadow={3} rowsMin={6} placeholder={isLoggedIn?"Write Your Review Here ...":"Please Sign In to Write Your Review Here ..."} />
  	<p>
	<Rating button value={rating} onChange={ (e,rtg) => setRating(rtg) } className={classes.rating} />
    <Button onClick={ () => postReview(rating,review,props.type) } className={classes.postButton} classes={{ disabled: classes.disabledButton }} disabled={!review.length>0}>Post Review</Button>
  	</p>
	  <div>
    <Typography className={classes.revheading}>Reviews</Typography>
    <CircularProgress style={{ display: reviews?"none":"block", margin: "20px auto" }} />
    <List component="nav" className={classes.list}>
    { reviews?reviews.map(x=> (
      <ListItem button>
		    <BsFillEmojiSmileFill className="text-neutral-100 text-2xl text-purple-600 pl-1"/>
		    &nbsp;{x.userName+": "}
        {!x.isApproved?(
          <Typography className={classes.text}>{'Your posted review is under is under verification'}</Typography>
        ):(
          <div>
              <Typography className={classes.text}>{ x.comment }</Typography>
              <Typography className={classes.text}><Rating readOnly value={ parseInt(x.rating) } /></Typography>
          </div>
         )}
      </ListItem>
    )):"" }
    </List>
    </div>
	</div>
	
  )
}