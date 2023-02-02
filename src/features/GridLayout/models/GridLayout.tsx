import React from 'react';
import { Row, Col, Container } from 'react-bootstrap'

const GridLayout = ({ colCount, children, md }: any) => {
    let rowCount = Math.floor(children.length / colCount) + 1
    let index = 0
    const buildGrid = () => {
        return (
            renderRows()
        )
    }
    const renderRows = () => {
        let rows = []

        for (let row = 0; row < rowCount; row++) {
            rows.push(
                <Row
                    style={
                        {
                            marginBottom: "20px",
                        }
                    }
                    key={`row${row}`}
                >
                    {
                        renderCols()
                    }
                </Row>
            )
        }

        return rows
    }
    const renderCols = () => {
        let cols = []
        for (let col = 0; col < colCount; col++) {
            if (index < children.length) {
                cols.push(
                    <Col
                        md={md}
                        key={`col_${index}`}
                    >
                        {children[index]}
                    </Col>
                )
                index++
            }
        }

        return cols
    }

    return (
        <>
            {
                buildGrid()
            }
        </>
    );
};

export { GridLayout };