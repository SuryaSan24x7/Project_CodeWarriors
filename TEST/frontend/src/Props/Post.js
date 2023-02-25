import "../Style.css"
import React, { useState } from "react";

function Post(props) {
	  const [propertyData, setPropertyData] = useState({
		propertyType: "",
		year: "",
		district: "",
		address: "",
		dimensions: "",
		sqArea: "",
	  });
	
	  const [errors, setErrors] = useState({});
	
	  const handleChange = (e) => {
		const { name, value } = e.target;
		setPropertyData((prevState) => ({ ...prevState, [name]: value }));
	  };
	
	  const handleSubmit = async (e) => {
		e.preventDefault();
	
		try {
		 
		  if (!propertyData.propertyType) {
			throw new Error("Please select a property type");
		  }
	
		  if (!propertyData.year) {
			throw new Error("Please enter the year of the property");
		  }
	
		  await props.onSubmit(propertyData);
		} catch (error) {
		  setErrors((prevState) => ({ ...prevState, submit: error.message }));
		}
	  };
	
	  return (
		<form onSubmit={handleSubmit}>
		  <div className="mb-3">
			<label className="form-label">
			  Property Type
			</label>
			<select
			  id="propertyType"
			  name="propertyType"
			  className="form-select"
			  value={propertyData.propertyType}
			  onChange={handleChange}
			>
			  <option value="">Select Property Type</option>
			  <option value="apartment">Apartment</option>
			  <option value="house">House</option>
			  <option value="land">Land</option>
			</select>
			{errors.propertyType && <div className="text-danger">{errors.propertyType}</div>}
		  </div>
		  <div className="mb-3">
			<label  className="form-label">
			  Year
			</label>
			<input
			  type="text"
			  id="year"
			  name="year"
			  className="form-control"
			  value={propertyData.year}
			  onChange={handleChange}
			/>
			{errors.year && <div className="text-danger">{errors.year}</div>}
		  </div>
		  <div className="mb-3">
			<label  className="form-label">
			  District
			</label>
			<input
			  type="text"
			  id="district"
			  name="district"
			  className="form-control"
			  value={propertyData.district}
			  onChange={handleChange}
			/>
		  </div>
		  <div className="mb-3">
			<label className="form-label">
			  Address
			</label>
			<textarea
			  id="address"
			  name="address"
			  className="form-control"
			  value={propertyData.address}
			  onChange={handleChange}
			></textarea>
		  </div>
		  <div className="mb-3">
			<label  className="form-label">
			  Dimensions
			</label>
			<input
			  type="text"
			  id="dimensions"
			  name="dimensions"
			  className="form-control"
			  value={propertyData.dimensions}
			  onChange={handleChange}
			/>
		  </div>
		  <div className="mb-3">
			<label  className="form-label">
			  Square Area
			</label>
			<input
			  type="text"
			  id="sqArea"
			  name="sqArea"
			  className="form-control"
			  value={propertyData.sqArea}
			  onChange={handleChange}
			  />
			  </div>
			  <button type="submit" className="btn btn-primary">
				Post
			  </button>
			</form>
		  );
		}
		
export default Post;
	