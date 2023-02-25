import "../Style.css"

function Post(props) {
	return (
		<div className="container-fluid p-3 border bg-white shadow mb-2">
			<div className="d-flex">
				<div>
					<img
						src={"/user/pic/" + props?.postData?.userId?.pic}
						className="user-small-image rounded rounded-circle"
					/>
				</div>
				<div className="ms-3">
					<span className="fs-5 fw-bold">{props?.postData?.userId?.name}</span>
				</div>
			</div>
			<div className="row">
				<div className="col mt-1 mb-2">
					<span>{props?.postData?.postText}</span>
				</div>
			</div>
			<div className="row">
				<img src={"/post/pic/"+props?.postData?.postImage} className="post-image" />
			</div>
		</div>
	);
}

export default Post;
