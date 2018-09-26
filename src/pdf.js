import React, { Component } from "react";
import { Document, Page } from "react-pdf";
//import Pages from "./components/pages";
import "pdfjs-dist/web/pdf_viewer.css";
import "react-pdf-reader/dist/TextLayerBuilder.css";
import "react-pdf-reader/dist/PdfReader.css";
import PDFReader from "react-pdf-reader";

export default class pdf extends Component {
    constructor(props) {
        super(props);
        this.state = {
            numPages: null,
            pageNum: 1
        };
    }

    onDocumentLoadSuccess = ({ numPages }) => {
        this.setState({ numPages });
    };

    // getPDFDoc() {
    //     axios.get('home').then(res=>{
    //         this.setState({pdf:res.data});
    //         console.log(this.state.pdf);
    //     })
    // }

    render() {
        const numPages = this.state.numPages;
        let indivPages = [];
        for (let i = 0; i < numPages; i++) {
            indivPages[i] = i;
        }
        //this.setState({ pdf: "Git Foundations Exercises.pdf" });

        return (
            <div>
                {/* <iframe src="/web/viewer.html" width="800px" height="800px"> */}
                <PDFReader
                    file="https://www.ets.org/s/gre/pdf/gre_math_review.pdf"
                    renderType="canvas"
                    onLoadSuccess={this.onDocumentLoadSuccess}
                >
                    {indivPages.map(i => (
                        <Page pageNumber={i} key={`document-page-${i}`} />
                    ))}
                </PDFReader>
                {/* <Document
            file="../Git Foundations Exercises.pdf"
            onLoadSuccess={this.onDocumentLoadSuccess}
          >
            {indivPages.map(i => (
              <Page pageNumber={i} key={`document-page-${i}`} />
            ))}
          </Document>
          <p>
            Page {indivPages} of {numPages}{" "}
          </p> */}

                {/* </iframe> */}
            </div>
        );
    }
}
