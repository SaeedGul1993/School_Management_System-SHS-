import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Card } from '@material-ui/core';

export default class PieChart extends React.Component {
    render() {
        const state = {
            labels: ['Paid Students', 'UnPaid Students'],
            datasets: [
                {
                    label: 'Rainfall',
                    backgroundColor: [
                        '#38d39f',
                        'rgba(56, 211, 159, 0.6)'
                    ],
                    // borderColor:[
                    //     '#38d39f',
                    //     'rgba(56, 211, 159, 0.6)'
                    // ],
                    hoverBackgroundColor: [
                        '#38d39f',
                        'rgba(56, 211, 159, 0.6)'
                    ],
                    data: [this.props.paid, this.props.unPaid]
                }
            ]
        }

        return (
            <Card className="pie-chart-container">
                <Pie
                    id="pieChart"
                    data={state}
                    options={{
                        title: {
                            display: true,
                            text: 'Paid And UnPaid Students in Current Mont',
                            fontSize: 20,
                            fontFamily: " 'El Messiri', sans-serif"
                        },
                        legend: {
                            display: true,
                            position: 'top',
                            labels:{
                                fontFamily: " 'El Messiri', sans-serif"
                            }
                        }
                    }}
                />
            </Card>
        )
    }

}