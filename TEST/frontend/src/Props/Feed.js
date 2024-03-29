import {useState, useEffect} from "react"
import Post from "./Post"

function Newsfeed() {
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
				<div className="col-12 mt-2 mb-2 fs-3">New Feed</div>
			</div>
			<div>
				{posts.map(postData => <Post postData={postData}/>)}
			</div>
		</div>
	);
}

export default Newsfeed;