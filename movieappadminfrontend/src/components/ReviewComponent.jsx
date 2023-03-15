import React, { useEffect, useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import List from '@material-ui/core/List';

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
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/ReviewAdmin/").then(resp => resp.json()).then((data) => setReviews(data));
  },[])

  function acceptReview(movieId)
  {
    console.log(movieId)
    fetch("http://localhost:5000/Admin/"+movieId,
    {
    method: "PATCH", 
    body: JSON.stringify({isApproved:true}), 
    headers: {'Content-Type': "application/json",
            'accept':'*/*',
            'Access-Control-Allow-Origin': '*' }
    }).then(x=>x.text()).then(function() {
      fetch("http://localhost:5000/ReviewAdmin/").then(resp => resp.json()).then((data) => setReviews(data));
    }).catch(console.log);
  }

  function rejectReview(movieId)
  {
    console.log(movieId)
    fetch("http://localhost:5000/Admin/"+movieId,
    {
    method: "DELETE", 
    body: JSON.stringify({isApproved:true}), 
    headers: {'Content-Type': "application/json",
            'accept':'*/*',
            'Access-Control-Allow-Origin': '*' }
    }).then(x=>console.log(x.text())).then(function() {
      fetch("http://localhost:5000/ReviewAdmin/").then(resp => resp.json()).then((data) => setReviews(data));
    }).catch(console.log);
  }

  return (
  	<div className="pl-7">
    <Typography className={classes.revheading}>Validate Reviews:</Typography>
    <CircularProgress style={{ display: reviews?"none":"block", margin: "20px auto" }} />
    <List component="nav" className={classes.list}>
    { reviews?reviews.map(x=> (
        <div className="flex flex-col items-center p-6 rounded-lg shadow-lg bg-slate-800" style={{marginBottom:"1rem"}}>
        <div className="flex flex-col items-center md:flex-row ">
          <div className=" lg:w-[20%] h-auto md:h-[250px] w-[70%] ">
            <img
              className="w-[100%] h-full md:h-auto object-cover rounded-md"
              src={`https://image.tmdb.org/t/p/w500${x.image}`}
              alt=""
            />
          </div>
          <div className="float-left w-[70%] md:pl-12 ">
            <p className="text-1xl md:text-2xl mb-3 mt-3 md:mt-0">
              {x.title}{" "}
            </p>
            <div className="flex flex-row items-center ">
              <div className="flex flex-row justify-center items-center mr-5 pb-2">
                <p className="text-1xl ">
                  {`User Name: ${x.userName}`}
                </p>
              </div>
            </div>
            <p className="text-gray-300 mb-8">{`Posted Review: ${x.comment}`}</p>
            <div className="flex flex-row items-center ">
              <button
               onClick={() => acceptReview(x.id)}
                className="border text-[#FFFDE3] text-base border-gray-300 py-2 px-5 flex flex-row items-center hover:bg-cyan-600 hover:border-cyan-600 mb-1 md:mb-0"
              >
                Accept
              </button>
              &nbsp;&nbsp;
              <button
                onClick={() => rejectReview(x.id)}
                className="border text-[#FFFDE3] text-base border-gray-300 py-2 px-5 flex flex-row items-center hover:bg-cyan-600 hover:border-cyan-600 mb-1 md:mb-0"
              >
                Reject
              </button>
            </div>
          </div>
        </div>
      </div>
    )):"" }
    </List>
  </div>
  )
}