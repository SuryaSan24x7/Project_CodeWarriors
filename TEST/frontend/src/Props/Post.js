import "../Style.css"

function Post(props) {
	return (
		<div className="container-fluid p-3 border bg-white shadow mb-2">
			<div className="d-flex">
				<div>
					<img
						src={"/user/pic/" + props?.postData?.userId?.pic}
						alt="user"
						className="user-small-image rounded rounded-circle"
					/>
				</div>
				<div className="ms-3">
					<span className="fs-5 fw-bold">{props?.postData?.userId?.name}</span>
				</div>
			</div>
			<div className="row">
				<div className="col mt-1 mb-2">
					<span>{props?.postData?.postType}</span>
					<span>{props?.postData?.postCity}</span>
					<span>{props?.postData?.postState}</span>
					<span>{props?.postData?.postDistrict}</span>
					<span>{props?.postData?.postYear}</span>
					<span>{props?.postData?.postDimensions}</span>
					<span>{props?.postData?.postSqArea}</span>
					<span>{props?.postData?.postText}</span>
				</div>
			</div>
			<div className="row">
				<img src={"/post/pic/"+props?.postData?.postImage} alt="post" className="post-image" />
				
			</div>
		</div>
	);
}

export default Post;
