import React from 'react';
import Card from '@material-ui/core/Card';
import './Dashboard.css';
import { Icon } from 'semantic-ui-react';
import BarChart from '../Dashboard/Charts/BarChart';
import PieChart from '../Dashboard/Charts/PieChart';
import DataTable from '../Table/Table';
import PaidTable from '../Table/paidTable';
import { connect } from 'react-redux';
import { getListOfClasses } from '../../Redux/Actions/getClasses';
import { getListOfStudents } from '../../Redux/Actions/getStudents';
import { paidStudentLengthMethod, unPaidStudentLengthMethod } from '../../Redux/Actions/setPaidAndUnPaid';
import { getListOfFee } from '../../Redux/Actions/getFees';



class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            totalStudents: [],
            smallDataCard: [],
            paidStudents: [],
            paidStudentList: [],
            unPaidStudentList: []
        }
    }
    componentWillMount() {
        this.props.getStudents();
        this.props.getFees();
        console.log('paidlen', this.props.paidLength)
        console.log('unpaidlen', this.props.unPaidLength);

        this.setState({
            totalStudents: this.props.listOfStudents,
            paidStudents: this.props.listOfFee
        },()=>{
            this.getPaidAndUnPaidStudent();
        })
        

    }

    getPaidAndUnPaidStudent = () => {
        let presentDate = new Date();
        let paidDummy = [];
        let unpaidDummy = [];
        let obj = {};
        if (presentDate.getMonth() + 1 < 10) {
            var currentMonth = presentDate.getFullYear() + '-' + '0' + (presentDate.getMonth() + 1);
            console.log('currentMonth', currentMonth);
        }
        else if (presentDate.getMonth() + 1 > 9) {
            var currentMonth = presentDate.getFullYear() + '-' + (presentDate.getMonth() + 1);
            console.log('currentMonth', currentMonth.toString());
        }
        for (let i = 0; i < this.state.paidStudents.length; i++) {
            for (let j = 0; j < this.state.totalStudents.length; j++) {
                if (this.state.paidStudents[i].classID == this.state.totalStudents[j].classId &&
                    this.state.paidStudents[i].grNo == this.state.totalStudents[j].grNo &&
                    this.state.paidStudents[i].monthOfFee == currentMonth) {
                    this.state.totalStudents[j].checked = true;
                    obj = {
                        vochureNumber: this.state.paidStudents[i].vochureNumber,
                        grNo: this.state.paidStudents[i].grNo,
                        classID: this.state.paidStudents[i].classID,
                        ClassName: this.state.paidStudents[i].ClassName,
                        studentId: this.state.paidStudents[i].studentId,
                        studentName: this.state.paidStudents[i].studentName,
                        fatherName: this.state.paidStudents[i].fatherName,
                        issueDate: this.state.paidStudents[i].issueDate,
                        monthOfFee: this.state.paidStudents[i].monthOfFee,
                        monthlyFee: this.state.paidStudents[i].monthlyFee,
                        admissionFee: this.state.paidStudents[i].admissionFee,
                        computerFee: this.state.paidStudents[i].computerFee,
                        examinationFee: this.state.paidStudents[i].examinationFee,
                        labCharges: this.state.paidStudents[i].labCharges,
                        annualCharges: this.state.paidStudents[i].annualCharges,
                        lateFee: this.state.paidStudents[i].lateFee,
                        dueDate: this.state.paidStudents[i].dueDate,
                        dueDateAmount: this.state.paidStudents[i].dueDateAmount,
                        afterDueDateAmount: this.state.paidStudents[i].afterDueDateAmount,
                        checked: this.state.paidStudents[i].checked,
                    }
                    paidDummy.push(obj);
                    this.setState({
                        paidStudentList: paidDummy
                    })
                    console.log('paidDummy', paidDummy);
                }
            }
        }
        for (let k = 0; k < this.state.totalStudents.length; k++) {
            if (!this.state.totalStudents[k].checked) {
                obj = {
                    ClassName: this.state.totalStudents[k].ClassName,
                    admissionDate: this.state.totalStudents[k].admissionDate,
                    classId: this.state.totalStudents[k].classId,
                    dueDate: this.state.totalStudents[k].dueDate,
                    fatherName: this.state.totalStudents[k].fatherName,
                    fee: this.state.totalStudents[k].fee,
                    grNo: this.state.totalStudents[k].grNo,
                    id: this.state.totalStudents[k].id,
                    phoneNumber: this.state.totalStudents[k].phoneNumber,
                    studentName: this.state.totalStudents[k].studentName,
                }
                unpaidDummy.push(obj);
                this.setState({
                    unPaidStudentList: unpaidDummy
                })

                console.log('unpaidDummy', this.props.setUnPaidLength(unpaidDummy.length));
            }
        }

    }

    showSmallDetailCard = () => {
        return (
            <div className="small-detail-container">
                <Card className="small-detail-card">
                    <div className="under-card-container">
                        <div>
                            <p className="card-title">Students</p>
                            <p className="quantity">{this.state.totalStudents.length}</p>
                        </div>
                        <div>
                            <Icon name='user secret' className="icon-style" />
                        </div>
                    </div>
                </Card>
                <Card className="small-detail-card">
                    <div className="under-card-container">
                        <div>
                            <p className="card-title">Paid Students</p>
                            <p className="quantity">{this.state.paidStudentList.length}</p>
                        </div>
                        <div>
                            <Icon name="smile" className="icon-style" />
                        </div>
                    </div>
                </Card>
                <Card className="small-detail-card">
                    <div className="under-card-container">
                        <div>
                            <p className="card-title">UnPaid Students</p>
                            <p className="quantity">{this.props.unPaidLength}</p>
                        </div>
                        <div>
                            <Icon name='frown' className="icon-style" />
                        </div>
                    </div>
                </Card>
            </div>
        )
    }
    showCharts = () => {
        return (
            <div className="charts-container">
                <PieChart paid={this.state.paidStudentList.length} unPaid={this.state.unPaidStudentList.length} />
                <BarChart />

            </div>
        )
    }
    showPaidTable = () => {
        return (
            <div className="table-container">
                <PaidTable feeList={this.state.paidStudentList} heading="Paid Students" />
            </div>
        )
    }
    showDefaulterTable = () => {
        return (
            <div className="table-container">
                <DataTable studentList={this.state.unPaidStudentList} heading="unPaid Students" />
            </div>
        )
    }
    render() {
        console.log('paidStudentList', this.state.paidStudentList);
        console.log('totalStudents', this.state.totalStudents);


        return (
            <div>
                {this.showSmallDetailCard()}
                {this.showCharts()}
                {this.showPaidTable()}
                {this.showDefaulterTable()}
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        listOfClasses: state.classes.classArray,
        listOfStudents: state.students.studentsArray,
        listOfFee: state.fees.feeArray,
        paidLength: state.paidAndUnPaid.paidStudentLength,
        unPaidLength: state.paidAndUnPaid.unPaidStudentLength,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getClasses: () => { dispatch(getListOfClasses()) },
        getStudents: () => { dispatch(getListOfStudents()) },
        getFees: () => { dispatch(getListOfFee()) },
        setPaidLength: (data) => { dispatch(paidStudentLengthMethod(data)) },
        setUnPaidLength: (data) => { dispatch(unPaidStudentLengthMethod(data)) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);