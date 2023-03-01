import {useState, useEffect} from "react"
import Post from "./Post"
import 
function Newsfeed() {
	const {user} = useAuth()

	const checkRequestStatus = function(){
		var temp=user?.post.filter(item => item.userId === props.post._id)
		if(temp.length > 0){
			return true // user posted the property
		}else{
			return false // havent posted yet 
		}
	}


	const [posts, setPosts] = useState([]);

	const getPosts = function () {
		fetch("/post/all", {
			method: "GET",
		})
			.then((res) => res.json())
			.then((data) => {
				if (!data.msg) setPosts(data);
			})
			.catch((err) => console.log(err));
	};
	useEffect(()=>{
		getPosts()
	},[])
	return (
		<div className="container-fluid">
			<div className="row">
				<div className="col-4 mt-2 mb-2 fs-3">New Feed</div>
			</div>
			<div className="col-4">
				{posts.map(postData => <Post postData={postData}/>)}
			</div>
		</div>
	);
}

export default Newsfeed;