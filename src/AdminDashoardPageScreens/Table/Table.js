import React, { useState } from 'react'
import './Table.css';
import { Input } from 'semantic-ui-react';
import { Card } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Tooltip from '@material-ui/core/Tooltip';


const DataTable = (props) => {

    const [searchValue, setSearchValue] = useState('')

    const seacrhingMethodForStudents = (searchValue) => {
        return (x) => {
            return x.ClassName.toLowerCase().includes(searchValue.toLowerCase()) || !searchValue;
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
                    placeholder="search by class"
                    // iconPosition="right"
                    value={searchValue}
                    onChange={seacrhHandler}
                />

            </div>
            <table className="table">
                <thead>
                    <tr>
                        <th>Gr.No</th>
                        <th>Student Name</th>
                        <th>Father Name</th>
                        <th>Class</th>
                        <th>Ph.No</th>
                        <th>Adm Date</th>
                        <th>Due Date</th>
                        <th>Fee</th>
                        {props.actions == "true" ? <th>Action</th> : ''}
                    </tr>
                </thead>
                <tbody>{props.studentList ? props.studentList.sort(compare).filter(seacrhingMethodForStudents(searchValue)).map((student, index) => {
                    return<tr key={index}>
                        <td data-label="Gr.No">{student.grNo}</td>
                        <td data-label="Student Name">{student.studentName}</td>
                        <td data-label="Father Name">{student.fatherName}</td>
                        <td data-label="Class">{student.ClassName}</td>
                        <td data-label="Ph.No">{student.phoneNumber}</td>
                        <td data-label="Adm Date">{student.admissionDate}</td>
                        <td data-label="Due Date">{student.dueDate}</td>
                        <td data-label="Fee">{student.fee}</td>
                        {props.actions == "true" ? <td data-label="Actions">
                            <Tooltip title="Edit Record" placement="left">
                                <EditIcon button className="btn1" onClick={() => props.editFunc(student.id, student.studentName, student.fatherName, student.phoneNumber, student.fee)} />
                            </Tooltip>
                            <Tooltip title="Delete Record" placement="right">
                                <DeleteIcon button className="btn2" onClick={() => props.deleteFunc(student.id)} />
                            </Tooltip>
                        </td> : ""}
                    </tr>
                }) : ''}
                </tbody>
            </table>
        </Card>
    )
}

export default DataTable