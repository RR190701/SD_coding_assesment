import React, { Component } from 'react';
import Box from '@mui/material/Box';
import ResponsiveDrawer from '../Navbar/navbar';
import axios from "axios";
import Comment from '../comment/comment';
export default class PDFViewer extends Component {
	state = {access:false, isloading:true};
	componentDidMount() {
		const checkAccess = async() => {
			const config = {
			  headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${localStorage.getItem("authToken")}`,
			  },
			};
		  try {
				const { data } = await axios.get(`/api/upload/viewFile/${localStorage.getItem("username")}/${this.props.match.params.pdfId}`, config);
				
		this.setState((state) => ({ access: true,isloading:false}));
			  
			  } 
			  catch (error) {
				
		this.setState((state) => ({ access: false, isloading:false})); 
			  }
			};
			
			checkAccess();
  
	  }


	render() {

		return (
			<>
			{this.state.isloading?
			<>
			
			<ResponsiveDrawer history={this.props.history}></ResponsiveDrawer> 
			<h2>loading file .....</h2>

</>
			:
			<Box sx={{ display: 'flex' }} >
			<ResponsiveDrawer history={this.props.history}></ResponsiveDrawer> 
			<div style={{"width":"100%"}}>
				<Box >
					{
						this.state.access?
						<>
						<div style={{"width":"80%","margin":"5.5rem auto 0",border: "solid rgb(175, 164, 164) 2px",borderRadius:"5px","maxHeight":"600px"}}>
<object
  data="https://html.spec.whatwg.org/print.pdf"
  type="application/pdf"
  width="100%"
  style={{ height: 'calc(100vh - 43px)' }}
  aria-label="This object displays an PDF file"
/>
				</div>

				<div style={{width:"100%", display:"flex"}}>
					<span style={{width:"80%", color:"red",fontSize:"12px", margin:"0 auto"}}>Note * The pdf you are viewing is different it is used as an example that we can veiw a pdf from a url, if we store pdf in cloud.
					You can share the browser link with the other user whom you have shared this file.</span>
				</div>
				
				<div style={{ display:"flex", justifyContent:"center"}}>
                    <Comment fileName = {this.props.match.params.pdfId}></Comment>
				</div>
			            
						</>
						:
						<div style={{"width":"100%","display":"flex",flexDirection:"column"}}>
							<img style={{margin:"7rem auto 0", "height":"200px"}} src="https://static.vecteezy.com/system/resources/previews/003/272/277/non_2x/no-symbol-prohibition-sign-not-allowed-icon-circle-with-backslash-vector.jpg"></img>
						<h1 style={{margin:"1rem auto", fontWeight:"500"}}>
							You donnot have access to this file
						</h1>

						</div>

					}
				
				</Box>
			</div>
		</Box>
			}
			</>
			
		);
	}
}