import React, { useState } from 'react'
import './Table.css';
import { Input } from 'semantic-ui-react';
import { Card } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Tooltip from '@material-ui/core/Tooltip';


const PaidTable = (props) => {

    const [searchValue, setSearchValue] = useState('')

    const seacrhingMethodForStudents = (searchValue) => {
        return (x) => {
            return x.studentName.toLowerCase().includes(searchValue.toLowerCase()) || !searchValue;
        }
    }
    const seacrhHandler = (e) => {
        setSearchValue(e.target.value);
    }

    const compare = (a, b) => {
        const bandA = a.ClassName.toUpperCase();
        const bandB = b.ClassName.toUpperCase();

        let comparison = 0;
        if (bandA > bandB) {
            comparison = 1;
        } else if (bandA < bandB) {
            comparison = -1;
        }
        return comparison;
    }

    return (
        <Card>
            <div className="heading-container">
                <h4 className="table-heading">{props.heading}</h4>
                <Input icon="search"
                    placeholder="search by name"
                    value={searchValue}
                    onChange={seacrhHandler}
                />

            </div>
            <table className="table">
                    <thead>
                        <th>V.No</th>
                        <th>Gr.No</th>
                        <th>StdName</th>
                        <th>FathName</th>
                        <th>IssDate</th>
                        <th>Month</th>
                        <th>MonthlyFee</th>
                        <th>LateFee</th>
                        <th>AdmFee</th>
                        <th>CompFee</th>
                        <th>ExamFee</th>
                        <th>LabFee</th>
                        <th>AnnaulFee</th>
                        <th>DueFee</th>
                        <th>AfterDueFee</th>
                        <th>Action</th>
                    </thead>
                    <tbody>{props.feeList ? props.feeList.filter(seacrhingMethodForStudents(searchValue)).map((fee, index) => {
                        return <tr key={index}>
                            <td data-label="Gr.No">{fee.vochureNumber}</td>
                            <td data-label="Student Name">{fee.grNo}</td>
                            <td data-label="Father Name">{fee.studentName}</td>
                            <td data-label="Class">{fee.fatherName}</td>
                            <td data-label="Ph.No">{fee.issueDate}</td>
                            <td data-label="Adm Date">{fee.monthOfFee}</td>
                            <td data-label="Due Date">{fee.monthlyFee}</td>
                            <td data-label="Fee">{fee.lateFee}</td>
                            <td data-label="Fee">{fee.admissionFee}</td>
                            <td data-label="Fee">{fee.computerFee}</td>
                            <td data-label="Fee">{fee.examinationFee}</td>
                            <td data-label="Fee">{fee.labCharges}</td>
                            <td data-label="Fee">{fee.annualCharges}</td>
                            <td data-label="Fee">{fee.dueDateAmount}</td>
                            <td data-label="Fee">{fee.afterDueDateAmount}</td>
                        </tr>
                    }) : ''}
                    </tbody>
                </table>
        </Card>
    )
}

export default PaidTable