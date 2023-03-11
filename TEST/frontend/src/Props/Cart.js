import {useState, useEffect} from "react"
import PropertyList from "./Enlist";
import View from "./View"
import Postv2 from "./Postv2.js"

function Cart() {
    const [posts, setPosts] = useState([]);

    const getPosts = function () {
        fetch("/cart/all", {
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
            <Postv2 postData/>
            </div>
            <div>

            </div>
        </div>
    );
}

export default Cart;

// function Cart(props) {
// 	const [posts, setPosts] = useState([]);
// 	const getPosts = function () {
// 		fetch("/cart", {
// 			method: "GET",
// 		})
// 			.then((res) => res.json())
// 			.then((data) => {
// 				if (!data.msg) setPosts(data);
// 			})
// 			.catch((err) => console.log(err));
// 	};
// 	useEffect(()=>{
// 		getPosts()
// 	},[])

// 	// const postToFind = props;

// 	// const foundPost = posts.find(postData => postData.userId === postToFind);
// 	// 	console.log(posts);
// 	// 	console.log(postToFind);
// 	// 	if (foundPost) {
// 	// 	// render the Postv2 component with the found post data
// 	// 	return <Postv2 postData={foundPost} />;
// 	// 	} else {
// 	// 	// handle the case where the post is not found
// 	// 	return <p>Post not found</p>;
// 	// 	}

// 	return (
// 		<div className="container-fluid">
// 			<div className="row">
// 				<div className="col-4 mt-2 mb-2 fs-3">Cart</div>
// 			</div>
// 			<div>
// 				{posts.map(postData => <Postv2 postData={postData}/>)}
// 			</div>
// 		</div>
// 	);
// }

// export default Cart;