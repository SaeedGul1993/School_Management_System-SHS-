import React from 'react';
import './viewPanel.css';

class PrintDataByClass extends React.Component {
    render() {
        return (
            <div>
                {this.props.paidStudentArray.map((fee) => {
                    return (
                        <div className="print-table-container">
                            <table className="print-table-all">
                                <tbody>
                                    <tr>
                                        <td colSpan="4" className="first-td">
                                            <h1>HBL</h1>
                                            <p>Temoriya Market Branch Block North Nazimabad Branch Block North Nazimabad,Karachi..</p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colSpan="4" className="second-td">
                                            <h3>STANDARD HIGH SCHOOL</h3>
                                            <p>D-67.Block B North Nazimabad Karachi</p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colSpan="4" className="second-td" >
                                            <h4>A/C: 0006347900351703</h4>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colSpan="4" className="table-td" >
                                            Name Of Student : {fee.studentName}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colSpan="4" className="table-td" >
                                            Father's Name : {fee.fatherName}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="table-td"  >
                                            Class : {fee.ClassName}
                                        </td>
                                        <td colSpan="3" className="table-td" >
                                            Issue Date : {fee.issueDate}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colSpan="2" className="table-td"  >
                                            Vochure No : {fee.vochureNumber}
                                        </td>
                                        <td className="table-td" >
                                            <p> Gr:No </p>
                                        </td>
                                        <td className="table-td" >
                                            {fee.grNo}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="table-td">
                                        </td>
                                        <td className="table-td">
                                            <p>Fee</p>
                                        </td> <td className="table-td">
                                            <p>Late Fee</p>
                                        </td> <td className="table-td">
                                            <p>Total</p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="table-td">
                                            <p id="side-heading">Tuition Fee</p>
                                        </td>
                                        <td className="table-td">
                                            <p>{fee.monthlyFee}</p>
                                        </td>
                                        <td className="table-td">
                                        </td>
                                        <td className="table-td">
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="table-td">
                                            <p id="side-heading">Admission Fee</p>
                                        </td>
                                        <td className="table-td">
                                            <p>{fee.admissionFee} </p>
                                        </td>
                                        <td className="table-td">
                                        </td> <td className="table-td">
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="table-td">
                                            <p id="side-heading">Computer Fee</p>
                                        </td>
                                        <td className="table-td">
                                            <p>{fee.computerFee}</p>
                                        </td>
                                        <td className="table-td">
                                        </td> <td className="table-td">
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="table-td">
                                            <p id="side-heading">ExaminFee</p>
                                        </td>
                                        <td className="table-td">
                                            <p>{fee.examinationFee}</p>
                                        </td>
                                        <td className="table-td">
                                        </td>
                                        <td className="table-td">
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="table-td">
                                            <p id="side-heading">LabCharges</p>
                                        </td>
                                        <td className="table-td">
                                            <p>{fee.labCharges}</p>
                                        </td>
                                        <td className="table-td">
                                        </td> <td className="table-td">
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="table-td">
                                            <p id="side-heading">AnnualFee</p>
                                        </td>
                                        <td className="table-td">
                                            <p>{fee.annualCharges}</p>
                                        </td>
                                        <td className="table-td">
                                        </td> <td className="table-td">
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="table-td">
                                            <p id="side-heading">Late Fee</p>
                                        </td>
                                        <td className="table-td">
                                            <p>  {fee.lateFee} </p>
                                        </td> <td className="table-td">
                                        </td> <td className="table-td">
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="table-td">
                                            <p id="side-heading">Due Date</p>
                                        </td>
                                        <td className="table-td">
                                        </td> <td className="table-td">
                                        </td> <td className="table-td">
                                            <p>{fee.dueDateAmount}</p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="table-td">
                                            <p id="side-heading">After Due Date</p>
                                        </td>
                                        <td className="table-td">
                                        </td>
                                        <td className="table-td">
                                        </td>
                                        <td className="table-td">
                                            <p> {fee.afterDueDateAmount}</p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="table-td" colSpan="4">
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="table-td" colSpan="3">
                                            <p id="side-heading"> Due Date : {fee.dueDate}</p>
                                        </td>
                                        <td className="table-td">
                                            <p>{fee.dueDateAmount}</p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="table-td" colSpan="3">
                                            <p id="side-heading">After Due Date : {fee.issueDate} </p>
                                        </td>
                                        <td className="table-td">
                                            <p> {fee.afterDueDateAmount}</p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="table-td" colSpan="4">
                                            <p >Parent Copy</p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="table-td" colSpan="4">
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="table-td" colSpan="4">
                                            <p id="side-heading">Accountant Signature : </p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="table-td" colSpan="4">
                                            <p id="side-heading">InCharge Signature : </p>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <table className="print-table-all">
                                <tbody>
                                    <tr>
                                        <td colSpan="4" className="first-td">
                                            <h1>HBL</h1>
                                            <p>Temoriya Market Branch Block North Nazimabad Branch Block North Nazimabad,Karachi..</p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colSpan="4" className="second-td">
                                            <h3>STANDARD HIGH SCHOOL</h3>
                                            <p>D-67.Block B North Nazimabad Karachi</p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colSpan="4" className="second-td" >
                                            <h4>A/C: 0006347900351703</h4>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colSpan="4" className="table-td" >
                                            Name Of Student : {fee.studentName}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colSpan="4" className="table-td" >
                                            Father's Name : {fee.fatherName}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="table-td"  >
                                            Class : {fee.ClassName}
                                        </td>
                                        <td colSpan="3" className="table-td" >
                                            Issue Date : {fee.issueDate}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colSpan="2" className="table-td"  >
                                            Vochure No : {fee.vochureNumber}
                                        </td>
                                        <td className="table-td" >
                                            <p> Gr:No </p>
                                        </td>
                                        <td className="table-td" >
                                            {fee.grNo}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="table-td">
                                        </td>
                                        <td className="table-td">
                                            <p>Fee</p>
                                        </td> <td className="table-td">
                                            <p>Late Fee</p>
                                        </td> <td className="table-td">
                                            <p>Total</p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="table-td">
                                            <p id="side-heading">Tuition Fee</p>
                                        </td>
                                        <td className="table-td">
                                            <p>{fee.monthlyFee}</p>
                                        </td>
                                        <td className="table-td">
                                        </td>
                                        <td className="table-td">
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="table-td">
                                            <p id="side-heading">Admission Fee</p>
                                        </td>
                                        <td className="table-td">
                                            <p>{fee.admissionFee} </p>
                                        </td>
                                        <td className="table-td">
                                        </td> <td className="table-td">
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="table-td">
                                            <p id="side-heading">Computer Fee</p>
                                        </td>
                                        <td className="table-td">
                                            <p>{fee.computerFee}</p>
                                        </td>
                                        <td className="table-td">
                                        </td> <td className="table-td">
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="table-td">
                                            <p id="side-heading">ExaminFee</p>
                                        </td>
                                        <td className="table-td">
                                            <p>{fee.examinationFee}</p>
                                        </td>
                                        <td className="table-td">
                                        </td>
                                        <td className="table-td">
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="table-td">
                                            <p id="side-heading">LabCharges</p>
                                        </td>
                                        <td className="table-td">
                                            <p>{fee.labCharges}</p>
                                        </td>
                                        <td className="table-td">
                                        </td> <td className="table-td">
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="table-td">
                                            <p id="side-heading">AnnualFee</p>
                                        </td>
                                        <td className="table-td">
                                            <p>{fee.annualCharges}</p>
                                        </td>
                                        <td className="table-td">
                                        </td> <td className="table-td">
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="table-td">
                                            <p id="side-heading">Late Fee</p>
                                        </td>
                                        <td className="table-td">
                                            <p>  {fee.lateFee} </p>
                                        </td> <td className="table-td">
                                        </td> <td className="table-td">
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="table-td">
                                            <p id="side-heading">Due Date</p>
                                        </td>
                                        <td className="table-td">
                                        </td> <td className="table-td">
                                        </td> <td className="table-td">
                                            <p>{fee.dueDateAmount}</p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="table-td">
                                            <p id="side-heading">After Due Date</p>
                                        </td>
                                        <td className="table-td">
                                        </td>
                                        <td className="table-td">
                                        </td>
                                        <td className="table-td">
                                            <p> {fee.afterDueDateAmount}</p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="table-td" colSpan="4">
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="table-td" colSpan="3">
                                            <p id="side-heading"> Due Date : {fee.dueDate}</p>
                                        </td>
                                        <td className="table-td">
                                            <p>{fee.dueDateAmount}</p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="table-td" colSpan="3">
                                            <p id="side-heading">After Due Date : {fee.issueDate} </p>
                                        </td>
                                        <td className="table-td">
                                            <p> {fee.afterDueDateAmount}</p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="table-td" colSpan="4">
                                            <p >School Copy</p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="table-td" colSpan="4">
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="table-td" colSpan="4">
                                            <p id="side-heading">Accountant Signature : </p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="table-td" colSpan="4">
                                            <p id="side-heading">InCharge Signature : </p>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <table className="print-table-all">
                                <tbody>
                                    <tr>
                                        <td colSpan="4" className="first-td">
                                            <h1>HBL</h1>
                                            <p>Temoriya Market Branch Block North Nazimabad Branch Block North Nazimabad,Karachi..</p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colSpan="4" className="second-td">
                                            <h3>STANDARD HIGH SCHOOL</h3>
                                            <p>D-67.Block B North Nazimabad Karachi</p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colSpan="4" className="second-td" >
                                            <h4>A/C: 0006347900351703</h4>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colSpan="4" className="table-td" >
                                            Name Of Student : {fee.studentName}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colSpan="4" className="table-td" >
                                            Father's Name : {fee.fatherName}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="table-td"  >
                                            Class : {fee.ClassName}
                                        </td>
                                        <td colSpan="3" className="table-td" >
                                            Issue Date : {fee.issueDate}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colSpan="2" className="table-td"  >
                                            Vochure No : {fee.vochureNumber}
                                        </td>
                                        <td className="table-td" >
                                            <p> Gr:No </p>
                                        </td>
                                        <td className="table-td" >
                                            {fee.grNo}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="table-td">
                                        </td>
                                        <td className="table-td">
                                            <p>Fee</p>
                                        </td> <td className="table-td">
                                            <p>Late Fee</p>
                                        </td> <td className="table-td">
                                            <p>Total</p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="table-td">
                                            <p id="side-heading">Tuition Fee</p>
                                        </td>
                                        <td className="table-td">
                                            <p>{fee.monthlyFee}</p>
                                        </td>
                                        <td className="table-td">
                                        </td>
                                        <td className="table-td">
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="table-td">
                                            <p id="side-heading">Admission Fee</p>
                                        </td>
                                        <td className="table-td">
                                            <p>{fee.admissionFee} </p>
                                        </td>
                                        <td className="table-td">
                                        </td> <td className="table-td">
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="table-td">
                                            <p id="side-heading">Computer Fee</p>
                                        </td>
                                        <td className="table-td">
                                            <p>{fee.computerFee}</p>
                                        </td>
                                        <td className="table-td">
                                        </td> <td className="table-td">
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="table-td">
                                            <p id="side-heading">ExaminFee</p>
                                        </td>
                                        <td className="table-td">
                                            <p>{fee.examinationFee}</p>
                                        </td>
                                        <td className="table-td">
                                        </td>
                                        <td className="table-td">
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="table-td">
                                            <p id="side-heading">LabCharges</p>
                                        </td>
                                        <td className="table-td">
                                            <p>{fee.labCharges}</p>
                                        </td>
                                        <td className="table-td">
                                        </td> <td className="table-td">
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="table-td">
                                            <p id="side-heading">AnnualFee</p>
                                        </td>
                                        <td className="table-td">
                                            <p>{fee.annualCharges}</p>
                                        </td>
                                        <td className="table-td">
                                        </td> <td className="table-td">
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="table-td">
                                            <p id="side-heading">Late Fee</p>
                                        </td>
                                        <td className="table-td">
                                            <p>  {fee.lateFee} </p>
                                        </td> <td className="table-td">
                                        </td> <td className="table-td">
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="table-td">
                                            <p id="side-heading">Due Date</p>
                                        </td>
                                        <td className="table-td">
                                        </td> <td className="table-td">
                                        </td> <td className="table-td">
                                            <p>{fee.dueDateAmount}</p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="table-td">
                                            <p id="side-heading">After Due Date</p>
                                        </td>
                                        <td className="table-td">
                                        </td>
                                        <td className="table-td">
                                        </td>
                                        <td className="table-td">
                                            <p> {fee.afterDueDateAmount}</p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="table-td" colSpan="4">
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="table-td" colSpan="3">
                                            <p id="side-heading"> Due Date : {fee.dueDate}</p>
                                        </td>
                                        <td className="table-td">
                                            <p>{fee.dueDateAmount}</p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="table-td" colSpan="3">
                                            <p id="side-heading">After Due Date : {fee.issueDate} </p>
                                        </td>
                                        <td className="table-td">
                                            <p> {fee.afterDueDateAmount}</p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="table-td" colSpan="4">
                                            <p >Bank Copy</p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="table-td" colSpan="4">
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="table-td" colSpan="4">
                                            <p id="side-heading">Accountant Signature : </p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="table-td" colSpan="4">
                                            <p id="side-heading">InCharge Signature : </p>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    )
                })}
            </div>
        )
    }
}

export default PrintDataByClass;