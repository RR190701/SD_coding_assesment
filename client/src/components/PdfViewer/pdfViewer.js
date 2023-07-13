import React, { Component } from 'react';
import { Document, Page, pdfjs } from "react-pdf";
import Box from '@mui/material/Box';
import pdfFile from './sample.pdf';
import ResponsiveDrawer from '../Navbar/navbar';
import axios from "axios";
import Comment from '../comment/comment';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export default class PDFViewer extends Component {
	state = { numPages: null, pageNumber: 1 , access:false, pdfFile:null};
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
				
		this.setState((state) => ({ access: true, pdfFile:data}));
		console.log("files",pdfFile);
			  
			  } 
			  catch (error) {
				
		this.setState((state) => ({ access: false})); 
			  }
			};
			
			checkAccess();
  
	  }

	onDocumentLoadSuccess = ({ numPages }) => {
		this.setState({ numPages });
	};

	goToPrevPage = () =>
		this.setState((state) => ({ pageNumber: state.pageNumber - 1 }));
	goToNextPage = () =>
		this.setState((state) => ({ pageNumber: state.pageNumber + 1 }));


	render() {

		return (
			<Box sx={{ display: 'flex' }} >
			<ResponsiveDrawer></ResponsiveDrawer> 
			<div style={{"width":"100%", "display":"flex", "justifyContent":"center"}}>
				<Box >
					{
						this.state.access?
						<>
						<div style={{"width":"600px","border":"solid 1.5px black","marginTop":"6rem","maxHeight":"700px","overflowY":"hidden"}}>
					<Document
						file={this.state.access && pdfFile}
						onLoadSuccess={this.onDocumentLoadSuccess}
					>
						<Page pageNumber={this.state.pageNumber} width={600} />
					</Document>
				</div>
				<div>
					
				<p style={{"fontSize":"13px", "margin":".5rem 0"}}>
					Page {this.state.pageNumber} of {this.state.numPages}
				</p>
				<nav >
					<button onClick={this.goToPrevPage}>Prev</button>
					<button onClick={this.goToNextPage}>Next</button>
				</nav>
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
		);
	}
}