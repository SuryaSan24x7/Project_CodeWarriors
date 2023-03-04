import {useState, useEffect} from "react"
import PropertyList from "./Enlist";
import View from "./View"

function Cart(props) {
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
				<div className="col-4 mt-2 mb-2 fs-3">Cart</div>
			</div>
			<div className="col-4">
			{posts.filter(postData => postData.postCity === props).map(postData => (
  <View key={postData.postCity} postData={postData} />))}
			</div>
			<div>
				<PropertyList/>
			</div>
		</div>
	);
}

export default Cart;