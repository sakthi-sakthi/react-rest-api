import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import $ from 'jquery';



const StudCreate = () => {
    const [id, studid] = useState("");
    const [name, studname] = useState("");
    const [age, studage] = useState("");
    const [gender, studgen] = useState("");
    const [mobile, studmobile] = useState("");
    const [val, studval] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const studdata = { name, age, gender, mobile };

        fetch("http://localhost:8000/students", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(studdata)
        }).then((res) => {
            alert('Student Data Saved Successfully')
            navigate('/');
        }).catch((err) => {
            console.log(err.message)
        })
    }



    return (
        <div>
            <div className="row">
                <div className="offset-lg-3 col-lg-6">
                    <form className="container" onSubmit={handleSubmit}>
                        <div className="card" style={{ textAlign: "left" }}>
                            <div className="card-title" style={{ textAlign: "center" }}>
                                <h2>Add Students Data</h2>
                            </div>
                            <div className="card-body">
                                <div className="row">

                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>ID</label>
                                            <input value={id} onChange={e => studid(e.target.value)} disabled type="text" className="form-control" />
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <br></br>
                                        <div className="form-group">
                                            <label>Name <span className="errmsg">*</span></label>
                                            <input value={name} onMouseDown={e => studval(true)} onChange={e => studname(e.target.value)} type="text" className="form-control" pattern="[A-Za-z]{1,32}" required />
                                            {name.length === 0 && val && <span className="errmsg">Enter Your Name</span>}
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <br></br>
                                        <div className="form-group">
                                            <label>Age<span className="errmsg">*</span></label>
                                            <input value={age} onMouseDown={e => studval(true)} onChange={e => studage(e.target.value)} type="number" className="form-control" required />
                                            {age.length === 0 && val && <span className="errmsg">Enter Your Age</span>}
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <br></br>
                                        <div className="form-group">
                                            <label>Gender<span className="errmsg">*</span></label>&nbsp;&nbsp;&nbsp;
                                            <input type="radio" id="gen" onMouseDown={e => studval(true)} onChange={e => studgen(e.target.value)} value="Male" name="gender" className="custom-control-input" /> Male &nbsp;&nbsp;&nbsp;
                                            <input type="radio" id="gen" onMouseDown={e => studval(true)} onChange={e => studgen(e.target.value)} value="Female" name="gender" className="custom-control-input" /> Female
                                            {gender.length === 0 && val && <span className="errmsg">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Please Select Your Gender</span>}
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <br></br>
                                        <div className="form-group">
                                            <span id="mobile-valid" class="hidden mob">
                                                <i class="fa fa-check pwd-valid"></i>Valid Mobile No
                                            </span>
                                            <span id="folio-invalid" class="hidden mob-helpers">
                                                <i class="fa fa-times mobile-invalid"></i>Invalid mobile No
                                            </span>
                                            <label>Mobile<span className="errmsg">*</span></label>
                                            <input value={mobile} id="mob" onMouseDown={e => studval(true)} onChange={e => studmobile(e.target.value)} type="number" className="form-control"  required />
                                            {/* {mobile.length > 10 && val && <span className="errmsg">Please Check Your Mobile Number</span>} */}
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <br></br>
                                        <div className="form-group">
                                            <button type="submit" className="btn btn-success">Save</button>
                                            &nbsp;&nbsp;<Link to="/" className="btn btn-danger">Back</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
export default StudCreate;