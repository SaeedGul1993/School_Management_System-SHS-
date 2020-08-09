import React from 'react';
import { Bar } from 'react-chartjs-2';
import '../Dashboard.css';
import { Card } from '@material-ui/core';
import { connect } from 'react-redux';
import { getListOfClasses } from '../../../Redux/Actions/getClasses';
import { getListOfStudents } from '../../../Redux/Actions/getStudents';
import { getListOfFee } from '../../../Redux/Actions/getFees';

class BarChart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            xLabels: ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'],
            yData: [],
            Jan: 0,
            Feb: 0,
            March: 0,
            April: 0,
            May: 0,
            June: 0,
            July: 0,
            Aug: 0,
            Sept: 0,
            Oct: 0,
            Nov: 0,
            Dec: 0
        }
    }
    componentWillMount() {
        var checkYear = new Date().getFullYear();
        this.props.getFees();
        var janTotal = 0;
        var febTotal = 0;
        var marchTotal = 0;
        var aprilTotal = 0;
        var julyTotal = 0;
        var augTotal = 0;
        var septTotal = 0;
        var octTotal = 0;
        var novTotal = 0;
        var decTotal = 0;
        var mayTotal = 0;
        var juneTotal = 0;
        this.props.listOfFee.map((fee) => {
            if (fee.monthOfFee == checkYear + "-" + "01") {
                let mayAmountRecord = fee.dueDateAmount;
                janTotal = parseInt(janTotal) + mayAmountRecord;
                console.log('typeOf janTotal', typeof (janTotal))
                console.log('janTotal', janTotal);
                this.setState({
                    Jan: janTotal
                })
            }
            if (fee.monthOfFee == checkYear + "-" + "02") {
                let mayAmountRecord = fee.dueDateAmount;
                febTotal = parseInt(febTotal) + mayAmountRecord;
                console.log('typeOf febTotal', typeof (febTotal))
                console.log('febTotal', febTotal);
                this.setState({
                    Feb: febTotal

                })
            } if (fee.monthOfFee == checkYear + "-" + "03") {
                let mayAmountRecord = fee.dueDateAmount;
                marchTotal = parseInt(marchTotal) + mayAmountRecord;
                console.log('typeOf marchTotal', typeof (marchTotal))
                console.log('marchTotal', marchTotal);
                this.setState({
                    March: marchTotal
                })
            } if (fee.monthOfFee == checkYear + "-" + "04") {
                let mayAmountRecord = fee.dueDateAmount;
                aprilTotal = parseInt(aprilTotal) + mayAmountRecord;
                console.log('typeOf aprilTotal', typeof (aprilTotal))
                console.log('aprilTotal', aprilTotal);
                this.setState({
                    April: aprilTotal
                })
            } if (fee.monthOfFee == checkYear + "-" + "05") {
                console.log('typeOf', typeof (fee.dueDateAmount))
                let mayAmountRecord = fee.dueDateAmount;
                mayTotal = parseInt(mayTotal) + mayAmountRecord;
                console.log('typeOf mayTotal', typeof (mayTotal))
                console.log('mayTotal', mayTotal);
                this.setState({
                    May: mayTotal
                })
            } if (fee.monthOfFee == checkYear + "-" + "06") {
                let juneAmountRecord = parseInt(fee.dueDateAmount);
                juneTotal = juneTotal + parseInt(juneAmountRecord);
                console.log('juneTotal', juneTotal);
                this.setState({
                    June: juneTotal
                })
            } if (fee.monthOfFee == checkYear + "-" + "07") {
                let julyAmountRecord = parseInt(fee.dueDateAmount);
                julyTotal = julyTotal + parseInt(julyAmountRecord);
                console.log('juneTotal', julyTotal);
                this.setState({
                    July: julyTotal
                })
            } if (fee.monthOfFee == checkYear + "-" + "08") {
                let julyAmountRecord = parseInt(fee.dueDateAmount);
                augTotal = augTotal + parseInt(julyAmountRecord);
                console.log('juneTotal', augTotal);
                this.setState({
                    Aug: augTotal
                })
            } if (fee.monthOfFee == checkYear + "-" + "09") {
                let julyAmountRecord = parseInt(fee.dueDateAmount);
                septTotal = septTotal + parseInt(julyAmountRecord);
                console.log('juneTotal', septTotal);
                this.setState({
                    Sept: septTotal
                })
            } if (fee.monthOfFee == checkYear + "-" + "10") {
                let octAmountRecord = parseInt(fee.dueDateAmount);
                octTotal = octTotal + parseInt(octAmountRecord);
                console.log('juneTotal', octTotal);
                this.setState({
                    Oct: octTotal
                })
            } if (fee.monthOfFee == checkYear + "-" + "11") {
                let novAmountRecord = parseInt(fee.dueDateAmount);
                novTotal = novTotal + parseInt(novAmountRecord);
                console.log('juneTotal', novTotal);
                this.setState({
                    Nov: novTotal
                })
            } if (fee.monthOfFee == checkYear + "-" + "12") {
                let decAmountRecord = parseInt(fee.dueDateAmount);
                decTotal = decTotal + parseInt(decAmountRecord);
                console.log('juneTotal', decTotal);
                this.setState({
                    Dec: decTotal
                })
            }
        })
    }
    render() {
        const dummArray = [
            this.state.Jan, this.state.Feb, this.state.March, this.state.April, this.state.May,
            this.state.June, this.state.July, this.state.Aug, this.state.Sept, this.state.Oct,
            this.state.Nov, this.state.Dec
        ]
        console.log('dummyArray', dummArray);
        console.log('state', this.state);
        const state = {

            datasets: [
                {
                    label: 'Amount',
                    backgroundColor: 'rgba(56, 211, 159, 0.5)',
                    borderColor: 'rgba(56, 211, 159, 1)',
                    borderWidth: 1,
                    data: dummArray,
                }
            ]
        }
        return (

            <Card className="bar-chart-container">
                <Bar
                    id="barChart"
                    data={state}
                    options={{
                        responsive: true,
                        maintainAspectRatio: true,
                        scales: {
                            xAxes: [{
                                labels: this.state.xLabels,
                                display: true,
                                ticks: {
                                    fontColor: '#00000',
                                    fontFamily: " 'El Messiri', sans-serif",
                                    fontSize: 10
                                }
                                ,
                                scaleLabel: {
                                    display: true,
                                    labelString: "Months",
                                    fontColor: '#38d39f ',
                                    fontSize: 14,
                                    fontFamily: " 'El Messiri', sans-serif"
                                }

                            }]
                            , yAxes: [{
                                display: true,
                                position: 'bottom',
                                ticks: {
                                    fontColor: '#333',
                                    fontFamily: " 'El Messiri', sans-serif",
                                    fontSize:10
                                }
                                ,
                                scaleLabel: {
                                    display: true,
                                    labelString: "Amount",
                                    fontColor: '#38d39f ',
                                    fontSize: 14,
                                    fontFamily: " 'El Messiri', sans-serif",

                                }

                            }]
                        },
                        title: {
                            display: true,
                            text: 'Total Amount Per Month In Year',
                            fontSize: 20,
                            fontFamily: " 'El Messiri', sans-serif"

                        }
                        ,
                        legend: {
                            display: true,
                            position: 'top',
                            labels: {
                                fontFamily: " 'El Messiri', sans-serif"
                            }
                        }
                    }}
                />
            </Card>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        listOfClasses: state.classes.classArray,
        listOfStudents: state.students.studentsArray,
        listOfFee: state.fees.feeArray,

    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getClasses: () => { dispatch(getListOfClasses()) },
        getStudents: () => { dispatch(getListOfStudents()) },
        getFees: () => { dispatch(getListOfFee()) }


    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BarChart);