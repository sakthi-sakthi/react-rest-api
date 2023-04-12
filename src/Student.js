import { useEffect, useState, useRef } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import $ from 'jquery';
import { useReactToPrint } from "react-to-print";
import students from './db.json'; 
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

$(document).ready(function () {
    $("#myInput").on("keyup", function () {
        var value = $(this).val().toLowerCase();
        $("#myTable tr").filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });
});

const Student = () => {
    const componentPDF = useRef();
    const [stud, studdata] = useState(null);
    const navigate = useNavigate();

    const LoadEdit = (id) => {
        navigate("/students/edit/" + id);
    }
    const Removefunction = (id) => {
        if (window.confirm("Are You Sure You Want to Delete this Data?")) {
            fetch("http://localhost:8000/students/" + id, {
                method: "DELETE"
            }).then((res) => {
                alert('Student Data Deleted Successfully')
                window.location.reload();
            }).catch((err) => {
                console.log(err.message)
            })
        }
    }
    useEffect(() => {
        fetch("http://localhost:8000/students").then((res) => {
            return res.json();
        }).then((resp) => {
            studdata(resp);
        }).catch((err) => {
            console.log(err.message);
        })
    }, [])

    const generatePDF = useReactToPrint({
        content: () => componentPDF.current,
        documentTitle: "StudentData",
        
    });

    return (
        <div className="container">
            <div className="card">
                <div className="card-body">
                    <div className="divbt">
                        <Link to="students/create" className="btn btn-success">Add Students</Link>
                        &nbsp;&nbsp;&nbsp;<button className="btn btn-primary" onClick={generatePDF} id="pdf">Generate PDF</button>

                    </div>
                    <input id="myInput" type="text" placeholder="Search.."></input>
                    <div ref={componentPDF} style={{ width: '100%' }}>
                        <table className="table table-bordered" id="myTable">
                            <thead className="bg-dark text-white">
                                <tr>
                                    <td>ID</td>
                                    <td>Name</td>
                                    <td>Age</td>
                                    <td>Gender</td>
                                    <td>Mobile</td>
                                    <td id="noprint">Actions</td>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    stud &&
                                    stud.map(item => (
                                        <tr key={item.id}>
                                            <td>{item.id}</td>
                                            <td>{item.name}</td>
                                            <td>{item.age}</td>
                                            <td>{item.gender}</td>
                                            <td>{item.mobile}</td>
                                            <td><a  className="btn btn-primary" id="print">Edit</a>
                                                &nbsp; <a onClick={() => { Removefunction(item.id) }} className="btn btn-danger" id="print">Delete</a>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Student;