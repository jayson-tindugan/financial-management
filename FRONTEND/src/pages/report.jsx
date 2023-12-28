import React, { useState, useRef } from "react";
import { Header, Sidebar, MainGreetings } from "../components/Components.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "../assets/css/global.css";
import { useReactToPrint } from "react-to-print"; //npm i react-to-print
import { useDownloadExcel } from "react-export-table-to-excel"; //npm i react-export-table-to-excel

function Report() {
    const [isSidebarVisible, setIsSidebarVisible] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarVisible(!isSidebarVisible);
    };

    const componentPDF = useRef();
    const generatePDF = useReactToPrint({
        content: () => componentPDF.current,
        documentTitle: "Financial History",
    });

    const componentExcel = useRef();
    const { onDownload } = useDownloadExcel({
        currentTableRef: componentExcel.current,
        filename: "Financial History",
        sheet: "Financial-History",
    });
    return (
        <div>
            <Header toggleSidebar={toggleSidebar} />
            <div
                className={`main-content${
                    isSidebarVisible ? " sidebar-open" : ""
                }`}
            >
                <MainGreetings />
                <div className="rep-pg-container">
                    <div className="row1">
                        <div className="column1">
                            <div ref={componentPDF} style={{ width: "100%" }}>
                                <div className="tbl-header">
                                    <h3 style={{ color: "#ffffff" }}>
                                        TITLE HOLDER
                                    </h3>
                                </div>
                                <div className="table-container">
                                    <table
                                        class="table table-bordered"
                                        ref={componentExcel}
                                    >
                                        <thead>
                                            <tr>
                                                <th scope="col">Column 1</th>
                                                <th scope="col">Column 2</th>
                                                <th scope="col">Column 3</th>
                                                <th scope="col">Column 4</th>
                                                <th scope="col">Column 5</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <th scope="row">Sample Data</th>
                                                <td>Data</td>
                                                <td>Data</td>
                                                <td>Data</td>
                                                <td>Data</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">Sample Data</th>
                                                <td>Data</td>
                                                <td>Data</td>
                                                <td>Data</td>
                                                <td>Data</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">Sample Data</th>
                                                <td>Data</td>
                                                <td>Data</td>
                                                <td>Data</td>
                                                <td>Data</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row2">
                        <div className="column2">
                            <label for="start" className="label-export">
                                Start from:{" "}
                            </label>
                            <input
                                type="date"
                                id="startdate"
                                name="startdate"
                            ></input>

                            <label for="end" className="label-export">
                                End to:{" "}
                            </label>
                            <input
                                type="date"
                                id="enddate"
                                name="enddate"
                            ></input>

                            <button className="btn-export" onClick={onDownload}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="18"
                                    height="18"
                                    fill="currentColor"
                                    class="bi bi-filetype-xls"
                                    viewBox="0 0 16 16"
                                >
                                    <path
                                        fill-rule="evenodd"
                                        d="M14 4.5V14a2 2 0 0 1-2 2h-1v-1h1a1 1 0 0 0 1-1V4.5h-2A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v9H2V2a2 2 0 0 1 2-2h5.5zM6.472 15.29a1.176 1.176 0 0 1-.111-.449h.765a.578.578 0 0 0 .254.384c.07.049.154.087.25.114.095.028.202.041.319.041.164 0 .302-.023.413-.07a.559.559 0 0 0 .255-.193.507.507 0 0 0 .085-.29.387.387 0 0 0-.153-.326c-.101-.08-.255-.144-.462-.193l-.619-.143a1.72 1.72 0 0 1-.539-.214 1.001 1.001 0 0 1-.351-.367 1.068 1.068 0 0 1-.123-.524c0-.244.063-.457.19-.639.127-.181.303-.322.527-.422.225-.1.484-.149.777-.149.305 0 .564.05.78.152.216.102.383.239.5.41.12.17.186.359.2.566h-.75a.56.56 0 0 0-.12-.258.625.625 0 0 0-.247-.181.923.923 0 0 0-.369-.068c-.217 0-.388.05-.513.152a.472.472 0 0 0-.184.384c0 .121.048.22.143.3a.97.97 0 0 0 .405.175l.62.143c.217.05.406.12.566.211a1 1 0 0 1 .375.358c.09.148.135.335.135.56 0 .247-.063.466-.188.656a1.216 1.216 0 0 1-.539.439c-.234.105-.52.158-.858.158-.254 0-.476-.03-.665-.09a1.404 1.404 0 0 1-.478-.252 1.13 1.13 0 0 1-.29-.375Zm-2.945-3.358h-.893L1.81 13.37h-.036l-.832-1.438h-.93l1.227 1.983L0 15.931h.861l.853-1.415h.035l.85 1.415h.908L2.253 13.94l1.274-2.007Zm2.727 3.325H4.557v-3.325h-.79v4h2.487v-.675"
                                    />
                                </svg>
                                Export EXCEL
                            </button>

                            <button
                                className="btn-export"
                                onClick={generatePDF}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="18"
                                    height="18"
                                    fill="currentColor"
                                    class="bi bi-filetype-pdf"
                                    viewBox="0 0 16 16"
                                >
                                    <path
                                        fill-rule="evenodd"
                                        d="M14 4.5V14a2 2 0 0 1-2 2h-1v-1h1a1 1 0 0 0 1-1V4.5h-2A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v9H2V2a2 2 0 0 1 2-2h5.5zM1.6 11.85H0v3.999h.791v-1.342h.803c.287 0 .531-.057.732-.173.203-.117.358-.275.463-.474a1.42 1.42 0 0 0 .161-.677c0-.25-.053-.476-.158-.677a1.176 1.176 0 0 0-.46-.477c-.2-.12-.443-.179-.732-.179Zm.545 1.333a.795.795 0 0 1-.085.38.574.574 0 0 1-.238.241.794.794 0 0 1-.375.082H.788V12.48h.66c.218 0 .389.06.512.181.123.122.185.296.185.522Zm1.217-1.333v3.999h1.46c.401 0 .734-.08.998-.237a1.45 1.45 0 0 0 .595-.689c.13-.3.196-.662.196-1.084 0-.42-.065-.778-.196-1.075a1.426 1.426 0 0 0-.589-.68c-.264-.156-.599-.234-1.005-.234H3.362Zm.791.645h.563c.248 0 .45.05.609.152a.89.89 0 0 1 .354.454c.079.201.118.452.118.753a2.3 2.3 0 0 1-.068.592 1.14 1.14 0 0 1-.196.422.8.8 0 0 1-.334.252 1.298 1.298 0 0 1-.483.082h-.563v-2.707Zm3.743 1.763v1.591h-.79V11.85h2.548v.653H7.896v1.117h1.606v.638H7.896Z"
                                    />
                                </svg>
                                Export PDF
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <Sidebar isSidebarVisible={isSidebarVisible} />
        </div>
    );
}

export default Report;
